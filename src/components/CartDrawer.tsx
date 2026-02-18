import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) =>
    price.toLocaleString('ru-RU') + ' ₽';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1500] animate-fade-in"
          onClick={closeCart}
        />
      )}
      <div
        className={clsx(
          'fixed top-0 right-0 bottom-0 w-[420px] max-w-[90vw] bg-white z-[1600] flex flex-col shadow-[-4px_0_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h3 className="text-xl">Корзина</h3>
          <button
            className="w-8 h-8 flex items-center justify-center text-text-light hover:text-primary transition-colors"
            onClick={closeCart}
            aria-label="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center gap-4 text-text-light">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="text-lg">Корзина пуста</p>
            <button
              className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 cursor-pointer"
              onClick={closeCart}
            >
              Перейти к покупкам
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div className="group/item flex gap-3 py-3 border-b border-border relative" key={item.product.id}>
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-[72px] h-[72px] rounded-lg overflow-hidden shrink-0 bg-bg-light"
                    onClick={closeCart}
                  >
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="block text-sm font-semibold text-primary mb-0.5 leading-tight hover:text-secondary transition-colors"
                      onClick={closeCart}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-text-light mb-2">{item.product.weight}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-border rounded-lg">
                        <button
                          className="w-7 h-7 flex items-center justify-center text-base text-text-main hover:text-secondary transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Уменьшить"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold min-w-[20px] text-center">{item.quantity}</span>
                        <button
                          className="w-7 h-7 flex items-center justify-center text-base text-text-main hover:text-secondary transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Увеличить"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-[0.9375rem] text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    className="absolute top-3 right-0 w-6 h-6 flex items-center justify-center text-text-light opacity-0 group-hover/item:opacity-100 hover:text-accent transition-all"
                    onClick={() => removeItem(item.product.id)}
                    aria-label="Удалить"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="px-6 py-5 border-t border-border flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Итого:</span>
                <span className="font-heading text-xl font-extrabold text-primary">{formatPrice(totalPrice)}</span>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 cursor-pointer">
                Оформить заказ
              </button>
              <button
                className="w-full inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
                onClick={closeCart}
              >
                Продолжить покупки
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
