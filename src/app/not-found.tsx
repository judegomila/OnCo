import Link from "next/link";
import { Container } from "@/components/ui";
import { SearchBox } from "@/components/SearchBox";
import { T, TN } from "@/components/T";

export default function NotFound() {
  return (
    <Container className="py-24 max-w-xl">
      <h1 className="text-3xl font-semibold"><T k="notFound.title" /></h1>
      <p className="text-muted mt-2"><TN k="notFound.body" vars={{ link: <a className="underline" href="https://github.com/judegomila/OnCo/issues" rel="noopener"><T k="notFound.link" /></a> }} /></p>
      <div className="mt-6"><SearchBox large /></div>
      <p className="mt-6 text-sm"><Link className="underline" href="/"><T k="home" /></Link></p>
    </Container>
  );
}
