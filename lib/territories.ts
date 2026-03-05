import OpenAI from "openai";
import { z } from "zod";

import { getServerEnv } from "@/lib/env";
import { log } from "@/lib/logger";
import { type SessionFormValues, sessionFormSchema } from "@/lib/session";

export const creativeTerritorySchema = z.object({
  name: z.string().min(2).max(60),
  thesis: z.string().min(40).max(220),
  voice: z.string().min(20).max(180),
  visualSignals: z.array(z.string().min(2).max(50)).min(3).max(5),
  typography: z.string().min(10).max(140),
  colorMood: z.string().min(10).max(140),
  motionCue: z.string().min(10).max(140),
});

export const territoryResultSchema = z.object({
  creativeThesis: z.string().min(40).max(220),
  recommendedDirection: z.string().min(2).max(60),
  territories: z.array(creativeTerritorySchema).length(3),
});

export type CreativeTerritory = z.infer<typeof creativeTerritorySchema>;
export type TerritoryResult = z.infer<typeof territoryResultSchema>;

export function buildTerritoryPrompt(values: SessionFormValues) {
  return {
    system: [
      "You are Muse, a creative direction partner.",
      "Your job is to synthesize rough product ideas into high-quality creative territories.",
      "Return exactly three clearly distinct territories.",
      "Avoid generic branding language and avoid near-duplicate territory options.",
      "Write with taste, precision, and restraint.",
      "Output valid JSON only.",
    ].join(" "),
    user: JSON.stringify(
      {
        task: "Generate a creative direction result from this session draft.",
        session: values,
        output_shape: {
          creativeThesis:
            "A concise articulation of the overall creative opportunity.",
          recommendedDirection:
            "The name of the strongest territory based on the input.",
          territories: [
            {
              name: "Territory name",
              thesis: "Why this direction fits",
              voice: "Voice and copy behavior",
              visualSignals: ["3 to 5 concrete signals"],
              typography: "Type direction",
              colorMood: "Palette or color feeling",
              motionCue: "How movement should behave",
            },
          ],
        },
      },
      null,
      2,
    ),
  };
}

export async function generateTerritories(
  rawValues: unknown,
): Promise<TerritoryResult> {
  const values = sessionFormSchema.parse(rawValues);
  const env = getServerEnv();

  if (!env.OPENAI_API_KEY) {
    log("info", {
      event: "territories.generate.mock",
      reason: "missing_api_key",
    });
    return createMockTerritories(values);
  }

  try {
    const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    const prompt = buildTerritoryPrompt(values);
    const response = await client.responses.create({
      model: env.OPENAI_MODEL,
      input: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
    });

    const parsed = territoryResultSchema.safeParse(
      JSON.parse(response.output_text),
    );

    if (parsed.success) {
      log("info", {
        event: "territories.generate.success",
        mode: "openai",
        territoryCount: parsed.data.territories.length,
      });
      return parsed.data;
    }
    log("error", {
      event: "territories.generate.invalid_output",
      mode: "openai",
    });
  } catch {
    // Fallback to deterministic local generation if remote generation fails.
    log("error", {
      event: "territories.generate.failure",
      mode: "openai",
    });
  }

  log("info", {
    event: "territories.generate.mock",
    reason: "fallback",
  });
  return createMockTerritories(values);
}

export function createMockTerritories(
  values: SessionFormValues,
): TerritoryResult {
  const moods = values.moodWords;
  const primaryMood = moods[0] ?? "editorial";
  const title = values.title;
  const audience =
    values.audience?.trim() || "an audience that values distinct point of view";
  const references =
    values.references?.trim() || "selective cultural references and material cues";

  return {
    creativeThesis: `${title} should feel authored from the first screen: a clear point of view shaped by ${primaryMood} restraint, memorable contrast, and signals that ${audience} can recognize immediately.`,
    recommendedDirection: "Editorial Tension",
    territories: [
      {
        name: "Editorial Tension",
        thesis: `Frame ${title} as a precise, design-literate system where every surface feels deliberate. This direction works when the idea needs authority, taste, and restraint without feeling distant.`,
        voice:
          "Measured, articulate, and exact. Copy should sound like it has been edited, not generated.",
        visualSignals: [
          "warm ivory fields",
          "structured serif headlines",
          "disciplined grid tension",
          "thin rule separators",
        ],
        typography:
          "High-contrast serif display paired with quiet grotesk body copy and tight headline tracking.",
        colorMood:
          "Bone, soot, muted brass, and one ember accent to punctuate key moments.",
        motionCue:
          "Slow reveals, sliding masks, and deliberate pacing that rewards attention.",
      },
      {
        name: "Electric Warmth",
        thesis: `Position ${title} as emotionally magnetic and confidently contemporary. This direction is strongest when the product needs approachability, movement, and heat while still feeling premium.`,
        voice:
          "Human, persuasive, and alive. The tone should invite rather than posture.",
        visualSignals: [
          "glowing ember accents",
          "soft gradients",
          "rounder cards",
          "elastic interactive states",
        ],
        typography:
          "Friendly sans with oversized display moments and open spacing for breath.",
        colorMood:
          `Burnt orange, dusted peach, parchment, and softened olive, informed by ${references}.`,
        motionCue:
          "Responsive, lightly elastic motion with moments of expansion and pull.",
      },
      {
        name: "Modern Ritual",
        thesis: `Treat ${title} as a system of depth and intention. This direction fits if the experience should feel calming, ceremonial, and quietly immersive rather than loudly novel.`,
        voice:
          "Calm, grounded, and understated. The language should feel assured without overselling.",
        visualSignals: [
          "layered paper tones",
          "dense margins",
          "subtle ornament",
          "ceremonial pacing",
        ],
        typography:
          "Elegant serif with generous vertical rhythm and understated monospace metadata.",
        colorMood:
          `Washed clay, olive shadow, paper, and dusk neutrals shaped by ${moods.join(", ")}.`,
        motionCue:
          "Fade-led transitions, low-velocity movement, and quiet sequential reveals.",
      },
    ],
  };
}
