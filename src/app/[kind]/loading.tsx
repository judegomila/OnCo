import { RouteSkeleton } from "@/components/Skeletons";

/** A kind's browser (/cancers/, /drugs/, ...) while its payload is read on a client-side navigation: header, facet pills, table rows. The same boundary wraps the records beneath (/cancers/tnbc/) until their own has arrived, so the record layout is drawn for those. */
export default function Loading() {
  return <RouteSkeleton fallback="browser" />;
}
