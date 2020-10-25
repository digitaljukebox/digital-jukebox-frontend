<template>
  <div class="row q-col-gutter-md">
    <div class="q-my-md col-sm-12 col-md-6">
      <q-toolbar class="bg-primary text-white" :disabled="!!allowList.length">
        <q-toolbar-title>Deny List</q-toolbar-title>
        <q-btn flat round @click="addDenyList = !addDenyList" :disabled="!!allowList.length">
          <q-icon name="fas fa-plus" />
        </q-btn>
      </q-toolbar>

      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <span>Tracks in this list will <strong>not</strong> be allowed to play.</span>
            <div class="q-pt-md"v-if="!!allowList.length">Please remove all songs from the Allow List to use the Deny List.</div>
          </q-item-section>
        </q-item>

        <q-item v-if="addDenyList">
          <q-item-section>
            <q-input clearable debounce="250" v-model="denyListSearch" @input="searchDenyList(denyListSearch)"
                     label="Search for a song or artist" />
            <q-card style="max-height: 40vh; overflow-y: scroll;">
              <q-list bordered separator>
                <q-item v-for="track in denyListSearchResultsFormatted" :key="track.id">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img :src="track.album.image ? track.album.image : 'https://cdn.quasar.dev/img/boy-avatar.png'" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ track.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ track.artists[0].name }}</q-item-label>
                    <q-item-label caption lines="1">{{ track.length | trackLengthFormat }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="row items-center q-gutter-sm">
                      <q-btn @click="editDenyList(track, false)" flat round color="positive" icon="fas fa-plus" />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-item-section>
        </q-item>

        <q-item v-if="!denyList.length">
          <q-item-section>
            There are no items in the deny List.
          </q-item-section>
        </q-item>

        <q-item v-for="track in denyList" :key="track.id">
          <q-item-section avatar>
            <q-avatar square>
              <img :src="track.album.image ? track.album.image : 'https://cdn.quasar.dev/img/boy-avatar.png'" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ track.name }}</q-item-label>
            <q-item-label caption lines="1">{{ track.artists[0].name }}</q-item-label>
            <q-item-label caption lines="1">{{ track.length | trackLengthFormat }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center q-gutter-sm">
              <q-btn @click="editDenyList(track, true)" flat round color="negative" icon="fas fa-times" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div class="q-my-md col-sm-12 col-md-6">
      <q-toolbar class="bg-primary text-white" :disabled="!!denyList.length">
        <q-toolbar-title>Allow List</q-toolbar-title>
        <q-btn flat round @click="addAllowList = !addAllowList" :disabled="!!denyList.length">
          <q-icon name="fas fa-plus" />
        </q-btn>
      </q-toolbar>

      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <span>Tracks in this list are the <strong>only</strong> songs allowed to play. We recommend that
            you use the Deny List, otherwise your patrons will have a very limited choice of tracks.</span>
            <div class="q-pt-md" v-if="!!denyList.length">Please remove all songs from the Deny List to use the Allow List.</div>
          </q-item-section>
        </q-item>

        <q-item v-if="addAllowList">
          <q-item-section>
            <q-input debounce="250" clearable v-model="allowListSearch" @input="searchAllowList(allowListSearch)"
                     label="Search for a song or artist" />
            <q-card style="max-height: 40vh; overflow-y: scroll;">
              <q-list bordered separator>
                <q-item v-for="track in allowListSearchResultsFormatted" :key="track.id">
                  <q-item-section avatar>
                    <q-avatar square>
                      <img :src="track.album.image ? track.album.image : 'https://cdn.quasar.dev/img/boy-avatar.png'" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ track.name }}</q-item-label>
                    <q-item-label caption lines="1">{{ track.artists[0].name }}</q-item-label>
                    <q-item-label caption lines="1">{{ track.length | trackLengthFormat }}</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <div class="row items-center q-gutter-sm">
                      <q-btn @click="editAllowList(track, false)" flat round color="positive" icon="fas fa-plus" />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </q-item-section>
        </q-item>

        <q-item v-if="!allowList.length">
          <q-item-section>
            There are no items in the allow List.
          </q-item-section>
        </q-item>

        <q-item v-for="track in allowList" :key="track.id">
          <q-item-section avatar>
            <q-avatar square>
              <img :src="track.album.image ? track.album.image : 'https://cdn.quasar.dev/img/boy-avatar.png'" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ track.name }}</q-item-label>
            <q-item-label caption lines="1">{{ track.artists[0].name }}</q-item-label>
            <q-item-label caption lines="1">{{ track.length | trackLengthFormat }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row items-center q-gutter-sm">
              <q-btn @click="editAllowList(track, true)" flat round color="negative" icon="fas fa-times" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import firebase, { UserInfo } from 'firebase';
import 'firebase/firestore';
import { UserProfile, Track } from '../types';
import SearchResponse = SpotifyApi.SearchResponse;
import TrackObjectFull = SpotifyApi.TrackObjectFull;
const db = firebase.firestore();

export default defineComponent({
  name: 'AllowDenyList',
  data() {
    return {
      user: <UserInfo>{},
      userProfile: <UserProfile>{},
      venueId: '',
      addAllowList: false,
      addDenyList: false,
      allowListSearch: '',
      allowListSearchResults: <SearchResponse>{},
      denyListSearch: '',
      denyListSearchResults: <SearchResponse>{},
      allowList: [],
      denyList: []
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.user = user;
        db.collection('users').doc(user.uid)
          .onSnapshot(doc => {
            this.userProfile = doc.data() as UserProfile;
          });

        db.collection('venues').doc(this.venueId)
          .onSnapshot(doc => {
            this.allowList = doc.data().allowedTracks as Array<Track>;
            this.denyList = doc.data().deniedTracks as Array<Track>;
          });
      }
    });
  },
  mounted() {
    this.venueId = this.$route.params.id;
  },
  computed: {
    allowListSearchResultsFormatted(): Array<Track> {
      if (!this.allowListSearchResults?.tracks) return [];
      let tracks = (this.allowListSearchResults as any)?.tracks.map((track: TrackObjectFull) => {
        return {
          id: track.id,
          album: {
            id: track.album?.id,
            url: track.album?.external_urls?.spotify,
            name: track.album?.name,
            image: track.album?.images[0]?.url,
            release: track.album?.release_date
          },
          url: track?.external_urls?.spotify,
          name: track.name,
          // image: track?.images[0]?.url,
          artists: track.artists,
          explicit: track.explicit,
          length: track.duration_ms
        };
      });

      return tracks;
    },
    denyListSearchResultsFormatted(): Array<Track> {
      if (!this.denyListSearchResults?.tracks) return [];
      let tracks = (this.denyListSearchResults as any)?.tracks.map((track: TrackObjectFull) => {
        return {
          id: track.id,
          album: {
            id: track.album?.id,
            url: track.album?.external_urls?.spotify,
            name: track.album?.name,
            image: track.album?.images[0]?.url,
            release: track.album?.release_date
          },
          url: track?.external_urls?.spotify,
          name: track.name,
          // image: track?.images[0]?.url,
          artists: track.artists,
          explicit: track.explicit,
          length: track.duration_ms
        };
      });

      return tracks;
    }
  },
  filters: {
    trackLengthFormat(length: number): string {
      length = length / 1000;
      let totalHours = Math.floor(length / (60 * 60));
      let isHours = Math.floor(length / (60 * 60));
      let seconds = length - (totalHours * 60 * 60);
      let totalMinutes = Math.floor(length / 60);
      let totalSeconds = Math.floor(seconds - (totalMinutes * 60));
      return isHours ? `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:
      ${totalSeconds.toString().padStart(2, '0')} hours` : `${totalMinutes.toString().padStart(2, '0')}:
      ${totalSeconds.toString().padStart(2, '0')} mins`;
    }
  },
  methods: {
    async searchAllowList(item: string) {
      if (item === null) {
        this.allowListSearchResults = <SearchResponse>[];
        return;
      }
      this.allowListSearchResults = await this.searchItem(item);
    },
    async searchDenyList(item: string) {
      if (item === null) {
        this.denyListSearchResults = <SearchResponse>[];
        return;
      }
      this.denyListSearchResults = await this.searchItem(item);
    },
    searchItem(item: string): Promise<SearchResponse> {
      return new Promise((resolve, reject) => {
        const AuthStr = 'Bearer '.concat(
          this.userProfile.spotify.accessToken
        );
        this.$axios
          .get(`https://api.spotify.com/v1/search?q=${item}&type=artist,track&market=au&limit=30`, {
            headers: {
              Authorization: AuthStr
            }
          })
          .then(response => {
            resolve({ artists: response.data.artists.items, tracks: response.data.tracks.items });
          })
          .catch((error) => reject(error));
      });
    },
    editAllowList(track: Track, remove = false) {
      firebase.auth().onAuthStateChanged(async user => {
        let firebaseUser: firebase.User;
        if (user) {
          firebaseUser = { ...user };
        }

        if (firebaseUser) {
          await db.collection('venues')
            .doc(this.venueId)
            .update({allowedTracks: remove ? firebase.firestore.FieldValue.arrayRemove(track) : firebase.firestore.FieldValue.arrayUnion(track)});
        }
      });
    },
    editDenyList(track: Track, remove = false) {
      firebase.auth().onAuthStateChanged(async user => {
        let firebaseUser: firebase.User;
        if (user) {
          firebaseUser = { ...user };
        }

        if (firebaseUser) {
          await db.collection('venues')
            .doc(this.venueId)
            .update({deniedTracks: remove ? firebase.firestore.FieldValue.arrayRemove(track) : firebase.firestore.FieldValue.arrayUnion(track)});
        }
      });
    },
  }
});
</script>
