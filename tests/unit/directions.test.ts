import { describe, expect, it } from "vitest";

import { createMockDirections } from "@/lib/directions";
import { museSessionDefaults, normalizeMuseSession } from "@/lib/session";

describe("createMockDirections", () => {
  it("returns one recommended direction and two alternates", () => {
    const result = createMockDirections(normalizeMuseSession(museSessionDefaults));

    expect(result.recommendedDirection.directionIdentity.name.length).toBeGreaterThan(0);
    expect(result.alternates).toHaveLength(2);
  });

  it("returns usable export artifacts", () => {
    const result = createMockDirections(normalizeMuseSession(museSessionDefaults));

    expect(result.exports.directionBrief.length).toBeGreaterThan(80);
    expect(result.exports.handoffPrompt.length).toBeGreaterThan(80);
  });
});
