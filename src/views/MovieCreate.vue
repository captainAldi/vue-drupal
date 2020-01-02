<template>
		<div class="container">
			<h1>halaman create vue</h1>

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
			<v-row>
				<v-col
					cols="12"
				>
					<v-form>
						<v-text-field
							v-model="movieObject.title"
							solo
							label="Title"
							append-icon="mdi-movie-edit"
						></v-text-field>

						<v-textarea
							solo
							v-model="movieObject.body"
							label="Solo textarea"
						></v-textarea>

						<v-btn class="mr-4" color="success" @click.prevent="createMovie">Save</v-btn>
						<v-btn @click="clearForm">clear</v-btn>
					</v-form>
				</v-col>
			</v-row>
		</div>
</template>

<script>
import Axios from 'axios'

export default {
	name: 'movieCreate',
	data: function() {
		return {
			url: 'https://103.197.92.147/node?_format=hal_json',
			isLoading: false,
			dialog: false,
			movieObject: {
				title: '',
				body: ''
			}
		}
	},
	computed: {

	},
	methods: {

	async createMovie() {
				this.isLoading = true

				let formDataMovie = {
					"_links": {
						"type": {
							"href": "https://103.197.92.147rest/type/node/movies"
						}
					},
					"title": [
						{
							"value": this.movieObject.title
						}
					],
					"body": [
						{
							"value": this.movieObject.body
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
					await Axios.post(this.url, formDataMovie, config)
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

		backToHome() {
			this.$router.push('/')
		}
	},

}
</script>

<style>

</style>