import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are MediBot, a helpful assistant for MediStore — a trusted online OTC (over-the-counter) medicine shop in Bangladesh.

Your job:
- Help users find medicines by category (pain relief, vitamins, antibiotics, antacids, skincare, etc.)
- Explain what medicines are commonly used for in simple language
- Guide users through the store: browsing categories, adding to cart, placing orders, tracking orders
- Answer questions about the store: shipping, delivery, seller registration, account issues
- Suggest related medicines or categories when relevant

Rules:
- Keep answers short and clear (2–4 sentences max)
- Always be friendly and professional
- If asked about prescription medicines or serious medical conditions, say: "Please consult a licensed pharmacist or doctor."
- If unsure, say: "I'm not sure about that — please contact our support team."
- Never recommend specific dosages for prescription drugs`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const response = await fetch("https://hermes.ai.unturf.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer dummy-api-key",
      },
      body: JSON.stringify({
        model: "adamo1139/Hermes-3-Llama-3.1-8B-FP8-Dynamic",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10),
        ],
        temperature: 0.5,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't process that. Please try again.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
