<script setup>

import { onMounted, onBeforeMount, ref, watch } from "vue";
import { useGlobalStore } from "../stores/global";
import { jwtDecode } from 'jwt-decode'; //admin checker

import api from "../api";

import { Notyf } from 'notyf';
const notyf = new Notyf();

// Props definition for script setup
const props = defineProps({
    productData: Object
});


const globalStore = useGlobalStore();
const isEnabled = ref(true)

//testadminchecker
const token = localStorage.getItem('token');
const decodedToken =ref("")
if(token){
  decodedToken.value = jwtDecode(token);
}            
const userId = ref(decodedToken.id || "");
const isAdmin = ref(decodedToken.isAdmin || false)
//testadminchecker

const filteredProducts = ref([...props.productData])
const selectedCategory = ref('all');

watch(() => props.productData, (newData) => {
  if (newData && newData.length > 0) {
    showProducts(selectedCategory.value);
  }
}, { immediate: true });


const setCategory = (category) => {
  selectedCategory.value = category;
  showProducts(category)
  
};

async function showProducts(category) {
  if (category === "coffee") {
    filteredProducts.value = props.productData.filter(
      filter => filter.category === "coffee"
    );
  } else if (category === "milktea") {
    filteredProducts.value = props.productData.filter(
      filter => filter.category === "milktea"
    );
  } else if (category === "pasta") {
    filteredProducts.value = props.productData.filter(
      filter => filter.category === "pasta"
    );
  } else if (category === "pastry") {
    filteredProducts.value = props.productData.filter(
      filter => filter.category === "pastry"
    );
  } else if (category === "all") {
    filteredProducts.value = [...props.productData];
  }
}

// async function showProducts(category){
//   // console.log(props.productData)
//   if(category === "coffee"){

//     filteredProducts.value = [];
//     props.productData.map(filter => {
//       if (filter.category === "coffee") {
//           filteredProducts.value.push(filter);
//       }
    
//     });
//   }

//   if(category === "milktea"){

//     filteredProducts.value = [];

//     props.productData.map(filter => {
//       if (filter.category === "milktea") {
//           filteredProducts.value.push(filter);
//       }
    
//     });
//   }

//   if(category === "all"){

//     filteredProducts.value = [];
//     filteredProducts.value = props.productData;

//   }
    
// }

</script>

<template>
    
    
  <div class="image-gallery-wrapper" v-if="!isAdmin">
    <!-- Header -->
    <div class="gallery-header mb-4">
      <h4 class="text-white mb-2" style="color: #328d32 !important;">
        <i class="bi bi-images me-2"></i>Our Collection
      </h4>
      <p class="text-success opacity-75">Browse our selection of premium coffee and milk tea</p>
    </div>

    <!-- Category Buttons with Active State -->
    <div class="d-flex flex-wrap justify-content-center mb-4" id="productMenu">
      <button 
        class="btn m-2" 
        :class="selectedCategory === 'all' ? 'btn-success' : 'btn-outline-success'"
        @click="setCategory('all')"
      >
        <i class="bi bi-grid me-2"></i> All Products
      </button>
      <button 
        class="btn m-2" 
        :class="selectedCategory === 'coffee' ? 'btn-success' : 'btn-outline-success'"
        @click="setCategory('coffee')"
      >
        <i class="bi bi-cup-hot-fill me-2"></i> Coffee
      </button>
      <button 
        class="btn m-2" 
        :class="selectedCategory === 'milktea' ? 'btn-success' : 'btn-outline-success'"
        @click="setCategory('milktea')"
      >
        <i class="bi bi-cup-straw me-2"></i> Milk Tea
      </button>
        <button 
        class="btn m-2" 
        :class="selectedCategory === 'pasta' ? 'btn-success' : 'btn-outline-success'"
        @click="setCategory('pasta')"
      >
        <i class="bi bi-basket me-2"></i> Pasta
      </button>
            
      <button 
        class="btn m-2" 
        :class="selectedCategory === 'pastry' ? 'btn-success' : 'btn-outline-success'"
        @click="setCategory('pastry')"
      >
        <i class="bi bi-cake me-2"></i> Pastry
      </button>
    </div>

    <hr class="border-success border-opacity-25 mb-4">

    <!-- Image Gallery Grid -->
    
    <div class="row g-4">      
      <div v-for="(item, index) in filteredProducts" :key="'coffee-'+index" 
           class="col-12 col-sm-6 col-lg-4">
        <router-link id="producttView" :to="{ path: `/products/${item._id}`}">
          <div class="image-card h-100" >
            <div class="image-container">
              <img :src="item.image" :alt="item.name" class="img-fluid">
              <!-- <div class="image-overlay">
                <span class="badge bg-white" style="color: #328d32;">{{item.category}}</span>
              </div> -->
            </div>
            <div class="card-body p-3">
              <h6 class="text-white mb-1">{{ item.name }}</h6>
              <p class="text-white opacity-75 small mb-0">{{ item.description }}</p>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <span class="text-white fw-bold">₱{{ item.price }}</span>
                
                <span class="badge bg-white p-2" style="color: #328d32;" >{{item.category}}</span>
              
                <!-- <router-link class="btn btn-sm"  id="producttView" :to="{ path: `/products/${item._id}`}">
                  <i class="bi bi-eye me-1"></i>View
                </router-link> -->
              </div>
            </div>
          </div>
        </router-link>
      </div>     
    </div>

    

  </div>
