import nc from "next-connect";
const { Configuration, OpenAIApi } = require("openai");
// import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

// Configure the OpenAI API with your API Key
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_GPT, // Set your OpenAI API key in environment variables
});
const openai = new OpenAIApi(configuration);

// import { corsMiddleware } from "./validate";

const handler = nc({ attachParams: true });
// handler.use(corsMiddleware);

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("in api");
    // Example usage
    const description =
      "A futuristic cityscape at sunset, with flying cars and neon lights.";

    const response = await openai.createImage({
      model: "image-alpha-001",
      prompt: description,
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = response.data.data[0].url;
    const imageResponse = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });

    fs.writeFileSync(
      "output_image.png",
      Buffer.from(imageResponse.data),
      "binary"
    );
    console.log("Image saved as output_image.png");
  } catch (error) {
    console.error("Error generating image:", error);
  }
});
export default handler;
