import { z } from "zod";

import { museSessionSchema, type MuseSessionValues } from "@/lib/session";

const DRAFT_STORAGE_KEY = "muse-session-draft";
const storedDraftSessionSchema = z.object({
  version: z.literal(2),
  updatedAt: z.string().datetime(),
  session: museSessionSchema,
});

type StoredDraftSession = z.infer<typeof storedDraftSessionSchema>;

export function saveDraftSession(session: MuseSessionValues) {
  const payload: StoredDraftSession = {
    version: 2,
    updatedAt: new Date().toISOString(),
    session,
  };

  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
}

export function readDraftSession(): StoredDraftSession | null {
  const raw = window.localStorage.getItem(DRAFT_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  let decoded: unknown;

  try {
    decoded = JSON.parse(raw);
  } catch {
    return null;
  }

  const parsed = storedDraftSessionSchema.safeParse(decoded);

  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}
