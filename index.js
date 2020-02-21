const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: "input",
        name: "favColor",
        message: "What is your favorite color?"
    },
    {
        type: "input",
        name: "githubUsername",
        message: "What's your GitHub Username"
    }
]).then(function(res) {
    console.log(res.githubUsername)
})