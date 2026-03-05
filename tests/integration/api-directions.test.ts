import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/directions/route";
import { museSessionDefaults } from "@/lib/session";

describe("POST /api/directions", () => {
  it("returns a stable success contract for valid input", async () => {
    const request = new Request("http://localhost/api/directions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(museSessionDefaults),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      ok: boolean;
      result?: { alternates?: unknown[]; recommendedDirection?: unknown };
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.result?.alternates).toHaveLength(2);
    expect(payload.result?.recommendedDirection).toBeDefined();
  });

  it("returns a stable error contract for invalid input", async () => {
    const request = new Request("http://localhost/api/directions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rawPrompt: "too short" }),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      ok: boolean;
      error?: { code?: string };
    };

    expect(response.status).toBe(400);
    expect(payload.ok).toBe(false);
    expect(payload.error?.code).toBe("INVALID_REQUEST");
  });
});
