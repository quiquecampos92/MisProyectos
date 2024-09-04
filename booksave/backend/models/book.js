const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

let bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        minlength: 2,
    },
    points: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 1
    },
    review: {
        type: String,
        required: true,
        minlength: 5
    },
    reading_Date: {
        type: String,
    },
    owner: {
        type: String,
    },
    read: {
        type: Boolean,
        required: true,
        default: true
    },
    price: {
        type: Number,
        required: true,
    }
})

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
