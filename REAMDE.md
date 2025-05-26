# 📁 My Project

Это проект, состоящий из бэкенд части на Python (FastAPI) и фронтенд части на React.

## 📦 Установка

Склонируйте репозиторий:
git clone https://github.com/git@github.com:qasx135/python_backend_6sem.git

## ▶️ Запуск Backend

Перейдите в папку `backend`, создайте виртуальное окружение и запустите сервер:
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate     # Windows

pip install -r requirements.txt
uvicorn app.main:app --reload

Бэкенд будет доступен по адресу: http://127.0.0.1:8000

## 💻 Запуск Frontend

Откройте новое окно терминала и перейдите в папку `frontend`:
cd frontend
npm install
npm start

Фронтенд будет доступен по адресу: http://localhost:3000