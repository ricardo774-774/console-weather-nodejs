const inquirer = require('inquirer');

require('colors');

// Main Search Options
const questionsOpt = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.blue} Search City`
            },
            {
                value: 2,
                name: `${'2.'.blue} History`
            },
            {
                value: 0,
                name: `${'0.'.blue} Exit`
            }
        ]
    }
];

// Pause Press ENTER before continuing
const questionPau = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} for continue`,
    }
]

// Save option and show Main Menu
const inquireMenu = async() => {


    console.log('========================='.blue);
    console.log('        Main Menu     '.blue);
    console.log('   (By Ricardo Velez)     ');
    console.log('=========================\n'.blue);

    const { option } = await inquirer.prompt(questionsOpt); 
    return option;

}

// Pause
const inquirePause = async() => {

    console.log('');
    return await inquirer.prompt(questionPau); 
    
}

// Save information entered from the place
const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                return ( value.length === 0 )
                  ? 'Enter a value'
                  : true
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

// Show Places Options
const listPlaces = async( places = []) => {
    const choices = places.map( (place, i) => {
        const index = `${i + 1}.`.blue;
        return {
            value: place.id,
            name: `${index} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.blue + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select a Place: ',
            choices, 
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

// Confirm Options
const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


module.exports = {
    inquireMenu,
    inquirePause,
    readInput,
    listPlaces,
    confirm,
}