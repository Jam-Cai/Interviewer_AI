# AI Interviewer

## Deployment on Render

### Setup Instructions

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the following settings:
   - **Name**: Your service name
   - **Environment**: Node
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (defaults to root)

4. Add the following environment variables:
   - `OPENAI_KEY`: Your OpenAI API key
   - `LEMONFOX_KEY`: Your LemonFox API key
   - `PORT`: Leave empty (Render will set this)
   - `FRONTEND_URL`: The URL of your deployed frontend (if separate) or set to `*` for any origin

5. Click "Create Web Service"

### Monorepo Deployment (Frontend + Backend)

For deploying the entire app on a single Render service, the build process is already set up to:
1. Install server dependencies
2. Install client dependencies
3. Build the client
4. Copy the built files to the server's `dist` directory
5. Serve the frontend from the backend Express server

### Troubleshooting

- If you see 503 errors, check the Render logs for build/startup issues
- Ensure all environment variables are correctly set
- Make sure the Node.js version is set in the `engines` field of package.json 