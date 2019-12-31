import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
import MovieCreate from '../views/MovieCreate.vue'
import MovieEdit from '../views/MovieEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
		{
			path: '/movie/:idMovie',
			name: 'movie-single',
			props: true,
			component: Movie
		},
		{
			path: '/create/movie',
			name: 'movie-create',
			component: MovieCreate
		},
		{
			path: '/edit/movie/:idMovie',
			name: 'movie-update',
			props: true,
			component: MovieEdit
		}
		
]

const router = new VueRouter({
  routes
})

export default router
