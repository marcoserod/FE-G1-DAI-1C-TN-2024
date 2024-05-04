This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

>**Note**: Make sure you have installed `yarn`, as it is the selected package manage for this project.

>**Note**: You should have running an endroid emulator environment.

## Step 0: Clone the repo and install required dependencis

```bash
git clone https://github.com/marcoserod/FE-G1-DAI-1C-TN-2024.git
```
### Move to root directory
```bash
cd FE-G1-DAI-1C-TN-2024
```
### Install dependencies
```bash
yarn install
```
### Povide an API key for TMDB

In the file `src/networking/temporal/config/adapters/movieDb.adapter.ts` provide your TMDB API key, otherwise the app won't work at this time.
```
export const movieDbFetcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '', --> YOUR API GOES HERE
    language: 'es',
  },
});
```

## Step A.1: Start the Metro Server and Start the application
```bash
npx react-native run-android  
```

That's all, your app should be working on your emulator :rocket:

>**Note**: You can do the same but in two steps, if you want.

## Step B.1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step B.2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```


