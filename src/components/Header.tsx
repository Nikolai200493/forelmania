import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { categories } from '../data/categories';
import { siteConfig } from '../data/config';
import { useCart } from '../context/CartContext';
import Logo from './Logo';

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/catalog?search=${encodeURIComponent(trimmed)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ===== TOP BAR ===== */}
      <div className="bg-primary text-white text-[0.8125rem] py-1.5">
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between max-md:flex-col max-md:gap-0.5">
          <span className="opacity-90">
            Бесплатная доставка от 3000 ₽
          </span>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="text-white font-semibold hover:opacity-80 transition-opacity duration-300"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <header
        className={clsx(
          'bg-white border-b border-border sticky top-0 z-[1000] transition-shadow duration-300',
          isSticky && 'shadow-header'
        )}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Logo variant="header" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Основная навигация">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                className="inline-flex items-center gap-1 px-4 py-2 text-[0.9375rem] font-medium text-text-main rounded-lg hover:text-secondary hover:bg-bg-light transition-all duration-300 whitespace-nowrap cursor-pointer"
                aria-expanded={isMegaMenuOpen}
                aria-haspopup="true"
                type="button"
              >
                Ассортимент
                <svg
                  className={clsx('transition-transform duration-300', isMegaMenuOpen && 'rotate-180')}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 min-w-[600px] bg-white rounded-xl shadow-card-hover border border-border p-6 z-[100] animate-fade-in" role="menu">
                  <div className="grid grid-cols-3 gap-5">
                    {categories.map((category) => (
                      <div key={category.id} role="none">
                        <Link
                          to={`/catalog/${category.slug}`}
                          className="block font-heading text-[0.9375rem] font-bold text-primary mb-2 hover:text-secondary transition-colors duration-300"
                          role="menuitem"
                          onClick={() => setIsMegaMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                        {category.subcategories && category.subcategories.length > 0 && (
                          <ul className="flex flex-col gap-1">
                            {category.subcategories.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  to={`/catalog/${category.slug}/${sub.slug}`}
                                  className="text-sm text-text-light py-0.5 hover:text-secondary transition-colors duration-300"
                                  role="menuitem"
                                  onClick={() => setIsMegaMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Link
                      to="/catalog"
                      className="text-[0.9375rem] font-semibold text-secondary hover:text-accent transition-colors duration-300"
                      onClick={() => setIsMegaMenuOpen(false)}
                    >
                      Смотреть весь каталог
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/delivery" className="inline-flex items-center gap-1 px-4 py-2 text-[0.9375rem] font-medium text-text-main rounded-lg hover:text-secondary hover:bg-bg-light transition-all duration-300 whitespace-nowrap">
              Доставка
            </Link>
            <Link to="/articles" className="inline-flex items-center gap-1 px-4 py-2 text-[0.9375rem] font-medium text-text-main rounded-lg hover:text-secondary hover:bg-bg-light transition-all duration-300 whitespace-nowrap">
              Статьи
            </Link>
            <Link to="/contacts" className="inline-flex items-center gap-1 px-4 py-2 text-[0.9375rem] font-medium text-text-main rounded-lg hover:text-secondary hover:bg-bg-light transition-all duration-300 whitespace-nowrap">
              Контакты
            </Link>
          </nav>

          {/* Right-side Actions */}
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full text-text-main hover:bg-bg-light hover:text-secondary transition-all duration-300"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Поиск"
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-text-main hover:bg-bg-light hover:text-secondary transition-all duration-300"
              onClick={openCart}
              aria-label={`Корзина: ${totalItems} товаров`}
              type="button"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-accent text-white text-[0.6875rem] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-text-main"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 7H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===== SEARCH OVERLAY ===== */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[20vh]" role="dialog" aria-label="Поиск по сайту">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
          <div className="relative w-[90%] max-w-[600px] animate-fade-in">
            <button
              className="absolute -top-[50px] right-0 text-white w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Закрыть поиск"
              type="button"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <form className="flex bg-white rounded-xl overflow-hidden shadow-card-hover" onSubmit={handleSearchSubmit}>
              <input
                className="flex-1 px-5 py-4 text-lg border-none bg-transparent"
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button className="w-14 flex items-center justify-center text-text-light hover:text-secondary transition-colors" type="submit" aria-label="Искать">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== MOBILE MENU ===== */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1500]" aria-hidden={!isMobileMenuOpen}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMobileMenu} />
          <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white flex flex-col overflow-y-auto animate-slide-in-left">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-heading text-lg font-bold text-primary">Меню</span>
              <button
                className="w-8 h-8 flex items-center justify-center text-text-light hover:text-primary transition-colors"
                onClick={closeMobileMenu}
                aria-label="Закрыть меню"
                type="button"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-5 py-4">
              <div>
                <span className="block font-heading text-xs font-bold uppercase tracking-wider text-text-light mb-2">Ассортимент</span>
                {categories.map((category) => (
                  <div key={category.id} className="mb-1">
                    <Link
                      to={`/catalog/${category.slug}`}
                      className="block py-2 font-semibold text-primary text-[0.9375rem] hover:text-secondary transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="pl-4 mb-2">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/catalog/${category.slug}/${sub.slug}`}
                            className="block py-1 text-sm text-text-light hover:text-secondary transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <Link to="/catalog" className="block py-2.5 font-medium text-text-main hover:text-secondary transition-colors" onClick={closeMobileMenu}>
                  Весь каталог
                </Link>
                <Link to="/delivery" className="block py-2.5 font-medium text-text-main hover:text-secondary transition-colors" onClick={closeMobileMenu}>
                  Доставка
                </Link>
                <Link to="/articles" className="block py-2.5 font-medium text-text-main hover:text-secondary transition-colors" onClick={closeMobileMenu}>
                  Статьи
                </Link>
                <Link to="/contacts" className="block py-2.5 font-medium text-text-main hover:text-secondary transition-colors" onClick={closeMobileMenu}>
                  Контакты
                </Link>
              </div>
            </nav>

            <div className="px-5 py-4 border-t border-border">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="block font-bold text-primary mb-1">
                {siteConfig.phone}
              </a>
              <span className="text-sm text-text-light">{siteConfig.workingHours}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
