import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function ArticlesPage() {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="pb-20">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <div className="py-4 text-sm text-text-light">
          <Link to="/" className="hover:text-secondary transition-colors">Главная</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-text-main">Статьи</span>
        </div>

        <h1 className="text-3xl mb-8">Статьи</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              to={`/articles/${article.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              key={article.id}
            >
              <div className="aspect-video overflow-hidden bg-bg-light">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="text-[0.8125rem] text-text-light block mb-2">{formatDate(article.date)}</span>
                <h3 className="text-lg mb-2 leading-tight">{article.title}</h3>
                <p className="text-sm text-text-light leading-relaxed mb-3">{article.excerpt}</p>
                <span className="text-sm font-semibold text-secondary group-hover:text-accent transition-colors">Читать далее →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
