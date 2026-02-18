import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { reviews } from '../data/reviews';
import ProductCard from '../components/ProductCard';

const popularProducts = products.filter((p) => p.badge === 'hit').slice(0, 4);

const steps = [
  {
    number: 1,
    title: 'Выбираете товары',
    description: 'Добавьте любимые морепродукты в корзину',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    number: 2,
    title: 'Оформляете заказ',
    description: 'Укажите адрес и удобное время доставки',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 12h6" />
        <path d="M9 16h6" />
      </svg>
    ),
  },
  {
    number: 3,
    title: 'Доставляем свежими',
    description: 'Привозим в термобоксах с хладоэлементами',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    number: 4,
    title: 'Наслаждаетесь вкусом',
    description: 'Готовьте шедевры из свежайших продуктов',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Hero Banner */}
      <section
        className="min-h-[550px] max-md:min-h-[400px] max-xs:min-h-[350px] flex items-center bg-cover bg-center text-white py-20 max-md:py-16"
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(11,61,92,0.85) 0%, rgba(26,122,122,0.7) 100%), url(/images/hero-bg.svg)',
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h1 className="text-5xl max-md:text-[2rem] max-xs:text-2xl text-white mb-4 max-w-[600px] leading-tight">
            Свежие морепродукты с доставкой на дом
          </h1>
          <p className="text-lg opacity-90 max-w-[500px] mb-8 leading-relaxed">
            Лосось, креветки, крабы, икра и другие деликатесы. Доставляем в термобоксах для сохранения свежести.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 font-heading text-base font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300"
          >
            Смотреть каталог
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Наш ассортимент</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-md:gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/catalog/${category.slug}`}
                className="relative block rounded-xl overflow-hidden aspect-[4/3] bg-cover bg-center hover:scale-[1.02] transition-transform duration-300 group"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-primary/20 group-hover:from-primary/95 group-hover:to-primary/30 flex items-end p-6 transition-all duration-300">
                  <span className="font-heading text-xl font-bold text-white">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-bg-light">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Популярные товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Все товары
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-md:gap-6">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-white font-heading font-bold text-sm mb-4">
                  {step.number}
                </span>
                <div className="text-secondary mb-3 flex justify-center">{step.icon}</div>
                <h3 className="text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-bg-warm">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Отзывы наших покупателей</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-7 shadow-card hover:shadow-card-hover transition-shadow duration-300">
                <p className="italic text-[0.9375rem] leading-relaxed mb-4">{review.text}</p>
                <div className="flex gap-0.5 text-gold mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} filled={i < review.rating} />
                  ))}
                </div>
                <div className="font-heading font-semibold text-primary">{review.author}</div>
                <div className="text-[0.8125rem] text-text-light">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-center">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <h2 className="text-white text-3xl max-md:text-2xl mb-7">
            Попробуйте лучшие морепродукты уже сегодня!
          </h2>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 px-9 py-4 font-heading text-base font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300"
          >
            Перейти в каталог
          </Link>
        </div>
      </section>
    </main>
  );
}
