import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import Home from '../components/Home.vue';
import RecipeCardList from '../components/RecipeCardList.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  }, 
  {
    path: '/my-recipes',
    name: 'MyRecipes',
    component: RecipeCardList,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
