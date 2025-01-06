<template>
  <div class="">
    <div v-if="books && books.length" class="flex items-center justify-center flex-wrap gap-5 sm:p-5">
      <BookCard 
        v-for="book in books" 
        :key="book._id" 
        :book="book"
        @edit="editBook"
        @delete="deleteBook"
        style="margin-right: 1rem;width: 20rem ; margin-top: 3rem ;padding: 1rem;"
      />
    </div>
    <div v-else class="text-center text-gray-500">
      No books available. Please add some books.
    </div>
  </div>
</template>

<script>
import BookCard from './BookCard.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    BookCard,
  },
  computed: {
    ...mapState(['books'])
  },
  methods: {
    ...mapActions(['fetchBooks']),
    editBook(book) {
      this.$emit('edit', book);
    },
    async deleteBook(bookId) {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await this.$store.dispatch('deleteBook', bookId);
          await this.fetchBooks();
          alert('Book deleted successfully!');
        } catch (error) {
          console.error('Error deleting book:', error);
          alert('Failed to delete book. Please try again.');
        }
      }
    }
  }
};
</script>