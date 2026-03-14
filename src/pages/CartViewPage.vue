<script setup>
import CartComponent from '../components/CartComponent.vue';
import { ref, reactive, onBeforeMount, watch } from 'vue';
import api from "../api";
import { jwtDecode } from 'jwt-decode';
import { useRoute, useRouter } from "vue-router";
import { Notyf } from 'notyf';

const router = useRouter();
const notyf = new Notyf();

const isEnabled = ref(false);
const cart = reactive({ data: [] });
const findProduct = ref("");
const newObject = ref([]);
const totalCart = ref(0);

//testadminchecker
const token = localStorage.getItem('token');            
const decodedToken = jwtDecode(token);
const userId = ref(decodedToken.id);
const isAdmin = ref(decodedToken.isAdmin)

onBeforeMount(async () => {
    
                
    const { data } = await api.get('/cart/get-cart');       
    const { cartItems } = data.cart || [];

    totalCart.value = data.cart.totalPrice;
                            
    const productId = "";
                                
    for(let i = 0; i < cartItems.length; i++) {
        findProduct.value = await api.get(`/products/${cartItems[i].productId}`);

        newObject.value.push({
            id: findProduct.value.data._id,
            name: findProduct.value.data.name,
            price: findProduct.value.data.price,
            quantity: cartItems[i].quantity
        }); 
        // console.log(findProduct.value)
    }
});


function handleQuantityChange(updatedItem) {
    const index = newObject.value.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        newObject.value[index].quantity = updatedItem.quantity;
        newObject.value = [...newObject.value];
    }
}


function handleItemRemoved(itemId) {
    newObject.value = newObject.value.filter(item => item.id !== itemId);
}

watch(newObject, (newItems) => {    
    totalCart.value = newItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    
}, { deep: true });

async function clearCart(userId){
    
     try {
        
        if (totalCart.value !== 0){
            alert("You are about to remove all items from your cart!")
            if (confirm("Are you sure you want to remove all items from your cart?")) {            
                
                notyf.success("Removing cart...");
                
                const response = await api.put(`/cart/clear-cart`);
                
                if (response.data.success) {
                    notyf.success("Cart cleared successfully!");
                    router.push("/products")
                } else {
                    
                    notyf.error(response.data.message || "Failed to remove item");
                    
                }
            }     
        }else{
            alert("No current items to remove!")
        }
           
        
        
    } catch (error) {
        console.error("Error removing item:", error);        
        
        notyf.error("Failed to remove item. Please try again.");       
        
        if (error.response) {
            console.error("Error response:", error.response.data);
        }
    }
}

async function handleCheckout(userId){
    console.log(userId)

    //  const response = await api.get('/cart/get-cart');       
                
    //  console.log(response.data.cart.cartItems[1].quantity)
    if(totalCart.value == 0){
        alert("You have no items to checkout!")
    }
    
    if (totalCart.value !== 0 && confirm("Do you want to proceed to payment?")){
            router.push("/products/checkout")
        } 

   
}

async function handleMyOrders(userId){
    console.log(userId)   

    router.push("/orders/orders-page")
    

}

async function increaseQuantity(id){

}

</script>

<template>
<div class="container">
    <!-- Page Header -->
    <div class="d-flex page-header text-success m-4 justify-content-center">
        <h2 class="h3 mb-0"><i class="bi bi-cart me-2"></i>My Cart</h2>
    </div>
    
    <!-- Checkout Summary - Moves to top on mobile -->
    <div class="col-lg-8 mx-auto col-md-12 order-1 order-md-first order-lg-2 mb-3 mb-lg-0" v-if="!isAdmin">
        <div class="card checkout-card shadow sticky-lg-top border-success border-opacity-25">
            <div class="card-header bg-success text-white">
                <h3 class="h5 mb-0 fw-semibold"><i class="bi bi-credit-card me-2"></i>Checkout summary</h3>
            </div>
            <div class="card-body">
                <div class="d-flex justify-content-center gap-3 align-items-center mb-4">
                    <span class="fs-5 text-dark fw-bold">Grand total:</span>
                    <span id="grand-total" class="fw-bold text-success">₱ {{ totalCart }}</span>
                </div>

                <div class="d-flex flex-column flex-sm-row gap-2 mt-4">
                    <button type="submit" class="btn btn-success flex-fill" @click="handleCheckout(userId)">
                        <i class="bi bi-check2-circle me-1"></i> Checkout
                    </button>
                    <button class="btn btn-outline-success flex-fill" @click="handleMyOrders(userId)">
                        <i class="bi bi-bag-check me-2"></i> My Orders
                    </button>
                    <button class="btn btn-outline-danger flex-fill" @click="clearCart(userId)">
                        <i class="bi bi-trash me-1"></i> Delete Cart
                    </button>
                </div>
            </div>
        </div>
    </div> 

    <!-- Cart Items Section -->
    <div v-if="!isAdmin" class="mt-4">
        <hr class="border-success border-opacity-25">
        
        <!-- Empty Cart Message -->
        <h1 class="text-center text-muted my-5" v-if="totalCart == 0">
            <i class="bi bi-cart-x d-block fs-1 mb-3"></i>
            No Current Items in your Cart!
        </h1>
        
        <!-- Cart Table - Single Header, Multiple Rows -->
        <div class="table-responsive" v-if="totalCart > 0">
            <table class="table table-hover align-middle">
                <!-- SINGLE HEADER - appears only once -->
                <thead class="table-success">
                    <tr>
                        <th class="ps-3">Product</th>
                        <th class="d-none d-md-table-cell">Product ID</th>
                        <th class="text-center">Price</th>
                        <th class="text-center">Quantity</th>
                        <th class="text-center d-none d-sm-table-cell">Subtotal</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>
                
                <!-- TABLE BODY - Cart items as rows -->
                <tbody>
                    <CartComponent 
                        v-for="item in newObject" 
                        :key="item._id"
                        :cartItem="item"
                        @quantity-changed="handleQuantityChange"
                        @item-removed="handleItemRemoved"  
                    />
                </tbody>
            </table>
        </div>
    </div>

    <!-- Admin Message -->
    <div v-if="isAdmin" class="text-center py-5">
        <i class="bi bi-shield-lock fs-1 text-danger"></i>
        <h3 class="text-danger mt-3">Admins cannot access the cart</h3>
    </div>
</div>
</template>

<style scoped>
/* Cart Page Styles */
#grand-total {
    font-size: 1.5rem;
}

/* Table Header Styling */
.table-success {
    --bs-table-bg: #d1e7dd;
    --bs-table-color: #0a3622;
}

.table th {
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 1rem 0.75rem;
    white-space: nowrap;
}

/* Card Styling */
.card-header.bg-success {
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

.btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
}

.btn-outline-danger:hover {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}

.border-success {
    border-color: #198754 !important;
}

.border-opacity-25 {
    --bs-border-opacity: 0.25;
}

/* Responsive Styles */

/* Tablet (768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .table th {
        font-size: 0.85rem;
        padding: 0.9rem 0.5rem;
    }
}

/* Mobile (below 768px) */
@media (max-width: 767.98px) {
    .table th {
        font-size: 0.8rem;
        padding: 0.8rem 0.3rem;
    }
    
    #grand-total {
        font-size: 1.3rem;
    }
    
    .btn {
        font-size: 0.9rem;
    }
}

/* Extra Small Mobile (below 576px) */
@media (max-width: 575.98px) {
    .table th {
        font-size: 0.7rem;
        padding: 0.7rem 0.2rem;
    }
    
    .btn {
        font-size: 0.8rem;
        padding: 0.4rem 0.5rem;
    }
}
</style>