import type { VercelRequest, VercelResponse } from "@vercel/node";

interface ContactPayload {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

async function sendTelegramMessage(payload: ContactPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram credentials not configured, skipping notification");
    return;
  }

  const { name, phone, email, message } = payload;

  const text = [
    `📩 *Новое обращение с сайта*`,
    ``,
    `👤 *Имя:* ${name}`,
    `📞 *Телефон:* ${phone}`,
    email ? `📧 *Email:* ${email}` : null,
    ``,
    `💬 *Сообщение:*`,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Telegram API error: ${error}`);
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = req.body as ContactPayload;

    if (!payload.name?.trim()) {
      return res.status(400).json({ error: "Введите ваше имя" });
    }
    if (!payload.phone?.trim()) {
      return res.status(400).json({ error: "Введите номер телефона" });
    }
    if (!payload.message?.trim()) {
      return res.status(400).json({ error: "Введите сообщение" });
    }

    await sendTelegramMessage(payload);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ error: "Ошибка отправки сообщения" });
  }
}
