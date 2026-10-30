"use client";

import type { PostHog, PostHogConfig } from "posthog-js";
import { readConsent } from "./analytics-consent";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
let client: PostHog | undefined;
let loading: Promise<PostHog | undefined> | undefined;

/** Only anonymous page counts: never queries, fragments, text inputs, account or profile data. */
export const posthogConfig: Partial<PostHogConfig> = {
  api_host: HOST,
  persistence: "memory",
  person_profiles: "never",
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: false,
  capture_dead_clicks: false,
  capture_heatmaps: false,
  capture_exceptions: false,
  disable_session_recording: true,
  disable_surveys: true,
  disable_external_dependency_loading: true,
  advanced_disable_flags: true,
  before_send: (event) => {
    if (!event || event.event !== "$pageview" || readConsent() !== "granted") return null;
    const safe: Record<string, unknown> = {};
    for (const key of ["token", "$process_person_profile", "distinct_id", "$device_id", "$session_id", "$window_id", "$lib", "$lib_version", "$browser", "$os", "$device_type", "$screen_height", "$screen_width", "$viewport_height", "$viewport_width", "$host", "$pathname", "$current_url"]) {
      if (event.properties?.[key] !== undefined) safe[key] = event.properties[key];
    }
    if (typeof safe.$current_url === "string") {
      const url = new URL(safe.$current_url);
      safe.$current_url = `${url.origin}${url.pathname}`;
      safe.$pathname = url.pathname;
    }
    return { ...event, properties: safe };
  },
};

async function getClient(): Promise<PostHog | undefined> {
  if (!KEY || readConsent() !== "granted") return;
  if (client) { client.opt_in_capturing({ captureEventName: false }); return client; }
  if (!loading) loading = import("posthog-js").then(({ default: posthog }) => {
    if (readConsent() !== "granted") return;
    client = posthog.init(KEY, posthogConfig);
    return client;
  }).catch(() => undefined).finally(() => { loading = undefined; });
  return loading;
}

export async function trackPosthogPage(pathname: string): Promise<void> {
  const ph = await getClient();
  if (!ph || readConsent() !== "granted") return;
  ph.capture("$pageview", { $current_url: `${location.origin}${pathname}`, $pathname: pathname });
}

export function stopPosthog(): void {
  client?.opt_out_capturing();
  client?.reset();
}
