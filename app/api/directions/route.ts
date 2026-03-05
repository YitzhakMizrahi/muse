import { ZodError } from "zod";

import { apiError, apiSuccess } from "@/lib/api";
import { generateDirections } from "@/lib/directions";
import { log } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await generateDirections(body);

    return apiSuccess(result);
  } catch (error) {
    if (error instanceof ZodError) {
      log("error", {
        event: "directions.request.invalid",
        issueCount: error.issues.length,
      });

      return apiError("INVALID_REQUEST", "The Muse session input is invalid.", {
        status: 400,
      });
    }

    log("error", {
      event: "directions.request.failed",
    });

    return apiError("GENERATION_FAILED", "Unable to generate a Muse direction.", {
      status: 500,
    });
  }
}
