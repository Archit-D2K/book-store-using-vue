import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Books from '../components/Books.vue';
import Home from '../components/Home.vue';
import store from '../store';

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: { requiresAuth: true }
  },
  { 
    path: '/signup', 
    component: Signup,
    meta: { requiresGuest: true }
  },
  { 
    path: '/books', 
    component: Books,
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    component: Login,
    meta: { requiresGuest: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } 
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/');
  }
  else {
    next();
  }
});

export default router;