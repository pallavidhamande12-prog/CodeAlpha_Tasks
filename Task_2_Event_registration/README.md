# Event Registration System – Backend

This project is developed as **Task 2** for the **CodeAlpha Backend Internship**.  
It is a backend application built using **Node.js, Express.js, MySQL, and Sequelize** to manage events and user registrations.

## Features
- Create and view events
- Create users
- Register users for events
- View all registrations
- Cancel event registrations
- Proper linking between users, events, and registrations

## Technologies Used
- Node.js
- Express.js
- MySQL
- Sequelize ORM

## Project Structure
## API Endpoints
- POST `/users` – Create user  
- POST `/events` – Create event  
- GET `/events` – View all events  
- GET `/events/:id` – View event by ID  
- POST `/register` – Register user for event  
- GET `/registrations` – View registrations  
- DELETE `/registrations/:id` – Cancel registration  

## How to Run
1. Install dependencies:
2. Configure MySQL database in `config/Database.js`
3. Start server:
Server runs on `http://localhost:3000`

## Status
Task completed successfully as per requirements.