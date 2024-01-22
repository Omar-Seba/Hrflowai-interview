## To test this react app I created for HrFlow.ai

## Prerequisites

Before running the project, make sure you have `pnpm` installed. If you don't have `pnpm` installed, you can install it using the following command:

```bash
npm install -g pnpm
```

#### `pnpm install`

Installs all the necessary dependencies for the project. This command reads the `package.json` file and installs the libraries and packages required to run and develop the application. It is the first command that should be run after cloning the repository to set up the project environment.

### `pnpm run build`

Builds the application for production. This command compiles the React application into static files, optimizes them for performance, and outputs them to the `build` directory. Use this command to create a production-ready version of your application.

### `pnpm install -g serve`

Installs the `serve` package globally on your system. `serve` is a static server that lets you serve static files easily. This command is typically used to install the `serve` tool, which can then be used to run the production build of your React application locally or for testing purposes.

### `serve -s build`

Starts a static server to serve the contents of the `build` directory. This command launches a web server and makes your production build accessible through a URL. Use this command to locally test the production build of your application.

### `pnpm test`

Launches the test runner

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
