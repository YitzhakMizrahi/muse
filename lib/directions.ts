import OpenAI from "openai";
import { z } from "zod";

import { getServerEnv } from "@/lib/env";
import { log } from "@/lib/logger";
import {
  type MuseSessionValues,
  type NormalizedMuseSession,
  normalizeMuseSession,
} from "@/lib/session";

const sectionSchema = z.object({
  section: z.string().min(2).max(80),
  purpose: z.string().min(8).max(180),
  contentRole: z.string().min(8).max(180),
  feel: z.string().min(8).max(180),
});

const recommendedDirectionSchema = z.object({
  directionIdentity: z.object({
    name: z.string().min(2).max(80),
    coreThesis: z.string().min(24).max(260),
    recommendedReason: z.string().min(24).max(260),
  }),
  brief: z.object({
    whoItShouldResonateWith: z.string().min(16).max(220),
    feelLike: z.array(z.string().min(2).max(40)).min(3).max(5),
    notFeelLike: z.array(z.string().min(2).max(50)).min(3).max(5),
    brandTone: z.string().min(24).max(260),
    visualPrinciples: z.array(z.string().min(8).max(160)).min(3).max(5),
    typographyDirection: z.string().min(24).max(220),
    colorLogic: z.string().min(24).max(220),
    layoutGuidance: z.string().min(24).max(220),
    landingPageNarrative: z.string().min(24).max(260),
    sectionOutline: z.array(sectionSchema).min(4).max(6),
    ctaStrategy: z.array(z.string().min(8).max(180)).min(3).max(5),
    antiPatterns: z.array(z.string().min(8).max(180)).min(3).max(5),
  }),
  visualPanels: z.object({
    heroPanel: z.string().min(16).max(220),
    sectionRhythmPanel: z.string().min(16).max(220),
    styleSystemPanel: z.string().min(16).max(220),
    conversionMomentPanel: z.string().min(16).max(220),
  }),
});

const alternateDirectionSchema = z.object({
  name: z.string().min(2).max(80),
  oneLineThesis: z.string().min(16).max(220),
  feelLike: z.array(z.string().min(2).max(40)).min(3).max(3),
  visualCharacter: z.string().min(16).max(220),
  chooseThisIf: z.string().min(16).max(220),
  visualPreview: z.object({
    miniHeroPanel: z.string().min(12).max(180),
    miniStyleFeelPanel: z.string().min(12).max(180),
  }),
});

export const directionResultSchema = z.object({
  normalizedInput: z.object({
    productSummary: z.string().min(24).max(240),
    primaryAudience: z.string().min(2).max(120),
    feelQualities: z.array(z.string().min(2).max(40)).min(1).max(3),
    primaryPageAction: z.string().min(2).max(120),
  }),
  recommendationRationale: z.string().min(24).max(260),
  recommendedDirection: recommendedDirectionSchema,
  alternates: z.array(alternateDirectionSchema).length(2),
  exports: z.object({
    directionBrief: z.string().min(80),
    handoffPrompt: z.string().min(80),
  }),
});

export type DirectionResult = z.infer<typeof directionResultSchema>;

function buildDirectionsPrompt(values: NormalizedMuseSession) {
  return {
    system: [
      "You are Muse, a creative direction engine for solo founders.",
      "Generate one recommended direction and exactly two alternates.",
      "The recommended direction must be more developed than the alternates.",
      "Avoid generic AI SaaS language, vague adjectives, and near-duplicate options.",
      "Output valid JSON only.",
    ].join(" "),
    user: JSON.stringify(
      {
        task: "Generate a structured Muse direction result.",
        session: values,
        output_shape: {
          normalizedInput: {
            productSummary: "short product summary",
            primaryAudience: "one primary audience",
            feelQualities: ["up to three qualities"],
            primaryPageAction: "one primary action",
          },
          recommendationRationale: "why the recommendation is strongest",
          recommendedDirection: {
            directionIdentity: {
              name: "direction name",
              coreThesis: "one or two sentence thesis",
              recommendedReason: "why it is recommended",
            },
            brief: {
              whoItShouldResonateWith: "audience logic",
              feelLike: ["3 to 5 qualities"],
              notFeelLike: ["3 to 5 qualities"],
              brandTone: "short prose",
              visualPrinciples: ["3 to 5 rules"],
              typographyDirection: "type roles and hierarchy",
              colorLogic: "how color behaves",
              layoutGuidance: "how composition behaves",
              landingPageNarrative: "persuasion arc",
              sectionOutline: [
                {
                  section: "Hero",
                  purpose: "section purpose",
                  contentRole: "content role",
                  feel: "how it should feel",
                },
              ],
              ctaStrategy: ["3 to 5 bullet points"],
              antiPatterns: ["3 to 5 bullet points"],
            },
            visualPanels: {
              heroPanel: "hero panel summary",
              sectionRhythmPanel: "section rhythm summary",
              styleSystemPanel: "style system summary",
              conversionMomentPanel: "conversion moment summary",
            },
          },
          alternates: [
            {
              name: "alternate name",
              oneLineThesis: "one-line thesis",
              feelLike: ["3 qualities"],
              visualCharacter: "short visual character",
              chooseThisIf: "when to choose this instead",
              visualPreview: {
                miniHeroPanel: "mini hero summary",
                miniStyleFeelPanel: "mini style summary",
              },
            },
          ],
          exports: {
            directionBrief: "polished direction brief document",
            handoffPrompt: "structured build prompt",
          },
        },
      },
      null,
      2,
    ),
  };
}

