import {createWebHistory, createRouter} from 'vue-router'

const Home = ()=> import('../components/Home.vue')
const Employees = ()=> import('../components/Employees.vue')
const Details = ()=> import('../components/SiteDetails.vue')


const history = createWebHistory()

const routes = [
    {
      path: '/',
      name: 'sites',
      component: Home,
    },
    {
        path: '/:siteId',
        name: 'site-details',
        component: Details,
      },
      {
        path: '/employees',
        name: 'employees',
        component: Employees,
      }




]

const router = createRouter({history, routes })
export default router