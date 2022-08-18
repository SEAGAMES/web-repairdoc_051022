<template>
  <v-container grid-list-xs class="fontPrompt" v-if="!$store.state.loadingPage">
    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <h1>ประกาศเกี่ยวกับ IT และซ่อมบำรุง</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row v-if="$store.getters.policyCode === '03' || $store.getters.policyCode === '02'">
      <v-col cols="10">
        <!-- <span>55</span> -->
      </v-col>
      <v-col cols="2">
        <v-spacer></v-spacer>
        <v-btn @click="openPopNews = true" color="purple" dark>เพิ่มประกาศ</v-btn>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-col size="12">
        <v-card
          elevation="9"
          outlined
          width="1000"
          v-for="item in dataShow"
          :key="item.ID"
          class="mt-10"
          v-bind:class="{ 'myImg' : item.postStatus == '1' }"
          :loading="item.postStatus == '0'"
        >
        <v-card-actions class="justify-end backgroundGrey mb-n5">
                  <!-- <v-row class="pt-5 pr-5 justify-end" v-if="$store.getters.policyCode !== '01'"> -->
          
           <v-icon @click="deletePost(item.ID)" v-if="$store.getters.policyCode === '03'">close</v-icon>
         <!-- </v-row> -->
          </v-card-actions>


          <v-card-title primary-title class="backgroundGrey" >
              <h2>{{ item.postHeader }}</h2>
          </v-card-title>
        
            <v-card-text class="pt-5"> 
              <h3 class="ml-10">{{ item.postDes }}</h3>
            </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <span>ผู้เขียนประกาศ : {{ item.EmpFullName }} ({{ item.postDate | moment("DD/MM/YYYY") }})</span>
            <v-btn
            class="ml-5"
              color="pink"
              dark
              @click="disablePost(item)"
              v-if="$store.getters.policyCode === '03'"
              :disabled="item.postStatus == '1'"
              >ปิดการประกาศ</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

    <!-- Pop Create -->
    <v-dialog v-model="openPopNews" max-width="500">
      <v-card class="pa-5">
        <v-form @submit.prevent="submit">
          <!-- Header-->
          <v-row>
            <v-col>
              <v-text-field
                v-model="newsData.postHeader"
                label="หัวข้อ"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="newsData.postDes"
                label="รายละเอียด"
                required
                outlined
                height="100"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="error.length" class="ml-5 mr-5 mt-5">
              <p >
              <b class="red--text">Please correct the following error</b>
              <ul>
                <li v-for="error in error" :key="error.index" class="red--text">{{ error }}</li>
              </ul>
            </p>
            </v-row>

          <v-row class="pt-10">
            <v-spacer></v-spacer>
            <v-btn class="mr-4" @click="openPopNews = false">Cancel</v-btn>
            <v-btn color="success" type="submit">Confirm</v-btn>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import apiPostNews from "../services/apiPostnews";
export default {
  name: "home",
  async mounted() {
    this.$store.state.loadingPage = true;
    await this.loadData();
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 200);
    // console.log(this.$store.getters.username)
  },
  data() {
    return {
      error: [],
      newsData: {
        postHeader: "",
        postDes: "",
        postOwner: this.$store.getters.username,
        postStatus: "0",
        postDate: new Date(),
      },
      openPopNews: false,
      dataShow: [],
    };
  },
  methods: {
    async submit() {
      const checkdata = this.checkFormDataCreate();
      if (checkdata) {
        this.newsData.postOwner = this.$store.getters.username;
        // console.log(this.newsData);
        const result = await apiPostNews.createPost(this.newsData);
        if (result == "ok") {
          await this.loadData();
          this.newsData = {
            postHeader: "",
            postDes: "",
            postOwner: this.$store.getters.username,
            postStatus: "0",
            postDate: new Date(),
          };
        }
        this.openPopNews = false;
      }
    },
    async loadData() {
      const result = await apiPostNews.getPostNews();
      this.dataShow = result;
      // console.log(result)
    },
    async deletePost(ID) {
      console.log(ID);
      const result = await apiPostNews.deletePost(ID);
      if (result == "ok") {
        alert("...........ลบประกาศแล้ว............");
        await this.loadData();
      }
    },
    checkFormDataCreate() {
      this.error = [];
      if (this.newsData.postHeader !== "" && this.newsData.postDes !== "") {
        return true;
      }
      if (this.newsData.postHeader == "") {
        this.error.push("โปรดใส่ข้อมูลห้อข้อ");
      }
      if (this.newsData.postDes == "") {
        this.error.push("โปรดใส่ข้อมูลรายละเอียด");
      }
    },
    async disablePost(item) {
      console.log(item.ID);
      const result = await apiPostNews.disablePost(item.ID);
      console.log(result);
      if (result == "ok") {
        alert("......ทำการปิดประกาศแล้ว.....");
        await this.loadData();
      }
    },
  },
};
</script>
<style>
.myImg {
  filter: brightness(50%);
}
.backgroundGrey {
  background-color: rgb(230, 230, 230);
}
</style>
