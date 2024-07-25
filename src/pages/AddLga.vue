<script lang="ts">
import axios from 'axios';
export default {
    data() {
        return {
            error : false as boolean, 
            success: false as boolean,
            msg: null as String | null, 
            loading: false as boolean ,
            name: null as string | null, 
            creation_date: null as string | null, 
            latitude: null as string | null, 
            longitude: null as string | null, 
            total_area: null as string | null, 
            population: null as string | null, 
            postal_code: null as string | null, 
            id: "" as string,
            endpoint: "https://nigeria-states-towns-lgas.onrender.com/api/" as string,
        }
    }, 
    mounted(){
        const id = this.$route.params.id as string;
        this.id = id;
    },
    methods: {
        clearError() {
            this.error= false;
            this.success = false;
        },
        clearForm(){
            this.name = "";
            this.creation_date = "";
            this.latitude = "";
            this.longitude = "";
            this.population = "";
            this.postal_code = "";
            this.total_area = "";
        },
        async saveLGA() {
            if(this.loading){return false;}
            this.clearError();
            if(this.name == null){
                this.error = true;
                this.msg = "You must fill in the name and LGA code";
                return;
            }else{
                this.loading = true;
                try {
                    const response =  await axios.put(`${this.endpoint}add-lga/${this.id}`,  {
                            name: this.name, 
                            creation_date: this.creation_date, 
                            latitude : this.latitude , 
                            longitude : this.longitude,
                            total_area: this.total_area, 
                            population: this.population, 
                            postal_code: this.postal_code
                        });
                    if(response){
                        this.clearForm();
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
    }
}

</script>
<template>
    <div class="container mx-auto">
        <div class="p-2">
          <form class="bg-white rounded px-8 pt-6 pb-8 mb-4 flex justify-center">
            
            <div class="relative w-full max-w-2xl max-h-full">

                <div class="relative bg-white rounded-lg shadow">
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
                <div class="flex items-start p-5 border-b rounded-t items-center">
                      <router-link :to="'/state/' + id" class="pr-5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                      </router-link>
                      <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl">
                          Add Local Government Area
                      </h3>
                  </div>
                 
                  <div class="p-6 space-y-6">
                    <div class="grid sm:grid-cols-1 gap-4">
                        <div>
                            <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                Name
                            </label>
                            <input class="border w-full py-2 px-3 focus:outline-none focus:shadow-outline" id="name" v-model="name" type="text">
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
                  </div>
                
                  <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                      <button type="button" @click="saveLGA()" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <span v-if="loading">
                            <img src="/image/loader.gif" alt="loading" width="30">
                        </span>
                        <span v-else>Submit</span></button>
                  </div>

              </div>
            </div>
          </form>
        </div>
    </div>
  </template>
  