<script setup>

import CheckoutComponent from '../components/CheckoutComponent.vue';
import { ref, reactive, onBeforeMount, watch } from 'vue';
import api from "../api";
import { jwtDecode } from 'jwt-decode';
import { useRoute, useRouter } from "vue-router";
import { Notyf } from 'notyf';

const router = useRouter();
const notyf = new Notyf();

const isEnabled = ref(false);
const cart = reactive({ data: [] });
const orders = ref("");
const newObject = ref([]);
const totalCart = ref(0);
const totalQuantity = ref(0);
const userId = ref("")


    async function fetchCart(){
        try {
            const { data } = await api.get('/cart/get-cart'); 
            
            userId.value = data.cart.userId;
            // console.log(data.cart.userId)
            // console.log(data.cart.cartItems[0].subtotal)

            for(let i=0; i < data.cart.cartItems.length; i++ ){       

                totalCart.value += data.cart.cartItems[i].subtotal;
                totalQuantity.value += data.cart.cartItems[i].quantity;
                
            }
            
        } catch (error) {
            console.error("Error fetching ordered products:", error);
        }           
        
        // console.log(orders)
        // console.log(orders.data.data.orders.userId)
        // console.log(orders.data.data.orders.orderedOn)

    // for(let i=0; i < orders.data.data.orders.productsOrdered.length; i++ ){       

    //     totalCart.value += orders.data.data.orders.productsOrdered[i].subtotal;
    //     totalQuantity.value += orders.data.data.orders.productsOrdered[i].quantity;

                
    // }
    newObject.value.push({
        userId: userId.value,
        total: totalCart.value,
        quantity: totalQuantity.value
    })

    }

    fetchCart()    
    
    

</script>

<template>

    <div>
        <div class="row g-4">    
            
            <CheckoutComponent class="mt-5"
                v-for="item in newObject"                
                :checkoutItem="item"
            />
        </div>
    </div>

</template>

<style scoped>



</style>