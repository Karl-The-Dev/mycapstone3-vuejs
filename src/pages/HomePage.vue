
<script>
  import BannerComponent from '../components/BannerComponent.vue';  

  export default {
    components: {
      BannerComponent
      
    },
    data() {
      return {
        bannerProps: {
          title: "JavaSip!",
          tagline: "Bawat SipSip, Sulit na Sulit! ☕",
          destination: "Products",
          buttonLabel: "Explore Our Menu"
        }
      }
    }
  }

</script>

<template>
  <div class="container-fluid">
    <BannerComponent :bannerProps=bannerProps />
    
    <div>
      <h1 id="image-title">Enjoy our Delectible Treats!</h1>
    </div>
    
  </div>

  

</template>

<style scoped>
  img{
    width: 100%;
  }

  #image-title {
  width: 100%;
  height: 50vh; /* Or whatever height you prefer */
  background-image: url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F036%2F594%2F496%2Flarge_2x%2Fai-generated-coffee-shop-advertisment-background-with-copy-space-free-photo.jpg&f=1&nofb=1&ipt=712df1894df3f770522ca669012ce056af64071ccc72943d0023be577b5d4add');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-end; /* Positions content on the right */
  align-items: center; /* Centers vertically */
  color: #f0f0f0; /* Light grey color */
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* Adds readability */
  font-size: 4rem;
  padding: 2rem;
  text-align: right;
}
</style>