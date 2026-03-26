<script setup>
    
    import { watch, ref } from "vue";
    import { Notyf } from "notyf";
    import { useRouter } from "vue-router";
    import { useGlobalStore } from "../stores/global";
    
    import { onBeforeMount } from "vue";
    import api from "../api"     
    import { jwtDecode } from 'jwt-decode';

    const router = useRouter();
    const store = useGlobalStore();

    const name = ref("");
    const description = ref("");
    const price = ref("");
    const image = ref("");
    const category = ref("")
    const isEnabled = ref(false);
    
    const isAdmin = ref(false);

    const notyf = new Notyf();
    
    const { user, setUser } = useGlobalStore();
    
    
    onBeforeMount(() =>{
        
        const token = localStorage.getItem("token")
        
        const decodedToken = jwtDecode(token);       
        
        // IF USER IS ADMIN, CHANGE THE VALUE to TRUE / ELSE REDIRECT TO COURSE PAGE
        if (decodedToken.isAdmin === true){
            isAdmin.value = decodedToken.isAdmin;
        }
        else{
            router.push({path: "/products"});
        }
        // check to see if the isAdmin value is changed to true
        // console.log(isAdmin.value)        
                
    });
           

    // watch if the name, description, price are blank
    watch([name, description, price], (currentValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    // IF ALL GOOD, HANDLE THE ADD PRODUCT TO THE DATABASE
    async function handleSubmit(e){
        e.preventDefault();

        let response = "";

        try {
            
            // Proceed to request for adding product, backend handles duplicates
            response = await api.post('/products', {
                name: name.value,
                description: description.value,
                price: price.value,
                image: image.value,
                category: category.value
            });

            if(response.data.success === true) {

                notyf.success(response.data.message);

                name.value = "";
                description.value = "";
                price.value = "";
                image.value = "";
                category.value = "";

            } else {
                notyf.error("Add Product Failed1. Please contact administrator.");
            }

        } catch (error) {
        // Handle any errors from either the search or create operations
            if (error.response) {
                const message = error.response.data?.message || "An error occurred";
                notyf.error(message);
            } else {
                notyf.error("Add Product Failed2. Please contact administrator.");
            }
        }
    }
    

</script>

<template>
  <div class="container">
    <!-- Page Header -->
    <div class="row">
        <div class="col my-5">
            <h1 class="text-center py-1" :class="isAdmin === true ? 'text-success' : 'text-danger'" v-if="isAdmin === true">
                <i class="bi bi-plus-circle me-2"></i>Add New Product
            </h1>
            <h1 class="text-center text-danger py-1" v-else>
                <i class="bi bi-shield-lock me-2"></i>You are not an Admin!
            </h1>              
        </div>
    </div>

    <!-- Back Button -->
    <div class="row mb-4">
        <div class="col-12">
            <router-link class="btn btn-outline-success px-4" :to="{ name: 'Products'}">
                <i class="bi bi-arrow-left me-2"></i> Back to Products
            </router-link>
        </div>
    </div>

    <!-- Admin Form Section -->
    <div class="container-fluid" v-if="isAdmin === true">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 mx-auto">
                <!-- Form Card -->
                <div class="card border-success border-opacity-25 shadow-sm">
                    <div class="card-header bg-success text-white py-3">
                        <h5 class="mb-0">
                            <i class="bi bi-box-seam me-2"></i>Product Information
                        </h5>
                    </div>
                    
                    <div class="card-body p-4">
                        <form @submit="handleSubmit">
                            <!-- Product Name -->
                            <div class="mb-4">
                                <label class="form-label text-success fw-semibold">
                                    <i class="bi bi-tag me-2"></i>Product Name
                                </label>
                                <input 
                                    type="text" 
                                    v-model="name" 
                                    class="form-control form-control-lg border-success border-opacity-25"
                                    placeholder="Enter product name"
                                    required
                                >
                                <small class="text-muted">Give your product a descriptive name</small>
                            </div>

                            <!-- Description -->
                            <div class="mb-4">
                                <label class="form-label text-success fw-semibold">
                                    <i class="bi bi-card-text me-2"></i>Description
                                </label>
                                <textarea 
                                    v-model="description" 
                                    class="form-control border-success border-opacity-25"
                                    rows="5"
                                    placeholder="Enter product description here..."
                                    required
                                ></textarea>
                                <small class="text-muted">Describe your product's features and benefits</small>
                            </div>

                            <!-- Price -->
                            <div class="mb-4">
                                <label class="form-label text-success fw-semibold">
                                    <i class="bi bi-currency-dollar me-2"></i>Price (PHP)
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text bg-success text-white">₱</span>
                                    <input 
                                        type="number" 
                                        v-model="price" 
                                        class="form-control border-success border-opacity-25"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        required
                                    >
                                </div>
                                <small class="text-muted">Set your product price in Philippine Peso</small>
                            </div>

                            <!-- Product Image -->
                            <div class="mb-4">
                                <label class="form-label text-success fw-semibold">
                                    <i class="bi bi-image me-2"></i>Product Image URL
                                </label>
                                <input 
                                    type="url" 
                                    v-model="image" 
                                    class="form-control border-success border-opacity-25"
                                    placeholder="https://example.com/product-image.jpg"
                                >
                                <small class="text-muted">Enter the full URL of your product image</small>
                                
                                <!-- Image Preview -->
                                <div v-if="image" class="mt-3 p-3 bg-light rounded">
                                    <p class="small text-success mb-2">Image Preview:</p>
                                    <img 
                                        :src="image" 
                                        class="img-fluid rounded border border-success border-opacity-25" 
                                        style="max-height: 150px;"
                                        @error="imageError = true"
                                        @load="imageError = false"
                                    >
                                    <p v-if="imageError" class="small text-danger mt-2">
                                        <i class="bi bi-exclamation-triangle me-1"></i>Invalid image URL
                                    </p>
                                </div>
                            </div>

                            <!-- Category -->
                            <div class="mb-4">
                                <label class="form-label text-success fw-semibold">
                                    <i class="bi bi-grid me-2"></i>Category
                                </label>
                                <select 
                                    v-model="category" 
                                    class="form-select border-success border-opacity-25"
                                    required
                                >
                                    <option value="" disabled selected>Select a category</option>
                                    <option value="coffee">Coffee</option>
                                    <option value="milktea">Milk Tea</option>
                                    <option value="pasta">Pasta</option>
                                    <option value="pastry">Pastry</option>
                                </select>
                                <small class="text-muted">Choose the product category</small>
                            </div>

                            <!-- Submit Button -->
                            <div class="mt-5">
                                <button 
                                    type="submit" 
                                    class="btn btn-success btn-lg w-100 py-3"
                                    :class="{ 'opacity-50': !isEnabled }"
                                    :disabled="!isEnabled"
                                >
                                    <i class="bi bi-check-circle me-2"></i>
                                    {{ isEnabled ? 'Add Product' : 'Please wait...' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Unauthorized Message -->
    <div class="container-fluid" v-else>
        <div class="row justify-content-center">
            <div class="col-md-6 text-center py-5">
                <div class="card border-danger border-opacity-25">
                    <div class="card-body p-5">
                        <i class="bi bi-shield-lock-exclamation text-danger" style="font-size: 4rem;"></i>
                        <h3 class="text-danger mt-4">Access Denied</h3>
                        <p class="text-muted mb-4">You don't have permission to access this page.</p>
                        <router-link class="btn btn-outline-danger" :to="{ name: 'Products'}">
                            <i class="bi bi-arrow-left me-2"></i> Go Back
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* Form Styling */
.form-control, .form-select {
    padding: 0.75rem 1rem;
    transition: all 0.2s ease;
}

.form-control:focus, .form-select:focus {
    border-color: #198754;
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
    outline: none;
}

.form-control-lg {
    font-size: 1.1rem;
}

/* Input Group Styling */
.input-group-text {
    border: 1px solid rgba(25, 135, 84, 0.25);
    border-right: none;
}

/* Card Styling */
.card {
    border-width: 2px;
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 10px 30px rgba(25, 135, 84, 0.15) !important;
}

.card-header {
    border-bottom: none;
}

/* Button Styling */
.btn-success {
    background-color: #198754;
    border-color: #198754;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.btn-success:hover:not(:disabled) {
    background-color: #157347;
    border-color: #146c43;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(25, 135, 84, 0.3);
}

.btn-outline-success {
    color: #198754;
    border-color: #198754;
    transition: all 0.3s ease;
}

.btn-outline-success:hover {
    background-color: #198754;
    border-color: #198754;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(25, 135, 84, 0.3);
}

/* Label Styling */
.form-label {
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

/* Text Colors */
.text-success {
    color: #198754 !important;
}

.bg-success {
    background-color: #198754 !important;
}

.border-success {
    border-color: #198754 !important;
}

.border-opacity-25 {
    --bs-border-opacity: 0.25;
}

.opacity-50 {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Responsive Styles */

/* Tablet */
@media (min-width: 768px) and (max-width: 991.98px) {
    .card-body {
        padding: 2rem !important;
    }
}

/* Mobile */
@media (max-width: 767.98px) {
    .col-md-8 {
        padding: 0 1rem;
    }
    
    .card-body {
        padding: 1.5rem !important;
    }
    
    .btn-lg {
        padding: 0.8rem 1rem;
        font-size: 1rem;
    }
    
    h1 {
        font-size: 1.8rem;
    }
}

/* Extra Small Mobile */
@media (max-width: 575.98px) {
    h1 {
        font-size: 1.5rem;
    }
    
    .btn-outline-success {
        padding: 0.4rem 1rem;
        font-size: 0.9rem;
    }
    
    .form-label {
        font-size: 0.9rem;
    }
    
    .card-body {
        padding: 1rem !important;
    }
}

/* Touch Device Optimization */
@media (hover: none) and (pointer: coarse) {
    .btn-success, .btn-outline-success {
        padding: 0.8rem 1rem;
    }
    
    .form-control, .form-select {
        font-size: 16px; /* Prevents zoom on mobile */
    }
}

/* Loading State */
.btn-success:disabled {
    background-color: #198754;
    border-color: #198754;
    opacity: 0.65;
    cursor: not-allowed;
}

/* Image Preview */
.bg-light {
    background-color: #f8f9fa !important;
}

.rounded {
    border-radius: 8px !important;
}
</style>
