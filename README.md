# Todo App

A client-side task management application built with React 19 and Vite. It allows users to manage tasks, track their progress, filter tasks by status, and store application data locally in the browser.

## About the Project

The application displays a task list along with statistics for:

* Total tasks.
* Completed tasks.
* Remaining tasks.

Users can add, delete, and toggle tasks between completed and active states. The application also provides task filtering and bulk deletion for completed tasks.

> **Note:** Data is stored locally in the browser using `localStorage`. There is no cloud synchronization, backend server, or database.

## Features

* Add new tasks.
* Delete individual tasks.
* Mark tasks as completed or active.
* Filter tasks by:

  * All tasks.
  * Active tasks.
  * Completed tasks.
* Display statistics for total, completed, and remaining tasks.
* Delete all completed tasks at once.
* Persist tasks in browser storage.
* Persist the current input text.
* Persist the selected filter.
* Display an empty state when no tasks match the selected filter.
* Show an animated planet illustration in the empty state.
* Fully client-side data handling.
* No backend server or database.
* No cloud synchronization.

## Design

The application uses a dark visual design featuring:

* Transparent glass-style interface elements.
* Gold and blue accents.
* A turquoise-colored add button.
* An animated planet illustration for the empty state.

## Technologies

### Frontend

```text
React 19
```

### Build Tool

```text
Vite
```

### Styling

```text
styled-components
CSS
```

### Code Quality

```text
Oxlint
```

## Requirements

Make sure the following are installed before running the project:

```text
Node.js
npm
```

## Installation and Local Development

Navigate to the application directory:

```bash
cd app
```

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Available Commands

### Install Dependencies

```bash
npm install
```

Installs the project dependencies.

### Start Development Server

```bash
npm run dev
```

Starts the development server.

### Build for Production

```bash
npm run build
```

Creates a production build of the application.

### Preview Production Build

```bash
npm run preview
```

Runs a local server to preview the production build.

### Lint the Project

```bash
npm run lint
```

Checks the project code using Oxlint.

## Local Storage

The application uses:

```text
localStorage
```

to store:

* The task list.
* The current input text.
* The selected task filter.

This means the data remains available in the same browser on the same device.

Local storage is **not** cloud storage and does not provide synchronization between different devices or browsers.

## Project Architecture

The application is entirely client-side and does not require:

```text
Backend Server
Database
Cloud Synchronization
```

Task data is managed within the browser and persisted locally using browser storage.

## Notes

This project is designed as a client-side Todo application focused on task management, filtering, progress statistics, and local data persistence.
