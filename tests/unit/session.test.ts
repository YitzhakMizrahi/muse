import { describe, expect, it } from "vitest";

import {
  museSessionDefaults,
  museSessionSchema,
  normalizeMuseSession,
} from "@/lib/session";

describe("museSessionSchema", () => {
  it("accepts the default draft", () => {
    const parsed = museSessionSchema.safeParse(museSessionDefaults);

    expect(parsed.success).toBe(true);
  });

  it("rejects more than three feel qualities", () => {
    const parsed = museSessionSchema.safeParse({
      ...museSessionDefaults,
      feelQualities: [
        "Premium and confident",
        "Warm and approachable",
        "Calm and refined",
        "Bold and energetic",
      ],
    });

    expect(parsed.success).toBe(false);
  });

  it("normalizes the intake into a stable session object", () => {
    const normalized = normalizeMuseSession(museSessionDefaults);

    expect(normalized.productSummary.length).toBeGreaterThan(24);
    expect(normalized.primaryAudience).toBe(museSessionDefaults.primaryAudience);
    expect(normalized.primaryPageAction).toBe(
      museSessionDefaults.primaryPageAction,
    );
  });
});
