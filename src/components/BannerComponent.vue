<script >

  
  export default {
    
    props: {
      
      bannerProps: Object
      
    },

    mounted(){
    //   console.log(this.bannerProps.title);
    //   console.log(this.bannerProps.tagline);
    }
  }

</script>

<template>
  <div class="container-fluid px-0">
    <div class="row g-0" id="bannerRow">
      <div class="col-12">
        <!-- Banner Container with Background Image -->
        <div class="banner-container d-flex align-items-center" id="banner">
          <!-- Light overlay for brightness -->
          <div class="banner-overlay"></div>
          
          <!-- Content Section -->
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-md-10 col-12 mx-auto mx-md-0" id="bannerContent">
                <!-- Title -->
                <h1 class="banner-title mb-3" id="bannerTitle">
                  {{ bannerProps.title }}
                </h1>
                
                <!-- Tagline -->
                <p class="banner-tagline mb-5" id="bannerTagline">
                  {{ bannerProps.tagline }}
                </p>
                
                <!-- CTA Button -->
                <router-link 
                  class="btn btn-light btn-lg rounded-pill px-4 py-3 shadow-sm" 
                  :to="{ name: bannerProps.destination }" 
                  id="bannerButton"
                >
                  <span class="me-2">{{ bannerProps.buttonLabel }}</span>
                  <i class="bi bi-arrow-right-circle"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Banner Container */
#bannerRow {
  margin: 0;
  padding: 0;
}

.banner-container {
  position: relative;
  min-height: 600px;
  background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.ywIvKLn41OJWY5E4z07ruAHaEK%3Fpid%3DApi&f=1&ipt=088632a6f1d13f2df4e6aa93fa60fd5d85f7612269cad2e136fe12ea24a99ab1');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 4rem 2rem;
  width: 100%;
}

/* Light, bright overlay for readability */
.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: brightness(1.1) blur(2px);
  z-index: 1;
}

/* Content Positioning */
#bannerContent {
  position: relative;
  z-index: 2;
  color: #2c3e50;
  animation: gentleFloat 1.2s ease;
}

@keyframes gentleFloat {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Title Styles - Light and Airy */
#bannerTitle {
  font-family: 'Quicksand', 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 4rem;
  line-height: 1.2;
  color: #2c3e50;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
  letter-spacing: -0.5px;
}

#bannerTitle::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #a8e6cf, #d4edda);
  border-radius: 3px;
  animation: slideIn 0.8s ease 0.3s both;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

@keyframes slideIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100px;
    opacity: 1;
  }
}

/* Tagline Styles - Soft and Inviting */
#bannerTagline {
  font-family: 'Quicksand', 'Open Sans', sans-serif;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #4a5568;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  max-width: 600px;
  font-weight: 400;
  animation: fadeInSoft 1s ease 0.5s both;
}

@keyframes fadeInSoft {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Button Styles - Light and Playful */
#bannerButton {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease 0.7s both;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  backdrop-filter: blur(5px);
}

#bannerButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(168, 230, 207, 0.3);
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-color: #a8e6cf;
}

#bannerButton i {
  transition: transform 0.3s ease;
  color: #a8e6cf;
}

#bannerButton:hover i {
  transform: translateX(5px);
  color: #7ccf9c;
}

/* Button Focus State */
#bannerButton:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(168, 230, 207, 0.5);
}

/* Responsive Styles with Lighter Touch */

/* Large Desktop */
@media (min-width: 1400px) {
  .banner-container {
    min-height: 650px;
  }
  
  #bannerTitle {
    font-size: 5rem;
  }
  
  #bannerTagline {
    font-size: 1.8rem;
    max-width: 700px;
  }
}

/* Desktop */
@media (min-width: 1200px) and (max-width: 1399.98px) {
  .banner-container {
    min-height: 600px;
  }
  
  #bannerTitle {
    font-size: 4.5rem;
  }
}

/* Small Desktop / Large Tablet */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .banner-container {
    min-height: 550px;
  }
  
  #bannerTitle {
    font-size: 4rem;
  }
  
  #bannerTagline {
    font-size: 1.4rem;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 991.98px) {
  .banner-container {
    min-height: 500px;
    padding: 3rem 1.5rem;
  }
  
  #bannerTitle {
    font-size: 3.5rem;
  }
  
  #bannerTitle::after {
    width: 80px;
  }
  
  @keyframes slideIn {
    from { width: 0; opacity: 0; }
    to { width: 80px; opacity: 1; }
  }
  
  #bannerTagline {
    font-size: 1.3rem;
    max-width: 100%;
  }
  
  #bannerButton {
    font-size: 1.1rem;
    min-width: 180px;
    padding: 0.8rem 1.5rem;
  }
}

/* Mobile Landscape */
@media (min-width: 576px) and (max-width: 767.98px) {
  .banner-container {
    min-height: 450px;
    padding: 2.5rem 1rem;
  }
  
  #bannerTitle {
    font-size: 3rem;
  }
  
  #bannerTitle::after {
    width: 70px;
  }
  
  @keyframes slideIn {
    from { width: 0; opacity: 0; }
    to { width: 70px; opacity: 1; }
  }
  
  #bannerTagline {
    font-size: 1.2rem;
  }
  
  #bannerButton {
    font-size: 1rem;
    min-width: 160px;
    padding: 0.7rem 1.2rem;
  }
}

/* Mobile Portrait */
@media (max-width: 575.98px) {
  .banner-container {
    min-height: 400px;
    padding: 2rem 1rem;
    text-align: center;
  }
  
  #bannerContent {
    text-align: center;
  }
  
  #bannerTitle {
    font-size: 2.2rem;
  }
  
  #bannerTitle::after {
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
  }
  
  @keyframes slideIn {
    from {
      width: 0;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
    to {
      width: 60px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;
    }
  }
  
  #bannerTagline {
    font-size: 1rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  #bannerButton {
    font-size: 0.95rem;
    min-width: 140px;
    padding: 0.6rem 1rem;
    margin-left: auto;
    margin-right: auto;
  }
}

/* Extra Small Mobile */
@media (max-width: 375px) {
  .banner-container {
    min-height: 350px;
  }
  
  #bannerTitle {
    font-size: 1.8rem;
  }
  
  #bannerTagline {
    font-size: 0.9rem;
  }
  
  #bannerButton {
    font-size: 0.9rem;
    min-width: 120px;
    padding: 0.5rem 0.8rem;
  }
}

/* Touch Device Optimization */
@media (hover: none) and (pointer: coarse) {
  #bannerButton {
    min-height: 54px;
    padding: 0.8rem 1.5rem;
  }
  
  #bannerButton:hover {
    transform: none;
  }
  
  #bannerButton:active {
    transform: scale(0.98);
  }
}

/* High Resolution Screens */
@media (min-resolution: 192dpi) {
  .banner-container {
    background-image: url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100');
  }
}

/* Print Styles */
@media print {
  .banner-container {
    background: none;
    min-height: auto;
    padding: 2rem 0;
  }
  
  .banner-overlay {
    display: none;
  }
  
  #bannerContent {
    color: #2c3e50;
  }
  
  #bannerTitle::after {
    background: #a8e6cf;
  }
  
  #bannerButton {
    display: none;
  }
}
</style>
