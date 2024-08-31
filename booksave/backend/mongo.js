const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://quiquecampos92:${password}@cluster0.dg7nw.mongodb.net/bookSave?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

let bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        minlength: 1,
        min: 1
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: String,
        minlength: 1,
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
        minlength: 10
    },
    reading_Date: {
        type: Date,
        required: true,
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

const Book = mongoose.model('Book', bookSchema)

// const book = new Book({
//     id: 1,
//     name: "HTML is easy",
//     author: "Author 1",
//     points: 5,
//     review: "Good bookkjwhfkjf",
//     reading_Date: "2021-10-10",
//     owner: "Owner 2",
//     read: true,
//     price: 19
// })

// book.save().then(result => {
//     console.log('book saved!')
//     mongoose.connection.close()
// })

Book.find({}).then(result => {
    result.forEach(book => {
        console.log(book)
    })
    mongoose.connection.close()
})
