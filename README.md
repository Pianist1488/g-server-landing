# G Server

Лендинг поставщика профессиональных GPU, AI-ускорителей, GPU-серверов и серверной памяти по России.

Живая версия: [nasledie-it-supply.metriccord512.chatgpt.site](https://nasledie-it-supply.metriccord512.chatgpt.site/)

## Возможности

- адаптивный светлый hero с анимированной 3D-видеокартой;
- каталог NVIDIA и Samsung с отдельными страницами товаров;
- bento-раздел категорий оборудования;
- форма заявки с поддержкой отправки в Telegram через переменные окружения;
- SEO-метаданные, Open Graph и Schema.org;
- Cloudflare Worker без сторонних runtime-зависимостей.

## Локальный запуск

Нужен Node.js 20 или новее.

```bash
npm run build
npm run validate
npm run preview
```

После запуска сайт доступен по адресу `http://127.0.0.1:4190`.

## Структура

```text
worker/
  index.js          данные товаров, страницы товаров и API заявок
  home-v2.js        главная страница и визуальный интерфейс
scripts/
  build.sh          сборка Worker
  embed-hero.mjs    подготовка встроенных изображений
  preview.mjs       локальный сервер
  validate-artifact.mjs
assets/             исходные изображения
.openai/hosting.json
```

## Telegram-заявки

В продакшене используются переменные окружения:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Секреты не хранятся в репозитории. При локальном запуске без них форма корректно возвращает подготовленный вариант заявки для Telegram.

## Основные команды

```bash
npm run build      # собрать dist/
npm run validate   # проверить deployment artifact
npm run preview    # открыть локальный сервер на порту 4190
```
