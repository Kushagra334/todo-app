# Todo List Application

A full-stack Todo List application built with Spring Boot and React. The application allows users to manage their tasks with features like adding, editing, completing, and deleting tasks.

## Project Structure

```
todo-project/
├── backend/          # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── example/
│   │   │   │           └── todolist/
│   │   │   │               ├── TodoListApplication.java
│   │   │   │               ├── controller/
│   │   │   │               ├── model/
│   │   │   │               ├── repository/
│   │   │   │               └── service/
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoList.jsx
│   │   │   └── EditTaskModal.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status (All, Completed, Pending)
- Edit task titles using a modal
- Responsive design
- Smooth animations and transitions
- Modern UI with Tailwind CSS

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Heroicons
- Modern JavaScript (ES6+)

## Prerequisites

- Java 17 or higher
- Node.js 14 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update MySQL credentials in `src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=root
   ```

3. Build and run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/tasks | Get all tasks |
| GET    | /api/tasks/{id} | Get a specific task |
| POST   | /api/tasks | Create a new task |
| PUT    | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## Frontend Features

1. Task Management:
   - Add new tasks
   - Edit task titles
   - Mark tasks as complete/incomplete
   - Delete tasks

2. Task Filtering:
   - View all tasks
   - View only completed tasks
   - View only pending tasks

3. UI Features:
   - Responsive design
   - Smooth animations
   - Modal for editing tasks
   - Interactive buttons and hover effects
   - Loading states and error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
