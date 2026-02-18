import { Link } from 'react-router-dom';
import clsx from 'clsx';
import type { Product } from '../data/types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const badgeLabels: Record<string, string> = {
  new: 'Новинка',
  sale: 'Скидка',
  hit: 'Хит',
};

const badgeStyles: Record<string, string> = {
  new: 'bg-success text-white',
  sale: 'bg-accent text-white',
  hit: 'bg-gold text-primary',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const formatPrice = (price: number) =>
    price.toLocaleString('ru-RU') + ' ₽';

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
      <Link to={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-bg-light">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.badge && (
          <span className={clsx(
            'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide',
            badgeStyles[product.badge]
          )}>
            {badgeLabels[product.badge]}
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link
          to={`/product/${product.slug}`}
          className="block font-heading text-[0.9375rem] font-semibold text-primary mb-1 leading-tight hover:text-secondary transition-colors duration-300"
        >
          {product.name}
        </Link>
        <p className="text-[0.8125rem] text-text-light mb-3">{product.weight}</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-lg font-bold text-primary">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-text-light line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 px-4 py-2 font-heading text-[0.8125rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addItem(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'В корзину' : 'Нет в наличии'}
          </button>
        </div>
      </div>
    </div>
  );
}
