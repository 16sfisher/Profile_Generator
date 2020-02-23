const inquirer = require("inquirer");
const axios = require("axios");

const pdf = require("html-pdf");

inquirer.prompt(
    [{
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        message: "What is your favorite color?",
        name: "color"
    }
    ]).then(function (input) {

        axios.get("https://api.github.com/users/" + input.username).then(function (response) {
            console.log(response);
            const color = input.color;

            const username = input.username;
            const image = response.data.avatar_url;

            const location = response.data.location;
            const gitHub = response.data.html_url;

            const blog = response.data.blog;
            const bio = response.data.bio;

            const numRepos = response.data.public_repos;

            const numFollowers = response.data.followers;
            const numFollowing = response.data.following;

            const reposURL = response.data.repos_url;

            let numStars = 0;

            axios.get(reposURL).then(function (repos) {
                for (let repo of repos.data) {
                    numStars += repo.stargazers_count;
                }
            });

            let htmlContent = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <title>Document</title>
            </head>
            <style>
                .lead {
                    font-size: 14pt;
                }
                .card {
                    background-color: ${color};
                }
                .image {
                    text-align: center;
                    padding-bottom: 25px;
                }
            
            </style>
            <body>
                <div class="jumbotron center">
                    
                    <h2 style="text-align: center;" class="display-5">GitHub Username: ${username} </h2>
                    <hr class="my-4">
                    <p class="lead">Bio: ${bio}</p>
                    <p>More info can be found on their portfolio: <a href="${blog}" target="_blank"> Link Here</a></p>
                    <p>Here is a link to their GitHub profile: <a href="${gitHub}" target="_blank"> Click Here</a></p>
                  </div>
                  <div class="image">
                  <img src="${image}" width="20%" alt="Profile image"/>
              </div>
      
                  <div class="card">
                    <div class="card-body">
                        <p>Location: ${location}</p>
                        <p>Number of public repositories: ${numRepos}</p>
                        <p>Number of followers: ${numFollowers}</p>
                        <p>Number of following: ${numFollowing}</p>
                        <p>Total number of stars: ${numStars}</p>
                    </div>
                  </div>    
                 </body>
            </html>`;

            //Convert to pdf
            const options = { "orientation": "portrait" };

            pdf.create(htmlContent, options).toFile("./" + username + ".pdf", function (err, res) {
                if (err) {
                    console.log(err);
                    return
                }
            });
        });
    });