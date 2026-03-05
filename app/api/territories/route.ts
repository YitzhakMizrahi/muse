import { ZodError } from "zod";

import { apiError, apiSuccess } from "@/lib/api";
import { log } from "@/lib/logger";
import { generateTerritories } from "@/lib/territories";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await generateTerritories(body);

    return apiSuccess(result);
  } catch (error) {
    if (error instanceof ZodError) {
      log("error", {
        event: "territories.request.invalid",
        issueCount: error.issues.length,
      });

      return apiError("INVALID_REQUEST", "The session input is invalid.", {
        status: 400,
      });
    }

    log("error", {
      event: "territories.request.failed",
    });

    return apiError("GENERATION_FAILED", "Unable to generate territories.", {
      status: 500,
    });
  }
}
