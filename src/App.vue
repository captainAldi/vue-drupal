<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

    </v-app-bar>

    <v-content>
						<v-slide-x-transition>
							<router-view />
						</v-slide-x-transition>
    </v-content>

				<div>
					<v-snackbar
						v-if="dataErrorStatus.toServer"
						v-model="dataErrorStatus.toServer"
						color="error"
						:timeout=0
					>
						{{dataErrorStatus.message}}
					</v-snackbar>

					<v-snackbar
						v-if="dataErrorStatus.toInternet"
						v-model="dataErrorStatus.toInternet"
						color="error"
						:timeout=0
					>
						{{dataErrorStatus.message}}
					</v-snackbar>
				</div>

				<v-bottom-navigation
					:value="activeBtn"
					grow
					color="primary"
					app
					v-if="$vuetify.breakpoint.smAndDown"
				>
					<v-btn
						@click="goToListMovie()"
					>
						<span>List</span>
						<v-icon>mdi-library-movie</v-icon>
					</v-btn>

					<v-btn
						@click="goToAbout()"
					>
						<span>About</span>
						<v-icon>mdi-information-outline</v-icon>
					</v-btn>
				</v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',

  components: {
    
  },

		data: function () {
			return {
				activeBtn: 0
			}
		},

	created() {
			this.fetchMoviesData()
		},

		computed: {
			...mapGetters({
				listMovies: 'movies/listMovies',
				dataErrorStatus: 'movies/dataErrorStatus'
			}),
		},

		methods: {
			...mapActions({
				fetchMoviesData: 'movies/fetchDatas'
			}),

			goToListMovie() {
				this.activeBtn = 0

				this.$router.push('/')
			},

			goToAbout() {
				this.$router.push('/about')
			}
		}


};
</script>
