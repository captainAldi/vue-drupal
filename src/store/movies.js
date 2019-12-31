import Axios from "axios"


const url = 'http://drupal-vue.dd:8083/api/movies'

export default {
	namespaced: true,

	state: {
		movies: []
	},

	getters: {
		listMovies: state => state.movies
	},

	actions: {
		async fetchDatas({commit}) {
			const response = await Axios.get(url)
			commit('setMovies', response.data)
		}
	},

	mutations: {
		setMovies: (state, datas) => state.movies = datas
	}
}