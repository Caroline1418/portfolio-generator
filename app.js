const { prompt } = require('inquirer');
const inquirer = require('inquirer')
const fs = require('fs')
const generatePage = require('./src/page-template.js');
// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
// inquirer
//     .prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'What is your name?'
//         }
//     ])
//     .then(answers => console.log(answers));

    const promptUser = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log ('Please enter your name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: 'Enter your GitHub Username',
                validate: githubInput => {
                    if (githubInput){
                        return true
                    } else{
                        console.log ('Please enter GitHub Username')
                        return false;
                    }
                }
            },
                    {
                        type: 'confirm',
                        name: 'confirmAbout',
                        message: 'would you like to enter some information for an "about" section?',
                        default: true
                    },
            {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                when: ({confirmAbout}) => confirmAbout
            }
        ]);
    };
    const promptProject = portfolioData => {
        console.log (`
        =================
        Add a new project
        =================
        `)

        if (!portfolioData.projects){
            portfolioData.projects = [];
        }
        return inquirer
        .prompt ([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: nameInput => {
                    if (nameInput){
                        return true;
                    } else {
                        console.log ('You need to  enter a project name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)',
                validate: descriptionInput => {
                    if (descriptionInput){
                        return true
                    }else{
                        console.log('You need to enter  a project description!');
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you do this project with?',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter theGitHub link to your project. (Required)',
                validate: linkInput => {
                    if (linkInput){
                        return true
                    }else{
                        console.log('You need to enter a GitHub link!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject){
                return promptProject(portfolioData);
            }else {
                return portfolioData;
            }
        });
    };
    promptUser()
    .then(promptProject)
    .then(portfolioData => {
    console.log(portfolioData);
    // will be uncommented in lesson 4
    const pageHTML = generatePage(portfolioData);
    fs.writeFile('./index.html', pageHTML, err => {
        if (err) throw new Error(err);
        console.log('Page created! Check out index.html in this directory to see it!');
    });
    });

