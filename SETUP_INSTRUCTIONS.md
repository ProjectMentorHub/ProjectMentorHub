# Firebase Setup Instructions for ProjectMentorHub

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `projectmentorhub` (or any name you prefer)
4. Continue through the setup wizard

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **Get Started**
3. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Get Your Firebase Credentials

1. In Firebase Console, click on ⚙️ **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click on the **Web icon** `</>`
4. Register your app (e.g., name: "Web")
5. Copy the Firebase configuration

## Step 4: Create .env File

1. In your project root directory (`/home/abel/myprojects/website/`), create a file named `.env`
2. Add the following content with your Firebase credentials:

```env
REACT_APP_FIREBASE_API_KEY=AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789012
REACT_APP_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

**Important Notes:**
- Replace the values with YOUR actual Firebase credentials
- DO NOT include quotes around the values
- DO NOT commit `.env` to git (it's already in `.gitignore`)

## Step 5: Restart Development Server

After creating/modifying the `.env` file, you MUST restart the development server:

```bash
# Stop the current server (Ctrl+C)
# Then start it again:
npm start
```

## Testing Authentication

1. Visit `http://localhost:3000/login`
2. Click "Sign up" to create an account
3. Enter:
   - Full Name: (your name)
   - Email: (your email)
   - Password: (at least 6 characters)
4. Click "Sign Up"
5. You should see a success message and be redirected to home page

## Troubleshooting

### Error: "Firebase not initialized"
- Make sure `.env` file exists in the project root
- Check that all environment variables start with `REACT_APP_`
- Restart the development server after creating `.env`

### Error: "Missing/invalid Firebase API key"
- Verify your API key starts with "AIza"
- Check that the `.env` file is in the correct location (project root)
- Ensure no extra spaces or quotes around values

### Error: "Email already in use"
- This email is already registered. Try logging in instead.

### Authentication not working
- Check Firebase Console → Authentication → Users to see if users are being created
- Verify Email/Password is enabled in Firebase Console
- Check browser console for detailed error messages

## Security Note

The `.env` file contains sensitive credentials. Never commit it to version control. The project already has `.env` in `.gitignore`.

## Next Steps

Once authentication is working:
- You can sign up and log in
- The login/logout button appears in the navbar
- You can access protected routes (if you add them)

