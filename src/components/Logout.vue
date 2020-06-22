<template>
<div class="text-md-center">
  
  <v-layout>
    <v-flex xs6 offset-xs3>
      <h2 > You Are Logged out!</h2>
  
  </v-flex>
  </v-layout>
  </div>
</template>


<script>
  
  export default {
    components: {
      
    },
    data: () => ({
     
      
    }),
 
    methods: {
      
    },
    created () {
       let token = localStorage.getItem('token');
            if(!token){
              return false;
            }
        this.$axios.get(this.$baseUrl+'/logout?api_token='+token)
        .then(() =>{
            localStorage.removeItem('token');
            Event.$emit('logout');
        });
        
    }
  }
</script>