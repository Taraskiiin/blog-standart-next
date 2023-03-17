import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { topic, keywords } = req.body;
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(config);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    max_tokens: 3600,
    prompt: `Write a long and detailed SEO-Friendly blog about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    the content should be formatted in SEO-friendly HTML. The response must also include appropriate HTML title and meta description content.
    the returned format must be stringified JSON in the following format: 
    {
      "postContent": "post content here",
      "title": "title goes here",
      "metaDescription": "meta description goes here"
    }`,
  });

  res.status(200).json({
    post: response.data.choices[0]?.text,
  });
}
