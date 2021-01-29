const inquirer = require('inquirer');
const fs = require('fs');
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

//Prompts the user for questions in regards to the README file
inquirer
    .prompt ([
        {
            type:'input', 
            message:'What is the title of your project?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Give a description of you project',
            name: 'description',
        },
        {
            type: 'input',
            message: 'What are the installation instructions for this project?',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'What is the usage of this project?',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'Who helped you to complete this project?',
            name: 'contributors',
        },
        {
            type: 'list',
            message: 'Licences',
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None'],
            name: 'license' 
        },
        {
            type: 'input',
            message: 'Any Tests to be included in this project?',
            name: 'tests',
        },
        {
            type: 'input',
            message: 'What is your GitHub account name?',
            name: 'ghaccount',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
        
    ]).then((data) => {
        const markdown = generateReadme(data);
        return writeFileAsync('README.md', markdown);

    }).then (function () {
        console.log("Successfully wrote Readme file");
    }).catch (function (error){
        console.log(error);
    });
        

function generateReadme(data) {
    return `# ${data.title}



## Description
${data.description}


***
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributors](#contributors)
* [Tests](#tests)
* [Questions](#questions)
* [License](#License)


***
## Installation
${data.installation}


***
## Usage
${data.usage}


***
## Contributors
${data.contributors}


***
## Tests
${data.tests}


***
## Questions
For questions about this project please reach out to me!

[My Github Account]('https://github.com/${data.ghaccount}')

[My Email]('${data.email}')


***
## License
![Badge](https://img.shields.io/badge/license-${data.license}-blue.svg)

***`
};