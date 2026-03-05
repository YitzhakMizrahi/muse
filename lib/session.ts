import { z } from "zod";

export const audienceOptions = [
  "Founders and startup teams",
  "Operators and decision-makers",
  "Creative professionals",
  "Independent professionals",
  "Everyday consumers",
] as const;

export const feelOptions = [
  "Premium and confident",
  "Warm and approachable",
  "Calm and refined",
  "Bold and energetic",
  "Sharp and modern",
] as const;

export const actionOptions = [
  "Join the waitlist",
  "Request early access",
  "Book a demo",
  "Understand the product quickly",
  "Trust the product enough to keep reading",
] as const;

export const museSessionSchema = z.object({
  rawPrompt: z
    .string()
    .trim()
    .min(24, "Give Muse a clearer starting idea.")
    .max(1200, "Keep the prompt under 1200 characters."),
  primaryAudience: z
    .string()
    .trim()
    .min(2, "Choose one primary audience.")
    .max(120, "Keep the audience under 120 characters."),
  feelQualities: z
    .array(z.string().trim().min(2).max(40))
    .min(1, "Choose at least one feel quality.")
    .max(3, "Choose up to three feel qualities."),
  primaryPageAction: z
    .string()
    .trim()
    .min(2, "Choose one primary page action.")
    .max(120, "Keep the page action under 120 characters."),
  references: z
    .string()
    .trim()
    .max(300, "Keep references under 300 characters.")
    .optional()
    .or(z.literal("")),
  constraints: z
    .string()
    .trim()
    .max(300, "Keep constraints under 300 characters.")
    .optional()
    .or(z.literal("")),
  antiPreferences: z
    .string()
    .trim()
    .max(300, "Keep anti-preferences under 300 characters.")
    .optional()
    .or(z.literal("")),
});

export const normalizedMuseSessionSchema = z.object({
  productIdeaRaw: z.string().min(24).max(1200),
  productSummary: z.string().min(24).max(240),
  primaryAudience: z.string().min(2).max(120),
  feelQualities: z.array(z.string().min(2).max(40)).min(1).max(3),
  primaryPageAction: z.string().min(2).max(120),
  references: z.array(z.string().min(2).max(120)).max(6),
  constraints: z.array(z.string().min(2).max(120)).max(6),
  antiPreferences: z.array(z.string().min(2).max(120)).max(6),
});

export type MuseSessionValues = z.infer<typeof museSessionSchema>;
export type NormalizedMuseSession = z.infer<typeof normalizedMuseSessionSchema>;

export const museSessionDefaults: MuseSessionValues = {
  rawPrompt:
    "I am building Muse, a creative direction engine for solo founders who know what they want to build but do not know how it should look or feel.",
  primaryAudience: "Founders and startup teams",
  feelQualities: ["Premium and confident", "Sharp and modern"],
  primaryPageAction: "Join the waitlist",
  references: "",
  constraints: "",
  antiPreferences: "Do not make it feel like a generic AI SaaS dashboard.",
};

function splitOptionalList(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .split(/\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function summarizePrompt(rawPrompt: string) {
  const trimmed = rawPrompt.trim().replace(/\s+/g, " ");
  if (trimmed.length <= 220) {
    return trimmed;
  }

  return `${trimmed.slice(0, 217).trimEnd()}...`;
}

function includesAny(input: string, patterns: string[]) {
  return patterns.some((pattern) => input.includes(pattern));
}

export function inferAudienceFromPrompt(rawPrompt: string) {
  const input = rawPrompt.toLowerCase();

  if (includesAny(input, ["founder", "startup", "saas", "b2b"])) {
    return "Founders and startup teams";
  }

  if (includesAny(input, ["operator", "ops", "decision-maker", "finance team"])) {
    return "Operators and decision-makers";
  }

  if (includesAny(input, ["designer", "creative", "studio", "brand"])) {
    return "Creative professionals";
  }

  if (includesAny(input, ["freelancer", "consultant", "coach", "creator"])) {
    return "Independent professionals";
  }

  return "Everyday consumers";
}

export function inferPageActionFromPrompt(rawPrompt: string) {
  const input = rawPrompt.toLowerCase();

  if (includesAny(input, ["demo", "sales call", "book time"])) {
    return "Book a demo";
  }

  if (includesAny(input, ["early access", "beta", "invite"])) {
    return "Request early access";
  }

  if (includesAny(input, ["consumer", "explain", "what it is", "clarity"])) {
    return "Understand the product quickly";
  }

  return "Join the waitlist";
}

export function recommendFeelQualities(rawPrompt: string) {
  const input = rawPrompt.toLowerCase();
  const recommendations: string[] = [];

  if (includesAny(input, ["premium", "luxury", "high-end", "confidence"])) {
    recommendations.push("Premium and confident");
  }

  if (includesAny(input, ["warm", "friendly", "human", "approachable"])) {
    recommendations.push("Warm and approachable");
  }

  if (includesAny(input, ["calm", "focused", "quiet", "trust"])) {
    recommendations.push("Calm and refined");
  }

  if (includesAny(input, ["bold", "fast", "energy", "vivid"])) {
    recommendations.push("Bold and energetic");
  }

  if (
    recommendations.length === 0 ||
    includesAny(input, ["modern", "sharp", "clean", "design-led", "minimal"])
  ) {
    recommendations.push("Sharp and modern");
  }

  return Array.from(new Set(recommendations)).slice(0, 3);
}

export function normalizeMuseSession(
  rawValues: MuseSessionValues,
): NormalizedMuseSession {
  const values = museSessionSchema.parse(rawValues);

  return normalizedMuseSessionSchema.parse({
    productIdeaRaw: values.rawPrompt.trim(),
    productSummary: summarizePrompt(values.rawPrompt),
    primaryAudience: values.primaryAudience.trim(),
    feelQualities: values.feelQualities.map((entry) => entry.trim()),
    primaryPageAction: values.primaryPageAction.trim(),
    references: splitOptionalList(values.references),
    constraints: splitOptionalList(values.constraints),
    antiPreferences: splitOptionalList(values.antiPreferences),
  });
}
