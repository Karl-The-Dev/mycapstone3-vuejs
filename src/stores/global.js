import {defineStore} from "pinia";
import {reactive, computed} from "vue";
import api from "../api" 

export const useGlobalStore = defineStore("global", () => {
	
	let user = reactive({
		token: localStorage.getItem('token'),  
		email: null,
		isAdmin: null
	})

	const isAdmin = computed(() => user.isAdmin === true);
	

	
	async function setUser(token){ 

		if(!token) { 
            user.token = null;
            user.email = null;
            user.isAdmin = null;

            return;
        }

        	
        let res = await api.get('/users/details')
        

        console.log(res.data) 
        
        user.token = token;
        user.email = res.data.email;
        user.isAdmin = res.data.isAdmin;
		
	}

	return {
		user, 
		setUser,
		isAdmin
	}
})