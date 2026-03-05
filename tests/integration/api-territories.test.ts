import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/territories/route";
import { sessionFormDefaults } from "@/lib/session";

describe("POST /api/territories", () => {
  it("returns a stable success contract for valid input", async () => {
    const request = new Request("http://localhost/api/territories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionFormDefaults),
    });

    const response = await POST(request);
    const payload = (await response.json()) as {
      ok: boolean;
      result?: { territories?: unknown[] };
    };

    expect(response.status).toBe(200);
    expect(payload.ok).toBe(true);
    expect(payload.result?.territories).toHaveLength(3);
  });

  it("returns a stable error contract for invalid input", async () => {
    const request = new Request("http://localhost/api/territories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: "x" }),
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
