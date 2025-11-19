<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/jason-svg-studio&env=VITE_GEMINI_API_KEY&envDescription=Get%20your%20Gemini%20API%20key%20from%20Google%20AI%20Studio&envLink=https://aistudio.google.com/app/apikey&project-name=jason-svg-studio&repo-name=jason-svg-studio)

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

### One-Click Deploy
Click the "Deploy with Vercel" button above to deploy directly to Vercel. You'll need to provide your Gemini API key during the deployment process.

### Manual Deploy
1. Create a new project on Vercel
2. Connect your Git repository
3. In the project settings, add the following environment variables:
   - `VITE_GEMINI_API_KEY` - Your Gemini API key (get it from [Google AI Studio](https://aistudio.google.com/app/apikey))
   - `VITE_GEMINI_MODEL` - (Optional) The Gemini model to use (default: gemini-2.5-flash)
4. Make sure the build settings are:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `Vite`
5. Deploy!

The project is already configured with the necessary `vercel.json` file for deployment. If you encounter issues with environment variables not being loaded, make sure they are properly set in your Vercel project settings.

## Features

- **Standard Mode**: Create editable vector SVGs with customizable typography and styling
- **AI Artist Mode**: Use Google's Gemini AI to generate artistic SVGs based on text and style prompts
- **Export Options**: Download your creations as SVG or PNG files
- **Responsive Design**: Works on all device sizes