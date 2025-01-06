<template>
  <div class="book-card bg-white bg-opacity-10 w-[15rem] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img :src="book.image" :alt="book.title" class="book-image w-38 h-[200] object-cover transition-transform duration-300" />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ book.title }}</h3>
      <p class="text-gray-600 text-md mb-2">{{ book.genre }}</p>
      <p class="text-gray-700 text-sm mb-4">{{ book.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-green-600">₹{{ book.price }}</span>
        <div class="flex gap-2">
          <div class="p-1">
            <Button
              :variant="'solid'"
              theme="blue"
              size="sm"
              :label="'Edit'"
              @click="$emit('edit', book)"
            >
            </Button>
          </div>
          <div class="p-1">
            <Button
              :variant="'solid'"
              theme="red"
              size="sm"
              :label="'Delete'"
              @click="$emit('delete', book._id)"
            >
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "frappe-ui";
export default {
  name: 'BookCard',
  components: {
    Button
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.book-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.book-image:hover {
  transform: scale(1.05);
}
button {
  transition: background-color 0.3s ease, transform 0.3s ease;
}
button:hover {
  transform: scale(1.1);
}
</style>
