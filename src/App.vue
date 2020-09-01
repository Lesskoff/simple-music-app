<template>
  <div
    id="app"
    class="min-h-screen select-none bg-gray-900 text-gray-200 bg-gradient-to-b from-gray-900 to-gray-800"
    :style="{ paddingBottom: playerHeight + 'px' }"
  >
    <header class="sticky top-0 left-0 right-0 flex bg-gray-900 shadow z-10">
      <div class="container sm:container mx-auto p-3 pb-6 flex">
        <h1 class="text-6xl font-black">My music</h1>
      </div>
    </header>
    <div id="playlist" class="w-full">
      <div
        v-for="(song, i) in songs"
        v-bind:key="song.title"
        :class="[
          i === 0 ? 'border-t-0' : 'border-t',
          isPlaying &&
            song.src === current.src &&
            'bg-gradient-to-r from-blue-900 to-gray-800 ',
        ]"
        class="flex items-center songTitle w-full text-xl border-solid border-gray-800"
      >
        <div
          class="flex items-center w-full px-3 py-2 container sm:container mx-auto "
        >
          <ActionButton
            v-if="!isPlaying || song.src !== current.src"
            :onClick="play.bind(null, song, i)"
            :svg="mdiPlay"
            :size="24"
          />
          <ActionButton v-else :onClick="pause" :svg="mdiPause" :size="24" />
          <span class="ml-3"> {{ song.title }} - {{ song.artist }} </span>
        </div>
      </div>
    </div>
    <div
      v-if="Object.entries(current).length"
      id="player"
      ref="player"
      class="fixed bottom-0 right-0 left-0 w-full py-2 bg-gradient-to-r from-gray-800 to-blue-900 shadow z-10"
    >
      <div
        class="container sm:container mx-auto w-full px-3 flex flex-col justify-center items-center"
      >
        <h2 class="text-2xl">{{ current.title }} - {{ current.artist }}</h2>
        <div id="actions" class="flex mt-2">
          <ActionButton
            id="prev-button"
            :onClick="prev"
            :svg="mdiSkipPrevious"
            :size="30"
          />
          <ActionButton
            v-if="!isPlaying"
            id="play-button"
            :onClick="play"
            :svg="mdiPlay"
            :size="50"
          />
          <ActionButton
            v-else
            id="pause-button"
            :onClick="pause"
            :svg="mdiPause"
            :size="50"
          />
          <ActionButton
            id="next-button"
            :onClick="next"
            :svg="mdiSkipNext"
            :size="30"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "./components/ActionButton";
import { mdiPlay, mdiSkipPrevious, mdiSkipNext, mdiPause } from "@mdi/js";

export default {
  name: "App",
  components: {
    ActionButton,
  },
  data() {
    return {
      mdiPlay,
      mdiSkipPrevious,
      mdiSkipNext,
      mdiPause,
      title: "Song Title",
      current: {},
      player: new Audio(),
      index: 0,
      isPlaying: false,
      playerHeight: 0,
      songs: [
        {
          title: "Master of Puppets",
          artist: "Metallica",
          src: require("./assets/metallica-master-of-puppets_ostonline_net.mp3"),
        },
        {
          title: "Pantera",
          artist: "Walk",
          src: require("./assets/pantera-walk.mp3"),
        },
      ],
    };
  },
  created() {
    this.current = this.songs[this.index];
    this.player.src = this.current.src;
  },
  mounted() {
    this.calculatePlayerHeight();
  },
  methods: {
    play(song, index) {
      if (song?.src) {
        this.current = song;

        this.player.src = this.current.src;
      }

      if (typeof index !== "undefined") this.index = index;

      this.player.play();
      this.isPlaying = true;
    },

    pause() {
      this.player.pause();
      this.isPlaying = false;
    },

    next() {
      this.index++;
      if (this.index > this.songs?.length - 1) {
        this.index = 0;
      }

      this.current = this.songs[this.index];
      this.player.src = this.current.src;

      this.player.play();
      this.isPlaying = true;
    },

    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.songs.length - 1;
      }

      this.current = this.songs[this.index];
      this.player.src = this.current.src;

      this.player.play();
      this.isPlaying = true;
    },

    calculatePlayerHeight() {
      this.playerHeight = this.$refs.player.offsetHeight;
    },
  },
};
</script>
