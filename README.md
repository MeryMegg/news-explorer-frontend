# Дипломный проект
#### второй этап (Инфраструктура и верстка)


#### ссылка на рабочую версию сайта: https://www.explorer-news.ml
##### ссылка на gh pages: ++**[NewsExplorer](https://merymegg.github.io/news-explorer-frontend/)**++
[Ссылка на репозиторий с backend'ом данного проекта](https://github.com/MeryMegg/news-explorer-api);
[Ссылка на репозиторий с frontend'ом данного проекта](https://github.com/MeryMegg/news-explorer-frontend);



Версия: 0.0.1

**Автор:** Скосырская Мария

## О проекте:
Проект выполнен в рамках курса "Веб-разработчик" от ЯндексПрактикума.
**NewsExplorer** - сервис по поиску свежих новостей, позволяющий зарегистрированным пользователям сохранять новости в избранное.

## Цели данного этапа:
- выполнить верстку и написать js для проекта **NewsExplorer**

## Задачи данного этапа:
- настроить Webpack
- сверстать 2-х страничный адаптивный сайт
- написать js для работы сайта;
- выложить работу на GitHub Pages;
- deploy на сервер

## Стек технологий:

- ES6
- HTML5
- CSS3
- JavaScript
- BEM
- npm
- Webpack
- Git
- node.js
- ООП
- express

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

## Взаимодействие с проектом:
- на главной странице есть форма поиска, которая работает как для авторизированых, так и для неавторизированных пользователей;
- неавторизированные пользователи имеют возможность только осуществлять поиск новостей по ключевому слову;
- авторизированные пользователи имеют возможность:
- сохранять статьи в избранное;
- имеют доступ на страницу с сохраненными статьями, где могут просмотреть избранные статьи и при необходимости удалить их;

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
