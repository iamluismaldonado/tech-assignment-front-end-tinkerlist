# tech-assignment-front-end-tinkerlist

This is the tech assignment fo TinkerList.

## Server Setup

```sh
cd server
```

## Run Server

```sh
node index
```

## UI Setup

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Technical Front End Developer Assingment

If you made it all the way here, congratulations! A new challenge has arrived though. 💪

Time for a technical assignment! Take as much time as you need to deliver your solution, while being reasonable. Please let us know if there are any unexpected delays or reasons why you can't take the test at this time. For any further questions, contact us via you HR contact at our company.

## Instructions

- Clone this repo
- Complete this exercise and submit either a zip of the solution or a link to a new repo
- Please target the latest stable release of Vue.js
- Use the [OpenWeatherMap API](https://openweathermap.org/api) for weather data

## Requirements

- Solution should be responsive
- There should be an input where the user can write the location (city, for example) they want to get info for
- Show the weather info currently for the input location:
  - Location (ie. Brussels, Belgium)
  - Current weather description (ie. raining)
  - Current temperature
  - Today's high temperature
  - Today's low temperature
- Add extra info about the current conditions on a hidden component the user can toggle the visibility:
  - Wind Speed
  - Humidity
  - Pressure
  - Sunrise/Sunset Time
- Show basic weather info for the next 7 days on that location
- Show basic weather info for the last 5 days on that location
- If there's a need to make a big number of requests, make them concurrent

## Bonus Round:

**Was this too easy?**

- Pre-fill the input field with the user current location
- Deliver the solution hosted on your favourite cloud service with any appropriate changes you'd feel are relevant for a hosted solution
- Show the location on a map
- Auto complete the location input as the user types
- Lazy-load weather info
- Surprise us :)
