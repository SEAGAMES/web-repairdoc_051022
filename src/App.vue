<template>
  <v-app>
    <Header v-if="$store.state.isLogged" />
    <Menu v-if="$store.state.isLogged" />
    <Content />
  </v-app>
</template>

<script>
import Header from "./components/core/Header";
import Menu from "./components/core/Menu";
import Content from "./components/core/Content";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
  },
  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
    // console.log(process.env.API_HOST)
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@font-face {
  font-family: 'Prompt';
  src: url('./assets/Font/Prompt/Prompt-Regular.ttf') format('truetype');
  font-style: normal
}

.fontPrompt {
  font-family: "Prompt", sans-serif;
}

.fontPrompt20 {
  font-family: "Prompt", sans-serif;
}



.fontSize10 {
  font-size: 10px;
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

.fontSize22{
  font-size: 22px;
}

.fontSize24{
  font-size: 24px;
}

.fontSize26{
  font-size: 26px;
}





</style>
