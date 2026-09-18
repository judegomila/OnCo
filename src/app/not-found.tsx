import { Container, PageHeader } from "@/components/ui";
import { NotFoundHelper } from "@/components/NotFoundHelper";
import { NotFoundWaysIn } from "@/components/NotFoundWaysIn";

/**
 * The 404 page. Rendered inside the root layout, so the header, search palette and footer stay. The static
 * export cannot see the failed address on the server, so NotFoundHelper reads it in the browser, searches
 * the index for its words and lists the closest records; the rest of the page is the site's ways in
 * (NotFoundWaysIn, a client module so the tree Next embeds in every page's payload stays a reference).
 */
export default function NotFound() {
  return (
    <>
      <PageHeader title="That page is not here" lede="The address you followed does not match anything in OnCo, so here are the closest matches and the ways in." seed="not-found" />
      <Container className="pb-16 max-w-5xl space-y-12">
        <NotFoundHelper />
        <NotFoundWaysIn />
      </Container>
    </>
  );
}
