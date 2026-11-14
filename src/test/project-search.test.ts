import { describe, expect, it } from "vitest";
import { filterProjects } from "@/lib/captured-projects";

describe("Imported project search", () => {
  it("opens the computer department's captured project", () => {
    expect(filterProjects({ dept: "قسم الحاسوب" }).map(p => p.id)).toEqual(["4524aff3-7843-4e12-8281-5800d1312702"]);
  });
  it("combines department and text filters", () => {
    expect(filterProjects({ dept: "قسم الحاسوب", q: "القراءة" })).toHaveLength(0);
  });
  it("combines year, supervisor, and student filters", () => {
    expect(filterProjects({ year: "2025", supervisor: "سعاد", student: "فاطمة" }).map(p => p.id)).toEqual(["0e142180-6db8-4e43-8544-009c54565525"]);
  });
});