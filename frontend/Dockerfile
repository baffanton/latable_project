# Этап сборки: Используем Node.js для создания файлов сборки
FROM node:22 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код в контейнер
COPY . .

# Выполняем сборку приложения (результат попадет в папку dist)
RUN npm run build

# Открываем порт 5173 для доступа
EXPOSE 5173

CMD ["npm", "run", "dev"]