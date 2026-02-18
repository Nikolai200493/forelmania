import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const deliveryZones = [
  {
    name: 'Москва (внутри МКАД)',
    price: 'Бесплатно от 3 000 ₽',
    time: '2-4 часа',
    description: 'Доставка курьером в термобоксе. При заказе менее 3 000 ₽ стоимость доставки — 350 ₽.',
  },
  {
    name: 'Москва (за МКАД до 10 км)',
    price: '250 ₽',
    time: '3-5 часов',
    description: 'Доставка курьером. Бесплатно при заказе от 5 000 ₽.',
  },
  {
    name: 'Московская область',
    price: 'от 350 ₽',
    time: 'На следующий день',
    description: 'Стоимость рассчитывается в зависимости от расстояния. Бесплатно от 7 000 ₽.',
  },
  {
    name: 'Самовывоз',
    price: 'Бесплатно',
    time: 'Через 1 час после заказа',
    description: 'Пункт самовывоза: г. Москва, ул. Рыбная, д. 12. Работает с 9:00 до 21:00.',
  },
];

const faqItems = [
  {
    question: 'Как сохраняется свежесть при доставке?',
    answer: 'Мы доставляем все заказы в специальных термобоксах с хладоэлементами. Температура внутри поддерживается на уровне 0-4°C, что гарантирует свежесть продуктов.',
  },
  {
    question: 'Можно ли выбрать время доставки?',
    answer: 'Да, при оформлении заказа вы можете выбрать удобный двухчасовой интервал доставки с 9:00 до 21:00.',
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем банковские карты (Visa, MasterCard, МИР), оплату при получении наличными или картой, а также СБП.',
  },
  {
    question: 'Что делать, если товар не понравился?',
    answer: 'Если качество товара вас не устроило, свяжитесь с нами в течение 24 часов после получения. Мы вернём деньги или заменим товар.',
  },
  {
    question: 'Есть ли минимальная сумма заказа?',
    answer: 'Минимальная сумма заказа для доставки — 1 000 ₽. Для самовывоза ограничений нет.',
  },
];

export default function DeliveryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pb-20">
      <div className="w-full max-w-[1280px] mx-auto px-6">
        <div className="py-4 text-sm text-text-light">
          <Link to="/" className="hover:text-secondary transition-colors">Главная</Link>
          <span className="mx-2 text-border">/</span>
          <span className="text-text-main">Доставка и оплата</span>
        </div>

        <h1 className="text-3xl mb-8">Доставка и оплата</h1>

        <section className="mb-16">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Зоны доставки</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliveryZones.map((zone, index) => (
              <div className="bg-bg-light rounded-xl p-6 hover:shadow-card transition-shadow duration-300" key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg">{zone.name}</h3>
                  <span className="font-heading font-bold text-secondary text-[0.9375rem]">{zone.price}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-text-light mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {zone.time}
                </div>
                <p className="text-sm leading-relaxed">{zone.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Как мы доставляем</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-md:gap-6">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3 className="mb-2">Упаковка</h3>
              <p className="text-sm text-text-light">Каждый продукт упаковывается в вакуумную упаковку и помещается в термобокс</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3 className="mb-2">Контроль</h3>
              <p className="text-sm text-text-light">Проверяем температуру и качество перед отправкой каждого заказа</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="1.5">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3 className="mb-2">Доставка</h3>
              <p className="text-sm text-text-light">Курьер доставляет заказ в указанное время в сохраняющем холод термобоксе</p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="text-center text-3xl max-md:text-2xl mb-10 pb-4 section-title-underline">Часто задаваемые вопросы</h2>
          <div className="max-w-[700px] mx-auto">
            {faqItems.map((item, index) => (
              <div
                className="border-b border-border"
                key={index}
              >
                <button
                  className="w-full flex items-center justify-between py-[18px] text-base font-semibold text-primary text-left cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={clsx(
                      'text-text-light shrink-0 transition-transform duration-300',
                      openFaq === index && 'rotate-180'
                    )}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className={clsx(
                  'faq-answer',
                  openFaq === index && 'faq-answer-open'
                )}>
                  <p className="text-[0.9375rem] text-text-light leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
