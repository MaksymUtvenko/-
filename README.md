# Романтический сайт для годовщины

Интерактивный React-сайт с темной романтической темой, Tailwind CSS, Framer Motion, фото-пазлом, мини-игрой, письмом, слайдером, музыкой и пасхалками.

## Запуск

```bash
npm install
npm run dev
```

В Windows PowerShell с заблокированными скриптами можно использовать:

```bash
npm.cmd install
npm.cmd run dev
```

## Структура

```text
src/
  components/       Секции и интерактивные блоки
  data/siteData.js  Placeholder-тексты и изображения
  hooks/            Web Audio переключатель музыки
```

## Настройка

- Тексты и ссылки на изображения меняются в `src/data/siteData.js`.
- В пазле можно загрузить свое фото прямо на странице.
- Текст письма можно заменить в интерфейсе или в `defaultLetter`.
- Цвета темы настроены в `tailwind.config.js`.
