import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_NEW_URL;

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use(config => {
  // Add token to headers if exists
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    books: [],
    error: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    },
    setBooks(state, books) {
      state.books = books;
    },
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('setUser', userData);
    },
    logout({ commit }) {
      commit('setUser', null);
    },
    async fetchBooks({ commit }) {
      try {
        const response = await axiosInstance.get('/books');
        commit('setBooks', response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        commit('setError', error.message);
        throw error;
      }
    },
    async deleteBook({ dispatch }, bookId) {
      try {
        await axiosInstance.delete(`/books/${bookId}`);
        await dispatch('fetchBooks');
      } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
      }
    },
    async updateBook({ dispatch }, { bookId, bookData }) {
      try {
        await axiosInstance.put(`/books/${bookId}`, bookData);
        await dispatch('fetchBooks');
      } catch (error) {
        console.error('Error updating book:', error);
        throw error;
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    getBooks: (state) => state.books,
    getError: (state) => state.error
  }
});

export default store;
