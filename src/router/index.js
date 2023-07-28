import Vue from "vue";
import VueRouter from "vue-router";
import MainPage from "../pages/MainPage";

Vue.use(VueRouter);

const routes = [{ path: "/", component: MainPage }];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
