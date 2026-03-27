<script>
    import ProductsComponent from '../components/ProductsComponent.vue';
    
    import {ref, reactive, onBeforeMount} from 'vue';

    import api from "../api" 

    import { jwtDecode } from 'jwt-decode'; //admin checker

    // added for group imrovement
    import ProductImageGallery from '../components/ProductImageGallery.vue';
    

    const isEnabled = ref(false)
    const isLoading = ref(true) // Loading state

    export default {
        components: {
            ProductsComponent,
            ProductImageGallery // added for group imrovement
                       
        },
        
        setup() {
            const products = reactive({ data: [] })

            onBeforeMount(async () => {
                isLoading.value = true; // Start loading

                const token = localStorage.getItem('token'); 
                
                // not logged in checker
                if (!token) {
                    try {
                        const { data } = await api.get('/products/active');
                        products.data = data;
                        isEnabled.value = false; 
                    } catch (error) {
                        console.error("Error fetching active products:", error);
                        products.data = [];
                    } finally {
                        isLoading.value = false; // End loading
                    }
                    return;
                }
                
                try {
                    const decodedToken = jwtDecode(token);
                                    
                    if (decodedToken.isAdmin) {
                        //admin checker
                        const { data } = await api.get('/products/all');
                        products.data = data;
                        isEnabled.value = true; 
                    } else {
                        //admin checker
                        const { data } = await api.get('/products/active');
                        products.data = data;
                        isEnabled.value = false; 
                    }
                } catch (error) {
                    console.error("Error decoding token or fetching products:", error);
                    
                    try {
                        const { data } = await api.get('/products/active');
                        products.data = data;
                        isEnabled.value = false;
                    } catch (fallbackError) {
                        console.error("Error fetching fallback products:", fallbackError);
                        products.data = [];
                        isEnabled.value = false;
                    }
                } finally {
                    isLoading.value = false; // End loading
                }
            });

            return { products, isEnabled, isLoading };
        }
    }
</script>

<template>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
        <div class="text-center py-5">
            <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading products...</span>
            </div>
            <p class="mt-3 text-muted">Loading products...</p>
        </div>
    </div>

    <!-- Regular User View - Image Gallery (only show when not loading and not admin and products exist) -->
    <ProductImageGallery 
        v-else-if="!isEnabled && products.data.length > 0" 
        :productData="products.data"
    />

    <!-- Regular User View - No Products -->
    <div v-else-if="!isEnabled && products.data.length === 0" class="container text-center py-5">
        <i class="bi bi-box-seam fs-1 text-muted"></i>
        <p class="mt-3 text-muted">No products available at the moment.</p>
    </div>

    <!-- Admin View -->
    <div v-else-if="isEnabled" class="container">
        <!-- Admin Header -->
        <div class="row">
            <div class="col my-5">
                <h1 class="text-center text-success py-1">
                    <i class="bi bi-shield-lock me-2"></i>Welcome Admin
                </h1>
                <p class="text-center text-muted">Manage your product inventory</p>
            </div>
        </div>
        
        <!-- Admin Action Buttons -->
        <div class="row mb-4">
            <div class="col-12 d-flex justify-content-center gap-3 flex-wrap">
                <router-link class="btn btn-success btn-lg px-4" :to="{ name: 'AddProduct'}">
                    <i class="bi bi-plus-circle me-2"></i> Add New Product
                </router-link>
                <router-link class="btn btn-outline-success btn-lg px-4" :to="{ name: 'OrdersPage'}">
                    <i class="bi bi-truck me-2"></i> Show Orders
                </router-link>
            </div>
        </div>

        <!-- Products Table - Single Header, Multiple Rows -->
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <!-- SINGLE HEADER - appears only once -->
                        <thead class="table-success">
                            <tr>
                                <th scope="col" class="ps-3">
                                    <i class="bi bi-tag me-2"></i>Name
                                </th>
                                <th scope="col" class="d-none d-md-table-cell">
                                    <i class="bi bi-card-text me-2"></i>Description
                                </th>
                                <th scope="col" class="text-center">
                                    <i class="bi bi-currency-dollar me-2"></i>Price
                                </th>
                                <th scope="col" class="text-center d-none d-sm-table-cell">
                                    <i class="bi bi-check-circle me-2"></i>Availability
                                </th>
                                <th scope="col" class="text-center">
                                    <i class="bi bi-gear me-2"></i>Actions
                                </th>
                            </tr>
                        </thead>
                        
                        <!-- TABLE BODY - One row per product -->
                        <tbody>
                            <ProductsComponent 
                                v-for="product in products.data" 
                                :key="product._id"
                                :productData="product"
                                :isEnabled="isEnabled"
                            />
                            
                            <!-- Empty State Row -->
                            <tr v-if="products.data.length === 0">
                                <td colspan="5" class="text-center py-5">
                                    <i class="bi bi-box-seam fs-1 text-muted"></i>
                                    <p class="mt-3 text-muted">No products available</p>
                                    <router-link class="btn btn-success btn-sm" :to="{ name: 'AddProduct'}">
                                        <i class="bi bi-plus-circle me-2"></i> Add Product
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Loading Container Styles */
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

/* Table Header Styling */
.table-success {
    --bs-table-bg: #d1e7dd;
    --bs-table-color: #0a3622;
    --bs-table-striped-bg: #c8e0d5;
    --bs-table-hover-bg: #bcd9cb;
}

.table th {
    font-weight: 600;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 1rem 0.75rem;
    white-space: nowrap;
}

/* Button Styles */
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

/* Spinner Animation */
.spinner-border {
    animation: spinner-border 0.75s linear infinite;
}

/* Responsive Styles */

/* Desktop (1200px and up) */
@media (min-width: 1200px) {
    .container {
        max-width: 1400px;
    }
}

/* Tablet Landscape (992px - 1199px) */
@media (min-width: 992px) and (max-width: 1199.98px) {
    .table th {
        font-size: 0.9rem;
        padding: 0.9rem 0.6rem;
    }
}

/* Tablet Portrait (768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .table th {
        font-size: 0.85rem;
        padding: 0.8rem 0.5rem;
    }
    
    .btn-lg {
        padding: 0.5rem 1rem;
        font-size: 1rem;
    }
}

/* Mobile (below 768px) */
@media (max-width: 767.98px) {
    .table th {
        font-size: 0.8rem;
        padding: 0.7rem 0.3rem;
    }
    
    .btn-lg {
        padding: 0.5rem 0.8rem;
        font-size: 0.9rem;
    }
}

/* Extra Small Mobile (below 576px) */
@media (max-width: 575.98px) {
    .table th {
        font-size: 0.7rem;
        padding: 0.6rem 0.2rem;
    }
}
</style>
