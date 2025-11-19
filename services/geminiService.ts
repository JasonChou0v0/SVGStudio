import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArtisticSvg = async (text: string, styleDescription: string): Promise<string> => {
  try {
    const prompt = `
      Create a single, self-contained valid SVG file for the text "${text}".
      Style description: ${styleDescription}.
      
      Requirements:
      1. The SVG must use a 'viewBox' attribute.
      2. It should be visually appealing and high quality.
      3. Return ONLY the raw SVG code. Do not include markdown backticks (like \`\`\`svg), do not include JSON, just the raw <svg>...</svg> string.
      4. Ensure the text is readable.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const rawText = response.text || '';
    // Clean up any potential markdown artifacts if the model ignores instructions
    return rawText.replace(/```svg/g, '').replace(/```/g, '').trim();
  } catch (error) {
    console.error("Error generating SVG with Gemini:", error);
    throw error;
  }
};