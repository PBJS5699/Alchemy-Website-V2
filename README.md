# Your Website

This is a modern React website template built with Vite and TypeScript, ready to be deployed with AWS Amplify.

## Features

- ⚡️ Built with Vite for lightning-fast development
- 🎯 TypeScript for type safety
- 💅 Modern and responsive design
- 📱 Mobile-friendly layout
- 🚀 Ready for AWS Amplify deployment

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- AWS account (for deployment)

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

```bash
npm run build
```

This will create a `dist` folder with your compiled assets.

## Deploying to AWS Amplify

1. Install and configure the AWS Amplify CLI
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. Initialize Amplify in your project
```bash
amplify init
```

3. Push your changes to a Git repository (GitHub, GitLab, or BitBucket)

4. Connect your repository to AWS Amplify through the AWS Console:
   - Go to AWS Amplify Console
   - Click "New App" > "Host Web App"
   - Choose your repository provider and follow the setup steps

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs the linter
- `npm run preview` - Preview the production build locally

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
