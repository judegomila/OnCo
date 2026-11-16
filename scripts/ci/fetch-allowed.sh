#!/usr/bin/env bash
# fetch-allowed.sh: read one https page from a host on the allow-list, and nothing else.
#
#   fetch-allowed.sh <url>                    body to stdout
#   fetch-allowed.sh --text <url>             a PDF, as text (pdftotext -layout)
#   fetch-allowed.sh --out <name> <url>       body to .fill-gaps/fetched/<name> under the current directory
#
# This is the only network tool the model job of .github/workflows/fill-gaps.yml is given. That job holds the
# Anthropic API key and reads text assembled from outside web pages, so a crafted page could ask the model to send
# the key, or anything else, somewhere. This script is what makes that request fail: it can read from the hosts in
# fetch-allowlist.txt (next to this file) and cannot send anything anywhere.
#
# What it refuses, each with exit status 2 and one line on stderr:
#   - any argument that is not one of the three forms above, so there is no way to pass curl a method (-X), a body
#     (-d, -F, -T, --json), a header (-H, -A, -e, -b, -u), a proxy, a config file or an output path;
#   - any scheme but https, any port but 443, credentials in the URL, a backslash, a space or a control character,
#     a host written as an IP address, and any host that is not on the list or a subdomain of a listed host;
#   - a redirect to a host that is not on the list. Redirects are followed here, one hop at a time, and every hop is
#     checked the same way as the first URL; curl itself is told to follow none.
#
# What it sends: a GET with curl's default headers and no body. Standard input is closed, curl's config file is
# skipped (-q) and URL globbing is off, so `{a,b}` and `[1-9]` in a URL are not expanded into more requests.
#
# There is deliberately no environment variable that changes where this script may go. The test
# (scripts/ci/fetch-allowed.test.ts) puts a stand-in `curl` first on PATH instead.
#
# Exit status: 0 the page was read; 1 the server answered 400 or above, or curl failed (the body, if any, is still
# printed); 2 refused.
set -u
set -o pipefail
# Byte-wise matching: `A-Z` and the character classes below mean ASCII, whatever the runner's locale says.
export LC_ALL=C

MAX_REDIRECTS=5
MAX_URL_LENGTH=2000
MAX_BYTES=26214400 # 25 MB
MAX_SECONDS=90

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
allowlist="$here/fetch-allowlist.txt"

refuse() {
  echo "fetch-allowed: refused: $1" >&2
  exit 2
}

[ -r "$allowlist" ] || refuse "the allow-list $allowlist is missing"

mode="body"
out_name=""
case "${1:-}" in
  --text)
    mode="text"
    shift
    ;;
  --out)
    mode="file"
    out_name="${2:-}"
    [ "$#" -ge 2 ] || refuse "--out needs a file name"
    shift 2
    case "$out_name" in
      "" | .* | *[!A-Za-z0-9._-]*) refuse "the --out name may hold only letters, digits, dot, dash and underscore, and may not start with a dot" ;;
    esac
    [ "${#out_name}" -le 120 ] || refuse "the --out name is too long"
    ;;
esac

[ "$#" -eq 1 ] || refuse "expected exactly one URL; this tool takes no curl options, methods, headers or request bodies"
case "$1" in
  -*) refuse "expected a URL, not an option; this tool takes no curl options, methods, headers or request bodies" ;;
esac

