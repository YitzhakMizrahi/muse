import { z } from "zod";

export const moodOptions = [
  "editorial",
  "premium",
  "calm",
  "bold",
  "experimental",
  "ritual",
  "magnetic",
  "precise",
] as const;

export const sessionFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Give the project a clearer name.")
    .max(80, "Keep the title under 80 characters."),
  concept: z
    .string()
    .trim()
    .min(30, "Describe the idea in a bit more detail.")
    .max(600, "Keep the concept under 600 characters."),
  audience: z
    .string()
    .trim()
    .max(120, "Keep the audience note under 120 characters.")
    .optional()
    .or(z.literal("")),
  moodWords: z
    .array(z.enum(moodOptions))
    .min(1, "Choose at least one mood word.")
    .max(4, "Choose up to four mood words."),
  references: z
    .string()
    .trim()
    .max(400, "Keep the reference note under 400 characters.")
    .optional()
    .or(z.literal("")),
});

export type SessionFormValues = z.infer<typeof sessionFormSchema>;

export const sessionFormDefaults: SessionFormValues = {
  title: "Muse launch system",
  concept:
    "A creative direction engine that helps founders and designers turn rough ideas, visual references, and instincts into clear territories worth building from.",
  audience: "Creative founders and design-led product teams",
  moodWords: ["editorial", "premium", "magnetic"],
  references: "Kinfolk, Are.na moodboards, gallery identities, tactile product launches",
};
