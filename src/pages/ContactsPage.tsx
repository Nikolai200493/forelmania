import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/config';
import { useToast } from '../context/ToastContext';

export default function ContactsPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Введите ваше имя";
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
    } else if (!/^[\d\s\+\-\(\)]{7,18}$/.test(formData.phone.trim())) {
      newErrors.phone = "Некорректный номер телефона";
    }
    if (!formData.message.trim()) newErrors.message = "Введите сообщение";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Ошибка сервера");
      }

      addToast("success", "Сообщение отправлено! Мы скоро с вами свяжемся.");
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Произошла ошибка. Попробуйте ещё раз.";
      addToast("error", errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg text-[0.9375rem] transition-all focus:outline-none focus:ring-2 focus:ring-secondary/20 ${
      errors[field]
        ? "border-accent focus:border-accent"
        : "border-border focus:border-secondary"
    }`;

  return (
    <div className="pb-20">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <div className="py-4 text-sm text-text-light">
          <Link to="/" className="hover:text-secondary transition-colors">Главная</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-text-main">Контакты</span>
        </div>

        <h1 className="text-3xl mb-8">Контакты</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-md:gap-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 content-start">
            <div className="bg-bg-light rounded-xl p-6">
              <div className="mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 className="text-base mb-2">Телефон</h3>
              <a href={`tel:${siteConfig.phone.replace(/[\s()-]/g, '')}`} className="text-secondary font-semibold hover:text-accent transition-colors">{siteConfig.phone}</a>
              <p className="text-[0.8125rem] text-text-light mt-1">Звонок бесплатный по РФ</p>
            </div>

            <div className="bg-bg-light rounded-xl p-6">
              <div className="mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 className="text-base mb-2">Email</h3>
              <a href={`mailto:${siteConfig.email}`} className="text-secondary font-semibold hover:text-accent transition-colors">{siteConfig.email}</a>
              <p className="text-[0.8125rem] text-text-light mt-1">Ответим в течение 2 часов</p>
            </div>

            <div className="bg-bg-light rounded-xl p-6">
              <div className="mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3 className="text-base mb-2">Адрес</h3>
              <p>{siteConfig.address}</p>
              <p className="text-[0.8125rem] text-text-light mt-1">{siteConfig.workingHours}</p>
            </div>

            <div className="bg-bg-light rounded-xl p-6">
              <div className="mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <h3 className="text-base mb-2">Мессенджеры</h3>
              <div className="flex gap-3">
                {siteConfig.social.telegram && (
                  <a href={siteConfig.social.telegram} target="_blank" rel="noopener noreferrer" className="text-secondary font-semibold text-[0.9375rem] hover:text-accent transition-colors">
                    Telegram
                  </a>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-2">Напишите нам</h2>
            <p className="text-text-light mb-6">Есть вопросы? Заполните форму, и мы свяжемся с вами.</p>

            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center gap-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3 className="text-success">Спасибо за обращение!</h3>
                <p>Мы свяжемся с вами в ближайшее время.</p>
                <button
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 cursor-pointer mt-2"
                  onClick={() => setSubmitted(false)}
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-primary mb-1.5">Ваше имя *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Иван Иванов"
                    className={inputClass("name")}
                  />
                  {errors.name && <p className="text-xs text-accent mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-1.5">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                    className={inputClass("phone")}
                  />
                  {errors.phone && <p className="text-xs text-accent mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-primary mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ivan@example.com (необязательно)"
                    className={inputClass("email")}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-primary mb-1.5">Сообщение *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ваш вопрос..."
                    className={`${inputClass("message")} resize-y`}
                  />
                  {errors.message && <p className="text-xs text-accent mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 font-heading text-[0.9375rem] font-semibold rounded-lg bg-accent text-white border-2 border-accent hover:bg-accent-hover hover:border-accent-hover transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </button>
              </form>
            )}
          </div>
        </div>

        <section className="mt-5">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Как нас найти</h2>
          <div className="bg-bg-light rounded-xl p-16 text-center flex flex-col items-center gap-3 text-text-light">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <p className="text-lg">Здесь будет карта</p>
            <p className="text-sm">{siteConfig.address}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
