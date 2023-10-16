<script lang="ts">
import axios from 'axios';
import {type Town} from '../interfaces/town';
import {type Lga} from '../interfaces/lga';
import {type State } from '../interfaces/state' ;
import {type Politics} from '../interfaces/politics'

export default {
    data() {
        return {
            id: "" as string,
            loading: true as boolean ,
            state: {} as State,
            towns: null as Array<Town> | null,
            lgas: null  as Array<Lga> | null,
            politics: {} as Politics | any,
            bordering_states: [] as Array<string>, 
            national_resources: [] as Array<string>,
            universities: [] as Array<string>,
            polytechnics: [] as Array<string>,
            airports: [] as Array<string>,
            hospitals: [] as Array<string>,
            languages: [] as Array<string>,
            ethnic_groups: [] as Array<string>,
            religions: [] as Array<string>,
            endpoint: "https://nigeria-states-towns-lga.onrender.com/api/" as string,
        }
    }, 
    mounted(){
        const id = this.$route.params.id as string;
        this.id = id;
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const response = await axios.get(`${this.endpoint}state/${this.$route.params.id}`);
            this.state = response.data;
            this.towns = this.state ? this.state.towns : [];
            this.lgas = this.state ? this.state.lgas : [];
            this.politics = this.state ? this.state.politics : {};
            this.national_resources = this.state.national_resources;
            this.bordering_states = this.state.bordering_states;
            this.universities = this.state.universities;
            this.polytechnics = this.state.polytechnics;
            this.airports = this.state.airports;
            this.hospitals = this.state.hospitals;
            this.languages = this.state.languages;
            this.ethnic_groups = this.state.ethnic_groups;
            this.religions = this.state.religions;
            this.loading = false;
          
        },
        async refreshStateData() {
            await this.fetchData();
        },
        async deleteTown(town: Town) {
            console.log(town);
            await axios.put(`${this.endpoint}remove-town/${this.id}`, 
            {
                name: town.name, 
                latitude: town.location.latitude,
                longitude: town.location.longitude, 
                creation_date: town.creation_date, 
                population: town.population, 
                postal_code: town.postal_code, 
                total_area: town.total_area,
            }
            );
            await this.refreshStateData();
        },

        async deleteLGA(lga : Lga) {
            await axios.put(`${this.endpoint}remove-lga/${this.id}`, {
                name: lga.name, 
                latitude: lga.location.latitude,
                longitude: lga.location.longitude, 
                creation_date: lga.creation_date, 
                population: lga.population, 
                postal_code: lga.postal_code, 
                total_area: lga.total_area,
            });

            await this.refreshStateData();
        },
        async removeItem(type: string, name : string) {
            await axios.put(`${this.endpoint}remove-items/${type}/${this.id}`, {item: name });
            await this.refreshStateData();
        },
    }

}
</script>
<template>
    <div class="container mx-auto sm:px-4 sm:pt-5">
        <div class="grid sm:grid-cols-2 gap-4" v-if="!loading">
            <div>
                <!-- State details with other info -->
                <div class="flex justify-between">
                    <p class="font-bold">Details</p>
                    <router-link :to="'/state/edit/' + state._id">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                        </svg>
                    </router-link>
                </div>
                <hr class="mt-2" />
                <div class="grid grid-cols-1 divide-y">
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Name:</strong>
                        </div>
                        <div>{{ state.name }}</div>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Capital:</strong>
                        </div>
                        <div>{{ state.capital }}</div>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>State Code:</strong>
                        </div>
                        <div>{{ state.state_code }}</div>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Location:</strong>
                        </div>
                        <div v-if="state.location && state.location.latitude">{{ state.location.latitude + '°N , '  + state.location.longitude + '°E' }}</div>
                        <div v-else>--</div>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Created Date:</strong>
                        </div>
                        <span v-if="state.creation_date">{{ state.creation_date }}</span>
                        <span v-else>--</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Total Area:</strong>
                        </div>
                        <span v-if="state.total_area">{{ state.total_area }}</span>
                        <span v-else>--</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Population:</strong>
                        </div>
                        <span v-if="state.population">{{ state.population }}</span>
                        <span v-else>--</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <div>
                            <strong>Postal code:</strong>
                        </div>
                        <span v-if="state.postal_code">{{ state.postal_code }}</span>
                        <span v-else>--</span>
                    </div>
                </div>

                <div class="flex justify-between mt-10">
                    <p class="font-bold">Politics</p>
                    <router-link :to="'/state/politics/' + id">
                        <div v-if="!politics" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                        <div v-if="politics" class="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </div>
                    </router-link>
                </div>
                <div v-if="politics">
                    <hr class="mt-2" />
                    <div class="grid grid-cols-1 divide-y">
                        <div class="flex justify-between mb-2">
                            <div><strong>Governor:</strong></div>
                            <div v-if="!politics.length">{{ politics.governor }}</div>
                        </div>
                        <div class="flex justify-between mb-2">
                            <div><strong>Deputy Governor:</strong></div>
                            <div>{{ politics.deputy_governor }}</div>
                        </div>
                    </div>
                </div>

                <div class="mt-10">
                    <router-link
                        :to="'/state/item/' + state._id "
                        class="justify-center flex text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 w-full"
                    >
                        <svg class="w-10 h-3 mr-2 -ml-1 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 14h6m-3 3v-6M1.857 1h4.286c.473 0 .857.384.857.857v4.286A.857.857 0 0 1 6.143 7H1.857A.857.857 0 0 1 1 6.143V1.857C1 1.384 1.384 1 1.857 1Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 11 6.143V1.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H1.857A.857.857 0 0 1 1 16.143v-4.286c0-.473.384-.857.857-.857Z"
                            />
                        </svg>
                        Add details to State
                    </router-link>
                </div>

                <div v-if="bordering_states.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Bording States</p>
                    </div>

                    <hr class="my-5" />

                    <span
                        v-for="(item, index) in bordering_states"
                        :key="index"
                        id="badge-dismiss-red"
                        class="inline-flex items-center px-2 py-1 my-5 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded"
                    >
                        {{ item }}
                        <button
                            @click="removeItem('bordering_states', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="national_resources.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">National Resources</p>
                    </div>
                    <hr class="my-5" />
                    <span
                        v-for="(item, index) in national_resources"
                        :key="index"
                        id="badge-dismiss-red"
                        class="inline-flex items-center px-2 py-1 my-5 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded"
                    >
                        {{ item }}
                        <button
                            @click="removeItem('national_resources', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="universities.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Universities</p>
                    </div>
                    <hr class="my-5" />
                    <span v-for="(item, index) in universities" :key="index" id="badge-dismiss-red" class="inline-flex items-center px-2 py-1 mr-2 my-5 text-sm font-medium text-red-800 bg-red-100 rounded">
                        {{ item }}
                        <button
                            @click="removeItem('universities', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="polytechnics.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Polytechnics</p>
                    </div>
                    <hr class="my-5" />
                    <span v-for="(item, index) in polytechnics" :key="index" id="badge-dismiss-red" class="inline-flex items-center px-2 py-1 my-5 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded">
                        {{ item }}
                        <button
                            @click="removeItem('polytechnics', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="airports.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Airports</p>
                    </div>
                    <hr class="my-5" />
                    <span v-for="(item, index) in airports" :key="index" id="badge-dismiss-red" class="inline-flex items-center my-5 px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded">
                        {{ item }}
                        <button
                            @click="removeItem('airports', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="hospitals.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Hospitals</p>
                    </div>
                    <hr class="my-5" />
                    <span v-for="(item, index) in hospitals" :key="index" id="badge-dismiss-red" class="inline-flex items-center my-5 px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded">
                        {{ item }}
                        <button
                            @click="removeItem('hospitals', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="languages.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Languages</p>
                    </div>
                    <hr class="my-5" />
                    <span v-for="(item, index) in languages" :key="index" id="badge-dismiss-red" class="inline-flex items-center my-5 px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded">
                        {{ item }}
                        <button
                            @click="removeItem('languages', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="ethnic_groups.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Ethnic Groups</p>
                    </div>
                    <hr class="my-5" />
                    <span
                        v-for="(item, index) in ethnic_groups"
                        :key="index"
                        id="badge-dismiss-red"
                        class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-100 my-5 rounded"
                    >
                        {{ item }}
                        <button
                            @click="removeItem('ethnic_groups', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>

                <div v-if="religions.length != 0">
                    <div class="flex justify-between mt-2">
                        <p class="font-bold">Religions</p>
                    </div>
                    <hr class="my-5" />
                    <span v-for="(item, index) in religions" :key="index" id="badge-dismiss-red" class="my-5 inline-flex items-center px-2 py-1 mr-2 text-sm font-medium text-red-800 bg-red-100 rounded">
                        {{ item }}
                        <button
                            @click="removeItem('religions', item)"
                            type="button"
                            class="inline-flex items-center p-1 ml-2 text-sm text-red-400 bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900"
                            data-dismiss-target="#badge-dismiss-red"
                            aria-label="Remove"
                        >
                            <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Remove Item</span>
                        </button>
                    </span>
                    <hr class="my-5" />
                </div>
            </div>
            <div>

                <div>
                    <div class="flex justify-between my-5">
                        <p>Towns</p>
                        <router-link :to="'/state/town/add/' + id">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </router-link >
                    </div>

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="flex items-center justify-between pb-4 bg-white">
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search for town"
                                />
                            </div>
                        </div>
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="p-4">
                                        SN
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Population
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Postal Code
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Creation Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(town, index) in towns" :key="index" class="bg-white hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        {{ index+1 }}
                                    </td>
                                    <th class="px-6 py-4">
                                        {{ town.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        <span v-if="town.location && town.location.latitude">
                                            {{ town.location.latitude + '°N , ' + town.location.longitude + '°E' }}
                                        </span>
                                        <span v-else>--</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="town.population">
                                            {{ town.population }}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="town.postal_code">
                                            {{ town.postal_code }}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="town.creation_date">
                                            {{ town.creation_date }}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" @click="deleteTown(town)" class="font-medium text-red-600 hover:underline">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- End Towns -->

                <!-- LGA -->
                <div>
                    <div class="flex justify-between my-5">
                        <p>Local Government Area</p>
                        <router-link :to="'/state/lga/add/' + id">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </router-link>
                    </div>

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="flex items-center justify-between pb-4 bg-white">
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search for local government area"
                                />
                            </div>
                        </div>
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="p-4">
                                        SN
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    
                                    <th scope="col" class="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Population
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Postal Code
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Creation Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(lga, index) in lgas" :key="index" class="bg-white hover:bg-gray-50">
                                    <td class="px-6 py-4">
                                        {{ index+1 }}
                                    </td>
                                    <th class="px-6 py-4">
                                        {{ lga.name }}
                                    </th>
                                  
                                    <td class="px-6 py-4">
                                        <span v-if="lga.location && lga.location.latitude">
                                            {{ lga.location.latitude  + '°N , ' + lga.location.longitude + '°E' }}
                                        </span>
                                        <span v-else>--</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="lga.population">
                                            {{ lga.population }}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="lga.postal_code">
                                            {{ lga.postal_code }}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span v-if="lga.creation_date">
                                            {{ lga.creation_date }}
                                        </span>
                                        <span v-else>
                                            --
                                        </span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" @click="deleteLGA(lga)" class="font-medium text-red-600 hover:underline">Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- LGA -->
            </div>

        </div>
        <div v-else class="flex justify-center">
            <img src="/image/loader.gif" alt="loading" width="30">
        </div>
    </div>
</template>