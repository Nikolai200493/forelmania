import type { Category } from './types';

/**
 * Категории товаров.
 *
 * Чтобы добавить/изменить категорию:
 * 1. Добавьте новый объект в массив
 * 2. Укажите уникальный id и slug (для URL)
 * 3. Замените image на путь к вашей картинке в /public/images/categories/
 * 4. Добавьте подкатегории при необходимости
 */
export const categories: Category[] = [
  {
    id: 'fish',
    name: 'Рыба',
    slug: 'ryba',
    image: '/images/categories/fish.svg',
    description: 'Свежая и замороженная рыба высшего качества',
    subcategories: [
      { id: 'salmon', name: 'Лосось', slug: 'losos' },
      { id: 'trout', name: 'Форель', slug: 'forel' },
      { id: 'cod', name: 'Треска', slug: 'treska' },
      { id: 'seabass', name: 'Сибас', slug: 'sibas' },
      { id: 'dorado', name: 'Дорадо', slug: 'dorado' },
    ],
  },
  {
    id: 'shrimp',
    name: 'Креветки',
    slug: 'krevetki',
    image: '/images/categories/shrimp.svg',
    description: 'Королевские, тигровые и другие виды креветок',
    subcategories: [
      { id: 'king-shrimp', name: 'Королевские', slug: 'korolevskie' },
      { id: 'tiger-shrimp', name: 'Тигровые', slug: 'tigrovye' },
      { id: 'shrimp-peeled', name: 'Очищенные', slug: 'ochishhennye' },
    ],
  },
  {
    id: 'crab',
    name: 'Крабы',
    slug: 'kraby',
    image: '/images/categories/crab.svg',
    description: 'Камчатский краб и крабовое мясо',
    subcategories: [
      { id: 'kamchatka', name: 'Камчатский краб', slug: 'kamchatskij' },
      { id: 'crab-meat', name: 'Крабовое мясо', slug: 'krabovoe-myaso' },
    ],
  },
  {
    id: 'caviar',
    name: 'Икра',
    slug: 'ikra',
    image: '/images/categories/caviar.svg',
    description: 'Красная и чёрная икра премиум качества',
    subcategories: [
      { id: 'red-caviar', name: 'Красная икра', slug: 'krasnaya' },
      { id: 'black-caviar', name: 'Чёрная икра', slug: 'chyornaya' },
    ],
  },
  {
    id: 'mollusks',
    name: 'Моллюски',
    slug: 'mollyuski',
    image: '/images/categories/mollusks.svg',
    description: 'Мидии, устрицы, кальмары и другие моллюски',
    subcategories: [
      { id: 'mussels', name: 'Мидии', slug: 'midii' },
      { id: 'oysters', name: 'Устрицы', slug: 'ustricy' },
      { id: 'squid', name: 'Кальмары', slug: 'kalmary' },
      { id: 'octopus', name: 'Осьминоги', slug: 'osminogi' },
    ],
  },
  {
    id: 'sets',
    name: 'Наборы',
    slug: 'nabory',
    image: '/images/categories/sets.svg',
    description: 'Готовые наборы морепродуктов для любого случая',
    subcategories: [
      { id: 'family-set', name: 'Семейные', slug: 'semejnye' },
      { id: 'grill-set', name: 'Для гриля', slug: 'dlya-grilya' },
      { id: 'gift-set', name: 'Подарочные', slug: 'podarochnye' },
    ],
  },
];
