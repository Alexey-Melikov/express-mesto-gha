# Проект Mesto Back-end part

### REST API для приложение [mesto](https://github.com/Alexey-Melikov/react-mesto-api-full-gha)

[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2E6E6FA&lines=Используемые+технологии)](https://git.io/typing-svg)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Директории

- /models – Схемы и модели пользователя
- /routes — Файлы роута
- /errors – Модули ошибок
- /middlewares - папка с мидлварами
- /controllers – папка с контроллерами

## Функциональность / Роуты

- Регистрация POST /signup
- Авторизация POST /signin
- Обновление данных пользователя PATCH /users/me
- Обновление Аватара пользователя PATCH /users/me/avatar
- Добавление карточки POST /cards
- Удаление карточки DELETE /cards/:id
- Лайк карточки PUT /cards/:id/likes
- ДизЛайк карточки DELETE /cards/:id/likes
- Реализован Централизованный обработчик ошибок
- Все роуты, кроме /signin и /signup, защищены авторизацией.
- Реализована вадлидация joi

## Для запуска проекта

- Склонировать проект на ваш компьютер с [GitHub](https://github.com/Alexey-Melikov/express-mesto-gha)
- Установить зависимости `npm ci`
- Запустить проект `npm start`
- Запустить проект с хот-релод `npm run dev`
