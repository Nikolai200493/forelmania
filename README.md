# Forelmania — Интернет-магазин свежих морепродуктов

## Стек технологий

| Категория | Технология |
|-----------|-----------|
| Frontend | React 19 + TypeScript 5.9 |
| Сборка | Vite 7.3 |
| Стили | Tailwind CSS v4 (CSS-first, `@tailwindcss/vite` плагин) |
| Анимации | `motion/react` (пакет `motion`) + `framer-motion` |
| Роутинг | React Router DOM v7 |
| Backend | Vercel Serverless Functions (`api/`) |
| БД заказов | Google Sheets (googleapis) |
| Уведомления | Telegram Bot API |
| Хостинг | Vercel (авто-деплой из GitHub при `git push`) |

## Структура проекта

```
forelmania/
├── api/                          # Vercel Serverless Functions
│   ├── order.ts                  # POST /api/order — оформление заказа
│   ├── contact.ts                # POST /api/contact — форма обратной связи
│   └── tsconfig.json             # Отдельный TS-конфиг для api (types: ["node"])
├── public/images/                # Статические изображения
│   ├── logo.jpg                  # Логотип (круглый, рыба + корона)
│   ├── categories/               # Фото категорий
│   ├── products/                 # Фото товаров
│   └── articles/                 # Фото для статей
├── src/
│   ├── App.tsx                   # Роуты + провайдеры (Toast > Cart)
│   ├── main.tsx                  # Точка входа
│   ├── index.css                 # Tailwind @theme, глобальные стили
│   ├── components/
│   │   ├── Header.tsx            # Шапка: навигация, мега-меню, поиск, корзина
│   │   ├── Footer.tsx            # Подвал: контакты, ссылки, соцсети
│   │   ├── Logo.tsx              # Логотип (header/footer варианты)
│   │   ├── CartDrawer.tsx        # Боковая корзина (drawer)
│   │   ├── ProductCard.tsx       # Карточка товара
│   │   ├── ScrollToTop.tsx       # Скролл наверх при смене роута
│   │   └── ui/
│   │       ├── hero-marquee.tsx  # Hero-секция: параллакс (desktop) / сетка (mobile)
│   │       ├── parallax-floating.tsx # Параллакс-эффект по движению мыши
│   │       ├── Toast.tsx         # Toast-уведомления (success/error/info)
│   │       └── button.tsx        # Кнопка (shadcn-стиль, CVA)
│   ├── context/
│   │   ├── CartContext.tsx        # Корзина: items, addItem, removeItem, totals
│   │   └── ToastContext.tsx       # Тосты: addToast, removeToast, auto-dismiss 5s
│   ├── data/
│   │   ├── types.ts              # Все TypeScript-интерфейсы
│   │   ├── config.ts             # Конфиг сайта (телефон, email, адрес, соцсети)
│   │   ├── categories.ts         # 6 категорий с подкатегориями
│   │   ├── products.ts           # 20+ товаров
│   │   ├── articles.ts           # Статьи блога
│   │   └── reviews.ts            # Отзывы клиентов
│   ├── hooks/
│   │   └── use-mouse-position-ref.ts # Хук для отслеживания мыши (параллакс)
│   ├── lib/
│   │   └── utils.ts              # cn() — clsx + tailwind-merge
│   └── pages/
│       ├── HomePage.tsx           # Главная: Hero, категории, хиты, отзывы
│       ├── CatalogPage.tsx        # Каталог: фильтрация по категории/подкатегории
│       ├── ProductPage.tsx        # Карточка товара: описание, КБЖУ, кнопка
│       ├── CheckoutPage.tsx       # Оформление: форма + сайдбар с товарами
│       ├── OrderSuccessPage.tsx   # Успех заказа: номер, кнопки навигации
│       ├── DeliveryPage.tsx       # Доставка и оплата
│       ├── ContactsPage.tsx       # Контакты: инфо-карточки + форма обратной связи
│       ├── ArticlesPage.tsx       # Список статей
│       └── ArticlePage.tsx        # Отдельная статья
├── vercel.json                   # Rewrites: /api/* и SPA fallback
├── tsconfig.json                 # TS-конфиг фронтенда (path alias @/ -> src/)
├── vite.config.ts                # Vite + React + Tailwind + alias @
└── package.json
```

## Роуты

| Путь | Страница | Описание |
|------|----------|----------|
| `/` | HomePage | Главная |
| `/catalog` | CatalogPage | Каталог всех товаров |
| `/catalog/:categorySlug` | CatalogPage | Товары по категории |
| `/catalog/:categorySlug/:subcategorySlug` | CatalogPage | Товары по подкатегории |
| `/product/:slug` | ProductPage | Карточка товара |
| `/checkout` | CheckoutPage | Оформление заказа |
| `/order-success` | OrderSuccessPage | Заказ оформлен |
| `/delivery` | DeliveryPage | Доставка и оплата |
| `/contacts` | ContactsPage | Контакты + форма |
| `/articles` | ArticlesPage | Список статей |
| `/articles/:slug` | ArticlePage | Статья |

