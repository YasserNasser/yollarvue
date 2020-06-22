import Vue from "vue";
import VueRouter from "vue-router";
import Boards from "../components/Boards.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Boards",
    component: Boards
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/register",
    name: "Register",
    
    component: () =>
      import("../components/Register.vue")
  },
  {
    path: "/login",
    name: "Login",
    
    component: () =>
      import("../components/Login.vue")
  },
  {
    path: "/logout",
    name: "Logout",
    
    component: () =>
      import("../components/Logout.vue")
  },
  {
    path: '/boards/:id',
    name: 'SingleBoard',
    
    component: () =>
      import("../components/SingleBoard.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
