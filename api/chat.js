import { Buffer } from "node:buffer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY not set" });
  }

  try {
    // Parse body — works whether Vercel auto-parsed it or left it as a stream
    let body = req.body;
    if (!body || typeof body !== "object") {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      }
      body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    }

    // Anthropic requires conversations to start with a user message
    let messages = Array.isArray(body.messages) ? [...body.messages] : [];
    const firstUser = messages.findIndex((m) => m.role === "user");
    if (firstUser > 0) messages = messages.slice(firstUser);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ ...body, messages }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy error", detail: String(err) });
  }
}
