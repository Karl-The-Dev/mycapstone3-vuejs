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

const totalCart = ref(0);
const totalQuantity = ref(0);
const userId = ref("")

const email = ref("");
const phone = ref("");
const address = ref("");
const city = ref("");
const region = ref("");
const zipcode = ref("");
const cardName = ref("");
const cardNumber = ref("");
const expiry = ref("");
const cvv = ref("");    

const props = defineProps({
    checkoutItem: Object
});

userId.value = props.checkoutItem?.userId;
totalCart.value = props.checkoutItem?.total;
totalQuantity.value = props.checkoutItem?.quantity;

function goBack(){
    if(confirm("Do you want to go back to your cart?")){
        router.push("/users/cart")
    }
    
}

async function handlePayment(userId){
    
    if(confirm("Proceed with payment?")){

        try {

            if (totalCart.value !== 0){
                
                    const response = await api.post('/orders/checkout');       
                    
                    console.log(response.data.success)

                    if (response.data.status) {

                        notyf.success("Ordered successfully!");
                        router.push("/products/checkout")
                    
                    } else {
                        
                        notyf.error(response.data.message || "Failed to remove item");
                        
                    
                }

            }else{
                alert("No current items to checkout!")
            }

        } catch (error) {
            console.error("Error removing item:", error);        
            
            notyf.error("Failed to remove item. Please try again.");       
            
            if (error.response) {
                console.error("Error response:", error.response.data);
            }
        }
            router.push("/orders/orders-page")
    }
}

watch([
    email,
    phone,
    address,
    city,
    region,
    zipcode,
    cardName,
    cardNumber,
    expiry,
    cvv
], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
        
});

</script>

<template>

    <div class="checkout-wrapper">
        <!-- STATIC CHECKOUT PAGE – payment form + summary with sample totals -->
        <div class="row g-4">
            <!-- LEFT COLUMN: PAYMENT INFORMATION CARD (customer fills) -->
            <div class="col-lg-8 col-md-12 order-2 order-lg-1">
                <div class="card payment-card p-3 p-md-4">
                    <h3 class="section-header">
                        <i class="bi bi-credit-card-2-front me-2"></i>Payment Information
                    </h3>
                    
                    <form class="row g-4">
                        <!-- Contact section -->
                        <div class="col-12">
                            <h5 class="text-success mb-3">Contact</h5>
                        </div>
                        <div class="col-md-6">
                            <label for="email" class="form-label">Email address</label>
                            <input type="text" class="form-control" id="email" placeholder="you@example.com" v-model="email">
                        </div>
                        <div class="col-md-6">
                            <label for="phone" class="form-label">Phone number</label>
                            <input type="text" class="form-control" id="phone" placeholder="+63 (999) 000-9999" v-model="phone">
                        </div>

                        <!-- Billing address -->
                        <div class="col-12 mt-3">
                            <h5 class="text-success mb-3">Billing address</h5>
                        </div>
                        <div class="col-12">
                            <label for="address" class="form-label">Street address</label>
                            <input type="text" class="form-control" id="address" placeholder="123 Main St" v-model="address">
                        </div>
                        <div class="col-md-5">
                            <label for="city" class="form-label">City</label>
                            <input type="text" class="form-control" id="city" placeholder="Quezon City" v-model="city">
                        </div>
                        <div class="col-md-4">
                            <label for="city" class="form-label">Region</label>
                            <input type="text" class="form-control" id="city" placeholder="NCR" v-model="region">
                        </div>
                        <div class="col-md-3">
                            <label for="zip" class="form-label">ZIP code</label>
                            <input type="text" class="form-control" id="zip" placeholder="1101" v-model="zipcode">
                        </div>

                        <!-- Payment details -->
                        <div class="col-12 mt-3">
                            <h5 class="text-success mb-3">Card details</h5>
                        </div>
                        <div class="col-12">
                            <label for="cardName" class="form-label">Name on card</label>
                            <input type="text" class="form-control" id="cardName" placeholder="Juan Dela Cruz" v-model="cardName">
                        </div>
                        <div class="col-12">
                            <label for="cardNumber" class="form-label">Card number</label>
                            <div class="input-group">
                                <span class="input-group-text" id="basic-addon1"><i class="bi bi-credit-card"></i></span>
                                <input type="text" class="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" v-model="cardNumber">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label for="expiry" class="form-label">Expiration (MM/YY)</label>
                            <input type="text" class="form-control" id="expiry" placeholder="MM/YY" v-model="expiry">
                        </div>
                        <div class="col-md-6">
                            <label for="cvv" class="form-label">CVV</label>
                            <input type="text" class="form-control" id="cvv" placeholder="123" v-model="cvv">
                        </div>

                        <!-- save info checkbox -->
                        <div class="col-12 mt-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="saveInfo" checked>
                                <label class="form-check-label" for="saveInfo">
                                    Save payment information for next time
                                </label>
                            </div>
                        </div>

                        <!-- hint that this is a static mockup -->
                        <div class="col-12 mt-3">
                            <p class="text-muted-success small mb-0">
                                <i class="bi bi-info-circle"></i> Please fill out all information.
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <!-- RIGHT COLUMN: PROCEED PAYMENT CARD (summary + buttons) -->
            <div class="col-lg-4 col-md-12 order-1 order-md-first order-lg-2 mb-3 mb-lg-0">
                <div class="card summary-card shadow sticky-lg-top">
                    <div class="card-header summary-header bg-light">
                        <h3 class="h5 mb-0 fw-semibold">
                            <i class="bi bi-bag-check text-success me-2"></i>Payment summary
                        </h3>
                    </div>
                    <div class="card-body">
                        <!-- total quantity (static sample: 17 from previous cart) -->
                        <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                            <span class="fw-bold text-dark">Total quantity:</span>
                            <span class="total-qty-badge">{{ totalQuantity }}</span>
                        </div>
                        <!-- grand total (static sample: $1101.34 from cart) -->
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <span class="fw-bold fs-5 text-dark">Grand total:</span>
                            <span class="grand-total">₱ {{ totalCart }}</span>
                        </div>

                        <!-- two buttons: Proceed with Payment (success) and Cancel (outline danger) -->
                        <div class="d-flex flex-column flex-sm-row gap-2 mt-3">
                            <button class="btn btn-success flex-fill py-2" v-if="isEnabled" @click="handlePayment(userId)">
                                <i class="bi bi-lock-fill me-1"></i> Proceed with Payment
                            </button>
                            <button class="btn btn-success flex-fill py-2" v-else disabled>
                                <i class="bi bi-lock-fill me-1"></i> Proceed with Payment
                            </button>                            
                            <button class="btn btn-outline-danger flex-fill py-2" @click="goBack">
                                <i class="bi bi-x-circle me-1"></i> Cancel
                            </button>
                        </div>

                        <!-- secure checkout note -->
                        <div class="text-center mt-3 small text-secondary">
                            <i class="bi bi-shield-check text-success me-1"></i> Payments are secure and encrypted
                        </div>

                        <!-- sample "database" footnote -->
                        <div class="mt-4 p-2 bg-light border border-success border-opacity-25 rounded text-center text-success small">
                            <i class="bi bi-database"></i> Totals based on your cart ( {{ totalQuantity }} items)
                        </div>
                    </div>
                </div>               
                
            </div>
        </div>

        <!-- bottom navigation hint (static) -->
        <div class="row mt-4">
            <div class="col-12 text-center text-secondary small">
                <i class="bi bi-arrow-left me-1"></i> This is a static mockup — fields are pre-filled for preview
            </div>
        </div>
    </div>

