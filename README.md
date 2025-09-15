# Agenda App

A full-stack web application for managing a service agenda, including clients, cars, and jobs.

## Tech Stack

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: React
- **Other**: Nodemailer for notifications, Node-cron for scheduled tasks

## Project Structure

- `/backend`: Server-side code
- `/frontend`: Client-side React app
- `/scripts`: Automation scripts

## Setup

1. Run `scripts/start.bat` to install dependencies and start the backend.
2. In a separate terminal, navigate to `/frontend` and run `npm start` to start the React app.

## Features

- Manage clients and their cars
- Schedule and track jobs
- Automated email reminders for upcoming jobs

## Scripts

- `start.bat`: Installs backend dependencies and starts the server
- `update_and_restart.bat`: Updates the project via git and restarts the server