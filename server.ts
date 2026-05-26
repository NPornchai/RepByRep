import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazily initialize the Google Gen AI client checking standard safety
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY missing. AI Coach capabilities will fall back to local responses.");
      // We will handle throwing gracefully inside the API handler so app starting isn't blocked.
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "PLACEHOLDER_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route - Get AI recommendations/coaching
  app.post("/api/workout-ai", async (req, res) => {
    try {
      const { prompt, history, mode } = req.body;
      const key = process.env.GEMINI_API_KEY;
      
      if (!key) {
        return res.status(200).json({
          text: `**Coach RepByRep Offline Mode Active** ⚡\n\nIt looks like your \`GEMINI_API_KEY\` is not set yet in **Settings > Secrets**. \n\nHere is a quick guidance: Keep training! Complete your **DAY 1: CHEST & TRICEPS** routines, track every rep, and slide the **Consistency Slider** to watch your muscular progression visually! You can add your API key anytime in the secrets panel to enable real-time coaching AI.`
        });
      }

      const client = getAiClient();
      
      let systemInstruction = "You are active as 'RepByRep AI Head Coach', an elite, encouraging, and science-grounded trainer. Help the user optimize workout targets, answer physiological questions on hypertrophy and stamina, and suggest modifications. ";
      
      if (mode === "adjust-workout") {
        systemInstruction += "The user wants a customized exercise list. Keep your answer highly structured, listing each exercise with 'Workout Sets' (e.g. 3 x 10-12 reps) and target muscle groups in bold Markdown formatting. Ensure it matches the aesthetic of RepByRep.";
      } else {
        systemInstruction += "Keep your answers highly motivational, precise, clean, scientific, and actionable. Avoid unnecessarily long text. Provide structured lists and clear bold titles in Markdown.";
      }

      // Format simple contents structure
      const chatMessages = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          chatMessages.push({
            role: msg.role === "user" ? "user" as const : "model" as const,
            parts: [{ text: msg.content }]
          });
        }
      }

      // Add current active prompt
      chatMessages.push({
        role: "user" as const,
        parts: [{ text: prompt }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatMessages,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({
        text: response.text || "I am processing your reps! Please try asking again."
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Coach received an overload. Please try resting for a set!",
        details: error.message
      });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server linked to Express.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static files in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server launched successfully at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical: Express failure on launch", err);
});