## API-эндпоинты (Vercel Serverless)

### POST `/api/order`
Оформление заказа. Принимает `OrderPayload`, генерирует ID формата `FM-YYMMDD-XXXX`. Параллельно:
- Отправляет сообщение в Telegram (с разбивкой по товарам + ссылка на таблицу)
- Записывает строку в Google Sheets (динамически определяет имя первого листа)

### POST `/api/contact`
Форма обратной связи. Принимает `{ name, phone, email?, message }`. Отправляет в Telegram.

## Переменные окружения

Хранятся в `.env` локально и в **Vercel Dashboard > Settings > Environment Variables** на продакшене.

| Переменная | Описание |
|-----------|----------|
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота |
| `TELEGRAM_CHAT_ID` | Chat ID для получения уведомлений |
| `GOOGLE_SHEETS_ID` | ID Google-таблицы для заказов |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | JSON сервисного аккаунта Google (одной строкой) |

**Google Sheets:** таблица расшарена на `forelmania-orders@forelmania.iam.gserviceaccount.com` (Редактор).
Заголовки: ID заказа | Дата | Имя | Телефон | Email | Адрес | Товары | Сумма | Статус

## Дизайн-система (Tailwind CSS v4)

Тема задаётся в `src/index.css` через блок `@theme`.

**Цвета:**
- `primary` — `#0B3D5C` (тёмно-синий)
- `secondary` — `#1A7A7A` (бирюзовый)
- `accent` — `#E85D3A` (коралловый) — CTA-кнопки
- `bg-light` — `#F5F7FA`
- `success` — `#48BB78`

**Шрифты:**
- `font-heading` — Montserrat
- `font-body` — Open Sans

**Path alias:** `@/` -> `src/` (в tsconfig.json и vite.config.ts)

## Ключевые типы данных (src/data/types.ts)

```typescript
Product { id, name, slug, categoryId, subcategoryId?, price, oldPrice?, weight, image, images?, description, shortDescription, inStock, badge?, nutritionPer100g? }
Category { id, name, slug, image, description, subcategories?: Subcategory[] }
Subcategory { id, name, slug }
CartItem { product: Product, quantity: number }
OrderPayload { customer: OrderFormData, items: OrderItem[], totalPrice: number }
OrderFormData { name, phone, email?, address, deliveryDate, deliveryTime, comment? }
SiteConfig { name, phone, email, address, workingHours, social }
Article { id, title, slug, excerpt, content, image, date, author }
Review { id, author, text, rating, date }
```

## Контексты React

### CartContext
`items`, `isOpen`, `openCart()`, `closeCart()`, `addItem(product)`, `removeItem(id)`, `updateQuantity(id, qty)`, `clearCart()`, `totalItems`, `totalPrice`

### ToastContext
`toasts`, `addToast(type, message)`, `removeToast(id)` — авто-удаление через 5 секунд. Типы: `success`, `error`, `info`.

## Компоненты-особенности

- **Hero (hero-marquee.tsx):** Desktop — 10 плавающих параллакс-картинок (Unsplash, морепродукты) с `useMousePositionRef`. Mobile — сетка 2x3 из 6 картинок + полупрозрачный белый оверлей.
- **Logo (Logo.tsx):** Использует `/images/logo.jpg`. Два варианта: `header` (тёмный) и `footer` (белый текст). При наведении — scale-эффект.
- **CartDrawer:** Slide-in справа, оверлей, ссылка на `/checkout`.
- **Header:** Sticky, мега-меню при наведении на "Ассортимент", поиск-оверлей, мобильное меню slide-in.

## Категории товаров

| Категория | Slug | Подкатегории |
|-----------|------|-------------|
| Рыба | `ryba` | лосось, форель, треска, сибас, дорадо |
| Креветки | `krevetki` | королевские, тигровые, очищенные |
| Крабы | `kraby` | камчатский, крабовое мясо |
| Икра | `ikra` | красная, чёрная |
| Моллюски | `mollyuski` | мидии, устрицы, кальмары, осьминоги |
| Наборы | `nabory` | семейные, для гриля, подарочные |

## Команды

```bash
npm run dev       # Запуск dev-сервера (http://localhost:5173)
npm run build     # Сборка: tsc -b && vite build -> dist/
npm run preview   # Превью production-сборки
npx vercel --prod --yes  # Ручной деплой на Vercel
git push          # Авто-деплой на Vercel через GitHub
```

## Конфигурация сайта (src/data/config.ts)

Для изменения контактов, телефона, email, адреса — редактировать `siteConfig` в `src/data/config.ts`. Значения используются в Header, Footer, ContactsPage.

## Деплой

Проект задеплоен на **Vercel** с привязкой к GitHub-репозиторию. Каждый `git push` в `main` автоматически запускает деплой. Framework Preset: **Vite**, Root Directory: корень проекта, Output: `dist/`.
