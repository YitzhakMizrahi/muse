import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1).optional(),
  OPENAI_MODEL: z.string().min(1).default("gpt-5.4"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

let parsedEnv: z.infer<typeof serverEnvSchema> | null = null;

export function getServerEnv() {
  if (parsedEnv) {
    return parsedEnv;
  }

  parsedEnv = serverEnvSchema.parse({
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
    NODE_ENV: process.env.NODE_ENV,
  });

  return parsedEnv;
}
