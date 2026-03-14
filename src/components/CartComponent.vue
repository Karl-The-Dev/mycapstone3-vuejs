<script setup>
import { ref, watch } from "vue";
import api from "../api";
import { Notyf } from 'notyf';
import { useRouter } from "vue-router";

const router = useRouter();
const notyf = new Notyf();

const props = defineProps({ cartItem: Object });
const emit = defineEmits(['quantity-changed', 'item-removed']);

const productQuantity = ref(props.cartItem?.quantity || 1);
const subTotal = ref(productQuantity.value * props.cartItem?.price || 0);

// Watch quantity to update subtotal and emit changes
watch(productQuantity, (newQty) => {
    subTotal.value = newQty * props.cartItem.price;
    emit('quantity-changed', { id: props.cartItem.id, quantity: newQty });
});

// ---------------- FIXED: unified function to update backend ------------------
async function updateQuantity(newQty) {
    const previousQty = productQuantity.value;
    productQuantity.value = newQty;

    try {
        const response = await api.patch('/cart/update-cart-quantity', {
            productId: props.cartItem.id,
            newQuantity: newQty
        });

        if (!response.data.success) {
            productQuantity.value = previousQty; // rollback UI
            notyf.error(response.data.message || "Update failed");
        } else {
            notyf.success("Quantity updated");
        }
    } catch (err) {
        productQuantity.value = previousQty; // rollback UI
        notyf.error("Server error - quantity not updated");
        console.error(err);
    }
}

// Buttons use this
function increaseCart() { updateQuantity(productQuantity.value + 1); }
function decreaseCart() {
    if (productQuantity.value <= 1) {
        if (confirm("Remove this item from cart?")) removeItem();
        return;
    }
    updateQuantity(productQuantity.value - 1);
}

// Manual input
function handleQuantityInput(event) {
    let val = parseInt(event.target.value);
    if (isNaN(val) || val < 1) val = 1;
    updateQuantity(val);
}

// Remove item (unchanged)
async function removeItem() {
    if (!confirm("Are you sure you want to remove this item?")) return;

    try {
        const response = await api.patch(`/cart/${props.cartItem.id}/remove-from-cart`);
        if (response.data.success) {
            emit('item-removed', props.cartItem.id);
            notyf.success("Item removed!");
        } else {
            notyf.error(response.data.message || "Failed to remove item");
        }
    } catch (err) {
        notyf.error("Server error - could not remove item");
        console.error(err);
    }
}
</script>

<template>
    
    <tr class="border-success border-opacity-25">
        
        <td class="ps-3">
            <div class="d-flex align-items-center">
                <div class="bg-success bg-opacity-10 p-2 rounded-circle me-2 d-none d-sm-flex">
                    <i class="bi bi-box-seam text-success"></i>
                </div>
                <div>
                    <span class="fw-medium d-block">{{ cartItem.name }}</span>
                    
                    <small class="text-muted d-md-none">
                        ID: {{ cartItem.id.substring(0, 6) }}...
                    </small>
                </div>
            </div>
        </td>
        
        <!-- Product ID (hidden on mobile/tablet) -->
        <td class="d-none d-md-table-cell">
            <span class="text-muted small">{{ cartItem.id }}</span>
        </td>
        
        
        <td class="text-center">
            <span class="fw-bold text-success">₱ {{ cartItem.price }}</span>
        </td>
        
        
        <td class="text-center">
            <div class="d-flex align-items-center justify-content-center">
                <button 
                    class="btn btn-sm btn-outline-success px-2" 
                    @click="decreaseCart"
                    
                >
                    <i class="bi bi-dash"></i>
                </button>
                
                <span class="mx-2 fw-bold">{{ cartItem.quantity }}</span>
                
                <button 
                    class="btn btn-sm btn-outline-success px-2" 
                    @click="increaseCart"
                >
                    <i class="bi bi-plus"></i>
                </button>
            </div>
        </td>
        
        <!-- Subtotal (hidden on mobile) -->
        <td class="text-center d-none d-sm-table-cell">
            <span class="fw-bold text-success">₱ {{ subTotal }}</span>
        </td>
        
        <!-- Remove Button -->
        <td class="text-center">
            <button 
                class="btn btn-sm btn-outline-danger" 
                @click="removeItem"
            >
                <i class="bi bi-trash"></i>
                <span class="d-none d-md-inline ms-1">Remove</span>
            </button>
        </td>
    </tr>
</template>

<style scoped>
/* CartComponent Styles - Only styles for the row */
.bg-success.bg-opacity-10 {
    background-color: rgba(25, 135, 84, 0.1) !important;
}

.rounded-circle {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-outline-success {
    color: #198754;
    border-color: #198754;
    transition: all 0.2s;
}

.btn-outline-success:hover {
    background-color: #198754;
    border-color: #198754;
    color: white;
}

.btn-outline-success:disabled {
    background-color: transparent;
    border-color: #198754;
    color: #198754;
    opacity: 0.5;
    cursor: not-allowed;
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

/* Mobile styles */
@media (max-width: 767.98px) {
    .rounded-circle {
        width: 28px;
        height: 28px;
    }
    
    .btn-sm {
        padding: 0.2rem 0.4rem;
        font-size: 0.75rem;
    }
    
    .mx-2 {
        margin-left: 0.3rem !important;
        margin-right: 0.3rem !important;
    }
}

/* Extra small mobile */
@media (max-width: 575.98px) {
    .rounded-circle {
        width: 24px;
        height: 24px;
    }
    
    .btn-sm {
        padding: 0.15rem 0.3rem;
        font-size: 0.7rem;
    }
    
    .mx-2 {
        margin-left: 0.2rem !important;
        margin-right: 0.2rem !important;
    }
}

/* Touch device optimization */
@media (hover: none) and (pointer: coarse) {
    .btn-sm {
        min-width: 40px;
        min-height: 40px;
    }
}
</style>
