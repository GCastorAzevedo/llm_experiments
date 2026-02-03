import type { Request, Response} from "express";
import express from "express";

const app = express();

const port = process.env.PORT || 4000;

app.get("/search", (request: Request, response: Response) => {
    const documents: Array<string> = ["42", "not 42"]
    response.json({ documents })
})

app.post("/search", (request: Request, response: Response) => {
    const documents: Array<string> = ["42", "not 42"]
    response.json({ documents })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
