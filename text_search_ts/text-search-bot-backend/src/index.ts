import express from "express";
import search from "./routes/search.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT || 4000;

app.use("/search", search);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
