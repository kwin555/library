import axios from 'axios'

const API_URL = 'http://localhost:3000/books'

export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw new Error(
      error.response?.data?.message || 'Request failed with status code 500'
    )
  }
}

export const addBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book)
    return response.data
  } catch (error) {
    console.error('Error adding book:', error)
    throw new Error(
      error.response?.data?.message || 'Request failed with status code 500'
    )
  }
}

export const updateBook = async (id, book) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, book)
    return response.data
  } catch (error) {
    console.error('Error updating book:', error)
    throw new Error(
      error.response?.data?.message || 'Request failed with status code 500'
    )
  }
}

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting book:', error)
    throw new Error(
      error.response?.data?.message || 'Request failed with status code 500'
    )
  }
}
