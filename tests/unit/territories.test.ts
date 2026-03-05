import { describe, expect, it } from "vitest";

import { createMockTerritories } from "@/lib/territories";
import { sessionFormDefaults } from "@/lib/session";

describe("createMockTerritories", () => {
  it("returns exactly three territories", () => {
    const result = createMockTerritories(sessionFormDefaults);

    expect(result.territories).toHaveLength(3);
  });

  it("marks a recommended direction that exists in the result set", () => {
    const result = createMockTerritories(sessionFormDefaults);

    expect(
      result.territories.some(
        (territory) => territory.name === result.recommendedDirection,
      ),
    ).toBe(true);
  });
});
