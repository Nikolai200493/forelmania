import { useParams, Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (!article) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-6 py-20 text-center">
        <h1>Статья не найдена</h1>
        <p className="my-4 text-text-light">Запрашиваемая статья не существует.</p>
        <Link
          to="/articles"
          className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300"
        >
          Все статьи
        </Link>
      </div>
    );
  }

  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="pb-20">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <div className="py-4 text-sm text-text-light">
          <Link to="/" className="hover:text-secondary transition-colors">Главная</Link>
          <span className="mx-2 text-border">/</span>
          <Link to="/articles" className="hover:text-secondary transition-colors">Статьи</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-text-main">{article.title}</span>
        </div>

        <article>
          <div className="flex gap-4 text-sm text-text-light mb-4">
            <span>{formatDate(article.date)}</span>
            <span>{article.author}</span>
          </div>
          <h1 className="mb-6">{article.title}</h1>
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full" />
          </div>
          <div
            className="article-prose max-w-[700px]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {otherArticles.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border">
            <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Другие статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map((a) => (
                <Link
                  to={`/articles/${a.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                  key={a.id}
                >
                  <div className="aspect-video overflow-hidden bg-bg-light">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[0.8125rem] text-text-light block mb-2">{formatDate(a.date)}</span>
                    <h3 className="text-lg mb-2 leading-tight">{a.title}</h3>
                    <p className="text-sm text-text-light leading-relaxed mb-3">{a.excerpt}</p>
                    <span className="text-sm font-semibold text-secondary group-hover:text-accent transition-colors">Читать далее →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
