<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full shadow-lg bg-white p-6 rounded-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Create an Account</h2>

      <!-- Form Section -->
      <div>
       
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

  
       

        <!-- Submit Button -->
        <div class="p-2 flex justify-center items-center gap-2">
          <Button
            variant="solid"
            theme="green"
            size="sm"
            :loading="isLoading"
            :disabled="isLoading"
            @click="handleLogin"
          >
           Login
          </Button>
          <div>
            <p>Don't have an account?<router-link to="/signup"> Signup</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FormControl, Button } from "frappe-ui";
import { mapActions } from 'vuex';

export default {
  name: "Login",
  components: {
    FormControl,
    Button,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      if (!this.email || !this.password) {
        alert("All fields are required!");
        return;
      }

      this.isLoading = true;

      // Get stored user data
      const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
      
      if (!storedUser || storedUser.email !== this.email || storedUser.password !== this.password) {
        alert('Invalid credentials!');
        this.isLoading = false;
        return;
      }

      this.login(storedUser);
      this.isLoading = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
/* Add any additional styles if needed */
</style>
