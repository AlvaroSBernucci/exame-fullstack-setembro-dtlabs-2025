### Fullstack Telemetry Monitoring System

This project was developed as part of the Fullstack Challenge DTLabs 2025.
It is a complete platform for real-time device monitoring, collecting telemetry data (CPU, RAM, temperature, latency, etc.), displaying historical charts, generating real-time notifications, and simulating data automatically.

The entire application runs in Docker, with a Django REST + Channels backend, a React + TypeScript frontend, and a Python telemetry simulator.
---

### Technologies Used

### Backend
- Django REST Framework
- Django Channels + Redis (WebSockets / PubSub)
- JWT Authentication (SimpleJWT)
- SQLite (production)

### Frontend
- React + TypeScript + Vite
- Material UI
- WebSockets for real-time notifications

### Others
- Docker & Docker Compose
- Redis

---

### Features

- JWT Authentication – secure login and protected routes
- Dashboard – overview of all monitored devices
- Historical telemetry data – charts over time
- Real-time notifications – triggered when configured rules are met
- Full CRUD for Devices – create, edit, delete, and list
- Telemetry simulator – automatically generates data
- Fully containerized – runs everything with Docker Compose
  
---

### How to Run with Docker:

The easiest way to run the entire system is using Docker. It will start:
- Django backend
- Redis
- Telemetry simulator
- React frontend

### 1. Clone the repository:
- git clone https://github.com/AlvaroSBernucci/exame-fullstack-setembro-dtlabs-2025.git
- cd exame-fullstack-setembro-dtlabs-2025

### 2. Start all services:
- docker-compose run --rm app python manage.py migrate
- docker-compose up --build

### 3. Accessing the Application:
Once everything is running:
- Backend (Django API): http://localhost:8000
- Django Admin: http://localhost:8000/admin
- Frontend (React): http://localhost:3000

---

### Default Credentials:
If seed data is enabled:
- Username: admin
- Password: admin

---

### Main API Endpoints:
- Method	       Endpoint	                        Description
- POST	        /api/token/	                      JWT authentication
- GET	          /api/v1/devices/	                List all devices
- POST	        /api/v1/devices/	                Create a new device
- PATCH	        /api/v1/devices/id/	              Update a device
- DELETE	      /api/v1/devices/id/	              Delete a device
- POST	        /api/v1/telemetry/	              Submit telemetry data
- GET	          /api/v1/notifications/	          List generated notifications
- POST	        /api/v1/notification-config/      Submit a new notification config
- GET	          /api/v1/notification-config/	    List all notification configs

---

### Real-Time Notifications
The backend uses Django Channels + Redis to send real-time notifications over WebSockets.
WebSocket endpoint:
ws://localhost:8000/ws/notifications/
The frontend automatically connects to this endpoint and displays notifications when configured rules are triggered (e.g., CPU > 80%).

---

### Running Tests
To run the automated tests for the backend:
docker-compose run --rm app python manage.py test

The test suite includes:
- JWT authentication
- Device CRUD operations
- Telemetry submission
- Notification triggering logic

---

### Telemetry Simulator
The simulator (telemetria/telemetry_sender.py) automatically:
- Authenticates with the backend
- Fetches registered devices
- Sends telemetry data periodically
- Simulates CPU, RAM, temperature, latency, connectivity, and boot time
- You can configure the sending interval by changing the INTERVAL variable in docker-compose.yaml.

---

### Running Locally Without Docker (Optional)
If you prefer to run the project manually:

Backend (Django)
- cd api
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver

Frontend (React)
- cd ui
- npm install
- npm run dev

---

### Development Commands
  Create a superuser:
  docker-compose run --rm app python manage.py createsuperuser
  
  Apply migrations:
  docker-compose run --rm app python manage.py migrate
  
  Reset containers:
  docker-compose down -v && docker-compose up --build

--- 

Developed by Álvaro de Sena Bernucci – Fullstack Developer
LinkedIn: https://www.linkedin.com/in/alvarobernucci/
