const inquirer = require('inquirer');
const axios = require("axios");

let questions = [
    {
        type: "input",
        name: "favColor",
        message: "What is your favorite color?"
    },
    {
        type: "input",
        name: "username",
        message: "What's your GitHub Username"
    }
]
function init() {
    inquirer.prompt(questions)
        .then(function ({ username }) {
            const queryURL = `https://api.github.com/users/${username}`;

            axios
                .get(queryURL)
                .then(function (res) {
                    console.log(res.data)
                })
        }
        )
}
init();