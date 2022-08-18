<template>
  <router-view></router-view>
</template>

<script>
// import Header from "./components/core/Header";
// import Menu from "./components/core/Menu";
// import Content from "./components/core/Content";
// import api from './services/api.js'

export default {
  name: "App",
  components: {
    // Header,
    // Menu,
    // Content,
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
    // this.$moment.locale("th");

    setInterval(async () => {
      if (!this.$store.state.checkTimeout) {
        this.$store.state.checkTimeout = true;
        // console.log('ตั้งเวลาให้เป็นจริง')
        // console.log(this.$store.state.checkTimeout)
      }
    }, 300000);
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@font-face {
  font-family: "Prompt";
  src: url("./assets/Font/Prompt/Prompt-Regular.ttf") format("truetype");
  font-style: normal;
}

@font-face {
  font-family: "Sarabun";
  src: url("./assets/Font/Sarabun/Sarabun-Regular.ttf") format("truetype");
  font-style: normal;
}

.fontPrompt {
  font-family: "Prompt", sans-serif;
}

.fontPrompt20 {
  font-family: "Prompt", sans-serif;
}

.fontSarabun {
  font-family: "Sarabun", sans-serif;
}

.fontSize4 {
  font-size: 4px;
}

.fontSize6 {
  font-size: 6px;
}

.fontSize8 {
  font-size: 8px;
}

.fontSize9 {
  font-size: 9px;
}

.fontSize10 {
  font-size: 10px;
}

.fontSize11 {
  font-size: 11px;
}
.fontSize12 {
  font-size: 12px;
}

.fontSize13 {
  font-size: 13px;
}

.fontSize14 {
  font-size: 14px;
}

.fontSize16 {
  font-size: 16px;
}

.fontSize18 {
  font-size: 18px;
}

.fontSize20 {
  font-size: 20px;
}

.fontSize22 {
  font-size: 22px;
}

.fontSize24 {
  font-size: 24px;
}

.fontSize26 {
  font-size: 26px;
}

.fontSize28 {
  font-size: 28px;
}

.fontSize30 {
  font-size: 30px;
}
</style>
