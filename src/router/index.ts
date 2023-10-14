import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';
import Edit from '../pages/Edit.vue';
import State from '../pages/State.vue';
import Add from '../pages/Add.vue';
import AddTown from '../pages/AddTown.vue';
import AddLga from '../pages/AddLga.vue';
import Politics from '../pages/Politics.vue';
import Item from '../pages/Item.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/state/edit/:id',
      name: 'edit',
     component: Edit
    }, 
    {
      path: "/state/:id", 
      name: 'state', 
      component: State,
    }, 
    {
      path: "/add", 
      name: "add", 
      component: Add,
    },
    {
      path: "/state/town/add/:id", 
      name: 'addtown', 
      component: AddTown,
    }, 
    {
      path: "/state/lga/add/:id", 
      name: 'addlga', 
      component: AddLga,
    }, 
    {
      path: "/state/politics/:id", 
      name: 'politics', 
      component: Politics,
    },
    {
      path: "/state/item/:id", 
      name: 'item', 
      component: Item,
    },  
  ]
})

export default router
