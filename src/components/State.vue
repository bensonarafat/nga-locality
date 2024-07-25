<script lang="ts">
import axios from 'axios';
import {type State } from '../interfaces/state' ;
export default {
    name: "State", 
    data() {
        return {
            pending : true as boolean, 
            states : {} as State[],
            endpoint: 'https://nigeria-states-towns-lgas.onrender.com/api/' as string,
        }
    }, 
    created(){
        this.fetchStates();
    }, 
    methods:{
        async fetchStates() : Promise<void> {
            try {
                const states = await axios.get(`${this.endpoint}all-state`);
                this.states = states.data;
                this.pending = false;
            } catch (_) {
               alert("Oops there was an error");
            }
        }
    }
}
</script>
<template>
        <div class="w-full">
        <div class="px-4 md:px-10 py-4 md:py-7">
            <div class="flex items-center justify-between">
                <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Nigeria States</p>
                
            </div>
        </div>
        <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
            <div class="sm:flex items-center justify-between">
                <div class="flex items-center">
                    <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                        <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                            <p>All</p>
                        </div>
                    </a>
                </div>
                <router-link to="/add" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </router-link>
            </div>
            <div class="mt-7 overflow-x-auto" v-if="!pending">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="flex items-center justify-between pb-4 bg-white">

                        <label for="state-search" class="sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" id="state-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for state">
                        </div>
                    </div>
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="p-4">
                                    SN
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Code
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Capital
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Towns
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Location
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Population
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Total Square (km)
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Postal Code
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Creation date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(state, index) in states" :key="index" class="bg-white hover:bg-gray-50">
                                <td class="px-6 py-4">
                                    {{ index+1 }}
                                </td>
                                <th class="px-6 py-4">
                                    {{ state.state_code  }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ state.name  }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ state.capital  }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ state.towns.length }}
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="state.location && state.location.latitude">
                                        {{ state.location.latitude + '°N , ' + state.location.longitude + '°E'  }}
                                    </span>
                                    <span v-else>--</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="state.population">
                                            {{ state.population.toLocaleString() }}
                                    </span>
                                    <span v-else>--</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="state.total_area">{{ state.total_area }}</span>
                                    <span v-else>--</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="state.postal_code">{{ state.postal_code }}</span>
                                    <span v-else>--</span>
                                </td>
                                <td class="px-6 py-4">
                                    <span v-if="state.creation_date">{{ state.creation_date }}</span>
                                    <span v-else>--</span>
                                </td>
                                <td class="px-6 py-4">
                                    <router-link :to="'/state/' + state._id" class="font-medium text-red-600 hover:underline">View</router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="flex justify-center">
                <img src="/image/loader.gif" alt="loading" width="30">
            </div>
        </div>
    </div>
</template>