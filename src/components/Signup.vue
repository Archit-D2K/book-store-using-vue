<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full shadow-lg bg-white p-6 rounded-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Create an Account</h2>

      <!-- Form Section -->
      <div>
        <!-- Name Field -->
        <div class="p-2">
          <FormControl
            type="text"
            size="sm"
            variant="subtle"
            placeholder="Enter your name"
            label="Full Name"
            v-model="name"
          />
        </div>

        <!-- Email Field -->
        <div class="p-2">
          <FormControl
            type="email"
            size="sm"
            variant="subtle"
            placeholder="Enter your email"
            label="Email Address"
            v-model="email"
          />
        </div>

        <!-- Password Field -->
        <div class="p-2">
          <FormControl
            type="password"
            size="sm"
            variant="subtle"
            placeholder="Enter your password"
            label="Password"
            v-model="password"
          />
        </div>

        <!-- Confirm Password Field -->
        <div class="p-2">
          <FormControl
            type="password"
            size="sm"
            variant="subtle"
            placeholder="Confirm your password"
            label="Confirm Password"
            v-model="confirmPassword"
          />
        </div>

        <!-- Submit Button -->
        <div class="p-2 flex items-center justify-center gap-5">
          <Button
            variant="solid"
            theme="green"
            size="sm"
            :loading="isLoading"
            :disabled="isLoading"
            @click="handleSignup"
          >
            Signup
          </Button>
          <div>
            Already have an account? <router-link to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FormControl, Button } from "frappe-ui";

export default {
  name: "Signup",
  components: {
    FormControl,
    Button,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
    };
  },
  methods: {
    handleSignup() {
      if (!this.name || !this.email || !this.password || !this.confirmPassword) {
        alert("All fields are required!");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      this.isLoading = true;

      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      // Store registration data
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      
      this.isLoading = false;
      alert("Signup successful! Please login.");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/* Add any additional styles if needed */
</style>
