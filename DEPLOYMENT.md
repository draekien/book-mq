# BookMQ - Deployment

- [BookMQ - Deployment](#bookmq---deployment)
  - [Important Resources](#important-resources)
  - [Getting Started](#getting-started)
  - [Running the project](#running-the-project)
  - [Continuous Integration / Continuous Delivery (CI/CD)](#continuous-integration--continuous-delivery-cicd)

## Important Resources

- Deployment Location: [https://stark-sierra-09793.herokuapp.com/](https://stark-sierra-09793.herokuapp.com/)
- API Documentation: [https://stark-sierra-09793.herokuapp.com/api-docs/](https://stark-sierra-09793.herokuapp.com/api-docs/)
- UI Designs: [https://www.figma.com/file/VshQF5lPIQgQjuClzXYYVh/COMP3120-BookMQ?node-id=0%3A1](https://www.figma.com/file/VshQF5lPIQgQjuClzXYYVh/COMP3120-BookMQ?node-id=0%3A1)

## Getting Started

Clone this repository by running the below script

```bash
git clone https://github.com/MQCOMP3120-2020/group-project-group-h.git
```

Open up the repository in Visual Studio Code, and run `npm install` to install dependencies

To begin coding, create a new `feature` branch by running the below script in your terminal

```bash
git checkout -b feature/a-new-feature
```

Once you have made your changes, run `git add .` to stage all your changed files, and then run the below script to commit your changes to your `feature` branch

```bash
git commit -m 'my code change description'
```

> This repository has been set up to use pre-commit hooks to format your code using prettier with the help of `husky` and `lint-staged`. You can find out more inforation about how this works [here](https://prettier.io/docs/en/precommit.html#option-2-pretty-quickhttpsgithubcomazzpretty-quick)

Once you have committed your changes, push your changes to the remote repository using `git push` and then navigate to [https://github.com/MQCOMP3120-2020/group-project-group-h.git](https://github.com/MQCOMP3120-2020/group-project-group-h.git) where you will be prompted to create a new `Pull Request`

Once a pull request is created, mention one of the other contributors or message them directly to have them review your code before squashing and merging your changes into `master`.

> Please note that the prefered method of merging changes into master is the `Squash and merge` feature provided by Github as it allows for a cleaner commit history on the `master` branch

If you run into a merge conflict when attempting to merge your `feature` branch into `master`, you will have to resolve them before merging your changes.

## Running the project

> Prerequisite: follow the steps in Getting Started to clone the repository

Open this project in your IDE of choice. Our recommendation is [Visual Studio Code](https://code.visualstudio.com/download) and we will assume that this is the IDE you are using in the below instructions.

Open the terminal in VSCode and run the script `npm install` to install all the node_modules this project depends upon to run.

In the root folder of the project, create a new `.env` file if one does not exist. You will need several secrets in order to run the application. If you do not have these secrets, please contact William Pei at [william.pei@students.mq.edu.au](mailto:william.pei@students.mq.edu.au)

```vim
REACT_APP_JWT_SECRET='<YOUR_JWT_SECRET_THAT_YOU_CAN_SET_YOURSELF>'
REACT_APP_API_URL='/api'
TEST_MONGO_URI=<TEST_MONGO_CONNECTION_STRING>
MONGO_URI=<LIVE_MONGO_CONNECTION_STRING>
```

Now you're ready to start developing! To start the development server, run the command `npm run dev-server` and to start the React App, run the command `npm start`

To assist you in developing the app, you can access the API documentation for the server at [https://stark-sierra-09793.herokuapp.com/api-docs/](https://stark-sierra-09793.herokuapp.com/api-docs/) and the current designs for the application on figma at [https://www.figma.com/file/VshQF5lPIQgQjuClzXYYVh/COMP3120-BookMQ?node-id=0%3A1](https://www.figma.com/file/VshQF5lPIQgQjuClzXYYVh/COMP3120-BookMQ?node-id=0%3A1)

## Continuous Integration / Continuous Delivery (CI/CD)

CI/CD has been set up for this project using Heroku's Github integration feature, which deploys the latest updates on the `master` branch to the live website. This is triggered whenever commits are pushed directly to `master` or when Pull Requests are `merged`. We have also attempted to set up automatic frontend testing using Github actions, however we have run into this issue that is out of our control: `The job was not started because the spending limit for Actions and Packages has been exceeded.`
