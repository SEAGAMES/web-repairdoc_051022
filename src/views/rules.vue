<template>
  <v-container grid-list-xs>
    <v-row v-if="showPage">
      <v-col cols="12">
        <v-row class="mt-16 mb-16">
          <v-col cols="6">
            <v-btn
              class="mx-2"
              height="100"
              width="100"
              fab
              dark
              large
              color="primary"
              v-if="isShow.show1"
            />
          </v-col>
          <v-col cols="6" class="" align="end">
            <v-btn
              class="mx-2"
              height="100"
              width="100"
              fab
              dark
              large
              color="blue"
              v-if="isShow.show2"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div></div>
          </v-col>
        </v-row>
        <v-row class="mt-16 mb-16">
          <v-col cols="6">
            <v-btn
              class="mt-16"
              height="100"
              width="100"
              fab
              dark
              large
              color="yellow"
              v-if="isShow.show3"
            />
          </v-col>
          <v-col cols="6" class="" align="end">
            <v-btn
              class="mt-16"
              height="100"
              width="100"
              fab
              dark
              large
              color="amber"
              v-if="isShow.show4"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div></div>
          </v-col>
        </v-row>
        <v-row class="mt-16 mb-16">
          <v-col cols="6">
            <v-btn
              class="mt-16"
              height="100"
              width="100"
              fab
              dark
              large
              color="red"
              v-if="isShow.show5"
            />
          </v-col>
          <v-col cols="6" class="" align="end">
            <v-btn
              class="mt-16"
              height="100"
              width="100"
              fab
              dark
              large
              color="pink"
              v-if="isShow.show6"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showModel"
      max-height="300"
      max-width="300"
      class="fontSarabun"
    >
      <v-card class="pa-5">
        <v-row>
          <v-col class="ma-1">
            <v-text-field
              label="ใส่จำนวนวินาที"
              v-model="dataInput"
              type="number"
              append-icon="mdi-circle-slice-6"
              single-line
              hide-details
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="mt-n5 mr-2 mb-2" align="end">
            <v-btn color="blue" small dark @click="submit()">ยืนยัน</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "rules",
  data() {
    return {
      datarules: 0,
      isShow: {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
      },
      showModel: false,
      dataInput: null,
      showPage: false,
    };
  },
  mounted() {
    // this.roulette();
    this.showModel = true;
  },
  methods: {
    roulette(MS) {
    console.log('วินาที', MS);
    console.log('ตัดเข้ากระพริบ', (MS / 2));
    console.log('กระพริบ', (MS * 30) / 100);
      setInterval(() => {
        const math = Math.round(Math.random() * 5) + 1;
        this.loop1(math, MS);
        console.log(math);
      }, MS);
      this.showModel = false;
      this.showPage = true;
    },
    loop1(data, MS) {
      if (data === 1) {
        this.isShow.show1 = true;
        setTimeout(() => {
          const flashing1 = setInterval(() => {
            this.isShow.show1 = !this.isShow.show1;
          }, 500);
          setTimeout(() => {
            clearInterval(flashing1);
            this.isShow.show1 = false;
          }, (MS * 30) / 100);
        }, MS / 2);
      } else if (data === 2) {
        this.isShow.show2 = true;
        setTimeout(() => {
          const flashing2 = setInterval(() => {
            this.isShow.show2 = !this.isShow.show2;
          }, 500);
          setTimeout(() => {
            clearInterval(flashing2);
            this.isShow.show2 = false;
          }, (MS * 30) / 100);
        }, MS / 2);
      } else if (data === 3) {
        this.isShow.show3 = true;
        setTimeout(() => {
          const flashing3 = setInterval(() => {
            this.isShow.show3 = !this.isShow.show3;
          }, 500);
          setTimeout(() => {
            clearInterval(flashing3);
            this.isShow.show3 = false;
          }, (MS * 30) / 100);
        }, MS / 2);
      } else if (data === 4) {
        this.isShow.show4 = true;
        setTimeout(() => {
          const flashing4 = setInterval(() => {
            this.isShow.show4 = !this.isShow.show4;
          }, 500);
          setTimeout(() => {
            clearInterval(flashing4);
            this.isShow.show4 = false;
          }, (MS * 30) / 100);
        }, MS / 2);
      } else if (data === 5) {
        this.isShow.show5 = true;
        setTimeout(() => {
          const flashing5 = setInterval(() => {
            this.isShow.show5 = !this.isShow.show5;
          }, 500);
          setTimeout(() => {
            clearInterval(flashing5);
            this.isShow.show5 = false;
          }, (MS * 30) / 100);
        }, MS / 2);
      } else if (data === 6) {
        this.isShow.show6 = true;
        setTimeout(() => {
          const flashing6 = setInterval(() => {
            this.isShow.show6 = !this.isShow.show6;
          }, 500);
          setTimeout(() => {
            clearInterval(flashing6);
            this.isShow.show6 = false;
          }, (MS * 30) / 100);
        }, MS / 2);
      }
    },
    submit() {
      const data = Number(this.dataInput) * 1000;
      this.roulette(data);
    },
  },
};
</script>

<style>
.bgTester {
  background-color: rgb(255, 239, 15);
}
</style>