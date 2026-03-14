<script setup>

import { onBeforeMount, ref } from "vue";
import { useGlobalStore } from "../stores/global";
import { jwtDecode } from 'jwt-decode'; //admin checker

import api from "../api";

import { Notyf } from 'notyf';
const notyf = new Notyf();

const userId = ref("");
// Props definition for script setup
const props = defineProps({
    ordersData: Object
});

userId.value = props.ordersData.userId

</script>

<template>
    
    <div id="productCard" class="card h-100 border-success border-opacity-25" v-if="userId">
        <div class="card-body">
            <!-- Mobile/Tablet View: Card Layout (hidden on desktop) -->
            <div class="d-block d-lg-none">
                <div class="card border-success mb-3">
                    <div class="card-header bg-success text-white d-flex justify-content-between align-items-center">
                        <span><i class="bi bi-box-seam me-2"></i>Order Summary</span>
                        <span class="badge bg-light text-success">{{ props.ordersData.status }}</span>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-6">
                                <small class="text-success fw-bold">Order ID</small>
                                <p class="mb-0 text-truncate">{{ props.ordersData._id }}</p>
                            </div>
                            <div class="col-6">
                                <small class="text-success fw-bold">User ID</small>
                                <p class="mb-0 text-truncate">{{ props.ordersData.userId }}</p>
                            </div>
                            <div class="col-6">
                                <small class="text-success fw-bold">Total Price</small>
                                <p class="mb-0 fw-bold text-success">₱ {{ props.ordersData.totalPrice }}</p>
                            </div>
                            <div class="col-6">
                                <small class="text-success fw-bold">Quantity</small>
                                <p class="mb-0"><span class="badge bg-success">{{ props.ordersData.productsOrdered.length }}</span></p>
                            </div>
                            <div class="col-12">
                                <small class="text-success fw-bold">Ordered On</small>
                                <p class="mb-0">{{ new Date(props.ordersData.orderedOn).toLocaleDateString() }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Desktop View: Table Layout (hidden on mobile/tablet) -->
            <div class="table-responsive d-none d-lg-block">
                <table class="table table-hover align-middle">
                    <thead class="table-success">
                        <tr>
                            <th><i class="bi bi-hash me-1"></i>Order ID</th>
                            <th><i class="bi bi-person me-1"></i>User ID</th>
                            <th><i class="bi bi-currency me-1"></i>Total Price</th>
                            <th><i class="bi bi-calendar me-1"></i>Ordered On</th>
                            <th><i class="bi bi-box me-1"></i>Quantity</th>
                            <th><i class="bi bi-tag me-1"></i>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-success border-opacity-25">
                            <td class="text-truncate" style="max-width: 150px;" title="{{ props.ordersData._id }}">{{ props.ordersData._id }}</td>
                            <td class="text-truncate" style="max-width: 150px;" title="{{ props.ordersData.userId }}">{{ props.ordersData.userId }}</td>
                            <td class="fw-bold text-success">₱ {{ props.ordersData.totalPrice }}</td>
                            <td>{{ new Date(props.ordersData.orderedOn).toLocaleDateString() }}</td>
                            <td><span class="badge bg-success bg-opacity-25 text-white">{{ props.ordersData.productsOrdered.length }}</span></td>
                            <td>
                                <span :class="{
                                    'badge bg-success': props.ordersData.status === 'Completed',
                                    'badge bg-warning text-dark': props.ordersData.status === 'Pending',
                                    'badge bg-danger': props.ordersData.status === 'Cancelled'
                                }">
                                    {{ props.ordersData.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    


</template>

<style scoped>
.table-success {
    --bs-table-bg: #d1e7dd;
    --bs-table-color: #0a3622;
}

.bg-success {
    background-color: #198754 !important;
}

.text-success {
    color: #198754 !important;
}

.border-success {
    border-color: #198754 !important;
}

/* Tablet optimization */
@media (min-width: 768px) and (max-width: 991.98px) {
    .d-lg-block {
        display: none !important;
    }
    .d-block {
        display: block !important;
    }
}

/* Mobile optimization */
@media (max-width: 767.98px) {
    .card-body {
        padding: 0.75rem;
    }
    
    .col-6 p {
        font-size: 0.9rem;
    }
    
    .badge {
        font-size: 0.75rem;
    }
}
</style>