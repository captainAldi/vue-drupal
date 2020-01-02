<template>
	<div>
		<div class="container">
			<v-dialog
				v-model="dialog"
				width="500"
				:persistent="true"
				v-for="singleMovie in filteredSingleMovie"
				:key="singleMovie.nid.value"
			> 
				<v-card>
					<v-card-title
							class="headline error lighten-2"
							primary-title
					>
							Caution 
					</v-card-title>

					<v-card-text
						v-for="judul in singleMovie.title"
						:key="judul.value"
					>
						<br>
							Are you sure want to delete ?
						<br>
							<strong>
								{{judul.value}}
							</strong>
					</v-card-text>

					<v-divider></v-divider>

					<v-card-actions
						v-for="id in singleMovie.nid"
						:key="id.value"
					>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							text
							@click="deleteMovie(id.value)"
						>
							I accept
						</v-btn>

						<v-btn
							color="primary"
							text
							@click="dialog = !dialog"
						>
								Cancel
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-row>
				<v-col
					cols=12
					sm="6"
				>
					<v-text-field
						solo
						label="Search Title"
						prepend-inner-icon="mdi-magnify"
						v-model="searchTitle"
					></v-text-field>
				</v-col>

				<v-col
					cols="12"
					sm="6"
				>
					<v-select
						v-model="searchGenre"
						:items="genreFilter"
						label="Solo field"
						solo
						item-text="value"
						return-object
					></v-select>
				</v-col>
			</v-row>

			<v-row>
				<v-col
					cols="12"
					sm="6"
				>
					<v-btn 
						medium
						color="error"
						class="mb-5 mr-2"
						@click="clearFilter()"
					>
						Clear
					</v-btn>

					<v-btn 
						medium
						color="success"
						class="mb-5"
						@click="addMovie()"
					>
						Add Movie
					</v-btn>
				</v-col>
			</v-row>
	
		<div
			v-if="!listMovies.length"
		>
			<v-skeleton-loader
				ref="skeleton"
				type="list-item-avatar-three-line"
				class="mx-auto"
				v-for="n in 3"
				:key="n"
			></v-skeleton-loader>
		</div>

			<v-list v-else-if="!filteredMovies.length"><h1>Tidak Ditemukan</h1></v-list>

			<v-list
				v-for="movie in filteredMovies"
				:key="movie.nid.value"
				v-else
			>
				<v-row>
					<v-col
						cols="4"
					>
						<v-list
							v-for="poster in movie.field_poster"
							:key="poster.target_id"
						>
							<v-img
								:src="poster.url"
								max-width="200"
								max-height="250"
								:alt="poster.alt"
							>
							</v-img>
						</v-list>
					</v-col>
					<v-col
						cols="8"
					>
						<v-list
							v-for="judul in movie.title"
							:key="judul.value"
						>
							<h1>{{judul.value}}</h1>
						</v-list>

						<v-list
							v-for="director in movie.field_director"
							:key="director.value"
						>
							<strong>Director :</strong> {{director.value}}
						</v-list>

						<v-list>
							<strong>Actors :</strong>
							<span
								v-for="actor in movie.field_actors"
								:key="actor.value"
							>
								<br/> {{actor.value}}	
							</span>
						</v-list>

						<v-list>
							<strong>Genres :</strong>
							<span
								v-for="genre in movie.field_genre"
								:key="genre.value"
							>
								{{ genre.value}},
							</span>
						</v-list>

						<v-row
							v-for="idMovie in movie.nid"
							:key="idMovie.value"
						>
							<v-list>
								<v-btn 
									class="mx-2" 
									fab 
									dark 
									small 
									color="primary"
									@click="singleMovie(idMovie.value)"
									>
										<v-icon dark>mdi-information-outline</v-icon>
								</v-btn>
							</v-list>

							<v-list>
								<v-btn 
									class="mx-2" 
									fab 
									dark 
									small 
									color="error"
									@click="wantToDeleteMovie(idMovie.value)"
									>
										<v-icon dark>mdi-minus</v-icon>
								</v-btn>
							</v-list>

							<v-list>
								<v-btn 
									class="mx-2" 
									fab 
									dark 
									small 
									color="success"
									@click="goToEditMovie(idMovie.value)"
									>
										<v-icon dark>mdi-file-document-edit-outline</v-icon>
								</v-btn>
							</v-list>
						</v-row>



					</v-col>
				</v-row>
				<hr/>
			</v-list>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
			
  },
		data: function() {
			return {
				searchTitle: '',
				searchGenre: 'All',
				genreFilter: ['All', 'Action', 'Adventure', 'Crime', 'Fantasy', 'Sci-Fi'],
				isLoading: false,
				dialog: false,
				filteredSingleMovie: [],
				url: 'http://drupal-vue.dd:8083/node/'
			}
		},
		computed: {
			...mapGetters({
				listMovies: 'movies/listMovies',
				dataErrorStatus: 'movies/dataErrorStatus'
			}),
			// filteredMoviesTitle() {
			// 	let searchTitleLow = this.searchTitle.toLowerCase()

			// 	return this.listMovies.filter(film => {
			// 		return film.title.some(judul => {
			// 			let judulLow = judul.value.toLowerCase()
			// 			return judulLow.indexOf(searchTitleLow) > -1
			// 		})
			// 	})
			// },
			// filteredMoviesGenre() {
			// 	return this.listMovies.filter(film => {
			// 		return film.field_genre.some(genre => {
			// 			return genre.value.indexOf(this.searchGenre) > -1
			// 		})
			// 	})
			// },
			filteredMovies() {
				if(this.searchTitle == '' && this.searchGenre == 'All') {
					return this.listMovies
				} else {
					let searchTitleLow = this.searchTitle.toLowerCase()
					return this.listMovies.filter(film => {
						return (this.searchTitle == '' || film.title.some(judul => judul.value.toLowerCase().includes(searchTitleLow))) && (this.searchGenre == 'All' || film.field_genre.some(genre => genre.value == this.searchGenre))
					})
				}
			}
		},
		methods: {
			clearFilter() {
				this.searchTitle = ''
				this.searchGenre = 'All'
			},
			singleMovie(idMovie) {
				this.$router.push('/movie/' + idMovie)
			},
			addMovie() {
				this.$router.push('/create/movie')
			},
			goToEditMovie(idMovie) {
				this.$router.push('/edit/movie/' + idMovie)
			},
			wantToDeleteMovie(id) {
				this.dialog = true

				this.filteredSingleMovie = this.listMovies.filter(film => {
					return film.nid.some(idFilm => {
						return idFilm.value == id
					})
				})

			},
			async deleteMovie(id) {
				this.dialog = false
				this.isLoading = true

				let config = {
					headers: {
						'Authorization': 'Basic ' + btoa('admin' + ':' + '12345678')
					}
				}

				await axios.delete(this.url+id, config)

				this.$router.go('/')
			}
		}
}
</script>
