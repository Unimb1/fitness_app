# Fitness App Backend API

Backend сервер для приложения отслеживания фитнеса.

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Настройте переменные окружения в `.env`:
- `MONGODB_URI` - URI подключения к MongoDB
- `JWT_SECRET` - Секретный ключ для JWT токенов
- `PORT` - Порт сервера (по умолчанию 5000)
- `FRONTEND_URL` - URL фронтенда для CORS

4. Убедитесь, что MongoDB запущен локально или используйте MongoDB Atlas

## Запуск

### Режим разработки (с автоперезагрузкой):
```bash
npm run dev
```

### Продакшн режим:
```bash
npm start
```

## API Endpoints

### Аутентификация
- `POST /api/users/register` - Регистрация пользователя
- `POST /api/users/login` - Вход в систему
- `GET /api/users/me` - Получить текущего пользователя
- `PUT /api/users/me` - Обновить профиль

### Тренировки
- `GET /api/workouts` - Получить все тренировки
- `GET /api/workouts/recent` - Получить последние тренировки
- `GET /api/workouts/:id` - Получить тренировку по ID
- `POST /api/workouts` - Создать тренировку
- `PUT /api/workouts/:id` - Обновить тренировку
- `DELETE /api/workouts/:id` - Удалить тренировку
- `GET /api/workouts/stats/summary` - Статистика тренировок

### Цели
- `GET /api/goals` - Получить все цели
- `GET /api/goals/:id` - Получить цель по ID
- `POST /api/goals` - Создать цель
- `PUT /api/goals/:id` - Обновить цель
- `DELETE /api/goals/:id` - Удалить цель

### Измерения
- `GET /api/measurements/weight` - Получить записи веса
- `POST /api/measurements/weight` - Добавить запись веса
- `PUT /api/measurements/weight/:id` - Обновить запись веса
- `DELETE /api/measurements/weight/:id` - Удалить запись веса
- `GET /api/measurements/body` - Получить измерения тела
- `POST /api/measurements/body` - Добавить измерение тела
- `GET /api/measurements/photos` - Получить фото прогресса
- `POST /api/measurements/photos` - Добавить фото прогресса

### Упражнения
- `GET /api/exercises` - Получить все упражнения (по умолчанию + пользовательские)
- `GET /api/exercises/custom` - Получить пользовательские упражнения
- `POST /api/exercises` - Создать пользовательское упражнение
- `PUT /api/exercises/:id` - Обновить упражнение
- `DELETE /api/exercises/:id` - Удалить упражнение

## Аутентификация

Большинство endpoints требуют аутентификации. Добавьте заголовок:
```
Authorization: Bearer <token>
```

Токен получается при регистрации или входе в систему.

