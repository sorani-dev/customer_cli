const mongoose = require('mongoose')

// Connect to Db (mongoose >= 6.x)
const e = mongoose.connect('mongodb://localhost:27017/customercli').then((ans) => {
    console.log("ConnectedSuccessful\n")
}).catch((err) => {
    console.log("Error in the Connection\n")
})
const db = mongoose.connection

// Import Model
const Customer = require('./models/Customer')

// Add Customer
const addCustomer = (customer) => {
    Customer.create(customer)
        .then(customer => {
            console.info('New Customer Added')
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            db.close()
        })
}

// Update Customer
const updateCustomer = (_id, customer) => {
    Customer
        .findByIdAndUpdate(_id, customer, { overwrite: true, new: false })
        .then(customer => {
            console.info('Customer Updated')
        })
        .catch(err => console.error(err))
        .finally(() => {
            db.close().then(() => { })
        })
}

// Remove Customer
const removeCustomer = _id => {
    Customer
        .findByIdAndDelete(_id)
        .then(customer => {
            console.info('Customer Removed')
        })
        .catch(err => console.error(err))
        .finally(() => {
            db.close().then(() => { })
        })
}

// Find Customer
const findCustomer = name => {
    // Make case insensitive
    const search = new RegExp(name, 'i')
    Customer.find({ $or: [{ firstName: search }, { lastName: search }] })
        .then(customer => {
            console.info(customer)
            console.info(`${customer.length} match${customer.length === 1 ? '' : 'es'}`)
        })
        .finally(() => {
            db.close().then(() => {
                console.log('Customer find:: connection closed')
            })
        })
}

// List Customers
const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers)
            console.info(`${customers.length} customers`)
        })
        .catch(err => console.error(err))
        .finally(() => {
            db.close().then(() => {
            })
        })
}

// Export All Methods
module.exports = {
    addCustomer,
    findCustomer,
    listCustomers,
    removeCustomer,
    updateCustomer,
}
