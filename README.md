# Tweetur 🐦
A simpler version of twitter where user can post short message and view other messages posted by the other users.

## Features

- **Post Short Messages**: Users can create and post short messages.
- **View Posts**: Users can view all posts from other users on the homepage.
- **CRUD for Posts**: The application includes all CRUD (Create, Read, Update, Delete) actions for posts.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Laravel (REST API)
- **Database**: MySQL

### Steps to Run
1. Clone this repository
    ```bash
    git clone https://github.com/bagasnugrha/Tweetur.git
    cd Tweetur
    ```

2. Run the Backend Server (Laravel)
  - Navigate to the server directory
      ```bash
      cd backend
      ```
  - Install dependencies
    ```bash
    composer install
    ```
  - Create a `.env` file and configure the database settings
    ```bash
    cp .env.example .env
    ```
  - Run database migrations
    ```bash
    php artisan migrate
    ``` 
  - Start the server
    ```bash
    php artisan serve
    ```

3. Run the Frontend Application (React)
  - Open a new terminal and navigate to the client directory
      ```bash
      cd frontend
      ```
  - Install dependencies
    ```bash
    npm install
    ```
  - Start the application
    ```bash
    npm run dev
    ```