</template>

<style scoped>

#productMenu button{
  font-size: large !important;
}

#producttView{
  background-color: white; 
  color: #328d32;
  text-decoration: none;
}
.image-gallery-wrapper {
  padding: 1rem;
  background-color: transparent;
}

/* Image Card Styles */
.image-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(50, 141, 50, 0.3);
}

/* Image Container */
.image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f8f9fa;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-card:hover .image-container img {
  transform: scale(1.1);
}

/* Image Overlay */
.image-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.image-overlay .badge {
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Card Body */
.card-body {
  background-color: #328d32;
}

.card-body h6 {
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-body p {
  font-size: 0.8rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Button Styles */
.btn {
  padding: 0.25rem 1rem;
  font-size: 0.8rem;
  border-radius: 20px;
  border: none;
  transition: all 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
  transform: scale(1.05);
}

/* Header Styles */
.gallery-header h4 {
  font-size: 1.5rem;
  font-weight: 600;
  display: inline-block;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #328d32;
}

/* Responsive Styles */

/* Large Desktop (1200px and up) */
@media (min-width: 1200px) {
  .image-gallery-wrapper {
    padding: 2rem;
  }
  
  .image-container {
    height: 220px;
  }
}

/* Desktop (992px - 1199px) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .image-container {
    height: 180px;
  }
}

/* Tablet (768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
  .image-gallery-wrapper {
    padding: 1rem;
  }
  
  .image-container {
    height: 160px;
  }
  
  .card-body h6 {
    font-size: 0.95rem;
  }
  
  .card-body p {
    font-size: 0.75rem;
  }
  
  .btn {
    padding: 0.2rem 0.8rem;
    font-size: 0.75rem;
  }
}

/* Mobile (576px - 767px) */
@media (min-width: 576px) and (max-width: 767.98px) {
  .image-gallery-wrapper {
    padding: 0.5rem;
  }
  
  .image-container {
    height: 150px;
  }
  
  .card-body {
    padding: 0.75rem !important;
  }
  
  .card-body h6 {
    font-size: 0.9rem;
  }
  
  .card-body p {
    font-size: 0.7rem;
    -webkit-line-clamp: 1;
  }
  
  .btn {
    padding: 0.15rem 0.6rem;
    font-size: 0.7rem;
  }
}

/* Extra Small Mobile (below 576px) */
@media (max-width: 575.98px) {
  .image-gallery-wrapper {
    padding: 0.25rem;
  }
  
  .gallery-header h4 {
    font-size: 1.2rem;
  }
  
  .gallery-header p {
    font-size: 0.8rem;
  }
  
  .image-container {
    height: 140px;
  }
  
  .card-body {
    padding: 0.5rem !important;
  }
  
  .card-body h6 {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }
  
  .card-body p {
    font-size: 0.65rem;
    -webkit-line-clamp: 1;
    margin-bottom: 0.25rem;
  }
  
  .btn {
    padding: 0.1rem 0.5rem;
    font-size: 0.65rem;
  }
  
  .badge {
    padding: 0.3rem 0.6rem !important;
    font-size: 0.65rem !important;
  }
}

/* Touch Device Optimization */
@media (hover: none) and (pointer: coarse) {
  .image-card:hover {
    transform: none;
  }
  
  .image-card:hover .image-container img {
    transform: none;
  }
  
  .btn {
    padding: 0.3rem 1rem;
    min-height: 36px;
  }
}
</style>
