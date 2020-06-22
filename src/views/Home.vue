<template>
  <div class="home">
    
    <boards></boards>
   
  </div>
</template>

<script>
// @ is an alias to /src
import Boards from "@/components/Boards.vue";
export default {
  name: "Home",
  components: {
    Boards
  }
};
</script>
