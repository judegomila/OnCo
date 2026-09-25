import { RouteSkeleton } from "@/components/Skeletons";

/**
 * Root loading state: the header and footer stay, the main area shows a skeleton while a client-side navigation's
 * payload is read. Applies to every route without a nearer loading.tsx (the hubs, tools and browsers' sub-pages) and
 * to records and browsers until their own segment's data has arrived, so the shape follows the destination pathname. Never streamed on a first visit: the
 * static export serves finished HTML (see src/components/Skeletons.tsx for what shows when).
 */
export default function Loading() {
  return <RouteSkeleton fallback="page" />;
}
