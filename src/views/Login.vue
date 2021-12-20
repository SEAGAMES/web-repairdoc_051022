<template>
  <v-container class="fontPrompt">
    <v-row class="justify-center">
      <v-card style="width: 400px">
        <v-img class="align-end" src="../assets/Art Event Logo 512 x 512 px.jpg" height="200px" >
        <v-card-title primary-title>
          Login
        </v-card-title>
        </v-img>
        <v-card-text>
          <v-form @submit.prevent="submit">
            <!-- UserName -->
            <v-text-field 
            name="username" 
            label="username" 
            id="username" 
            v-model="account.userName"
            :rules="usernameRules" />

            <!-- Password -->
            <v-text-field 
            name="password" 
            label="Password" 
            id="password"
            :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
            @click:append= "isShowPassword = !isShowPassword"
            :type="isShowPassword ? 'text' : 'password'"
            counter
            v-model="account.password"
            />
            <!-- :rules="passwordRules" -->

            <v-row class="justify-space-between px-5 mb-1 mt-1">
              <v-spacer></v-spacer>
              <!-- <v-btn text @click.prevent="$router.push('/register')"> Register </v-btn> -->
              <v-btn color="success" type="submit"> Login </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from '../services/api'
export default {
  data() {
    return {
      isShowPassword: false,
      account: {
        userName: "",
        password: "",
      },
      usernameRules: [(v1) => !!v1 || "Username is required"],
      passwordRules: [
        (v1) => !!v1 || "Password is required",
        (v2) =>
          !!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v2) ||
          "Minimum eight characters, at least one letter and one number",
      ],
    }
  },
  mounted() {
    if(api.isLoggedIn()) {
      this.$router.push("/home").catch(error => {
      if (error.name != "NavigationDuplicated") {
        throw error;
      }
    });
    }
  },
  methods: {
     submit() {
      // await this.$router.push("/repairdoc-master")
      // this.$store.state.isLogged = true
       this.$store.dispatch({
        type: "doLogin", 
        username: this.account.userName,
        password: this.account.password
      })
      

    }
  }
};
</script>

<style>
</style>