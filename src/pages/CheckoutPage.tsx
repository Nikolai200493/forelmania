import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { OrderFormData, OrderPayload } from "../data/types";

const DELIVERY_TIMES = [
  "09:00 - 12:00",
  "12:00 - 15:00",
  "15:00 - 18:00",
  "18:00 - 21:00",
];

function getTomorrowDate(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState<OrderFormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryDate: getTomorrowDate(),
    deliveryTime: DELIVERY_TIMES[0],
    comment: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate("/catalog");
    }
  }, [items.length, navigate]);

  const formatPrice = (price: number) =>
    price.toLocaleString("ru-RU") + " ₽";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof OrderFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof OrderFormData, string>> = {};

    if (!form.name.trim()) newErrors.name = "Введите ваше имя";
    if (!form.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (!/^[\d\s\+\-\(\)]{7,18}$/.test(form.phone.trim())) {
      newErrors.phone = "Некорректный номер телефона";
    }
    if (!form.address.trim()) newErrors.address = "Введите адрес доставки";
    if (!form.deliveryDate) newErrors.deliveryDate = "Выберите дату доставки";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsSubmitting(true);

    const payload: OrderPayload = {
      customer: {
        ...form,
        email: form.email || undefined,
        comment: form.comment || undefined,
      },
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        weight: item.product.weight,
      })),
      totalPrice,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка сервера");
      }

      clearCart();
      navigate(`/order-success?orderId=${data.orderId}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Произошла ошибка. Попробуйте ещё раз.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="py-4 text-sm text-text-light">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center flex-wrap">
            <li>
              <Link
                to="/"
                className="text-text-light hover:text-secondary transition-colors"
              >
                Главная
              </Link>
            </li>
            <li className="breadcrumb-separator">
              <span className="text-text-main">Оформление заказа</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-6 pb-20">
        <h1 className="text-3xl mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-heading font-bold text-primary mb-4">
                Контактные данные
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                      errors.name
                        ? "border-accent focus:border-accent"
                        : "border-border focus:border-secondary"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-accent mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                      errors.phone
                        ? "border-accent focus:border-accent"
                        : "border-border focus:border-secondary"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-accent mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-sm transition-colors focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                  />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-heading font-bold text-primary mb-4">
                Доставка
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Адрес доставки *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Город, улица, дом, квартира"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                      errors.address
                        ? "border-accent focus:border-accent"
                        : "border-border focus:border-secondary"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-accent mt-1">{errors.address}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Дата доставки *
                    </label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={form.deliveryDate}
                      onChange={handleChange}
                      min={getTomorrowDate()}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
                        errors.deliveryDate
                          ? "border-accent focus:border-accent"
                          : "border-border focus:border-secondary"
                      }`}
                    />
                    {errors.deliveryDate && (
                      <p className="text-xs text-accent mt-1">
                        {errors.deliveryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1">
                      Время доставки
                    </label>
                    <select
                      name="deliveryTime"
                      value={form.deliveryTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-border rounded-lg text-sm bg-white transition-colors focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    >
                      {DELIVERY_TIMES.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">
                    Комментарий к заказу
                  </label>
                  <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Пожелания, код домофона и т.д."
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-sm transition-colors focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-accent/10 border border-accent/30 text-accent rounded-lg p-4 text-sm">
                {submitError}
              </div>
            )}

            {/* Submit — mobile only (desktop has it in sidebar) */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full lg:hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Отправка..." : "Подтвердить заказ"}
            </button>
          </form>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-[96px] lg:self-start">
            <div className="bg-white rounded-xl p-6 shadow-card">
              <h2 className="text-lg font-heading font-bold text-primary mb-4">
                Ваш заказ
              </h2>

              <div className="space-y-3 mb-4 max-h-[320px] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 py-2 border-b border-border last:border-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover bg-bg-light shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-primary leading-tight truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-text-light">
                        {item.product.weight} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-primary whitespace-nowrap">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Итого:</span>
                  <span className="font-heading text-xl font-extrabold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-xs text-text-light mt-1">
                  Доставка бесплатно от 3 000 ₽
                </p>
              </div>

              {/* Submit — desktop */}
              <button
                type="submit"
                form=""
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="hidden lg:flex w-full items-center justify-center gap-2 px-7 py-3.5 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Отправка..." : "Подтвердить заказ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
