# Productivity Dashboard

## Overview

Productivity Dashboard is a React application built using Vite. It helps users organize daily tasks, track goals, stay focused with a timer, and create a simple mood board. The application stores data in the browser using Local Storage, so information remains available even after refreshing the page.

---

## Features

### Task Board

* Add new tasks
* Delete tasks
* Mark tasks as completed
* Set due dates
* Automatically group tasks into:

  * Today
  * Upcoming
  * Overdue
  * No Date
* Display completed tasks separately
* Save tasks using Local Storage

### Goal Tracker

* Add personal goals
* Increase or decrease goal progress
* Display progress using a progress bar
* Save goals using Local Storage

### Focus Timer

* Start timer
* Pause timer
* Reset timer

### Mood Board

* Add color codes or image URLs
* Display colors or images in a grid
* Remove items by clicking on them
* Save mood board data using Local Storage

---

## Technologies Used

* React
* Vite
* JavaScript (ES6+)
* HTML
* CSS
* Local Storage API

---

## Project Structure

```text
src/
│── components/
│   ├── Dashboard.jsx
│   ├── FocusTimer.jsx
│   ├── GoalTracker.jsx
│   ├── MoodBoard.jsx
│   └── TaskBoard.jsx
│
│── hooks/
│   ├── useLocalStorage.js
│   └── useTimer.js
│
│── utils/
│   └── groupTasks.js
│
│── App.jsx
│── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

## Data Persistence

The application uses the browser's Local Storage to save:

* Tasks
* Goals
* Mood Board items

This allows user data to remain available even after refreshing or reopening the browser.

---

## Future Improvements

* Edit existing tasks
* Subtasks
* Search and filter tasks
* Dark mode
* Notifications and reminders
* Drag-and-drop task organization

---

## Author

**Sangita Kumari**

IIT Kanpur
