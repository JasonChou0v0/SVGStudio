<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Jason SVG Studio

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1GxKYMjTBDnl5n8t3DvdQQIdN8fzrgFBp

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in `.env.local` to your Gemini API key (copy from `.env.example`)
3. Optionally, set the `VITE_GEMINI_MODEL` to specify which Gemini model to use (default: gemini-2.5-flash)
4. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Create a new project on Vercel
2. Connect your Git repository
3. Set the `VITE_GEMINI_API_KEY` environment variable in Vercel project settings
4. Optionally, set the `VITE_GEMINI_MODEL` environment variable to specify which Gemini model to use
5. Deploy!

The project is already configured with the necessary `vercel.json` file for deployment.