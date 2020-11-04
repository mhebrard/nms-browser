# NMS Browser

Goal: Display No Man's Sky regions in 3D and navigate through star systems

## Datasource

Data are sourced from google spreadsheets.

1. Create a spreadsheet with the structure:
  `SSI, Original Name, PC Name, PS4 Name, XBOX Name, Star Class, Star Color, Race, Economy, Economy Tier, Sell, Buy, Wealth, Wealth Tier, Conflict, Conflict Tier, Planets, Moons, Discovered by, Date, Distance Center, Coordinates, Glyphs`
2. rename the tab as "Catalogue"
3. Fill data
4. Share spreadsheet
  a. Click on "File/Publish on the Web"
  b. Select the tab "Catalogue"
  c. Select "Tab-separated value (.tsv)
  d. Click on "Publish"
  e. Copy the link
  f. Create a new region entry in `/src/data/regions.js`
5. Create a new tab "Distances" with the structure:
  `Star system A, SSI A, Star system B, SSI B, Distance (LY)`
6. Fill data
7. Share spreadsheet

## Deploy on github

1. Install gh-page package
`npm i gh-pages`
2. Add homepage to `package.json`
`"homepage" : "https://mhebrard.github.io/nms-browser"`
3. Add scripts to `package.json`
`"predeploy": "npm run build",`
`"deploy": "gh-pages -d build",`
4. Deploy app:
`npm run deploy`

## React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
