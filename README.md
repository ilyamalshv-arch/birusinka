# Бирюсинка — главная страница

Pixel-perfect вёрстка главной страницы интернет-магазина ёлочных игрушек «Бирюсинка» по макету Figma.

**Живая версия:** https://ilyamalshv-arch.github.io/birusinka/

## Стек

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS
- next/image, next/font (Montserrat)

## Что внутри

- Десктоп 1:1 с макетом + адаптив до мобильных (брейкпоинты 767 / 1023 / 1279 / 1599)
- Слайдер героя: автопрокрутка, стрелки, точки
- Интерактивные карточки товаров (ховер-состояния)
- Состояния главной: баннер cookie, ховер-меню (десктоп), бургер + аккордеоны (мобайл), вход/выход

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

## Сборка

```bash
npm run build            # обычная сборка (.next)
GITHUB_PAGES=true npm run build   # статический экспорт в ./out (для Pages)
```

Деплой на GitHub Pages автоматический — через GitHub Actions при пуше в `main`.
