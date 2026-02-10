# BFHL API

Production-ready REST API built with Node.js and Express.

## Features

- Fibonacci
- Prime filter
- LCM
- HCF/GCD
- AI one-word answers (Gemini)
- Rate limiting
- Helmet security
- API key protection
- Logging
- Central error handler

## Setup

npm install

Create .env:

PORT=5000  
OFFICIAL_EMAIL=your_email  
GEMINI_API_KEY=key  
API_KEY=supersecretkey  
For post request add x-api-key : supersecretkey  in headers section
npm start

## API

POST /api/v1/bfhl  
GET /api/v1/health

## Deployment

Render 
