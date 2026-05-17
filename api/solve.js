/* global process */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required",
      });
    }

    // Gemini API call
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    const text = response.candidates[0].content.parts[0].text;

    return res.status(200).json({
      answer: text,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
}
