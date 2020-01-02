import Axios from "axios"


const url = 'https://103.197.92.147/api/movies'

export default {
	namespaced: true,

	state: {
		movies: [],
		errorStatus: {
			toServer: false,
			toInternet: false,
			message: ''
		},
	},

	getters: {
		listMovies: state => state.movies,
		dataErrorStatus: state => state.errorStatus
	},

	actions: {
		async fetchDatas({commit}) {

			try {
				const response = await Axios.get(url)
				commit('setMovies', response.data)
			} catch (error) {
				if (!navigator.onLine) {
					const setErrorStatus = {
						toServer: false,
						toInternet: true,
						message: 'No Internet Connection !'
					}

					commit('setErrorStatusInternet', setErrorStatus)
				}
				else if(!error.response) {
					const setErrorStatus = {
						toServer: true,
						toInternet: false,
						message: 'Can\'t Connect To Server'
					}

					commit('setErrorStatusServer', setErrorStatus)
				} else {
					const setErrorStatus = {
						toServer: true,
						toInternet: false,
						message: error.response.data.message
					}

					commit('setErrorStatusMessage', setErrorStatus)
				}
			}
		}
	},

	mutations: {
		setMovies: (state, datas) => state.movies = datas,

		setErrorStatusServer: (state, setErrorStatus) => {
			state.errorStatus.toServer = setErrorStatus.toServer
			state.errorStatus.toInternet = setErrorStatus.toInternet
			state.errorStatus.message = setErrorStatus.message
		},

		setErrorStatusMessage: (state, setErrorStatus) => {
			state.errorStatus.toServer = setErrorStatus.toServer
			state.errorStatus.toInternet = setErrorStatus.toInternet
			state.errorStatus.message = setErrorStatus.message
		},

		setErrorStatusInternet: (state, setErrorStatus) => {
			state.errorStatus.toServer = setErrorStatus.toServer
			state.errorStatus.toInternet = setErrorStatus.toInternet
			state.errorStatus.message = setErrorStatus.message
		},
	}
}