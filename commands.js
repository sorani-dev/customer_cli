const { program } = require('commander')
const { prompt } = require('inquirer')
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCostumers
} = require('./index')

// Customer Questions
const questions = [
    {
        type: 'input',
        name: 'firstName',
        message: 'Customer First Name'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Customer Last Name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer Email Address'
    },
]

program
    .version('1.0.0')
    .description('Client Management System')

/* program
    .command('add <firstName> <lastName> <phone> <email>')
    .alias('a')
    .description('Add a customer')
    .action((firstName, lastName, phone, email) => {
        addCustomer({ firstName, lastName, phone, email })
    }) */

// Add Command
program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers))
    })

// Find Command
program
    .command('find <name>')
    .alias('f')
    .description('Find a customer')
    .action(name => findCustomer(name))


// List Command
program
    .command('list')
    .alias('l')
    .description('List all customers')
    .action(() => listCostumers())

// Update Command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action(_id => {
        prompt(questions).then(answers => updateCustomer(_id, answers))
    })

// Remove Command
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a customer')
    .action(_id => {
        removeCustomer(_id)
    })

program.parse(process.argv)