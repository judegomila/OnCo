import Link from "next/link";
import { Container } from "@/components/ui";
import { SearchBox } from "@/components/SearchBox";

export default function NotFound() {
  return (
    <Container className="py-24 max-w-xl">
      <h1 className="text-3xl font-semibold">Not in the map yet</h1>
      <p className="text-muted mt-2">That page does not exist. Search for what you meant, or <a className="underline" href="https://github.com/judegomila/OnCo/issues" rel="noopener">ask for it to be added</a>.</p>
      <div className="mt-6"><SearchBox large /></div>
      <p className="mt-6 text-sm"><Link className="underline" href="/">Home</Link></p>
    </Container>
  );
}
