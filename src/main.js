import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import "./assets/main.css";
import "notyf/notyf.min.css";

import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';

import ProductsPage from './pages/ProductsPage.vue';
import ViewProductPage from './pages/ViewProductPage.vue';
import AddProductPage from './pages/AddProductPage.vue';
import UpdateProductPage from './pages/UpdateProductPage.vue';

import CheckoutPage from './pages/CheckoutPage.vue';
import OrderPage from './pages/OrderPage.vue';

import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import CartViewPage from './pages/CartViewPage.vue';


const router = createRouter({
	
	history: createWebHistory(),
	routes: [
		
		{
			path: "/products",
			name: "Products",
			component: ProductsPage
		},
		{
			path: "/products/:id", 
			name: "ViewProduct",
			component: ViewProductPage

		},
		{
			path: "/products/add-product", 
			name: "AddProduct",
			component: AddProductPage

		},
		{
			path: "/users/register", 
			name: "Register",
			component: RegisterPage

		},
		{
			path: "/users/login", 
			name: "Login",
			component: LoginPage

		},
		{
			path: "/users/logout", 
			name: "Logout",
			component: LogoutPage

		},
		{
			path: "/", 
			name: "Home",
			component: HomePage

		},
		{
			path: "/products/:productId/update", 
			name: "UpdateProductPage",
			component: UpdateProductPage

		},
		{
			path: "/users/cart", 
			name: "Cart",
			component: CartViewPage

		},
		{
			path: "/products/checkout", 
			name: "Checkout",
			component: CheckoutPage

		},
		{
			path: "/orders/orders-page", 
			name: "OrdersPage",
			component: OrderPage

		}

		

		
	]
})

const app = createApp(App);

app.use(router);
app.use(createPinia()); 
app.mount("#app");
