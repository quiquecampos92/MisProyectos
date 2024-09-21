const booksRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// Ruta para obtener todos los blogs
booksRouter.get('/', async (request, response) => {
    const books = await Book
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(books)
})

// Ruta para obtener un blog específico por id
booksRouter.get('/:id', async (request, response, next) => {

    const book = await Book.findById(request.params.id)
    if (book) {
        response.json(book)
    } else {
        response.status(404).end() // Si no encuentra el book, retorna un 404
    }
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

booksRouter.post('/', async (request, response, next) => {
    const { name, author, points, review, reading_Date, owner, read, price, userId } = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    // Validar que el título y la URL estén presentes
    if (!name || !points || !read || !price) {
        return response.status(400).json({ error: 'name, points, read and price are required' })
    }

    const book = new Book({
        name,
        author,
        points,
        review,
        reading_Date,
        owner,
        read,
        price,
        user: userId
    })

    try {
        const savedBook = await book.save()
        user.books = user.books.concat(savedBook._id)
        await user.save()
        response.status(201).json(savedBook)
    } catch (error) {
        next(error)
    }
})


// Ruta para eliminar un blog
booksRouter.delete('/:id', async (request, response, next) => {
    await Book.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

// Ruta para actualizar un blog existente
booksRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const book = {
        name: body.name,
        author: body.author,
        points: body.points,
        review: body.review,
        reading_Date: body.reading_Date,
        owner: body.owner,
        read: body.read,
        price: body.price
    }

    const updatedBook = await Book.findByIdAndUpdate(request.params.id, book, { new: true })
    response.json(updatedBook)
})

module.exports = booksRouter