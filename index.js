const fs = require("fs");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require("html-pdf");
// const convertFactory = require("electron-html-to");
const generateHTML = require("./generateHTML");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your github username?"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color?",
    choices: ["green", "blue", "pink", "red"]
  }
];

function firstCall() {
  return new Promise(function(resolve, reject) {
    inquirer.prompt(questions).then(async function(answers) {
      //questions.username & questions.color
      const { username, color } = answers;
      const queryUrl = `https://api.github.com/users/${username}`;
      try {
        const response = await axios.get(queryUrl);
        const stars = await secondCall(username);
        resolve({
          ...response.data,
          color,
          stars
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}

function init() {}

init();
