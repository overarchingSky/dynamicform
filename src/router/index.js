import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      component: resolve => require(["pages/index"], resolve)
    },
    {
      path: "/dynamic-form",
      name: "dynamic-form",
      component: resolve => require(["pages/dynamic-form"], resolve)
    },
    {
      path: "/beijingHospital",
      name: "beijingHospital",
      component: resolve => require(["pages/demo/beijingHospital"], resolve)
    },
    {
      path: "/layout-form",
      name: "layout-form",
      component: resolve =>
        require(["lib/components/dynamic-form/value"], resolve)
    },
    {
      path: "/aorto-arteritis",
      name: "aorto-arteritis",
      component: resolve => require(["pages/demo/aorto-arteritis"], resolve)
    },
    {
      path: "/aortopathy",
      name: "aortopathy",
      component: resolve => require(["pages/demo/aortopathy"], resolve)
    },
    {
      path: "/edit-dynamic-form",
      name: "edit-dynamic-form",
      component: resolve => require(["pages/edit-dynamic-form"], resolve)
    },
    {
      path: "/json",
      name: "json",
      component: resolve => require(["pages/json"], resolve)
    },
    {
      path: "/json/aorto-arteritis",
      name: "aorto-arteritis-json",
      component: resolve => require(["pages/json/aorto-arteritis"], resolve)
    },
    {
      path: "/json/aortopathy",
      name: "aortopathy-json",
      component: resolve => require(["pages/json/aortopathy"], resolve)
    },
    {
      path: "/screenshot",
      name: "screenshot",
      component: resolve => require(["pages/screenshot"], resolve)
    }
  ]
});
