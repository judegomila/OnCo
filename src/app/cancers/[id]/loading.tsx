import { RecordSkeleton } from "@/components/Skeletons";

/** The cancer sub-pages (/cancers/<id>/compared/, /decisions/, /uk/) while their payload is read on a client-side navigation. */
export default function Loading() {
  return <RecordSkeleton />;
}
