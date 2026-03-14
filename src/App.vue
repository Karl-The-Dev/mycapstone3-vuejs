<script>

  import ProductsComponent from './components/ProductsComponent.vue';
  import NavbarComponent from './components/NavbarComponent.vue';
  // added for group improvement
  import FooterComponent from './components/FooterComponent.vue';

  import { useGlobalStore } from "./stores/global";
  import { onBeforeMount } from "vue";

  export default {
    components: {
      
      NavbarComponent,
      FooterComponent // added for group improvement
      
    },
    
    setup(){
      
      const { setUser } = useGlobalStore();
      
      onBeforeMount(() =>{
        setUser(localStorage.getItem("token"))
      });

    }
  }

</script>

<template>
  <!-- added for group improvement -->
  <div class="app-wrapper"> 
    <NavbarComponent />

   <main class="main-content">
      <router-view />
    </main>

  <FooterComponent/>
  </div>
  
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;  /* Full viewport height */
}

.main-content {
  flex: 1 0 auto;  /* Takes up all available space */
  width: 100%;
}

/* Ensure footer doesn't have any margin that might affect positioning */
:deep(.footer) {
  margin-top: 0 !important;
  flex-shrink: 0;  /* Prevents footer from shrinking */
}
</style>
