<script setup>

    import { watch, ref, onMounted, onBeforeMount } from 'vue';
    import { Notyf } from 'notyf';
    
    import { useGlobalStore } from "../stores/global";

    import { useRouter } from 'vue-router'; 
    import api from "../api" 
    const router = useRouter()   

    const email = ref("");
    const password = ref("");
    const isEnabled = ref(false);

    
    const { setUser } = useGlobalStore();

    const notyf = new Notyf();

    watch([email,password], (currentValue, oldValue) => {

        if(currentValue.every(input => input !== "")){
            isEnabled.value = true
        } else {
            isEnabled.value = false
        }
    });

    async function handleSubmit(e){
        e.preventDefault(); 

        try { 

            let res = await api.post('/users/login', {
            
                email: email.value,
                password: password.value
            })

            console.log(res);   
            console.log(res.data.token); 

            if(res.data.access){ 

                notyf.success("Login Successful"); 
                
                localStorage.setItem("token", res.data.access); 
                setUser(res.data.access) 

                email.value = "";
                password.value = "";

                router.push({path: "/products"});
                
                
            }

        }
        catch(err){ 
            console.log(err);
            if(err.response.status === 404 || err.response.status === 401 || err.response.status === 400){
                notyf.error(err.response.data.message);

            }else{
                notyf.error("Login Failed. Please contact administrator.");
            }

        }
        
    }

// GOOGLE LOGIN 

// async function handleGoogleLogin(){

//      window.location.href = 'http://localhost:4000/users/google';
// }



</script>

<template>
    <div class="container-fluid min-vh-80 d-flex align-items-start">
        <div class="row w-100 justify-content-center">
            <div class="col-12">
                <!-- Page Header -->
                <h1 class="my-4 pt-3 text-center d-flex justify-content-center" id="loginHeader">
                    <i class="bi bi-cup-hot-fill me-2"></i>Welcome!
                </h1>
                <p class="text-center text-muted mb-5" id="loginSubtitle">
                    Sign in to continue your JavaSip journey
                </p>
            </div>

            <!-- Login Form -->
            <div class="col-md-6 col-lg-4 mx-auto">
                <!-- Login Card -->
                <div class="card border-success border-opacity-25 shadow-lg" id="loginCard">
                    <div class="card-header bg-success text-white py-3 text-center">
                        <h5 class="mb-0">
                            <i class="bi bi-box-arrow-in-right me-2"></i>Member Login
                        </h5>
                    </div>
                    
                    <div class="card-body p-4">
                        <form @submit.prevent="handleSubmit">
                            <!-- Email Field -->
                            <div class="mb-4">
                                <label for="emailInput" class="form-label text-success fw-semibold">
                                    <i class="bi bi-envelope me-2"></i>Email Address
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text bg-success text-white">
                                        <i class="bi bi-envelope"></i>
                                    </span>
                                    <input 
                                        type="email" 
                                        class="form-control form-control-lg border-success border-opacity-25" 
                                        id="emailInput" 
                                        v-model="email"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <!-- Password Field -->
                            <div class="mb-4">
                                <label for="passwordInput" class="form-label text-success fw-semibold">
                                    <i class="bi bi-lock me-2"></i>Password
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text bg-success text-white">
                                        <i class="bi bi-lock"></i>
                                    </span>
                                    <input 
                                        type="password" 
                                        class="form-control form-control-lg border-success border-opacity-25" 
                                        id="passwordInput" 
                                        v-model="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </div>

                            <!-- Remember Me & Forgot Password -->
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="rememberMe">
                                    <label class="form-check-label text-muted" for="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" class="text-success text-decoration-none small" id="forgotPassword">
                                    Forgot Password?
                                </a>
                            </div>

                            <!-- Login Button -->
                            <div class="d-grid mt-4">
                                <button 
                                    type="submit" 
                                    class="btn btn-success btn-lg py-3" 
                                    :class="{ 'opacity-50': !isEnabled }"
                                    :disabled="!isEnabled"
                                >
                                    <i class="bi bi-box-arrow-in-right me-2"></i>
                                    {{ isEnabled ? 'Sign In' : 'Please wait...' }}
                                </button>
                            </div>

                             <!-- Google Login Button -->
                            <!-- <div class="d-grid m-3">
                                <button 
                                    type="button" 
                                    class="btn btn-outline-secondary btn-lg py-2" 
                                    id="googleLoginBtn"
                                    @click="handleGoogleLogin"
                                >
                                    <img src="https://www.google.com/favicon.ico" alt="Google" class="me-2" style="width: 20px; height: 20px;">
                                    Continue with Google
                                </button>
                            </div> -->

                            <!-- Register Link -->
                            <div class="text-center mt-4">
                                <p class="text-muted mb-0">
                                    Don't have an account? 
                                    <router-link to="/users/register" class="text-success fw-semibold text-decoration-none" id="registerLink">
                                        Create one here
                                    </router-link>
                                </p>
                            </div>

                            <!-- Demo Credentials (Optional) -->
                            <div class="alert alert-success bg-success bg-opacity-10 border-success mt-4 mb-0" id="demoAlert">
                                <small class="d-block text-success">
                                    <i class="bi bi-info-circle me-1"></i>
                                    <strong>Demo Credentials:</strong><br>
                                    Email: demo@javasip.com<br>
                                    Password: demo123
                                </small>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Back to Home Link -->
                <div class="text-center mt-4">
                    <router-link to="/" class="text-muted text-decoration-none small" id="backToHome">
                        <i class="bi bi-arrow-left me-1"></i> Back to Home
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Container Styles */
.container-fluid {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 2rem 1rem;
}

