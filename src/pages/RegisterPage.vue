<script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global.js';
import api from '../api.js';

const firstName = ref("");
const lastName = ref("");
const mobileNum = ref("");
const email = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

const notyf = new Notyf();
const router = useRouter();
const { user } = useGlobalStore();

onBeforeMount(() => {
	// if user is already logged in, redirect instead
    if(user.token){
        router.push({ path: '/products' });
    }
});

watch([email, password, confirmPass, firstName, mobileNum], (currentValue) => {
    if(currentValue.every(input => input !== "") && currentValue[1] === currentValue[2]){
        isEnabled.value = true
    } else {
        isEnabled.value = false
    }
});

async function handleSubmit(){
    try {
    	// request to check if the email exist
        // await api.post('/users/details', { email: email.value });

        // if not proceed to request for registration
        let response = await api.post('/users/register', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            mobileNo: mobileNum.value,
            password: password.value
        });

        if(response.status === 201) {

            notyf.success(response.data.message);

            firstName.value = "";
            lastName.value = "";
            mobileNum.value = "";
            email.value = "";
            password.value = "";
            confirmPass.value = "";

            router.push({ path: '/users/login' });

        } else {
            notyf.error("Registration Failed. Please contact administrator.");
        }

    } catch (e) {
        if(e.response.status === 404 || e.response.status === 401 || e.response.status === 400 || e.response.status === 409){
            notyf.error(e.response.data.message);
        } else {
            console.error(e);
            notyf.error("Registration Failed. Please contact administrator.");
        }
    }
}


</script>

<template>
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="row">
            <div class="col-12">
                <h1 class="my-5 pt-3 text-center d-flex justify-content-center" id="registerHeader">
                    <i class="bi bi-person-plus-fill me-2"></i>Create Account
                </h1>
                <p class="text-center text-muted mb-5" id="registerSubtitle">
                    Join JavaSip and start your coffee journey
                </p>
            </div>
        </div>

        <!-- Registration Form -->
        <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-lg-5 mx-auto">
                <!-- Form Card -->
                <div class="card border-success border-opacity-25 shadow-lg" id="registerCard">
                    <div class="card-header bg-success text-white py-3">
                        <h5 class="mb-0">
                            <i class="bi bi-pencil-square me-2"></i>Registration Form
                        </h5>
                    </div>
                    
                    <div class="card-body p-4">
                        <form @submit.prevent="handleSubmit">
                            <!-- First Name -->
                            <div class="mb-3">
                                <label for="fName" class="form-label text-success fw-semibold">
                                    <i class="bi bi-person me-2"></i>First Name
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control form-control-lg border-success border-opacity-25" 
                                    id="fName" 
                                    v-model="firstName"
                                    placeholder="Enter your first name"
                                    required
                                />
                            </div>

                            <!-- Last Name -->
                            <div class="mb-3">
                                <label for="lName" class="form-label text-success fw-semibold">
                                    <i class="bi bi-person me-2"></i>Last Name
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control form-control-lg border-success border-opacity-25" 
                                    id="lName" 
                                    v-model="lastName"
                                    placeholder="Enter your last name"
                                    required
                                />
                            </div>

                            <!-- Mobile Number -->
                            <div class="mb-3">
                                <label for="mobile" class="form-label text-success fw-semibold">
                                    <i class="bi bi-phone me-2"></i>Mobile Number
                                </label>
                                <div class="input-group">
                                    <span class="input-group-text bg-success text-white">+63</span>
                                    <input 
                                        type="tel" 
                                        class="form-control form-control-lg border-success border-opacity-25" 
                                        id="mobile" 
                                        v-model="mobileNum"
                                        placeholder="12345678912"                                        
                                        required
                                    />
                                </div>
                                <small class="text-muted">Enter 10-digit mobile number</small>
                            </div>

                            <!-- Email Address -->
                            <div class="mb-3">
                                <label for="emailInput" class="form-label text-success fw-semibold">
                                    <i class="bi bi-envelope me-2"></i>Email Address
                                </label>
                                <input 
                                    type="email" 
                                    class="form-control form-control-lg border-success border-opacity-25" 
                                    id="emailInput" 
                                    v-model="email"
                                    placeholder="name@example.com"
                                    required
                                />
                                <small class="text-muted">We'll never share your email</small>
                            </div>

                            <!-- Password -->
                            <div class="mb-3">
                                <label for="passwordInput" class="form-label text-success fw-semibold">
                                    <i class="bi bi-lock me-2"></i>Password
                                </label>
                                <input 
                                    type="password" 
                                    class="form-control form-control-lg border-success border-opacity-25" 
                                    id="passwordInput" 
                                    v-model="password"
                                    placeholder="Create a strong password"
                                    required
                                />
                                <small class="text-muted">Minimum 8 characters</small>
                            </div>

                            <!-- Confirm Password -->
                            <div class="mb-4">
                                <label for="cpasswordInput" class="form-label text-success fw-semibold">
                                    <i class="bi bi-shield-lock me-2"></i>Confirm Password
                                </label>
                                <input 
                                    type="password" 
                                    class="form-control form-control-lg border-success border-opacity-25" 
                                    id="cpasswordInput" 
                                    v-model="confirmPass"
                                    placeholder="Re-enter your password"
                                    required
                                />
                                <!-- Password Match Indicator -->
                                <div class="mt-2" v-if="confirmPass">
                                    <span v-if="password === confirmPass" class="text-success">
                                        <i class="bi bi-check-circle-fill me-1"></i>Passwords match
                                    </span>
                                    <span v-else class="text-danger">
                                        <i class="bi bi-exclamation-triangle-fill me-1"></i>Passwords do not match
                                    </span>
                                </div>
                            </div>

                            <!-- Terms and Conditions -->
                            <div class="mb-4 form-check">
                                <input type="checkbox" class="form-check-input" id="termsCheck" required>
                                <label class="form-check-label text-muted" for="termsCheck">
                                    I agree to the <a href="#" class="text-success text-decoration-none">Terms and Conditions</a> and 
                                    <a href="#" class="text-success text-decoration-none">Privacy Policy</a>
                                </label>
                            </div>

                            <!-- Submit Button -->
                            <div class="d-grid mt-4">
                                <button 
                                    type="submit" 
                                    class="btn btn-success btn-lg py-3" 
                                    :class="{ 'opacity-50': !isEnabled }"
                                    :disabled="!isEnabled"
                                >
                                    <i class="bi bi-check-circle me-2"></i>
                                    {{ isEnabled ? 'Create Account' : 'Please wait...' }}
                                </button>
                            </div>

                            <!-- Login Link -->
                            <div class="text-center mt-4">
                                <p class="text-muted mb-0">
                                    Already have an account? 
                                    <router-link to="/users/login" class="text-success fw-semibold text-decoration-none">
                                        Sign in here
                                    </router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Page Header Styles */
