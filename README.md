# Дипломный проект
#### второй этап (Инфраструктура и верстка)

##### ссылка на gh pages: ++**[NewsExplorer](https://merymegg.github.io/news-explorer-frontend/)**++
[Ссылка на репозиторий с backend'ом данного проекта](https://github.com/MeryMegg/news-explorer-api)
[Ссылка на репозиторий с frontend'ом данного проекта](https://github.com/MeryMegg/news-explorer-frontend)



Версия: 0.0.1

**Автор:** Скосырская Мария

## О проекте:
Проект выполнен в рамках курса "Веб-разработчик" от ЯндексПрактикума.
**NewsExplorer** - сервис по поиску свежих новостей, позволяющий зарегистрированным пользователям сохранять новости в избранное.

## Цели данного этапа:
- выполнить верстку для проекта **NewsExplorer**

## Задачи данного этапа:
- настроить Webpack
- сверстать 2-х страничный адаптивный сайт
- выложить работу на GitHub Pages

## Стек технологий:

- ES6
- HTML5
- CSS3
- JavaScript
- BEM
- npm
- Webpack
- Git

## Пакеты и плагины которые используются в сборках:

- [Babel-loader](https://www.npmjs.com/package/babel-loader)
- [Babel CLI](https://babeljs.io/docs/en/babel-cli#docsNav)
- [Babel Core](https://babeljs.io/docs/en/babel-core)
- [Babel Preset Evnvironment](https://babeljs.io/docs/en/babel-preset-env#docsNav)
- [Mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)
- [Сore JS](https://github.com/zloirock/core-js#readme)
- [PostCSS](https://postcss.org/)
- [Postcss-loader](https://www.npmjs.com/package/postcss-loader)
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer)
- [Define plugin](https://webpack.js.org/plugins/define-plugin/)
- [Style loader](https://github.com/webpack-contrib/style-loader)
- [Optimize CSS assets](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)
- [Cssnano](https://www.npmjs.com/package/cssnano)
- [Css-loader](https://www.npmjs.com/package/css-loader)
- [Html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
- [File loader](https://github.com/webpack-contrib/file-loader)
- [Image Webpack loader](https://www.npmjs.com/package/image-webpack-loader)
- [Cross-Env](https://www.npmjs.com/package/cross-env)
- [Gh-pages](https://www.npmjs.com/package/gh-pages)
- [Webpack-md5-hash](https://www.npmjs.com/package/webpack-md5-hash)
- [Webpack](https://www.npmjs.com/package/webpack)
- [Webpack-cli](https://www.npmjs.com/package/webpack-cli)
- [Webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)

## Взаимодействие с проектом на данном этапе:
- Для реализации открытия/закрытия мобильного меню и попапов написан небольшой кусок js кода, что позовляет взаимодействовать с этими элементами нажатием соответствующих кнопок. Попап с ответом об успешной регистрации открывается при нажатии на кнопку "Регистрация" в форме "Регистрация" после заполнения всех полей.
- Для скрытия кнопок мобильного меню используется класс `button-icon_is-invisible`.
- Для скрытия неактуальных элементов меню используется класс `list__item_is-invisible`.
- Для скрытия блока ожидания поиска новостей используется класс `result-search__preloader_is-invisible`.
- Для скрытия блока-контейнера для новостей используется класс `result-search__content_is-invisible`.
- Для скрытия блока с сообщением "Ничего не найдено" используется класс `result-search__not-found_is-invisible`.
- Для отключения вертикального скрола при открытии мобильного меню и попапов используется класс `root_overflow_hidden`.
- Для визуальной неактивности кнопок в формах используется класс `popup__button_is-disabled`.
- Для оверлея для мобильного меню и попапов используется класс `popup_is-opened`.


## Инструкция по запуску проекта

Скачать или склонировать репозиторий

```bash

# установка зависимостей
$ npm install

# запуск сервера с "горячей" перезагрузкой на localhost:8080
$ npm run dev

# сборка в продакшн
$ npm run build

# разместить production-билд на github pages
$ npm run deploy


```
