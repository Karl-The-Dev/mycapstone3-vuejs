<script setup>

    import { onBeforeMount } from 'vue';
    import { useGlobalStore } from '../stores/global';
   
    import { useRouter } from 'vue-router';

    const {setUser} = useGlobalStore();
    
    const router = useRouter()    
    
    onBeforeMount(()=>{

        localStorage.clear();
       
        setUser(null);
        
        router.push({path: "/users/login"});

        

    })
</script>


<template>
</template>