This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install dependencies, build, and run your server.

In the project directory, you can run:

### `npm i` or `yarn install`
This will install dependencies.

### `npm start` or `yarn start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## For each directory in your project, explain its role and what types of files should go into it.
There are two notable directories in this project:

### Components
These are standard react components with no business logic, purely for display purposes on the UI.

### Services
These are a collections of services which interact directly with the state of the app.

The OpenSeaEventService is responsible for storing state, and App.js subscribes to updates from this service, which in turn updates all the props throught the app. The UserService is responsible for detecting Web3, or an anon user, and adding comments to the eventStore in the OpenSeaEventService.

## How much time you spent on design implementation, framework setup, API connection, and interactive components / UX

### design implementation - 30 mins
Most of the time here was spend deciding which react component library to use. I decided on Semantic React UI because of the look and feel of their Feed component.

### framework setup - 5 mins
Using create-react-app I had the framework up and running in minutes.

### API connection - 20 mins
Simply done in the OpenSeaEventService with a fetch, more time was spent on picking out attributes to store in the eventStore.

### interactive components / UX - 3 hours
Hooking it all together took, understandly, the most amount of time.

### manual testing - 1 hour
I took about one hour to manually test the app to find any edge cases I may have missed during development.