/* Page Header Styles */
#loginHeader {
    color: #198754;
    font-size: 2.5rem;
    font-weight: 600;
    position: relative;
    display: inline-block;
    padding-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
}

#loginHeader::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #198754, transparent);
    border-radius: 2px;
}

#loginHeader i {
    color: #198754;
    animation: steam 2s infinite;
}

@keyframes steam {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
}

#loginSubtitle {
    font-size: 1.1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* Card Styles */
#loginCard {
    border-width: 2px;
    transition: all 0.3s ease;
    border-radius: 16px;
    overflow: hidden;
    animation: slideUp 0.5s ease;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#loginCard:hover {
    box-shadow: 0 15px 40px rgba(25, 135, 84, 0.2) !important;
    transform: translateY(-5px);
}

.card-header {
    border-bottom: none;
    background: linear-gradient(135deg, #198754 0%, #146c43 100%);
}

.card-header h5 {
    font-weight: 600;
    letter-spacing: 0.5px;
}

.card-body {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

/* Form Styles */
.form-control {
    padding: 0.75rem 1rem;
    transition: all 0.2s ease;
    border-left: none;
}

.form-control:focus {
    border-color: #198754;
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
    outline: none;
}

.form-control-lg {
    font-size: 1rem;
}

/* Input Group Styles */
.input-group-text {
    border: 1px solid rgba(25, 135, 84, 0.25);
    border-right: none;
    border-radius: 10px 0 0 10px;
    padding: 0.75rem 1.2rem;
    font-weight: 500;
}

.input-group .form-control {
    border-radius: 0 10px 10px 0;
}

/* Label Styles */
.form-label {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
}

.form-label i {
    font-size: 1.1rem;
}

/* Button Styles */
.btn-success {
    background: linear-gradient(135deg, #198754 0%, #146c43 100%);
    border: none;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    border-radius: 12px;
}

.btn-success:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(25, 135, 84, 0.4);
}

.btn-success:disabled {
    background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
    border: none;
    cursor: not-allowed;
}

/* Remember Me Checkbox */
.form-check-input:checked {
    background-color: #198754;
    border-color: #198754;
}

.form-check-input:focus {
    border-color: #198754;
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.form-check-label {
    font-size: 0.9rem;
}

/* Forgot Password Link */
#forgotPassword {
    font-size: 0.9rem;
    transition: all 0.2s ease;
    position: relative;
}

#forgotPassword::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: #198754;
    transition: width 0.3s ease;
}

#forgotPassword:hover::after {
    width: 100%;
}

