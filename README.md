# QR Code Attendance Bot

## Overview

This project is a Telegram-based attendance bot that marks attendance using IIT Kanpur ID card QR codes.

The bot performs the following steps:

1. Receives an ID card photo from Telegram.
2. Downloads the image.
3. Decodes the QR code from the image.
4. Extracts the roll number from the QR data.
5. Validates whether the roll number is registered.
6. Marks attendance and stores it in a JSON file.
7. Prevents duplicate attendance entries.
8. Generates attendance reports.

---

## Features

* QR code decoding from images
* Roll number extraction
* Roll number validation
* Attendance storage in JSON format
* Duplicate attendance detection
* Telegram bot interface
* Attendance report generation

---

## Project Structure

assignment2/

* bot.js — Telegram bot logic
* qr.js — QR code decoding
* parser.js — Roll number extraction and validation
* attendance.js — Attendance storage and reporting
* attendance.json — Attendance database
* package.json — Project dependencies
* .env.example — Environment variable template
* README.md — Project documentation

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a file named `.env` in the project root.

Example:

```env
BOT_TOKEN=your_telegram_bot_token
```

### 3. Run the Bot

```bash
node bot.js
```

---

## Telegram Commands

### /start

Displays instructions to the user.

### /report

Displays the total attendance count and list of present roll numbers.

---

## Attendance Storage

Attendance is stored in `attendance.json`.

Example:

```json
{
  "240123": "2026-06-16T10:00:00.000Z",
  "240124": "2026-06-16T10:05:00.000Z"
}
```

---

## Workflow

1. User sends IITK ID card photo.
2. Bot downloads the image.
3. QR code is decoded.
4. Roll number is extracted.
5. Registration is verified.
6. Attendance is marked.
7. Result is sent back to the user.

---

## Notes

* `.env` should not be committed to GitHub.
* `node_modules` should not be committed to GitHub.
* `.env.example` is provided as a template for environment variables.
