import type { NextApiRequest, NextApiResponse } from "next";

interface ChatbotData {
  documents: Array<string>;
}

const CHATBOT_API_URL = process.env.CHATBOT_API_URL ?? "http://localhost:4001";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== "POST")
    return response.status(405).json({ error: "Method not allowed" });

  const { query } = request.body as { query?: string };
  if (!query) return response.status(400).json({ error: "Missing query" });

  try {
    const upstream = await fetch(`${CHATBOT_API_URL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    console.log("A", upstream, "A", JSON.stringify({ query }));
    if (!upstream.ok) {
      return response
        .status(502)
        .json({ error: `Upstream error ${upstream.status}` });
    }
    const data: ChatbotData = await upstream.json();
    return response.status(200).json({ answer: data.documents[0] });
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Cannot process answer." });
  }
}
