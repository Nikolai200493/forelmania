import { useParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

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

const formatPrice = (price: number) =>
  price.toLocaleString('ru-RU') + ' ₽';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <main className="w-full max-w-[1280px] mx-auto px-6">
        <div className="text-center py-20">
          <h1 className="mb-3">Товар не найден</h1>
          <p className="mb-6 text-text-light">К сожалению, запрашиваемый товар не существует.</p>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300"
          >
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <main>
      {/* Breadcrumbs */}
      <nav className="py-4 text-sm text-text-light">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center flex-wrap">
            <li>
              <Link to="/" className="text-text-light hover:text-secondary transition-colors">
                Главная
              </Link>
            </li>
            <li className="breadcrumb-separator">
              <Link to="/catalog" className="text-text-light hover:text-secondary transition-colors">
                Каталог
              </Link>
            </li>
            {category && (
              <li className="breadcrumb-separator">
                <Link
                  to={`/catalog/${category.slug}`}
                  className="text-text-light hover:text-secondary transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            )}
            <li className="breadcrumb-separator">
              <span className="text-text-main">{product.name}</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Product Layout */}
      <section className="py-10">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-md:gap-6 items-start">
            {/* Left: Gallery */}
            <div>
              <div className="rounded-xl overflow-hidden bg-bg-light">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            {/* Right: Info */}
            <div className="pt-2">
              {product.badge && (
                <span className={clsx(
                  'inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4',
                  badgeStyles[product.badge]
                )}>
                  {badgeLabels[product.badge]}
                </span>
              )}

              <h1 className="text-3xl max-md:text-2xl mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-heading text-[1.75rem] font-extrabold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-text-light line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <div className="text-[0.9375rem] text-text-light mb-4">
                Вес: {product.weight}
              </div>

              <p className="text-[0.9375rem] leading-relaxed mb-6">
                {product.shortDescription}
              </p>

              <button
                className="inline-flex items-center justify-center gap-2 px-9 py-4 font-heading text-base font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 cursor-pointer mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => addItem(product)}
                disabled={!product.inStock}
              >
                В корзину
              </button>

              <div className="mt-2">
                {product.inStock ? (
                  <span className="text-sm font-semibold text-success inline-flex items-center gap-1.5 availability-dot availability-dot-green">
                    В наличии
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 availability-dot availability-dot-red">
                    Нет в наличии
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Description */}
      <section className="py-10 border-t border-border">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Описание</h2>
          <p className="max-w-[700px] text-base leading-loose">{product.description}</p>
        </div>
      </section>

      {/* Nutrition Info */}
      {product.nutritionPer100g && (
        <section className="py-10 border-t border-border">
          <div className="w-full max-w-[1280px] mx-auto px-6">
            <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Пищевая ценность на 100 г</h2>
            <table className="nutrition-table">
              <thead>
                <tr>
                  <th>Показатель</th>
                  <th>Значение</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Калорийность</td>
                  <td>{product.nutritionPer100g.calories} ккал</td>
                </tr>
                <tr>
                  <td>Белки</td>
                  <td>{product.nutritionPer100g.protein} г</td>
                </tr>
                <tr>
                  <td>Жиры</td>
                  <td>{product.nutritionPer100g.fat} г</td>
                </tr>
                <tr>
                  <td>Углеводы</td>
                  <td>{product.nutritionPer100g.carbs} г</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-bg-light">
          <div className="w-full max-w-[1280px] mx-auto px-6">
            <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
