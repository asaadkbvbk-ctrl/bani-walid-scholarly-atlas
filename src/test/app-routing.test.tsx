import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each(["/students", "/graduates", "/search", "/stats", "/admin", "/projects/4524aff3-7843-4e12-8281-5800d1312702", "/projects/0e142180-6db8-4e43-8544-009c54565525", "/projects/443ce1f7-f249-4fec-83e1-3a55a8a8a46b", "/projects/5da1928f-3f94-4db7-ace1-72e32d2e8638"])("matches imported destination %s", path => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(path).at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
