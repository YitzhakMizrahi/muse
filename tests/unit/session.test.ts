import { describe, expect, it } from "vitest";

import { sessionFormDefaults, sessionFormSchema } from "@/lib/session";

describe("sessionFormSchema", () => {
  it("accepts the default draft", () => {
    const parsed = sessionFormSchema.safeParse(sessionFormDefaults);

    expect(parsed.success).toBe(true);
  });

  it("rejects more than four mood words", () => {
    const parsed = sessionFormSchema.safeParse({
      ...sessionFormDefaults,
      moodWords: ["editorial", "premium", "calm", "bold", "experimental"],
    });

    expect(parsed.success).toBe(false);
  });
});
