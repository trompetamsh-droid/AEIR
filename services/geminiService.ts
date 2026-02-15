import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const getAiClient = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const initializeChat = () => {
  const ai = getAiClient();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `
        You are "AEIR Bot", an AI assistant for a professional drone cinematography website called AEIR. 
        Your goal is to help potential clients (real estate agents, film directors, event planners) understand drone services.
        
        Key Info about AEIR:
        - Specializes in: FPV shots, Real Estate, Cinematic storytelling, Inspections.
        - Location: Greece (Athens based, travels nationwide).
        - Equipment: Latest DJI Mavic 3 Pro, Inspire 3, and custom FPV drones.
        - Regulations: Fully licensed EASA Open & Specific category pilot.
        
        Tone: Professional, artistic, helpful, and concise. Speak Greek by default unless addressed in English.
        If asked about specific prices, give ranges but insist they contact us via the form for a quote.
        Example range: Real estate simple video approx 200€-400€, Full wedding coverage 500€+.
      `,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    return "Η υπηρεσία AI δεν είναι διαθέσιμη αυτή τη στιγμή. Παρακαλώ ελέγξτε το κλειδί API.";
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "Δεν μπόρεσα να δημιουργήσω απάντηση.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Παρουσιάστηκε σφάλμα κατά την επικοινωνία. Παρακαλώ προσπαθήστε ξανά.";
  }
};