/* Register Link */
#registerLink {
    position: relative;
    font-weight: 600;
}

#registerLink::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #198754;
    transition: width 0.3s ease;
}

#registerLink:hover::after {
    width: 100%;
}

/* Demo Alert */
#demoAlert {
    border: 1px solid rgba(25, 135, 84, 0.3);
    border-radius: 10px;
    padding: 1rem;
}

.bg-success.bg-opacity-10 {
    background-color: rgba(25, 135, 84, 0.1) !important;
}

/* Back to Home Link */
#backToHome {
    transition: all 0.2s ease;
}

#backToHome:hover {
    color: #198754 !important;
}

#backToHome i {
    transition: transform 0.2s ease;
}

#backToHome:hover i {
    transform: translateX(-3px);
}

/* Utility Classes */
.bg-success {
    background-color: #198754 !important;
}

.text-success {
    color: #198754 !important;
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

/* Desktop */
@media (min-width: 1200px) {
    #loginHeader {
        font-size: 3rem;
    }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 991.98px) {
    #loginHeader {
        font-size: 2.2rem;
    }
    
    .card-body {
        padding: 2rem !important;
    }
}

/* Mobile */
@media (max-width: 767.98px) {
    #loginHeader {
        font-size: 1.8rem;
        margin-top: 1rem !important;
    }
    
    #loginSubtitle {
        font-size: 1rem;
        padding: 0 1rem;
        margin-bottom: 2rem;
    }
    
    .card-body {
        padding: 1.5rem !important;
    }
    
    .form-control-lg {
        padding: 0.6rem 0.9rem;
        font-size: 0.95rem;
    }
    
    .btn-lg {
        padding: 0.8rem 1rem;
        font-size: 1rem;
    }
    
    .input-group-text {
        padding: 0.6rem 1rem;
    }
    
    .input-group-text i {
        font-size: 1rem;
    }
}

/* Extra Small Mobile */
@media (max-width: 575.98px) {
    #loginHeader {
        font-size: 1.5rem;
    }
    
    .card-body {
        padding: 1rem !important;
    }
    
    .form-label {
        font-size: 0.9rem;
    }
    
    .form-check-label {
        font-size: 0.8rem;
    }
    
    #forgotPassword {
        font-size: 0.8rem;
    }
    
    .text-muted {
        font-size: 0.85rem;
    }
}

/* Touch Device Optimization */
@media (hover: none) and (pointer: coarse) {
    .form-control {
        font-size: 16px; /* Prevents zoom on mobile */
        min-height: 50px;
    }
    
    .btn-success {
        min-height: 54px;
    }
    
    .form-check-input {
        width: 1.3rem;
        height: 1.3rem;
    }
    
    .input-group-text {
        min-height: 50px;
    }
    
    #forgotPassword, #registerLink {
        padding: 0.5rem 0; /* Larger touch target */
    }
}

/* Loading State */
.btn-success:disabled {
    background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
    transform: none;
    box-shadow: none;
}

/* Google Login */
#googleLoginBtn {
    border: 1px solid #dadce0;
    background-color: white;
    color: #3c4043;
    font-weight: 500;
    transition: all 0.2s ease;
}

#googleLoginBtn:hover {
    background-color: #f8f9fa;
    border-color: #dadce0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

#googleLoginBtn img {
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
}

/* Divider styling */
.position-relative hr {
    border-top: 1px solid rgba(0,0,0,0.1);
}

.position-relative span {
    font-size: 0.85rem;
    font-weight: 500;
    background-color: white;
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
    #googleLoginBtn {
        font-size: 0.95rem;
        padding: 0.7rem 1rem;
    }
    
    #googleLoginBtn img {
        width: 18px;
        height: 18px;
    }
}

@media (max-width: 575.98px) {
    #googleLoginBtn {
        font-size: 0.9rem;
    }
}

/* Touch optimization */
@media (hover: none) and (pointer: coarse) {
    #googleLoginBtn {
        min-height: 48px;
    }
}
</style>