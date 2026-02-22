import { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import clsx from 'clsx';
import { categories } from '../data/categories';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

type SortOption = 'popular' | 'price-asc' | 'price-desc';

const sortLabels: Record<SortOption, string> = {
  popular: 'по популярности',
  'price-asc': 'по цене ↑',
  'price-desc': 'по цене ↓',
};

export default function CatalogPage() {
  const { categorySlug, subcategorySlug } = useParams<{ categorySlug: string; subcategorySlug: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === categorySlug) ?? null,
    [categorySlug],
  );

  const activeSubcategory = useMemo(
    () =>
      activeCategory?.subcategories?.find((s) => s.slug === subcategorySlug) ?? null,
    [activeCategory, subcategorySlug],
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory) {
      result = result.filter((p) => p.categoryId === activeCategory.id);
    }

    if (activeSubcategory) {
      result = result.filter((p) => p.subcategoryId === activeSubcategory.id);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        result.sort((a, b) => {
          const badgePriority: Record<string, number> = { hit: 0, new: 1, sale: 2 };
          const pa = a.badge ? (badgePriority[a.badge] ?? 3) : 3;
          const pb = b.badge ? (badgePriority[b.badge] ?? 3) : 3;
          return pa - pb;
        });
        break;
    }

    return result;
  }, [activeCategory, activeSubcategory, searchQuery, sortBy]);

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="py-4 text-sm text-text-light">
        <div className="w-full max-w-[1280px] mx-auto px-6">
          <ul className="flex items-center flex-wrap">
            <li>
              <Link to="/" className="text-text-light hover:text-secondary transition-colors">
                Главная
              </Link>
            </li>
            <li className="breadcrumb-separator">
              {activeCategory ? (
                <Link to="/catalog" className="text-text-light hover:text-secondary transition-colors">
                  Каталог
                </Link>
              ) : (
                <span className="text-text-main">Каталог</span>
              )}
            </li>
            {activeCategory && (
              <li className="breadcrumb-separator">
                {activeSubcategory ? (
                  <Link to={`/catalog/${activeCategory.slug}`} className="text-text-light hover:text-secondary transition-colors">
                    {activeCategory.name}
                  </Link>
                ) : (
                  <span className="text-text-main">{activeCategory.name}</span>
                )}
              </li>
            )}
            {activeSubcategory && (
              <li className="breadcrumb-separator">
                <span className="text-text-main">{activeSubcategory.name}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full max-w-[1280px] mx-auto px-6">
        <h1 className="text-3xl mb-8">
          {activeSubcategory ? activeSubcategory.name : activeCategory ? activeCategory.name : 'Каталог'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 pb-20">
          {/* Sidebar */}
          <aside>
            <nav className="sticky top-[96px] max-md:static max-md:flex max-md:flex-wrap max-md:gap-2 max-md:mb-6">
              <Link
                to="/catalog"
                className={clsx(
                  'block px-4 py-2.5 text-[0.9375rem] rounded-lg font-medium transition-all duration-300 max-md:px-3 max-md:py-2 max-md:text-[0.8125rem] max-md:inline-block',
                  !activeCategory
                    ? 'text-secondary bg-bg-light font-bold'
                    : 'text-text-main hover:text-secondary hover:bg-bg-light'
                )}
              >
                Все товары
              </Link>

              {categories.map((category) => (
                <div key={category.id} className="max-md:inline-block">
                  <Link
                    to={`/catalog/${category.slug}`}
                    className={clsx(
                      'block px-4 py-2.5 text-[0.9375rem] rounded-lg font-medium transition-all duration-300 max-md:px-3 max-md:py-2 max-md:text-[0.8125rem]',
                      activeCategory?.id === category.id
                        ? 'text-secondary bg-bg-light font-bold'
                        : 'text-text-main hover:text-secondary hover:bg-bg-light'
                    )}
                  >
                    {category.name}
                  </Link>

                  {activeCategory?.id === category.id &&
                    category.subcategories &&
                    category.subcategories.length > 0 && (
                      <ul className="pl-4 mb-1 max-md:hidden">
                        {category.subcategories.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              to={`/catalog/${category.slug}/${sub.slug}`}
                              className={clsx(
                                'block px-4 py-1.5 text-sm rounded-lg transition-colors',
                                activeSubcategory?.id === sub.id
                                  ? 'text-secondary font-semibold'
                                  : 'text-text-light hover:text-secondary'
                              )}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div>
            {searchQuery && (
              <p className="mb-5 text-[0.9375rem]">
                Результаты поиска по запросу: <strong>&laquo;{searchQuery}&raquo;</strong>
              </p>
            )}

            <div className="flex justify-end mb-6">
              <label className="flex items-center gap-2 text-sm">
                <span className="text-text-light">Сортировка:</span>
                <select
                  className="px-3 py-2 border border-border rounded-lg text-sm text-text-main bg-white cursor-pointer focus:border-secondary focus:outline-none transition-colors"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <option key={key} value={key}>
                      {sortLabels[key]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-md:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-text-light">
                <p className="text-xl mb-5">Товары не найдены</p>
                <Link
                  to="/catalog"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Смотреть все товары
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
