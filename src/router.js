import Vue from 'vue'
import Router from 'vue-router'
import RepeatTrainer from './views/RepeatTrainer.vue'
import noteview from './views/View.vue'
import ScaleTrainer from "./views/ScaleTrainer";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'noteview',
      component: noteview
    }, {
      path: '/repeatTrainer',
      name: 'repeatTrainer',
      component: RepeatTrainer
    }, {
      path: '/scaleTrainer',
      name: 'scaleTrainer',
      component: ScaleTrainer
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
