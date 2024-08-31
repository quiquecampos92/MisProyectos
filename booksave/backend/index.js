const express = require('express')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

require('dotenv').config()
const cors = require('cors')

app.use(cors())

// const Book = require(__dirname + "/models/book");
const Book = require('./models/book')



app.get('/api/books', (request, response) => {
    Book.find({}).then(books => {
        response.json(books)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.post('/api/books', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const book = new Book({
        // id: generateId(),
        name: body.name,
        author: body.author,
        points: body.points,
        review: body.review,
        reading_Date: body.reading_Date,
        owner: body.owner,
        read: body.read,
        price: body.price
    })

    book.save().then(savedBook => {
        response.json(savedBook)
    })
})


// app.delete('/api/books/:id', (request, response) => {
//     const id = Number(request.params.id)
//     books = books.filter(book => book.id !== id)

//     response.status(204).end()
// })


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})