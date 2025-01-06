<template>
    <div class="flex justify-between w-full h-24 bg-blue-300 p-6 items-center ">
        <div class="px-4">
            logo
        </div>

        <div>

        
            <div class="p-5 w-[10rem]">
  <!-- <TextInput
  class="w-full"
    :type="'search'"
    :ref_for="true"
    size="md"
    variant="subtle"
    placeholder="search title"
    :disabled="false"
    modelValue=""
    style="width: 20vw;"
  /> -->
</div>
</div>
<div class="p-5">

  
<Button @click="dialog1 = true">
  Logout
</Button>
<Dialog
  :options="{
    title: 'Confirm',
    message: 'Are you sure you want to confirm this action?',
    size: 'xl',
    icon: {
      name: 'alert-triangle',
      appearance: 'warning',
    },
    actions: [
      {
        label: 'Logout',
        variant: 'solid',
        onClick: () => handleLogout(),
      },
    ],
  }"
  v-model="dialog1"
/>
</div>
        



    </div>



</template>

    <script>
    import { TextInput, Button, Dialog } from "frappe-ui";
    import { mapActions } from 'vuex';

export default {
    name: "Navbar",
    components: {
        TextInput,
        Button,
        Dialog
    },

    data(){
        return{
            dialog1: false,
        }
    },
    methods: {
        ...mapActions(['logout']),
        handleLogout() {
            // Call Vuex logout action
            this.logout();
            // Close the dialog
            this.dialog1 = false;
            // Redirect to login
            this.$router.push("/login");
        },
    },


    


}
</script>
