#!/usr/bin/env node
let shell = require('shelljs');
let colors = require('colors');
let fs = require('fs');
let packageJson = require('./package.json');

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;
const additionalPackages = ["redux", "react-router", "react-redux", "redux-thunk", "react-router-dom", "bootstrap",
  "reactstrap", "moment", "classnames", "axios"];

const createReactApp = () => {
  return new Promise(resolve => {
    if (appName) {
      shell.exec(`create-react-app ${appName}`, () => {
        console.log("Basic react app created");
        resolve(true)
      })
    } else {
      console.log("\nNo app name was provided.".red);
      console.log("\nProvide an app name in the following format: ");
      console.log(`\n${packageJson.name} `, "app-name\n".cyan);
      resolve(false);
    }
  })
};

const goToCreatedDirectory = () => {
  return new Promise(resolve => shell.exec(`cd ${appName}`, () => resolve()));
};

const installAdditionalPackages = () => {
  return new Promise(resolve => {
    console.log("\nInstalling essential packages\n".cyan);
    shell.exec(`npm install --save ${additionalPackages.join(' ')}`,
        () => {
          console.log("\nFinished installing packages\n".green);
          resolve()
        })
  })
};

const updateTemplates = () => {
  return new Promise(resolve => {
    console.log("\nNo templates to update");
    resolve();
  });
};

const run = async () => {
  let success = await createReactApp();
  if (!success) {
    console.log('Something went wrong while trying to create a new React app using create-react-app'.red);
    return false;
  }
  await goToCreatedDirectory();
  await installAdditionalPackages();
  await updateTemplates();
};

run().then(() => console.log("All done"));