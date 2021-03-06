#!/usr/bin/env node
let shell = require('shelljs');
let fs = require('fs');
let asciify = require('asciify');
let path = require('path');
let packageJson = require('./package.json');
let templates = require('./templates/templatesLoader.js');

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;
const additionalPackages = ["redux", "react-router",
  "react-redux", "redux-thunk", "react-router-dom", "bootstrap",
  "reactstrap", "moment", "classnames", "axios"];


const run = async () => {

  let success = await createReactApp();
  if(!success){
    console.log('Something went wrong while trying to create a new React app using create-react-app'.red);
    return false;
  }
  await goToCreatedDirectory();
  await installAdditionalPackages();
  await updateTemplates();
  asciify('STACK READY', {font: 'standard'}, (err, res) => console.log(res))
};

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
  console.log(`Enter ${appName} directory`);
  return new Promise(resolve => shell.exec(`cd ${appName}`, () => resolve(true)));
};

const installAdditionalPackages = () => {
  return new Promise(resolve => {
    console.log("\nInstalling essential packages\n".cyan);
    shell.exec(`cd ${appDirectory} && yarn add ${additionalPackages.join(' ')}`,
        () => {
          console.log("\nFinished installing packages\n".green);
          resolve()
        })
  })
};

const createDirectory = (filePath) => {
  const directoryName = path.dirname(filePath);
  if (fs.existsSync(directoryName)) {
    return true;
  }
  createDirectory(directoryName);
  fs.mkdirSync(directoryName);
};

const updateTemplates = () => {
  return new Promise(resolve => {
    let promises = [];
    Object.keys(templates).forEach((fileName, i) => {
      promises[i] = new Promise(res => {
        const writePath = `${appDirectory}/src/${fileName}`;
        createDirectory(writePath);
        fs.writeFile(writePath, templates[fileName], (err) => {
          if (err) {
            return console.log(err)
          }
          res()
        })
      })
    });
    Promise.all(promises).then(() => {
      resolve()
    })
  })
};

run();