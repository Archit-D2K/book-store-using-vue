<template>
  <div ref="vantaContainer" class="w-[100vw] flex flex-col gap-5 h-screen">
    <Navbar />
    <div class="flex mx-auto justify-center gap-5 mt-8">
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
                <Select
                  :options="genres"
                  v-model="bookGenre"
                  class="w-full"
                />
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
              <div class="flex items-center gap-5 ">
                <p class="w-32">Book Image</p>
                <ImageUpload  @image-uploaded="onImageUploaded" />
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
    <div class="mx-auto gap-5">
      <Books @edit="openDialog" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import Navbar from "./Navbar.vue";
import { TextInput, Dialog, Button, Select } from "frappe-ui";
import Books from './Books.vue';
import BIRDS from 'vanta/dist/vanta.birds.min';
import { onMounted, onBeforeUnmount, ref } from 'vue';
import ImageUpload from './ImageUpload.vue';

export default {
  name: "Home",
  components: {
    Navbar,
    Dialog,
    Button,
    TextInput,
    Select,
    Books,
    ImageUpload
  },
  setup() {
    const vantaEffect = ref(null);
    const vantaContainer = ref(null);

    onMounted(() => {
      if (!vantaEffect.value) {
        vantaEffect.value = BIRDS({
          el: vantaContainer.value,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          wingSpan: 40.00,
          scaleMobile: 1.00,
          backgroundColor: 0xdceef2,
          color2: 0x80a4a4,
          birdSize: 1.20,
          quantity: 3.00
        });
      }
    });

    onBeforeUnmount(() => {
      if (vantaEffect.value) {
        vantaEffect.value.destroy();
      }
    });

    return {
      vantaContainer,
    };
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
    ...mapActions(['fetchBooks', 'updateBook']),
    onImageUploaded(imageUrl) {
      this.bookImage = imageUrl; // Store the uploaded image URL
    },
    openDialog(book = null) {
      if (book) {
        this.bookId = book._id;
        this.bookTitle = book.title;
        this.bookGenre = book.genre;
        this.shortDescription = book.description;
        this.price = book.price;
        this.bookImage = null;
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
        const bookData = {
          title: this.bookTitle,
          genre: this.bookGenre,
          description: this.shortDescription,
          price: parseFloat(this.price),
          image: this.bookImage, // Use the uploaded image URL
        };

        if (this.isEditing && this.bookId) {
          await this.$store.dispatch('updateBook', {
            bookId: this.bookId,
            bookData: bookData
          });
          alert('Book updated successfully!');
        } else {
          await axios.post(`${import.meta.env.VITE_API_NEW_URL}/books`, bookData);
          alert('Book added successfully!');
        }

        await this.fetchBooks();
        this.closeDialog();
      } catch (error) {
        console.error('Error saving book:', error);
        alert('Failed to save book. Please try again.');
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
