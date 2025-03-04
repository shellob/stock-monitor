# **Биржевой монитор – тестовое задание Peter Partner**

## **Описание проекта**
Биржевой монитор – это веб-приложение для отслеживания актуальных котировок акций в реальном времени. Данные загружаются с **Finnhub API**, обновляются каждые 5 секунд, а пользователи могут фильтровать и искать нужные акции. Также реализован интерактивный график изменения цены на основе **TradingView API**.

## **Функционал**
- Получение данных о котировках акций через **Finnhub API**
- Автоматическое обновление цен каждые 5 секунд
- Фильтрация акций по символу, а также по признаку роста или падения цены
- График изменения цены с использованием **TradingView API**
- Полноценный **backend на NestJS** с API для данных
- **Frontend на Next.js с TailwindCSS** для удобного интерфейса

## **Используемые технологии**
### **Backend**
- **NestJS** – серверная логика
- **TypeScript** – строгая типизация
- **Axios** – работа с внешними API
- **dotenv** – работа с переменными окружения
- **Finnhub API** – источник данных о биржевых котировках

### **Frontend**
- **Next.js** – серверный рендеринг и маршрутизация
- **React** – библиотека для построения пользовательского интерфейса
- **TypeScript** – строгая типизация
- **TailwindCSS** – стилизация компонентов
- **TradingView API** – отрисовка графиков

## **Запуск проекта**

### **1. Установка зависимостей**
Откройте терминал и выполните следующие команды:

#### **Backend**
```sh
cd backend
npm install
```

#### **Frontend**
```sh
cd frontend
npm install
```

### **2. Настройка переменных окружения**
Создайте `.env` файл в папке **backend** и добавьте API-ключ Finnhub:

```env
FINNHUB_API_KEY=ВАШ_API_КЛЮЧ
PORT=3000
```

### **3. Запуск Backend**
```sh
cd backend
npm run start:dev
```
После успешного запуска сервер будет доступен по адресу **http://localhost:3000**

### **4. Запуск Frontend**
```sh
cd frontend
npm run dev
```
После успешного запуска интерфейс будет доступен по адресу **http://localhost:3001**

## **Возможные ошибки и их решения**

### **Ошибка: `EADDRINUSE: address already in use :::3000`**
Причина: порт 3000 уже занят другим процессом.

**Решение:**  
- Завершите процесс, который использует порт:
```sh
npx kill-port 3000
```
- Или измените порт в `.env`.

### **Ошибка: `API limit reached. Please try again later.`**
Причина: Finnhub API ограничивает количество бесплатных запросов.

**Решение:**  
- Подождать некоторое время, пока лимит обновится.
- Использовать новый API-ключ.

### **Ошибка: `Cannot find module 'react-ts-tradingview-widgets'`**
Причина: пакет для отрисовки графика отсутствует.
