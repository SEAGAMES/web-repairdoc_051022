<template>
  <div class="v-spinner mt-16">
    <h1>Loading</h1>
    <div
      class="v-pulse v-pulse1 mt-10"
      v-bind:style="[spinnerStyle1, spinnerDelay1]"
    ></div>
    <div
      class="v-pulse v-pulse2 mt-10"
      v-bind:style="[spinnerStyle2, spinnerDelay2]"
    ></div>
    <div
      class="v-pulse v-pulse3 mt-10"
      v-bind:style="[spinnerStyle3, spinnerDelay3]"
    ></div>
    <div
      class="v-pulse v-pulse4 mt-10"
      v-bind:style="[spinnerStyle4, spinnerDelay4]"
    ></div>
    <div
      class="v-pulse v-pulse5 mt-10"
      v-bind:style="[spinnerStyle5, spinnerDelay5]"
    ></div>
    <div
      class="v-pulse v-pulse6 mt-10"
      v-bind:style="[spinnerStyle6, spinnerDelay6]"
    ></div>
    <div
      class="v-pulse v-pulse7 mt-10"
      v-bind:style="[spinnerStyle7, spinnerDelay7]"
    ></div>
  </div>

  <!-- :style="{'background-image':`url(${windowWidth > 1380 ? wallpaperFull : wallpaperHD })`}" v-show="loading" -->
</template>

<script>

const randomCode = () => {
  let colors = Math.floor(Math.random() * 16777215).toString(16);
  colors = "#" + colors;
  return colors;
};

export default {
  name: "PulseLoader",
  mounted() {
    const interval = setInterval(() => {
      this.spinnerStyle1.backgroundColor = randomCode();
      this.spinnerStyle2.backgroundColor = randomCode();
      this.spinnerStyle3.backgroundColor = randomCode();
      this.spinnerStyle4.backgroundColor = randomCode();
      this.spinnerStyle5.backgroundColor = randomCode();
      this.spinnerStyle6.backgroundColor = randomCode();
      this.spinnerStyle7.backgroundColor = randomCode();
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: randomCode(),
    },
    size: {
      type: String,
      default: "15px",
    },
    margin: {
      type: String,
      default: "2px",
    },
    radius: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      wallpaperHD: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/wallpaper_art_1376.jpg",
      wallpaperFull: "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg",
      spinnerStyle1: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerStyle2: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerStyle3: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerStyle4: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerStyle5: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerStyle6: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerStyle7: {
        backgroundColor: randomCode(),
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: "inline-block",
        animationName: "v-pulseStretchDelay",
        animationDuration: "0.75s",
        animationIterationCount: "infinite",
        animationTimingFunction: "cubic-bezier(.2,.68,.18,1.08)",
        animationFillMode: "both",
      },
      spinnerDelay1: {
        animationDelay: "0.12s",
      },
      spinnerDelay2: {
        animationDelay: "0.24s",
      },
      spinnerDelay3: {
        animationDelay: "0.36s",
      },
      spinnerDelay4: {
        animationDelay: "0.48s",
      },
      spinnerDelay5: {
        animationDelay: "0.60s",
      },
      spinnerDelay6: {
        animationDelay: "0.72s",
      },
      spinnerDelay7: {
        animationDelay: "0.84s",
      },
    };
  },
};
</script>

<style>
/*.v-spinner
{
    margin: 100px auto;
    text-align: center;
}
*/
.bgTest {
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  /* background-image: 'http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/wallpaper_art_1920.jpg'; */
}
@-webkit-keyframes v-pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}
@keyframes v-pulseStretchDelay {
  0%,
  80% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-opacity: 1;
    opacity: 1;
  }
  45% {
    -webkit-transform: scale(0.1);
    transform: scale(0.1);
    -webkit-opacity: 0.7;
    opacity: 0.7;
  }
}
</style>