<script setup>
import { ref, onBeforeMount, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../api";
import { useGlobalStore } from "../stores/global";
import { Notyf } from "notyf";

import { jwtDecode } from 'jwt-decode';

const notyf = new Notyf();
const { user } = useGlobalStore();
const router = useRouter();
const product = reactive({ data: null });
const productQuantity = ref(1);
const subTotal = ref(1);
const image = ref("")

onBeforeMount(async () => {
    const route = useRoute();
    					
    let { data } = await api.get(`/products/${route.params.id}`);
    
    product.data = data;

    subTotal.value = productQuantity.value * product.data.price

    image.value = product.data.image
    console.log(image.value)
    
});

async function AddToCart(productId) {
    try{
        const decodedToken = jwtDecode(user.token);
        const userId = decodedToken.id;        
        
        let response = await api.post(`/cart/add-to-cart`,{
            
                productId: productId,
                price: product.data.price,
                quantity: productQuantity.value,
                subtotal: subTotal.value
                 
        });

        if(response.status === 201) {

                notyf.success(response.data.message);
            
        } else {
                notyf.error("Add to Cart Failed. Please contact administrator.");
        }
    }
    catch (e) {
        if(e.response.status === 404 || e.response.status === 401 || e.response.status === 400 || e.response.status === 403){
            notyf.error(e.response.data.message);
        } else {
            console.error(e);
            notyf.error("Add to Cart Failed. Please contact administrator.");
        }
    }
    
}

function increaseCart(){
    productQuantity.value++;

    subTotal.value = productQuantity.value * product.data.price;    
}
function decreaseCart(){
    
    if (productQuantity.value > 1){
        productQuantity.value--;

        subTotal.value = productQuantity.value * product.data.price;
    }
    else {
        alert("Quantity cannot be less than 1. Item will become empty!")
            if (confirm("Remove this item from cart?")) {
             alert("removed item!")
             router.push("/products")
         
        }
    }
}

function handleQuantityInput(event) {
    const inputValue = parseInt(event.target.value);
    
    // Check if input is not a number or empty
    if (isNaN(inputValue)) {
        productQuantity.value = 1;
        alert("Please enter a valid number");
        return;
    }
    
    if (inputValue < 1) {
        alert("Quantity cannot be less than 1");
        productQuantity.value = 1;
        
        if (inputValue === 0) {
            if (confirm("Quantity is 0. Remove this item from cart?")) {
                alert("Item removed!");
                router.push("/products");
            }
        }
        return;
    }
        
    productQuantity.value = inputValue;
}

watch(productQuantity, (newValue, oldValue) => {
    if (newValue < 1) {
        alert("Quantity cannot be less than 1. Reverting to 1.");
        productQuantity.value = 1;
        
        if (newValue === 0) {
            if (confirm("Quantity is 0. Remove this item from cart?")) {
                alert("Item removed!");
                router.push("/products");
            }
        }
    }
});


</script>

<template>
    <div class="container">
        <!-- Breadcrumb Navigation -->
        <nav class="my-3" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/products" class="text-success text-decoration-none">products</router-link>
                </li>
                <li class="breadcrumb-item active text-success fw-semibold" aria-current="page">
                    {{ product.data ? product.data.name : "..." }}
                </li>
            </ol>
        </nav>

        <!-- Product Details Row -->
        <div class="row mx-auto my-3 gap-4 gap-md-0" v-if="product.data">
            <!-- Product Image Column -->
            <div class="col-12 col-md-6">
                <div class="border border-success border-opacity-25 rounded p-3 bg-white shadow-sm">
                    <img
                        class="img-fluid rounded"
                        :src="product.data.image || `https://placehold.co/600x400/377399/ffffff?font=lora&text=${encodeURIComponent(product.data.name)}`"
                    />
                </div>
            </div>

            <!-- Product Info Column -->
            <div class="col-12 col-md-6">
                <!-- Product Title with Icon -->
                <div class="d-flex gap-2 align-items-center mb-3">
                    <div class="bg-success bg-opacity-10 p-3 rounded-circle">
                        <h1 class="bi bi-cup-hot-fill text-success mb-0"></h1>
                    </div>
                    <h1 class="mb-0 text-success fw-bold">{{ product.data.name }}</h1>
                </div>

                <!-- Description Card -->
                <div class="card border-success border-opacity-25 mb-3">
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-success fw-semibold">
                            <i class="bi bi-card-text me-2"></i>Product Description:
                        </h6>
                        <p class="card-text text-muted">
                            {{ product.data.description }}
                        </p>
                    </div>
                </div>

                <!-- Price Card -->
                <div class="card border-success border-opacity-25 mb-3">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <h6 class="card-subtitle mb-0 text-success fw-semibold">
                            <i class="bi bi-tag me-2"></i>Price:
                        </h6>
                        <p class="card-text mb-0 fs-4 fw-bold text-success">PHP {{ product.data.price }}</p>
                    </div>
                </div>

                <!-- Quantity and Subtotal Card -->
                <div class="card border-success border-opacity-25 mb-3">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <!-- Quantity on Left -->
                            <div class="col-12 col-sm-6">
                                <div class="d-flex align-items-center">
                                    <div class="bg-success bg-opacity-10 p-2 rounded-circle me-2">
                                        <i class="bi bi-sort-numeric-up text-success"></i>
                                    </div>
                                    <div>
                                        <h6 class="text-success fw-semibold mb-0">Quantity</h6>
                                        <span class="fs-4 fw-bold text-success">{{ productQuantity }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Subtotal on Right -->
                            <div class="col-12 col-sm-6 mt-3 mt-sm-0">
                                <div class="d-flex justify-content-end align-items-center">
                                    <div class="text-end">
                                        <h6 class="text-success fw-semibold mb-1">
                                            <i class="bi bi-calculator me-1"></i>Subtotal
                                        </h6>
                                        <span class="fs-2 fw-bold text-success">PHP {{ subTotal }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quantity Controls Card -->
                <div class="card border-success border-opacity-25 mb-3">
                    <div class="card-body">
                        <h6 class="text-success fw-semibold mb-3">
                            <i class="bi bi-arrow-up-down me-2"></i>Adjust Quantity:
                        </h6>
                        <div class="col-md-8">
                            <div class="d-flex align-items-center">
                                <button class="btn btn-outline-success btn-sm" @click="decreaseCart">
                                    <i class="bi bi-dash"></i>
                                </button>
                                
                                <input 
                                    type="number" 
                                    class="form-control form-control-sm mx-3 text-center border-success" 
                                    v-model="productQuantity" 
                                    id="prodQuantity" 
                                    @input="handleQuantityInput"
                                    min="1"
                                />
                                
                                <button class="btn btn-outline-success btn-sm" @click="increaseCart">
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="d-grid gap-2">
                    <!-- Add to Cart Button (Regular Users) -->
                    <button
                        class="btn btn-success btn-lg"
                        type="button"
                        v-if="user.token && !user.isAdmin"
                        @click="AddToCart(product.data._id)"
                    >
                        <i class="bi bi-cart-plus me-2"></i>Add to Cart
                    </button>

                    <!-- Admin Disabled Button -->
                    <button
                        class="btn btn-outline-danger btn-lg"
                        type="button"
                        v-if="user.token && user.isAdmin"
                        disabled
                    >
                        <i class="bi bi-shield-lock me-2"></i>Admin are not allowed to purchase
                    </button>

                    <!-- Login to Purchase Button -->
                    <router-link
                        to="/users/login"
                        class="btn btn-outline-success btn-lg"
                        type="button"
                        v-if="!user.token"
                    >
                        <i class="bi bi-box-arrow-in-right me-2"></i>Login to Purchase
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div class="text-center my-5 py-5" v-if="!product.data">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-success">Loading product details...</p>
        </div>
    </div>
</template>

<style scoped>
#prodQuantity {
    width: 60px;
}

/* Additional Bootstrap Theme Overrides */
.text-success {
    color: #198754 !important;
}

.bg-success {
    background-color: #198754 !important;
}

.btn-success {
    background-color: #198754;
    border-color: #198754;
}

.btn-success:hover {
    background-color: #157347;
    border-color: #146c43;
}

.btn-outline-success {
    color: #198754;
    border-color: #198754;
}

.btn-outline-success:hover {
    background-color: #198754;
    border-color: #198754;
    color: white;
}

.border-success {
    border-color: #198754 !important;
}

.border-opacity-25 {
    --bs-border-opacity: 0.25;
}

.bg-success.bg-opacity-10 {
    background-color: rgba(25, 135, 84, 0.1) !important;
}

.rounded-circle {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    transition: all 0.2s ease;
}

.card:hover {
    box-shadow: 0 5px 15px rgba(25, 135, 84, 0.15);
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
    .rounded-circle {
        width: 40px;
        height: 40px;
    }
    
    .rounded-circle h1 {
        font-size: 1.2rem;
    }
}

/* Touch-friendly inputs */
@media (hover: none) and (pointer: coarse) {
    .btn-outline-success, .btn-success {
        padding: 0.6rem 1rem;
    }
    
    #prodQuantity {
        height: 40px;
        font-size: 1rem;
    }
}
</style>
