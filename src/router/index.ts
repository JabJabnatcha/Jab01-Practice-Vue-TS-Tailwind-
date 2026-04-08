import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemDetail from '../views/ProductDetailView.vue'

const routes =[
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/item/:id',
        name: 'item-detail',
        component: ItemDetail,
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})