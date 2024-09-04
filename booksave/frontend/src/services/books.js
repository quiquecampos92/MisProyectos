import axios from 'axios'

const basedUrl = '/api/books'

const getAllBooks = () => {
    return axios.get(basedUrl)
}

const createBook = (newBook) => {
    return axios.post(basedUrl, newBook)
}

const updateBook = (id, modifiedBook) => {
    return axios.put(`${basedUrl}/${id}`, modifiedBook)
}

const deleteBook = (id) => {
    console.log('Book eliminado');
    return axios.delete(`${basedUrl}/${id}`)
}

export default {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}