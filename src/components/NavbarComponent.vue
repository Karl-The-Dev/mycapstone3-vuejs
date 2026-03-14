<script setup>
  
  import {onBeforeMount, ref} from "vue";
  import { useGlobalStore } from "../stores/global";
  import { jwtDecode } from 'jwt-decode'; //admin checker

  const token = ref("");
  const { user, setUser } = useGlobalStore();  
  const isAdmin = ref(false); //admin checker

  
   
  onBeforeMount(()=> {
    // get the value of the logcal storage token
    token.value = localStorage.getItem("token");

    setUser(localStorage.getItem("token"))

    //admin checker
    if(token.value && typeof token.value === 'string'){
      const testToken = localStorage.getItem("token")
      const decodedToken = jwtDecode(testToken);    
      isAdmin.value = decodedToken.isAdmin;
    }
       
  })
 
</script>



<template>
  <nav class="navbar navbar-expand-lg sticky-top shadow-sm" id="mainNavbar">
    <div class="container">
      
      <!-- Navbar Brand -->
      <router-link class="navbar-brand fw-bold" :to="{ name: 'Home' }" id="brand">
        <i class="bi bi-cup-hot-fill me-2"></i>JavaSip
      </router-link>
      
      <!-- Toggler Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
              id="navbarToggler">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <!-- Navbar Links -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">        
        <div class="navbar-nav ms-auto">
          <!-- Products Link -->
          <router-link class="nav-link" :to="{ name: 'Products'}" id="productsLink">
            <i class="bi bi-box-seam me-1"></i>Products
          </router-link>
          
          <!-- Guest Links (not logged in) -->
          <router-link class="nav-link" :to="{ name: 'Register' }" v-if="!user.token" id="registerLink">
            <i class="bi bi-person-plus me-1"></i>Register
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Login'}" v-if="!user.token" id="loginLink">
            <i class="bi bi-box-arrow-in-right me-1"></i>Login
          </router-link>
          
          <!-- User Links (logged in) -->
          <router-link class="nav-link" :to="{ name: 'Cart'}" v-if="user.token" id="cartLink">
            <i class="bi bi-cart me-1"></i>Cart
          </router-link>
          <router-link class="nav-link" :to="{ name: 'Logout'}" v-if="user.token" id="logoutLink">
            <i class="bi bi-box-arrow-right me-1"></i>Logout
          </router-link>
        </div>
      </div>
    </div>   	
  </nav>
</template>

<style scoped>
/* Navbar Base Styles */
#mainNavbar {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-bottom: 3px solid #198754;
  padding: 0.75rem 0;
  transition: all 0.3s ease;
}

/* Brand Styling */
#brand {
  color: #198754 !important;
  font-size: 1.75rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
}

#brand i {
  color: #198754;
  transition: transform 0.3s ease;
}

#brand:hover {
  transform: translateY(-2px);
}

#brand:hover i {
  transform: rotate(10deg) scale(1.1);
}

/* Navbar Toggler */
#navbarToggler {
  border: 2px solid #198754;
  color: #198754;
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
}

#navbarToggler:hover {
  background-color: rgba(25, 135, 84, 0.1);
  transform: scale(1.05);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(25, 135, 84, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Navbar Links */
.nav-link {
  color: #2c3e50 !important;
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  margin: 0 0.2rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link i {
  color: #198754;
  transition: all 0.3s ease;
}

/* Hover Effects */
.nav-link:hover {
  color: #198754 !important;
  background-color: rgba(25, 135, 84, 0.1);
  transform: translateY(-2px);
}

.nav-link:hover i {
  transform: scale(1.2);
}

/* Active Link Styling */
.router-link-active {
  color: #198754 !important;
  font-weight: 600;
  background-color: rgba(25, 135, 84, 0.15);
  border-radius: 30px;
}

.router-link-active i {
  color: #198754;
}

/* Underline Animation */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background-color: #198754;
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.router-link-active::after {
  transform: translateX(-50%) scaleX(1);
}

/* Responsive Styles */

/* Desktop */
@media (min-width: 992px) {
  .nav-link {
    margin: 0 0.3rem;
  }
  
  #brand {
    font-size: 2rem;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 991.98px) {
  #brand {
    font-size: 1.6rem;
  }
  
  .nav-link {
    padding: 0.4rem 0.8rem !important;
    font-size: 0.95rem;
  }
}

/* Mobile */
@media (max-width: 767.98px) {
  #mainNavbar {
    padding: 0.5rem 0;
  }
  
  #brand {
    font-size: 1.4rem;
  }
  
  .navbar-collapse {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    padding: 1rem;
    border-radius: 12px;
    margin-top: 0.5rem;
    border: 1px solid rgba(25, 135, 84, 0.2);
  }
  
  .nav-link {
    padding: 0.75rem 1rem !important;
    text-align: center;
    margin: 0.2rem 0;
  }
  
  .nav-link::after {
    bottom: 5px;
  }
  
  .navbar-nav {
    gap: 0.2rem;
  }
}

/* Extra Small Mobile */
@media (max-width: 575.98px) {
  #brand {
    font-size: 1.2rem;
  }
  
  #brand i {
    font-size: 1.2rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 0.6rem !important;
  }
}

/* Touch Device Optimization */
@media (hover: none) and (pointer: coarse) {
  .nav-link {
    padding: 0.8rem 1rem !important;
    min-height: 48px;
  }
  
  #navbarToggler {
    min-height: 48px;
    min-width: 48px;
  }
  
  .nav-link::after {
    display: none; /* Remove underline on touch devices */
  }
  
  .nav-link:active {
    background-color: rgba(25, 135, 84, 0.2);
    transform: scale(0.98);
  }
}

/* Animation for sticky navbar */
@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.sticky-top {
  animation: slideDown 0.3s ease;
}

/* Dropdown Menu Styling (if needed) */
.dropdown-menu {
  border: 1px solid rgba(25, 135, 84, 0.2);
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(25, 135, 84, 0.15);
}

.dropdown-item:hover {
  background-color: rgba(25, 135, 84, 0.1);
  color: #198754;
}

/* Cart Badge (if you want to add item count later) */
.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;
}

/* Loading state for nav items */
.nav-link.router-link-active {
  cursor: default;
}
</style>

