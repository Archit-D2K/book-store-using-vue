<template>
    <div class="flex flex-col items-center ">
      <input
        type="file"
        accept="image/*"
        @change="onFileChanged"
        class="mb-4"

      />
      <button
        @click="uploadImage"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        :disabled="!selectedFile"
      >
        Upload Image
      </button>
      <div v-if="preview" class="mt-4">
        <h3>Preview:</h3>
        <img :src="preview" alt="Image preview" class="w-36 h- object-cover rounded" />
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        selectedFile: null,
        preview: null,
        uploadedImageUrl: null,
      };
    },
    methods: {
      onFileChanged(event) {
        this.selectedFile = event.target.files[0];
        this.preview = URL.createObjectURL(this.selectedFile);
      },
      async uploadImage() {
        if (!this.selectedFile) return;

        const formData = new FormData();
        formData.append('file', this.selectedFile);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET); // Your upload preset

        try {
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          this.uploadedImageUrl = response.data.secure_url; // Get the URL of the uploaded image
          this.$emit('image-uploaded', this.uploadedImageUrl); // Emit the uploaded image URL to parent
          this.reset(); // Reset after upload
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      },
      reset() {
        this.selectedFile = null;
        this.preview = null;
      },
    },
  };
  </script>

  <style scoped>
  /* Add any additional styles here */
  </style>
