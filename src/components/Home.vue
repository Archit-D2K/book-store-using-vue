<template>
  <div class="w-[100vw] flex flex-col gap-5 h-screen ">
    <Navbar />
    <div class="flex  mx-auto justify-center gap-5 mt-8">
      <h2 class="text-xl font-semibold">Add a Book</h2>
      <div>
        <Button @click="openDialog()" variant="solid" theme="green">Add New Book</Button>
        <Dialog v-model="dialog2">
          <template #body-title>
            <h3 class="text-lg font-semibold">{{ isEditing ? 'Edit Book' : 'Add a Book' }}</h3>
          </template>
          <template #body-content>
            <div class="flex flex-col gap-5">
              <div class="flex items-center gap-5">
                <p class="w-32">Book Title</p>
                <TextInput
                  type="text"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter book title"
                  v-model="bookTitle"
                  style="width: 100%"
                />
              </div>
              <div class="flex items-center gap-5">
                <p class="w-32">Book Genre</p>
                <div class="flex-1">
                  <Select
                    :options="genres"
                    v-model="bookGenre"
                    class="w-full"
                  />
                </div>
              </div>
              <div class="flex items-center gap-5">
                <p class="w-32">Description</p>
                <textarea
                  class="w-full h-20 resize-none border rounded-md p-2"
                  placeholder="Enter a short description"
                  v-model="shortDescription"
                ></textarea>
              </div>
              <div class="flex items-center gap-5">
                <p class="w-32">Price</p>
                <TextInput
                  type="number"
                  size="sm"
                  variant="subtle"
                  placeholder="Enter price"
                  v-model="price"
                  class="flex-1"
                />
              </div>
              <div class="flex items-center gap-5">
                <p class="w-32">Book Image</p>
                <FileUploader
                  :fileTypes="['image/*']"
                  @success="handleFileUpload"
                >
                  <template #default="{ openFileSelector }">
                    <Button @click="openFileSelector">Upload Image</Button>
                  </template>
                </FileUploader>
              </div>
            </div>
          </template>
          <template #actions>
            <Button variant="solid" theme="green" :loading="isSubmitting" @click="submitBook">{{ isEditing ? 'Update Book' : 'Add Book' }}</Button>
            <Button class="ml-2" @click="closeDialog">Cancel</Button>
          </template>
        </Dialog>
      </div>
    </div>
    
    <!-- Books Display Section -->
    <div class="  mx-auto gap-5 ">
      <Books @edit="openDialog" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import Navbar from "./Navbar.vue";
import { TextInput, Dialog, Button, Select, FileUploader } from "frappe-ui";
import Books from './Books.vue';
import BIRDS from 'vanta/dist/vanta.birds.min';



export default {
  name: "Home",
  components: {
    Navbar,
    Dialog,
    Button,
    TextInput,
    Select,
    FileUploader,
    Books
  },

  data() {
    return {
      dialog2: false,
      bookId: null,
      bookTitle: '',
      bookGenre: '',
      shortDescription: '',
      price: '',
      bookImage: null,
      isSubmitting: false,
      isEditing: false,
      loading: false,
      error: null,
      genres: [
        { label: 'Romance', value: 'Romance' },
        { label: 'Fantasy', value: 'Fantasy' },
        { label: 'Mystery', value: 'Mystery' },
        { label: 'Horror', value: 'Horror' },
      ],
    };
  },
  computed: {
    ...mapState(['books']),
  },
  methods: {
    ...mapActions(['fetchBooks']),
    handleFileUpload(file) {
      this.bookImage = file;
    },
    openDialog(book = null) {
      if (book) {
        this.bookId = book._id;
        this.bookTitle = book.title;
        this.bookGenre = book.genre;
        this.shortDescription = book.description;
        this.price = book.price;
        this.bookImage = book.image;
        this.isEditing = true;
      } else {
        this.resetForm();
        this.isEditing = false;
      }
      this.dialog2 = true;
    },
    async submitBook() {
      if (!this.bookTitle || !this.bookGenre || !this.shortDescription || !this.price) {
        alert('Please fill in all required fields!');
        return;
      }

      this.isSubmitting = true;

      try {
        let imageData = this.bookImage;
        
        if (this.bookImage instanceof File) {
          imageData = await this.convertImageToBase64(this.bookImage);
        }

        const bookData = {
          title: this.bookTitle,
          genre: this.bookGenre,
          description: this.shortDescription,
          price: parseFloat(this.price),
          image: imageData || 'default-book-image.jpg',
        };

        if (this.isEditing) {
          await axios.put(`${import.meta.env.VITE_API_NEW_URL}/books/${this.bookId}`, bookData);
          alert('Book updated successfully!');
        } else {
          await axios.post(import.meta.env.VITE_API_NEW_URL+'/books', bookData);
          alert('Book added successfully!');
        }
        
        await this.fetchBooks();
        this.closeDialog();
      } catch (error) {
        console.error('Error saving book:', error);
        alert(error.response?.data?.message || 'Failed to save book. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    closeDialog() {
      this.dialog2 = false;
      this.resetForm();
    },
    resetForm() {
      this.bookId = null;
      this.bookTitle = '';
      this.bookGenre = '';
      this.shortDescription = '';
      this.price = '';
      this.bookImage = null;
      this.isEditing = false;
    },
    convertImageToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
  },
  async created() {
    this.loading = true;
    try {
      await this.fetchBooks();
    } catch (error) {
      this.error = 'Failed to load books. Please try again later.';
      console.error('Error fetching books:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
/* Add any additional styles if needed */
</style>
