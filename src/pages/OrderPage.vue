<script setup>
import OrderComponent from '../components/OrderComponent.vue';
    
import {ref, reactive, onMounted} from 'vue';

import { onBeforeMount } from 'vue'; 
import api from "../api" 

import { Notyf } from 'notyf';
const notyf = new Notyf();

const findOrders = ref("");
const allOrders = ref([]);

    // const response = await api.post('/orders/checkout');       
    
    async function findMyOrders(){

        try{
            const response = await api.get('/orders/my-orders');
            findOrders.value = response.data.orders; 
            
            if (response.status === 200) {
                notyf.success("Got All Orders successfully!");
            } else {
                notyf.error(response.data.message || "Failed to retrieve items");
            }
        }
        catch(err){
            console.log(err)
        }
    }
    
    async function findAllOrders(){

        try{
            const response = await api.get('/orders/all-orders');
            findOrders.value = response.data.orders;           
        
            if (response.status === 200) {
                notyf.success("Got All Orders successfully!");               
            } else {                
                notyf.error(response.data.message || "Failed to retrieve items");                
            }
        }
        catch(err){
            console.log(err)
        }
       
    }

    findMyOrders()
    findAllOrders()

    
</script>

<template>

  
     <div class="container">
        <div class="row page-header text-success m-4">
            <h2 class="h3 mb-0"><i class="bi bi-box-seam me-2"></i>Orders Summary</h2>
            
        </div>

        <router-link type="submit" class="btn btn-outline-success flex-fill" :to="{ name: 'Products'}"><i class="bi bi-check2-circle me-1" ></i>Back to Home</router-link>
        
        
        
        <hr>

        <!-- Empty Order Message -->
        <h1 class="text-center text-muted my-5" v-if="!findOrders">
            <i class="bi bi-cart-x d-block fs-1 mb-3"></i>
            No Order History Yet!
        </h1>

        <div class= "row g-4">
            
            
            <OrderComponent v-for="orders in findOrders" :ordersData="orders" /> 

                    
        </div>
       
       
    </div>
</template>

<style scoped>

</style>