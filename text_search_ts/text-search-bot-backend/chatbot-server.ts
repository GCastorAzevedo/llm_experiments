// server.ts
import express, { Request, Response } from "express";
import { ChromaClient } from "chromadb";

const PORT = Number(process.env.PORT ?? 4000);
const CHROMA_URL = process.env.CHROMA_URL ?? "http://localhost:8000";
const CHROMA_COLLECTION = process.env.CHROMA_COLLECTION ?? "my_collection";

const app = express();
app.use(express.json());

const chroma = new ChromaClient({ path: CHROMA_URL });
const collectionPromise = chroma.getOrCreateCollection({ name: CHROMA_COLLECTION });

app.get("/query", async (req: Request, res: Response) => {
  const qParam = req.query.q;
  const kParam = req.query.k;
  const query = Array.isArray(qParam) ? qParam[0] : qParam;
  const k = Number(kParam ?? 4) || 4;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const collection = await collectionPromise;
    const result = await collection.query({ queryTexts: [query], nResults: k });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Chroma query failed" });
  }
});

app.post("/query", async (req: Request, res: Response) => {
  const { query, k = 4 } = req.body as { query?: string; k?: number };
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const collection = await collectionPromise;
    const result = await collection.query({
      queryTexts: [query],
      nResults: Number(k) || 4,
    });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Chroma query failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Chroma proxy listening on http://localhost:${PORT}`);
});