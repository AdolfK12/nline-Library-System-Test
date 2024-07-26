# Online Library System Test

## Overview

This repository contains a test application for an Online Library System. The purpose is to demonstrate the ability to implement a system with user authentication and book borrowing functionalities.

## Features

1. **User Authentication**

   - Register: Users can register with valid email domains and passwords.
   - Login: Users can log in using their email and password.

2. **Book Borrowing**

   - Users can borrow one book at a time.
   - Admins can track overdue books and current loans.

3. **Validation Rules**
   - Email must be from a valid domain (e.g., gmail.com, hotmail.com).
   - Password must be at least 8 characters long, alphanumeric, and contain at least one uppercase letter.
   - Duplicate email registration is not allowed.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies**
   ```bash
   cd <project-directory>
   npm install
   ```
3. **Configure Environment Variables**

- Create a .env file in the root directory and set up the following variables:

  ```bash
   DB_HOST=<database-host>
   DB_USER=<database-user>
   DB_PASS=<database-password>
   DB_NAME=<database-name>
   JWT_SECRET=<your-jwt-secret>
  ```

4. **Run Migrations**
   ```bash
   npx sequelize-cli db:migrate
   ```
5. **Start the Application**
   ```bash
   npm start
   ```

## Endpoints

- **POST /register**

  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "YourPassword1",
      "username": "username",
      "role": "role"
    }
    ```

- **POST /login**

  - **Description**: Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "YourPassword1"
    }
    ```
  - **Response**:
    ```json
    {
      "access_token": "your_jwt_token",
      "id": 1,
      "email": "user@example.com",
      "username": "username",
      "role": "user"
    }
    ```

- **POST /borrow**

  - **Description**: Borrow a book.
  - **Request Body**:
    ```json
    {
      "bookId": 1
    }
    ```
  - **Authorization**: Requires a valid JWT token.

- **POST /return**

  - **Description**: Return a borrowed book.
  - **Request Body**:
    ```json
    {
      "bookId": 1
    }
    ```
  - **Authorization**: Requires a valid JWT token.

- **GET /loans**
  - **Description**: Get all loan records (admin only).
  - **Authorization**: Requires a valid JWT token with admin role.

## Notes

- This is a test application. Only use it in a development environment.
- Ensure to replace `<repository-url>`, `<database-host>`, `<database-user>`, `<database-password>`, and `<database-name>` with actual values.

## Postman Collection

- Test the API directly using this [Postman Collection](https://warped-satellite-3227.postman.co/workspace/Ibufola~b05f4e89-478e-41a8-806a-bac5e9f0537f/collection/27413656-c1ce0a26-47bb-4366-a2cc-f6773b001663?action=share&creator=27413656).