</template>

<style scoped>
body {
    background: #f8f9fa;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 1rem;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
.checkout-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
}

/* card styles */
.card {
    border: none;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    background-color: #ffffff;
}

.payment-card {
    border-left: 4px solid #198754; /* success green accent */
}

.summary-card {
    border: 1px solid #dee2e6;
}

/* form labels */
.form-label {
    font-weight: 500;
    color: #212529;
    margin-bottom: 0.25rem;
}

.form-control, .form-select {
    border: 1px solid #ced4da;
    border-radius: 0.5rem;
    padding: 0.6rem 0.75rem;
}

.form-control:focus, .form-select:focus {
    border-color: #198754;
    box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.15);
}

/* success/danger buttons */
.btn-success {
    background-color: #198754;
    border-color: #198754;
}
.btn-success:hover {
    background-color: #157347;
    border-color: #146c43;
}

.btn-outline-danger {
    border-color: #dc3545;
    color: #dc3545;
}
.btn-outline-danger:hover {
    background-color: #dc3545;
    color: #fff;
}

/* summary numbers */
.total-qty-badge {
    background-color: #e9ecef;
    color: #198754;
    font-size: 1.3rem;
    padding: 0.4rem 1.2rem;
    border-radius: 30px;
    font-weight: 600;
}

.grand-total {
    font-size: 2rem;
    font-weight: 700;
    color: #198754;
}

/* section headers */
.section-header {
    color: #198754;
    font-weight: 600;
    border-bottom: 2px solid #198754;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
}

/* card header */
.summary-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    color: #198754;
    font-weight: 600;
}

/* responsive order: on mobile summary goes top */
@media (max-width: 991.98px) {
    .order-md-first {
        order: -1 !important;
    }
}

.sticky-lg-top {
    top: 1rem;
    z-index: 1020;
}
@media (max-width: 992px) {
    .sticky-lg-top {
        position: relative;
        top: 0;
    }
}

/* credit card icon spacing */
.input-group-text {
    background-color: #f8f9fa;
    border: 1px solid #ced4da;
    border-right: none;
    border-radius: 0.5rem 0 0 0.5rem;
}
.input-group .form-control {
    border-left: none;
    border-radius: 0 0.5rem 0.5rem 0;
}

/* small helpful text */
.text-muted-success {
    color: #198754;
    opacity: 0.7;
}


</style>