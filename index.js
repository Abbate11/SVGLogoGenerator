const Inquirer = require('inquirer');
const Colors = require('colors');

Inquirer
    .promt([
{
    type: 'input',
    name: 'initials',
    message: Colors.bgMagenta('Enter up to 3 characters for your initials...')
},
{
    type: 'input',
    name: 'text-color',
    message: Colors.bgMagenta('Enter color keyword or Hex# for your text color...')
},
{
    type: 'list',
    name: 'shape',
    message: Colors.bgMagenta('Choose a shape for your logo...'),
    choices: ['Circle', 'Triangle', 'Square']
}
    ]);