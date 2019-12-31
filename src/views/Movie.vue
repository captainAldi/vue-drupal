<template>
		<div class="container">
			<v-btn class="ma-2 mb-5" tile color="error" @click="backToHome()">
      <v-icon left>mdi-arrow-left-bold-circle-outline</v-icon> Back
    </v-btn>

			<v-list
				v-if="!filteredSingleMovie.length"
			>
				<h1>Oops Your Movie's Not Found</h1>
			</v-list>

			<v-list
				v-for="movie in filteredSingleMovie"
				:key="movie.nid.value"
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
								max-width="400"
								max-height="800"
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

						<v-list>
							<strong>Plot :</strong>
							<br/>
							<span
								v-for="body in movie.body"
								:key="body.value"
								v-html="body.value"
							>
							</span>
						</v-list>

					</v-col>
				</v-row>
			</v-list>
		</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	props: ['idMovie'],
	name: 'Movie',
	data: function() {
		return {

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
		}
	}
}
</script>

<style>

</style>