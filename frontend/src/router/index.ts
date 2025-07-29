import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import AddRecipeForm from '../components/AddRecipeForm.vue';
import RecipeCardList from '../components/RecipeCardList.vue';
import Home from '../components/Home.vue';
import RegisterForm from '../components/RegisterForm.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  },
  {
    path: '/add-recipe',
    name: 'AddRecipe',
    component: AddRecipeForm,
  },
  {
    path: '/my-recipes',
    name: 'RecipeCardList',
    component: RecipeCardList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
