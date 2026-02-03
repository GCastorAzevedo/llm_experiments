import { ChromaClient } from "chromadb";

const client = new ChromaClient();

const collection = await client.getOrCreateCollection({
  name: "test-collection",
});

await collection.upsert({
  documents: [
    "42",
    "not 42",
    "Law 1.1",
    "Law 1.2",
    "This is a document about pineapple",
    "This is a document about oranges",
  ],
  ids: ["1", "2", "3", "4", "5", "6"],
});

const results = await collection.query({
  queryTexts: ["Query document about the law"],
  nResults: 2,
});

console.log(results);
