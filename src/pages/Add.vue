<script lang="ts">
import axios from 'axios';
export default {
  data(){
    return {
      error : false as boolean, 
      success: false as boolean,
      msg: null as String | null, 
      loading: false as boolean,
      name: null as String | null, 
      capital: null as String | null, 
      state_code: null as String | null, 
      creation_date: null as String | null, 
      latitude: null as String | null, 
      longitude: null as String | null, 
      total_area: null as String | null, 
      population: null as String | null, 
      postal_code: null as String | null, 
      endpoint: "https://nigeria-states-towns-lga.onrender.com/api/" as String,
    }
  }, 
  methods: {
    clear() {
      this.error= false;
      this.success = false;
      this.msg = "";
    },
     async save() {
      if(this.loading){return false;}
      this.clear();
      if(this.name == null || this.capital == null || this.state_code == null){
        this.error = true;
        this.msg = "You must provide in the name, capital and state code to continue";
        return;
      }else{
        this.loading = true;
        try {
          const response =  await axios.post(`${this.endpoint}add-state`, 
            {
              name: this.name, 
              capital: this.capital, 
              state_code: this.state_code, 
              creation_date: this.creation_date, 
              latitude : this.latitude , 
              longitude : this.longitude,
              total_area: this.total_area, 
              population: this.population, 
              postal_code: this.postal_code
            });
          if(response){
            this.success = true;
            this.msg = "State Created"
            this.$router.back();
          }else{
            this.error = true;
            this.msg = "Oops, there must be a server error";
          }
          this.loading = false;
        } catch (_) {
            this.loading = false;
            this.error = true;            
            this.msg = "Oops, there must be an error";
          
        }
      }


    }
  },
}
</script>
<template>
  <div class="container mx-auto sm:px-40">
      <div class=" p-2">
      <form class="bg-white rounded px-8 pt-6 pb-8 mb-4">

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Oops, error!</strong>
          <span class="block sm:inline"> {{ msg }}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>

        <div v-if="success" class="mb-2 bg-lime-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Success!</strong>
          <span class="block sm:inline"> {{ msg }}</span>
          <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="name" v-model="name" type="text">
            </div>
          </div>
          <!-- ... -->
          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="capital">
                Capital
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" v-model="capital" id="capital" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="state_code">
                State Code
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" v-model="state_code" id="state_code" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="creation_date">
                Creation Date
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="creation_date" v-model="creation_date" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="latitude">
                Latitude
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="latitude" v-model="latitude" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">
                Longitude
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="longitude" v-model="longitude" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="total_area">
                Total Area
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="total_area" v-model="total_area" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="population">
                Population
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="population" v-model="population" type="text">
            </div>
          </div>

          <div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="postal_code">
                Postal code
              </label>
              <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="postal_code" v-model="postal_code" type="text">
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between">
            <button @click="save()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              <span v-if="loading">
                <img src="/image/loader.gif" alt="loading" width="30">
              </span>
              <span v-else>Add State</span>
            </button>
          </div>
      </form>
      </div>
  </div>
</template>