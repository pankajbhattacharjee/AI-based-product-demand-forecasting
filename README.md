# AI Demand Forecasting

This is a Next.js application for AI-powered demand forecasting, built with TypeScript, Tailwind CSS, and various UI components from Radix UI. It uses Google's GenAI for AI capabilities.

## Features

- Dashboard with sales charts and forecasting
- Product management
- Upload sales data
- AI-powered demand forecasting
- Responsive design with dark mode support

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Google GenAI API key:
   ```
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Recharts for charts
- Google GenAI for AI features
- Firebase (for hosting/deployment)

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and types
- `src/ai/` - AI-related code using Genkit
- `public/` - Static assets

## Deployment

This app is configured for Firebase App Hosting. Check `apphosting.yaml` for deployment settings.
