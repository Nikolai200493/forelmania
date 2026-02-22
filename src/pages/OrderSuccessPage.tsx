import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main>
      <div className="w-full max-w-[1280px] mx-auto px-6 py-20">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-success"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1 className="text-3xl font-heading font-bold text-primary mb-4">
            Спасибо за заказ!
          </h1>

          {orderId && (
            <p className="text-lg text-text-main mb-2">
              Номер вашего заказа:{" "}
              <span className="font-bold text-secondary">{orderId}</span>
            </p>
          )}

          <p className="text-text-light mb-8 leading-relaxed">
            Мы уже начали обработку вашего заказа. В ближайшее время с вами
            свяжется наш менеджер для подтверждения деталей доставки.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300"
            >
              На главную
            </Link>
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
