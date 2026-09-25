import { RecordSkeleton } from "@/components/Skeletons";

/**
 * A record page (/cancers/tnbc/, /drugs/pembrolizumab/, /trials/keynote-522/ and every other kind, plus the
 * /changes/ sub-page beneath) while its payload is read on a client-side navigation: the record layout's header,
 * tab strip, section boxes and right-hand column at their real sizes, so the page lands without a jump.
 */
export default function Loading() {
  return <RecordSkeleton />;
}
