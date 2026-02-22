import type { VercelRequest, VercelResponse } from "@vercel/node";
import { google } from "googleapis";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
}

interface OrderFormData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  deliveryDate: string;
  deliveryTime: string;
  comment?: string;
}

interface OrderPayload {
  customer: OrderFormData;
  items: OrderItem[];
  totalPrice: number;
}

function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `FM-${date}-${random}`;
}

function formatItemsList(items: OrderItem[]): string {
  return items
    .map(
      (item) =>
        `${item.name} (${item.weight}) × ${item.quantity} = ${(item.price * item.quantity).toLocaleString("ru-RU")} ₽`,
    )
    .join("\n");
}

async function sendTelegramMessage(orderId: string, payload: OrderPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Telegram credentials not configured, skipping notification");
    return;
  }

  const { customer, items, totalPrice } = payload;

  const message = [
    `🐟 *Новый заказ ${orderId}*`,
    ``,
    `👤 *Клиент:* ${customer.name}`,
    `📞 *Телефон:* ${customer.phone}`,
    customer.email ? `📧 *Email:* ${customer.email}` : null,
    `📍 *Адрес:* ${customer.address}`,
    `📅 *Доставка:* ${customer.deliveryDate} ${customer.deliveryTime}`,
    customer.comment ? `💬 *Комментарий:* ${customer.comment}` : null,
    ``,
    `📦 *Товары:*`,
    ...items.map(
      (item) =>
        `• ${item.name} (${item.weight}) × ${item.quantity} — ${(item.price * item.quantity).toLocaleString("ru-RU")} ₽`,
    ),
    ``,
    `💰 *Итого: ${totalPrice.toLocaleString("ru-RU")} ₽*`,
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown",
    }),
  });
}

async function appendToGoogleSheets(
  orderId: string,
  payload: OrderPayload,
) {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!sheetId || !serviceAccountKey) {
    console.warn(
      "Google Sheets credentials not configured, skipping sheet update",
    );
    return;
  }

  const credentials = JSON.parse(serviceAccountKey);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const { customer, items, totalPrice } = payload;
  const now = new Date();
  const dateStr = now.toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const itemsList = items
    .map((item) => `${item.name} (${item.weight}) ×${item.quantity}`)
    .join("; ");

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          orderId,
          dateStr,
          customer.name,
          customer.phone,
          customer.email || "—",
          customer.address,
          itemsList,
          `${totalPrice.toLocaleString("ru-RU")} ₽`,
          "Новый",
        ],
      ],
    },
  });
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
    const payload = req.body as OrderPayload;

    // Validate
    if (
      !payload.customer?.name ||
      !payload.customer?.phone ||
      !payload.customer?.address
    ) {
      return res
        .status(400)
        .json({ error: "Заполните обязательные поля: имя, телефон, адрес" });
    }

    if (!payload.items || payload.items.length === 0) {
      return res.status(400).json({ error: "Корзина пуста" });
    }

    const orderId = generateOrderId();

    // Send to both services in parallel
    const results = await Promise.allSettled([
      sendTelegramMessage(orderId, payload),
      appendToGoogleSheets(orderId, payload),
    ]);

    // Log any failures but don't fail the order
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const service = index === 0 ? "Telegram" : "Google Sheets";
        console.error(`${service} error:`, result.reason);
      }
    });

    return res.status(200).json({ success: true, orderId });
  } catch (error) {
    console.error("Order processing error:", error);
    return res.status(500).json({ error: "Ошибка обработки заказа" });
  }
}
