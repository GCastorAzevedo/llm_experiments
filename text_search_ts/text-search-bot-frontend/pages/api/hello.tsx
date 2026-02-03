import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>,
) {
  if (request.method == "GET") {
    response.status(200).json({ message: "Hello from next.js bot!" });
  } else {
    console.log("nope");
    response.status(400).json({ message: "Nope" });
  }
}
