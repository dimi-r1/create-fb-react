# Create Blaze App 🔥

A blazing fast CLI tool to scaffold React applications with Firebase authentication and modern tooling.

## Quick Start

```bash
npx create-blaze-app my-app
cd my-app
npm run dev
```

## What's Included

This CLI creates a React application with:

- ⚡ **React 19** with TypeScript
- 🔥 **Firebase Authentication** (Google OAuth ready)
- 🚀 **Vite** for fast development and building
- 🎨 **Tailwind CSS v4** for styling
- 🧩 **Shadcn UI** components
- 📡 **TanStack React Query** for state management
- 🛣️ **React Router v7** for routing
- 📱 **Responsive design** with mobile-first approach

## Usage

### Basic Usage

```bash
npx create-blaze-app my-app
```

### Interactive Mode

If you don't provide a project name, the CLI will prompt you:

```bash
npx create-blaze-app
? What is your project name? my-awesome-app
```

## After Creation

1. **Navigate to your project:**

   ```bash
   cd my-app
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

3. **Configure Firebase:**

   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Google Authentication
   - Add your Firebase config to `.env.local`

4. **Start developing:**
   ```bash
   npm run dev
   ```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication → Google provider
4. Get your config from Project Settings → General → Your apps
5. Add the config to your `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Project Structure

The generated project follows a feature-based architecture:

```
src/
├── api/           # API layer with queries and mutations
├── components/    # Reusable UI components
├── pages/         # Page components
├── providers/     # Context providers (auth, theme)
├── router/        # Routing configuration
└── hooks/         # Custom React hooks
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Found a bug or want to contribute? Visit the [GitHub repository](https://github.com/dimi-r1/create-blaze-app).

## License

MIT © Dimi R1