export async function generateDirections(
  rawValues: MuseSessionValues,
): Promise<DirectionResult> {
  const normalized = normalizeMuseSession(rawValues);
  const env = getServerEnv();

  if (!env.OPENAI_API_KEY) {
    log("info", {
      event: "directions.generate.mock",
      reason: "missing_api_key",
    });
    return createMockDirections(normalized);
  }

  try {
    const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    const prompt = buildDirectionsPrompt(normalized);
    const response = await client.responses.create({
      model: env.OPENAI_MODEL,
      input: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
    });

    const parsed = directionResultSchema.safeParse(JSON.parse(response.output_text));

    if (parsed.success) {
      log("info", {
        event: "directions.generate.success",
        mode: "openai",
      });
      return parsed.data;
    }

    log("error", {
      event: "directions.generate.invalid_output",
      mode: "openai",
    });
  } catch {
    log("error", {
      event: "directions.generate.failure",
      mode: "openai",
    });
  }

  log("info", {
    event: "directions.generate.mock",
    reason: "fallback",
  });
  return createMockDirections(normalized);
}

export function createMockDirections(
  values: NormalizedMuseSession,
): DirectionResult {
  const [primaryFeel, secondaryFeel] = values.feelQualities;

  const recommended = {
    directionIdentity: {
      name: "Quiet Authority",
      coreThesis:
        "Position the product as calm, credible, and sharply considered, using restrained confidence and strong hierarchy to earn trust fast.",
      recommendedReason: `This direction best fits ${values.primaryAudience} because it balances strategic clarity with a premium posture and keeps the page focused on ${values.primaryPageAction.toLowerCase()}.`,
    },
    brief: {
      whoItShouldResonateWith: `People who value clarity, thoughtful design, and a product that feels serious from the first screen, especially ${values.primaryAudience.toLowerCase()}.`,
      feelLike: [
        primaryFeel ?? "Premium and confident",
        secondaryFeel ?? "Sharp and modern",
        "Trustworthy",
      ],
      notFeelLike: ["Generic AI SaaS", "Overly playful", "Hype-heavy"],
      brandTone:
        "Calm, articulate, and direct. The copy should explain clearly without overselling or performing confidence.",
      visualPrinciples: [
        "Use strong hierarchy before decorative detail.",
        "Let one dominant message area lead the page.",
        "Keep accents rare and purposeful.",
      ],
      typographyDirection:
        "Use a high-character display face for key moments with a quiet, readable sans for body copy and interface text.",
      colorLogic:
        "Start from warm light surfaces, use one dark anchor for depth, and reserve accent color for emphasis rather than decoration.",
      layoutGuidance:
        "Favor asymmetry with generous negative space and one clearly dominant reading path.",
      landingPageNarrative:
        "Open with a precise articulation of the product promise, build trust through clarity and selected proof, then ask for action without unnecessary pressure.",
      sectionOutline: [
        {
          section: "Hero",
          purpose: "Frame the product clearly and credibly.",
          contentRole: "Headline, short supporting line, primary CTA.",
          feel: "Confident and focused.",
        },
        {
          section: "Trust",
          purpose: "Make the product feel legitimate quickly.",
          contentRole: "Signals, evidence, or supporting proof.",
          feel: "Grounded and reassuring.",
        },
        {
          section: "Value",
          purpose: "Explain why the product matters.",
          contentRole: "Core value points or experience framing.",
          feel: "Clear and substantive.",
        },
        {
          section: "CTA",
          purpose: "Convert interest into action.",
          contentRole: "Primary ask plus a small trust cue.",
          feel: "Low-friction and assured.",
        },
      ],
      ctaStrategy: [
        `Anchor the page around ${values.primaryPageAction.toLowerCase()}.`,
        "Keep the ask direct and low-drama.",
        "Support the CTA with one trust cue nearby.",
      ],
      antiPatterns: [
        "Do not use vague futuristic language.",
        "Do not flatten the page into equal-weight cards.",
        "Do not make the CTA louder than the product story.",
      ],
    },
    visualPanels: {
      heroPanel:
        "Large editorial headline, compact supporting line, and a restrained primary CTA on a calm, high-contrast surface.",
      sectionRhythmPanel:
        "A measured progression from promise to trust to value to CTA with visible breathing room between moments.",
      styleSystemPanel:
        "Paper-toned base, dark anchor surface, expressive headline type, and a quiet interface rhythm.",
      conversionMomentPanel:
        "A clear CTA framed by reassurance and calm confidence rather than urgency theater.",
    },
  };

  const alternates = [
    {
      name: "Warm Precision",
      oneLineThesis:
        "A more welcoming direction that keeps structure intact while making the product feel more human and approachable.",
      feelLike: ["Warm and approachable", "Trustworthy", "Modern"],
      visualCharacter:
        "Softer pacing, more open spacing, and a lighter emotional temperature without losing clarity.",
      chooseThisIf:
        "Choose this if the product needs to feel friendlier and less severe from the first screen.",
      visualPreview: {
        miniHeroPanel: "A warmer hero with gentler contrast and easier emotional access.",
        miniStyleFeelPanel: "Friendly typography balance, softer surfaces, restrained warmth.",
      },
    },
    {
      name: "Sharp Momentum",
      oneLineThesis:
        "A faster, more assertive direction built to make the product feel vivid and unmistakably contemporary.",
      feelLike: ["Bold and energetic", "Sharp and modern", "Confident"],
      visualCharacter:
        "Higher contrast, tighter pacing, and more visible emphasis around the core value proposition and CTA.",
      chooseThisIf:
        "Choose this if you want stronger momentum and a more immediate conversion posture.",
      visualPreview: {
        miniHeroPanel: "More assertive message framing and a tighter visual cadence.",
        miniStyleFeelPanel: "Sharper hierarchy, brighter emphasis, and a more active CTA posture.",
      },
    },
  ];

  const directionBrief = [
    `Direction: ${recommended.directionIdentity.name}`,
    `Core thesis: ${recommended.directionIdentity.coreThesis}`,
    `Audience fit: ${recommended.brief.whoItShouldResonateWith}`,
    `Feel like: ${recommended.brief.feelLike.join(", ")}`,
    `Should not feel like: ${recommended.brief.notFeelLike.join(", ")}`,
    `Brand tone: ${recommended.brief.brandTone}`,
  ].join("\n\n");

  const handoffPrompt = [
    "Objective:",
    `Create a branded landing page aligned to the "${recommended.directionIdentity.name}" direction and optimized for ${values.primaryPageAction.toLowerCase()}.`,
    "",
    "Direction Summary:",
    recommended.directionIdentity.coreThesis,
    recommended.brief.brandTone,
    recommended.brief.layoutGuidance,
    "",
    "Execution Requirements:",
    ...recommended.brief.sectionOutline.map(
      (item) => `- ${item.section}: ${item.purpose} ${item.contentRole}`,
    ),
    "",
    "Things To Avoid:",
    ...recommended.brief.antiPatterns.map((item) => `- ${item}`),
  ].join("\n");

  return directionResultSchema.parse({
    normalizedInput: {
      productSummary: values.productSummary,
      primaryAudience: values.primaryAudience,
      feelQualities: values.feelQualities,
      primaryPageAction: values.primaryPageAction,
    },
    recommendationRationale: recommended.directionIdentity.recommendedReason,
    recommendedDirection: recommended,
    alternates,
    exports: {
      directionBrief,
      handoffPrompt,
    },
  });
}
