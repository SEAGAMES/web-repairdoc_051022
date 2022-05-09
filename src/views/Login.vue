<template>
  <v-container class="fontPrompt">
    <v-row class="justify-center mt-1" v-if="showLogin">
      <v-card style="width: 400px" class="cardColor">
        <v-img class="align-end" src="../assets/Art Event Logo 512 x 512 px.jpg" height="200px" >
        <v-card-title primary-title color="grey">
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
            :rules="usernameRules" 
            autofocus
            outlined
            />

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
            outlined
            />
            <!-- :rules="passwordRules" -->

            <v-row class="justify-space-between px-5 mb-1 mt-1">
              
              <!-- <v-btn text @click.prevent="$router.push('/register')"> Register </v-btn> -->
              <v-btn color="red" plain class="ml-n2" @click="showLogin = false, showResetPassword = true"> <span class="fontSize12">Reset Password </span> </v-btn>
                <v-spacer></v-spacer>
              <v-btn color="grey darken-1" type="submit" dark> Login </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>

    <ResetPasswordPage v-if="showResetPassword" @returnClose="returnClose" />
  </v-container>
</template>

<script>
import api from '../services/api'
import ResetPasswordPage from './resetpassword'
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
      showLogin: true,
      showResetPassword: false,
    }
  },
  components: {
    ResetPasswordPage
  },
  async mounted() {
    this.showLogin = false;
    setTimeout(async() => {
      if(this.$store.state.isLogged) {
        await this.$router.push("/home").catch(error => {
        if (error.name != "NavigationDuplicated") {
          throw error;
        }
      });
      } else {
        await this.$store.dispatch("doLogout");
        this.showLogin = true;
      }
    }, 500);


    
  },
  methods: {
     async submit() {
      // await this.$router.push("/repairdoc-master")
      // this.$store.state.isLogged = true
       await this.$store.dispatch({
        type: "doLogin", 
        username: this.account.userName,
        password: this.account.password
      })
    },
    returnClose(state) {
      // console.log(state)
      this.showLogin = true;
      this.showResetPassword = false;
    },
  }
};
</script>

<style>
.cardColor {
  opacity: 0.90;
 }
</style>