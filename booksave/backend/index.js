const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

const Book = require('./models/book')



app.get('/api/books', (request, response) => {
    Book.find({}).then(books => {
        response.json(books)
    })
})

app.get('/api/books/:id', (request, response) => {
    Book.findById(request.params.id)
        .then(book => {
            if (book) {
                response.json(Book)
            } else {
                response.status(404).end()
            }
        })
})

app.post('/api/books', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    const book = new Book({
        name: body.name,
        author: body.author,
        points: body.points,
        review: body.review,
        reading_Date: body.reading_Date,
        owner: body.owner,
        read: body.read,
        price: body.price
    })

    book.save()
        .then(savedBook => {
            response.json(savedBook)
        })
        .catch(error => next(error))
})

app.put('/api/books/:id', (request, response, next) => {
    const { name, author, points, review, reading_Date, owner, read, price } = request.body


    Book.findByIdAndUpdate(request.params.id, { name, author, points, review, reading_Date, owner, read, price }, { new: true, runValidators: true, context: 'query' })
        .then(updatedBook => {
            response.json(updatedBook)
        })
        .catch(error => next(error))
})

app.delete('/api/books/:id', (request, response, next) => {
    Book.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
            console.log(result);
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})