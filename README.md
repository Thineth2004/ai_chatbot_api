# AI Chatbot API

A Node.js backend that integrates AI to generate structured responses for chat-based applications.

## Features
- AI-powered responses
- Custom system prompts
- Clean JSON output
- Easy API integration

## Tech Stack
- Node.js
- Express
- OpenAI API

## API Endpoint

POST /chat

Request:
{
  "message": "Write a business email"
}

Response:
{
  "reply": "..."
}

## Setup

1. Clone the repo
2. Install dependencies:
   npm install
3. Add your API key in .env

## Use Cases
- Chatbots
- Email generators
- Customer support automation