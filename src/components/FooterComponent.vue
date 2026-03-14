<template>
    <footer class="footer mt-5 py-5 border-top border-white border-opacity-10">
        <div class="container">
            <div class="row g-4">
                <!-- Shop Name & Partners -->
                <div class="col-lg-3 col-md-6">
                    <h4 class="text-warning fw-bold mb-3">JavaSip</h4>
                    <p class="text-white text-opacity-90 small mb-3">Your daily dose of coffee bliss and milk tea delight.</p>
                    <div class="partners-section">
                        <h6 class="text-warning fw-semibold mb-2">Partners</h6>
                        <ul class="list-unstyled">
                            <li class="mb-1">
                                <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Coffee Bean Alliance</a>
                            </li>
                            <li class="mb-1">
                                <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Tea Masters Guild</a>
                            </li>
                            <li class="mb-1">
                                <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Local Farmers Cooperative</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Our Company -->
                <div class="col-lg-2 col-md-6">
                    <h6 class="text-warning fw-semibold mb-3">Our Company</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Our Story</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Careers</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Store Locator</a>
                        </li>
                    </ul>
                </div>

                <!-- Services -->
                <div class="col-lg-2 col-md-6">
                    <h6 class="text-warning fw-semibold mb-3">Services</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Menu</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Shop</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Catering</a>
                        </li>
                    </ul>
                </div>

                <!-- Customer Care -->
                <div class="col-lg-2 col-md-6">
                    <h6 class="text-warning fw-semibold mb-3">Customer Care</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Contact Us</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">FAQs</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Shipping & Returns</a>
                        </li>
                    </ul>
                </div>

                <!-- Social Media & Legal -->
                <div class="col-lg-3 col-md-12">
                    <!-- Social Media Icons -->
                    <div class="social-icons mb-4">
                        <h6 class="text-warning fw-semibold mb-3">Follow Us</h6>
                        <div class="d-flex gap-3">
                            <a href="#" class="social-icon" title="Instagram">
                                <i class="bi bi-instagram fs-5"></i>
                            </a>
                            <a href="#" class="social-icon" title="Facebook">
                                <i class="bi bi-facebook fs-5"></i>
                            </a>
                            <a href="#" class="social-icon" title="Twitter">
                                <i class="bi bi-twitter-x fs-5"></i>
                            </a>
                            <a href="#" class="social-icon" title="TikTok">
                                <i class="bi bi-tiktok fs-5"></i>
                            </a>
                        </div>
                    </div>

                    <!-- Legal Links -->
                    <div class="legal-links small">
                        <p class="text-white text-opacity-75 mb-2">© 2026 JavaSip. All rights reserved.</p>
                        <div class="d-flex flex-wrap gap-3">
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Privacy Policy</a>
                            <a href="#" class="text-white text-opacity-75 text-decoration-none small hover-light">Terms & Conditions</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="row mt-4 pt-3 border-top border-white border-opacity-10">
                <div class="col-12 text-center">
                    <p class="small text-white text-opacity-75 mb-0">
                        <i class="bi bi-cup-hot-fill text-warning me-2"></i>
                        Brewing happiness since 2020
                        <i class="bi bi-cup-hot-fill text-warning ms-2"></i>
                    </p>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: #328d32;  /* Light green background */
    width: 100%;
    
}

/* Light yellow titles */
.text-warning {
    color: #f7d051 !important;  /* Light yellow */
}

/* White text with opacity variations */
.text-white {
    color: white !important;
}

.text-opacity-75 {
    opacity: 0.9;
}

.text-opacity-50 {
    opacity: 0.7;
}

/* Link hover effect - becomes brighter white */
.hover-light {
    transition: all 0.2s ease;
}

.hover-light:hover {
    color: white !important;
    opacity: 1;
    text-decoration: underline !important;
    text-decoration-color: #fff3cd !important;
    text-underline-offset: 4px;
}

/* Social Icons - Light theme */
.social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-icon:hover {
    background-color: #fff3cd;  /* Light yellow on hover */
    border-color: #fff3cd;
    color: #2d6a4d;  /* Dark green for contrast */
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 243, 205, 0.3);
}

/* Section headings with light yellow underline */
h4, h6 {
    position: relative;
    padding-bottom: 0.5rem;
}

h4::after, h6::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: #fff3cd;  /* Light yellow underline */
    opacity: 0.7;
}

/* Border styling - white with opacity */
.border-white {
    border-color: white !important;
}

.border-opacity-10 {
    --bs-border-opacity: 0.1;
}

/* Responsive adjustments */

/* Desktop (1200px and up) */
@media (min-width: 1200px) {
    .footer {
        padding: 3rem 0;
    }
}

/* Tablet (768px - 991px) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .social-icon {
        width: 42px;
        height: 42px;
    }
    
    .social-icon i {
        font-size: 1.2rem !important;
    }
}

/* Mobile (below 768px) */
@media (max-width: 767.98px) {
    .footer {
        padding: 2rem 0;
    }
    
    h4 {
        font-size: 1.5rem;
    }
    
    h6 {
        font-size: 1rem;
        margin-top: 1.5rem;
    }
    
    h4::after, h6::after {
        width: 50px;
    }
    
    .social-icons {
        margin-top: 1rem;
    }
    
    .social-icon {
        width: 44px;
        height: 44px;
    }
    
    .social-icon i {
        font-size: 1.3rem !important;
    }
    
    .legal-links {
        text-align: center;
    }
    
    .legal-links .d-flex {
        justify-content: center;
    }
}

/* Extra Small Mobile (below 576px) */
@media (max-width: 575.98px) {
    .social-icon {
        width: 40px;
        height: 40px;
    }
    
    .d-flex.gap-3 {
        gap: 0.8rem !important;
    }
    
    h4 {
        font-size: 1.3rem;
    }
}

/* Touch device optimization */
@media (hover: none) and (pointer: coarse) {
    .social-icon {
        width: 48px;
        height: 48px;
    }
    
    .social-icon i {
        font-size: 1.5rem !important;
    }
    
    .hover-light:hover {
        opacity: 0.9;
        text-decoration: none !important;
    }
}
</style>