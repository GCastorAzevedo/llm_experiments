import type { Request, Response } from "express";
import express from "express";
import { ChromaClient } from "chromadb";

const router = express.Router();

router.get("/", (request: Request, response: Response) => {
  const documents: Array<string> = ["42", "not 42"];
  response.json({ documents });
});

router.post("/", async (request: Request, response: Response) => {
  const client = new ChromaClient();
  const collection = await client.getCollection({ name: "test-collection" });
  const results = await collection.query({
    queryTexts: [request.body.query],
    nResults: 5,
    include: ["documents"],
  });
  const documents: Array<string> = results.documents[0];
  response.json({ documents });
});

export default router;