# Sets $host on success. Refuses, and exits, on anything it does not like.
check_url() {
  local url="$1" rest authority entry
  [ "${#url}" -le "$MAX_URL_LENGTH" ] || refuse "the URL is longer than $MAX_URL_LENGTH characters"
  case "$url" in
    *[[:space:]]* | *[[:cntrl:]]* | *\\*) refuse "the URL holds a space, a control character or a backslash" ;;
  esac
  case "$url" in
    https://*) ;;
    *) refuse "only https:// URLs are read: $url" ;;
  esac
  rest="${url#https://}"
  authority="${rest%%[/?#]*}"
  case "$authority" in
    *@*) refuse "a URL may not carry a user name or password" ;;
  esac
  case "$authority" in
    *:443) authority="${authority%:443}" ;;
    *:*) refuse "only the default https port is read: $authority" ;;
  esac
  host="$(printf '%s' "$authority" | tr 'A-Z' 'a-z')"
  case "$host" in
    "" | .* | *. | *..* | -* | *[!a-z0-9.-]*) refuse "not a plain host name: $authority" ;;
  esac
  case "$host" in
    *[a-z]*) ;;
    *) refuse "a host must be a name, not an address: $host" ;;
  esac
  while IFS= read -r entry || [ -n "$entry" ]; do
    entry="${entry%%#*}"
    entry="$(printf '%s' "$entry" | tr -d '[:space:]' | tr 'A-Z' 'a-z')"
    [ -n "$entry" ] || continue
    if [ "$host" = "$entry" ]; then return 0; fi
    case "$host" in
      *".$entry") return 0 ;;
    esac
  done <"$allowlist"
  refuse "$host is not on the allow-list (scripts/ci/fetch-allowlist.txt)"
}

tmp="$(mktemp -d "${TMPDIR:-/tmp}/fetch-allowed.XXXXXX")" || refuse "could not make a temporary directory"
trap 'rm -rf "$tmp"' EXIT

url="$1"
host=""
hop=0
while :; do
  check_url "$url"
  : >"$tmp/headers"
  : >"$tmp/body"
  # -q first: no curlrc. --max-redirs 0 without --location: curl follows nothing; the loop below does.
  code="$(curl -q --silent --show-error --globoff --request GET \
    --proto '=https' --max-redirs 0 --max-time "$MAX_SECONDS" --max-filesize "$MAX_BYTES" \
    --dump-header "$tmp/headers" --output "$tmp/body" --write-out '%{http_code}' \
    -- "$url" </dev/null)"
  status=$?
  if [ "$status" -ne 0 ]; then
    echo "fetch-allowed: curl failed with status $status for $url" >&2
    exit 1
  fi
  case "$code" in
    301 | 302 | 303 | 307 | 308)
      hop=$((hop + 1))
      [ "$hop" -le "$MAX_REDIRECTS" ] || refuse "more than $MAX_REDIRECTS redirects"
      location="$(tr -d '\r' <"$tmp/headers" | awk 'tolower($0) ~ /^location:/ { sub(/^[^:]*:[ \t]*/, ""); loc = $0 } END { print loc }')"
      [ -n "$location" ] || refuse "a redirect ($code) from $host named no location"
      case "$location" in
        https://*) url="$location" ;;
        //*) url="https:$location" ;;
        /*) url="https://$host$location" ;;
        *) refuse "a redirect from $host to $location, which is not an https or same-host address" ;;
      esac
      echo "fetch-allowed: $code redirect to $url" >&2
      ;;
    *) break ;;
  esac
done

echo "fetch-allowed: HTTP $code from $url ($(wc -c <"$tmp/body" | tr -d ' ') bytes)" >&2

case "$mode" in
  body)
    cat "$tmp/body"
    ;;
  text)
    command -v pdftotext >/dev/null || { echo "fetch-allowed: pdftotext is not installed" >&2; exit 1; }
    pdftotext -layout "$tmp/body" - || { echo "fetch-allowed: pdftotext could not read the file as a PDF" >&2; exit 1; }
    ;;
  file)
    mkdir -p ".fill-gaps/fetched" || exit 1
    cp "$tmp/body" ".fill-gaps/fetched/$out_name" || exit 1
    echo "fetch-allowed: saved to .fill-gaps/fetched/$out_name" >&2
    ;;
esac

case "$code" in
  2??) exit 0 ;;
  *) exit 1 ;;
esac
