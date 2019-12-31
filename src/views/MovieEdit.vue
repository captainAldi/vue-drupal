<template>
		<div class="container">
			<v-btn class="ma-2 mb-5" tile color="error" @click="backToHome()">
      <v-icon left>mdi-arrow-left-bold-circle-outline</v-icon> Back
    </v-btn>

			<v-overlay :value="isLoading">
			<v-dialog
				v-model="dialog"
				width="500"
				:persistent="true"
			> 
				<v-card>
					<v-card-title
						class="headline error lighten-2"
						primary-title
					>
						Warning
					</v-card-title>

					<v-card-text>
						<br>
							Ada Masalah !
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							text
							@click="closeDialog"
						>
								I accept
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
				<v-progress-circular
					:size="70"
					:width="7"
					color="primary"
					indeterminate
    ></v-progress-circular>
			</v-overlay>

			<v-list
				v-if="!filteredSingleMovie.length"
			>
				<h1>Oops Your Movie's Not Found</h1>
			</v-list>

			<h1>ini edit</h1>
			{{filteredSingleMovie[0].title[0].value}}
			
			<v-row>
				<v-col
					cols="12"
				>
					<v-form>
						<v-text-field
							v-model="filteredSingleMovie[0].title[0].value"
							solo
							label="Title"
							append-icon="mdi-movie-edit"
						></v-text-field>

						<v-textarea
							solo
							v-model="filteredSingleMovie[0].body[0].value"
							label="Solo textarea"
						></v-textarea>

						<v-btn class="mr-4" color="success" @click.prevent="editMovie">Save</v-btn>
						<v-btn @click="clearForm">clear</v-btn>

					</v-form>
				</v-col>
			</v-row>
		</div>
</template>

<script>
import Axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
	props: ['idMovie'],
	name: 'movieEdit',
	data: function() {
		return {
			url: 'http://drupal-vue.dd:8083/node/',
			isLoading: false,
			dialog: false,
		}
	},
	created() {
		this.fetchMoviesData()
	},
	computed: {
		...mapGetters({
			listMovies: 'movies/listMovies'
		}),
		filteredSingleMovie() {
			return this.listMovies.filter(film => {
				return film.nid.some(idFilm => {
					return idFilm.value == this.idMovie
				})
			})
		}
	},
	methods: {
		...mapActions({
			fetchMoviesData: 'movies/fetchDatas'
		}),

		backToHome() {
			this.$router.push('/')
		},

		async editMovie() {
			this.isLoading = true

				let formDataMovie = {
					"_links": {
						"type": {
							"href": "http://drupal-vue.dd:8083/rest/type/node/movies"
						}
					},
					"title": [
						{
							"value": this.filteredSingleMovie[0].title[0].value
						}
					],
					"body": [
						{
							"value": this.filteredSingleMovie[0].body[0].value
						}
					]
				}

				let config = {
					headers: {
						'Content-Type': 'application/hal+json',
						'Accept': 'application/hal+json',
						'Authorization': 'Basic ' + btoa('admin' + ':' + '12345678')
					}
				}

				try {
					await Axios.patch(this.url + this.idMovie, formDataMovie, config)
					this.isLoading = false
					this.clearForm()
				} catch (error) {
					this.dialog = true
				}
		},

		clearForm() {
			this.movieObject.title = ''
			this.movieObject.body = ''
		},

		closeDialog() {
			this.dialog = false
			this.isLoading = false
		},

	}
}
</script>

<style>

</style>