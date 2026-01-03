
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { RecruitmentOutput } from "../types.ts";

const MODEL_NAME = 'gemini-3-pro-preview';
const THINKING_BUDGET = 32768;

export const generateRecruitmentMaterials = async (
  notes: string,
  useThinking: boolean = true
): Promise<RecruitmentOutput> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: `Transform these raw recruitment notes into a polished LinkedIn-style Job Description and a 10-question Interview Guide.
    
    Notes:
    ${notes}
    `,
    config: {
      thinkingConfig: useThinking ? { thinkingBudget: THINKING_BUDGET } : undefined,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobDescription: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
              requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
              cultureAndBenefits: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["title", "summary", "responsibilities", "requirements", "cultureAndBenefits"]
          },
          interviewGuide: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                targetSkill: { type: Type.STRING },
                rationale: { type: Type.STRING },
              },
              required: ["question", "targetSkill", "rationale"]
            }
          }
        },
        required: ["jobDescription", "interviewGuide"]
      },
    },
  });

  if (!response.text) {
    throw new Error("Empty response from AI");
  }

  return JSON.parse(response.text.trim());
};

export const chatWithGemini = async (
  message: string,
  history: { role: 'user' | 'model', text: string }[],
  useThinking: boolean = true
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));
  contents.push({ role: 'user', parts: [{ text: message }] });

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: contents,
    config: {
      thinkingConfig: useThinking ? { thinkingBudget: THINKING_BUDGET } : undefined,
    }
  });

  return response.text || "I'm sorry, I couldn't generate a response.";
};