#registerHeader {
    color: #198754;
    font-size: 2.5rem;
    font-weight: 600;
    position: relative;
    display: inline-block;
    padding-bottom: 1rem;
}

#registerHeader::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #198754, transparent);
    border-radius: 2px;
}

#registerSubtitle {
    font-size: 1.1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

/* Card Styles */
#registerCard {
    border-width: 2px;
    transition: all 0.3s ease;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 3rem;
}

#registerCard:hover {
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
    border-radius: 10px;
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

/* Password Match Indicator */
.text-success i, .text-danger i {
    font-size: 1rem;
}

/* Terms Checkbox */
.form-check-input:checked {
    background-color: #198754;
    border-color: #198754;
}

.form-check-input:focus {
    border-color: #198754;
    box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

/* Links */
a.text-success:hover {
    text-decoration: underline !important;
    opacity: 0.8;
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
    .container-fluid {
        max-width: 1400px;
    }
    
    #registerHeader {
        font-size: 3rem;
    }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 991.98px) {
    #registerHeader {
        font-size: 2.2rem;
    }
    
    .card-body {
        padding: 2rem !important;
    }
    
    .form-control-lg {
        padding: 0.7rem 1rem;
    }
}

/* Mobile */
@media (max-width: 767.98px) {
    #registerHeader {
        font-size: 1.8rem;
        margin-top: 2rem !important;
    }
    
    #registerSubtitle {
        font-size: 1rem;
        padding: 0 1rem;
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
}

/* Extra Small Mobile */
@media (max-width: 575.98px) {
    #registerHeader {
        font-size: 1.5rem;
    }
    
    .card-body {
        padding: 1rem !important;
    }
    
    .form-label {
        font-size: 0.9rem;
    }
    
    .form-label i {
        font-size: 1rem;
    }
    
    .text-muted {
        font-size: 0.8rem;
    }
}

/* Touch Device Optimization */
@media (hover: none) and (pointer: coarse) {
    .form-control {
        font-size: 16px; /* Prevents zoom on mobile */
    }
    
    .btn-success {
        min-height: 54px;
    }
    
    .form-check-input {
        width: 1.3rem;
        height: 1.3rem;
    }
}

/* Animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

#registerCard {
    animation: fadeInUp 0.5s ease;
}

/* Password Strength Indicator (if you want to add later) */
.password-strength {
    height: 5px;
    border-radius: 5px;
    background: linear-gradient(90deg, #dc3545 0%, #ffc107 50%, #198754 100%);
    transition: width 0.3s ease;
}
</style>