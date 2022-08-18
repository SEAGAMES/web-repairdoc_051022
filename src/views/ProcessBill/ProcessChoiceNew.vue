<template>
  <v-container>
    <!-- DATA -->
    <v-row class="ma-3">
      <v-col
        align="center"
        lg="3"
        md="6"
        sm="24"
        v-for="(item, index) in dataMenu"
        :key="index"
      >
        <v-card
          :disabled="
            $store.state.processBill.processBillCreate.step1.selectedProcess ===
            item.PDProceessCode
          "
          class="pt-2 pb-2"
          :color="
            valuesSelected === item.PDProceessCode
              ? 'yellow'
              : $store.state.processBill.processBillCreate.step1
                  .selectedProcess === item.PDProceessCode
              ? 'grey lighten-3'
              : ''
          "
          @click="selected(item.PDProceessCode, item.name)"
        >
          <v-row>
            <v-col cols="12" class="mt-5">
              <v-img height="150" width="150" :src="item.icon" />
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn color="orange darken-4" text>
              <span style="font-size: 20px">{{ item.name }}</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dataMenu: [
        {
          name: "CAD",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/cad.png",
          PDProceessCode: "01",
        },
        {
          name: "หล่อ WAX",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/cast_wax.png",
          PDProceessCode: "02",
        },
        {
          name: "พิมพ์",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/mould.png",
          PDProceessCode: "03",
        },
        {
          name: "เทียน",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/candle.png",
          PDProceessCode: "04",
        },
        {
          name: "หล่อ",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/cast.png",
          PDProceessCode: "05",
        },
        {
          name: "PMG",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/pmg.png",
          PDProceessCode: "06",
        },
        {
          name: "Sup. นอก",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/sub.png",
          PDProceessCode: "07",
        },
        {
          name: "เเต่ง",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/design.png",
          PDProceessCode: "08",
        },

        {
          name: "ฝัง",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/embed.png",
          PDProceessCode: "09",
        },
        {
          name: "ขัด",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/wipe.png",
          PDProceessCode: "10",
        },
        {
          name: "ชุบ/QC สำเร็จ",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/plated.png",
          PDProceessCode: "11",
        },
        {
          name: "ติดกาว",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/glue.png",
          PDProceessCode: "12",
        },
        {
          name: "ลงยาสี",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/paint.png",
          PDProceessCode: "13",
        },
        {
          name: "มัดมุก",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/pearl.png",
          PDProceessCode: "14",
        },
        {
          name: "เเพ็ค",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/pack.png",
          PDProceessCode: "15",
        },
        {
          name: "QA ขาย",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/qa_sale.png",
          PDProceessCode: "16",
        },
      ],
      valuesSelected: "",
    };
  },
  mounted() {
    this.valuesSelected =
      this.$store.state.processBill.processBillCreate.step3.selectedProcess;
  },
  methods: {
    selected(PDProceessCode, name) {
      if (
        this.$store.state.processBill.processBillCreate.step1
          .selectedProcess !== PDProceessCode
      ) {
        this.valuesSelected = PDProceessCode;
        this.$store.state.processBill.processBillCreate.step3.selectedProcess =
          PDProceessCode;
        this.$store.state.processBill.processBillCreate.step3.selectedProcessName =
          name;
      }
    },
  },
};
</script>

<style scoped>
.bgTester {
  background-color: #ff0019;
}
.borderSelected {
  /* border-left: 5px solid red !important; */
  border-block: 5px solid rgb(94, 255, 0);
  border-inline: 5px solid rgb(94, 255, 0);
}
</style>
