<template>
  <v-content class="fontPrompt" 
    :style="$route.path === '/login' || $route.path === '/home' ? {'background-image':`url(${windowWidth > 1380 ? wallpaperFull : wallpaperHD })`} : ''">
    <div v-if="$store.state.loadingPage">
    <PulseLoader
        justify="center"
        align="center"
        :loading="$store.state.loadingPage"
        class="mt-16"
    />
    </div>
    <router-view @isCheckLogin='isCheckLogin' ></router-view>
    <div align="center">
      <v-snackbar v-model="valuesIsCheckLogin" top width="1000" align="center">
        <div class="fontPrompt fontSize18 text-center">
          <v-icon  color="red">mdi-close-circle</v-icon>
          การเข้าสู่ระบบของคุณหมดอายุแล้ว
        </div>
      </v-snackbar>
    </div>
  </v-content>
</template>

<script>
import PulseLoader from '../Loadings/PulseLoader.vue'

export default {
  data() {
    return {
      valuesIsCheckLogin: false,
      wallpaperHD: 'http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/wallpaper_art_1376.jpg',
      wallpaperFull: 'http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/wallpaper_art_1920.jpg',
      windowWidth: window.innerWidth,
      isCheck: false,

    }
  },
  components: {
    PulseLoader,
  },
  mounted() {
    // console.log(this.windowWidth);
    //  console.log(this.$route.path);
    // setInterval(() => {
    //     this.isCheck = !this.isCheck;
    // }, 3000);
  },
  methods: {
    isCheckLogin(status) {
      this.valuesIsCheckLogin = status;
      // console.log('นี้คือ Check',status);
    }
  }
}
</script>

<style>

</style>