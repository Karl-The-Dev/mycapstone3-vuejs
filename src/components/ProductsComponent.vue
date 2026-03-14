<script setup>

import { onBeforeMount, ref } from "vue";
import { useGlobalStore } from "../stores/global";
import { jwtDecode } from 'jwt-decode'; //admin checker

import api from "../api";

import { Notyf } from 'notyf';
const notyf = new Notyf();

// Props definition for script setup
const props = defineProps({
    productData: Object
});


const token = ref("");
const globalStore = useGlobalStore();
const isAdmin = ref(false); //admin checker
const isEnabled = ref(true)

// Call setUser if needed globalStore.setUser(localStorage.getItem("token"));

//admin checker
onBeforeMount(() => {
    token.value = localStorage.getItem("token");

    if(token.value && typeof token.value === 'string'){
        const decodedToken = jwtDecode(token.value);    
        isAdmin.value = decodedToken.isAdmin;
    }
});


async function handleArchive(productId) {
    try {
        const { data } = await api.patch(`/products/${productId}/archive`);
        
        if (data.success) {
            notyf.success("Product archived successfully");
            
        } else {
            notyf.error("Archiving failed");
        }
    } catch (error) {
        notyf.error("Archiving failed");
    }

    isEnabled.value = false;
    console.log("ARCHIVE", productId)
}

async function handleActivate(productId) {
    try {
        const { data } = await api.patch(`/products/${productId}/activate`);
        
        if (data.success) {
            notyf.success("Product activated successfully");
            
        } else {
            notyf.error("Archiving failed");
        }
    } catch (error) {
        notyf.error("Archiving failed");
    }

    isEnabled.value = true;
    console.log("ACTIVATE",productId)
}

</script>

<template>
    <tr class="border-success border-opacity-25">
        <!-- Product Name -->
        <td class="ps-3">
            <div class="d-flex align-items-center">
                <div class="bg-success bg-opacity-10 p-2 rounded-circle me-2 d-none d-sm-flex">
                    <i class="bi bi-box-seam text-success"></i>
                </div>
                <span class="fw-medium">{{ productData.name }}</span>
            </div>
        </td>
        
        <!-- Description (hidden on tablet/mobile) -->
        <td class="d-none d-md-table-cell">
            <span class="text-muted">{{ truncateDescription(productData.description) }}</span>
        </td>
        
        <!-- Price -->
        <td class="text-center">
            <span class="fw-bold text-success">₱ {{ productData.price }}</span>
        </td>
        
        <!-- Availability (hidden on mobile) -->
        <td class="text-center d-none d-sm-table-cell">
            <span v-if="productData.isActive && isEnabled" class="badge bg-success">
                <i class="bi bi-check-circle me-1"></i> Active
            </span>
            <span v-else class="badge bg-danger">
                <i class="bi bi-x-circle me-1"></i> Inactive
            </span>
        </td>
        
        <!-- Actions -->
        <td class="text-center">
            <div class="d-flex gap-2 justify-content-end">
                <!-- Update Button -->
                <router-link 
                    class="btn btn-sm btn-outline-success" 
                    :to="{ path: `/products/${productData._id}/update`}"
                    title="Update Product"
                >
                    <i class="bi bi-pencil"></i>
                    <span class="d-none d-lg-inline ms-1">Update</span>
                </router-link>
                
                <!-- Archive/Activate Button - Disable version (shown when active) -->
                <button 
                    class="btn btn-sm btn-outline-danger" 
                    @click="handleArchive(productData._id)"
                    v-if="productData.isActive && isEnabled"
                    :title="'Disable Product'"
                >
                    <i class="bi bi-eye-slash me-1"></i>
                    <span class="d-none d-lg-inline">Disable</span>
                </button>

                <!-- Archive/Activate Button - Activate version (shown when inactive) -->
                <button 
                    class="btn btn-sm btn-outline-success" 
                    @click="handleActivate(productData._id)"
                    v-else
                    :title="'Activate Product'"
                >
                    <i class="bi bi-eye me-1"></i>
                    <span class="d-none d-lg-inline">Activate</span>
                </button>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        productData: {
            type: Object,
            required: true
        },
        isEnabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        truncateDescription(text, length = 50) {
            if (!text) return '';
            return text.length > length ? text.substring(0, length) + '...' : text;
        },
        toggleProduct() {
            if (this.productData.isActive && this.isEnabled) {
                this.handleArchive(this.productData._id);
            } else {
                this.handleActivate(this.productData._id);
            }
        },
        handleArchive(id) {
            this.$emit('archive', id);
        },
        handleActivate(id) {
            this.$emit('activate', id);
        }
    }
};
</script>

<style scoped>
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

.badge.bg-success {
    background-color: #198754 !important;
    padding: 0.5rem 1rem;
}

.badge.bg-danger {
    background-color: #dc3545 !important;
    padding: 0.5rem 1rem;
}

/* Mobile styles */
@media (max-width: 767.98px) {
    .rounded-circle {
        width: 28px;
        height: 28px;
    }
    
    .btn-sm {
        padding: 0.25rem 0.4rem;
    }
}

@media (max-width: 575.98px) {
    .rounded-circle {
        width: 24px;
        height: 24px;
    }
    
    .gap-2 {
        gap: 0.25rem !important;
    }
}
</style>