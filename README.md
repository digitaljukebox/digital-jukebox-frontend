# Digital Jukebox (frontend)

Digital Jukebox front end app

## Development
### Install the dependencies
Make sure you have Node.js v14 installed. If you're on a macOS or Linux machine,
you should use nvm to install Node with:
```bash
nvm install 14
```

Next install the project's dependencies with:
```bash
npm i
```

### Start the dev server in SPA mode
```bash
npm run dev
```

### Start the dev server in the iOS App mode
```bash
npm run dev:ios
```

### Start the dev server in the Android App mode
```bash
npm run dev:android
```

### Lint source code
It is recommended that you set up a file watcher or enable eslint support in your IDE
to automatically run this when a js, ts, or vue file is saved.
```bash
npm run lint
```

## Build for production and deploy
### SPA (web app, also includes API for mobile apps)
Follow the steps on [this page](https://firebase.google.com/docs/hosting/quickstart)
to install the Firebase CLI then link it to your project in the Firebase web console.

First build the application with:
```bash
npm run build
```

Next, deploy the built application with:
```bash
firebase deploy
```

### iOS App
```bash
npm run build:ios
```

### Android App
```bash
npm run build:android
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
