<template>
  <v-container>
    <!-- DATA -->
    <v-row class="ma-3">
      <v-col
        align="center"
        lg="3"
        md="6"
        sm="12"
        v-for="(item, index) in dataMenu"
        :key="index"
      >
        <v-card class="pt-2 pb-2">
          <v-row class="mt-1">
            <v-col cols="12" class="mt-5">
              <v-img height="150" width="150" :src="item.icon" />
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn color="green" text @click="gotoOrderStatus(item.route)">
              {{ item.name }}
            </v-btn>
          </v-card-actions>
          <v-btn
            class="ma-2"
            color="blue lighten-4"
            @click="gotoOrderStatus(item.route)"
          >
            เข้า
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col align="end" class="mr-2">
        <v-btn color="red" dark @click="$router.back()">กลับ</v-btn>
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
          name: "จัดคิว",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MenuPage/piority3.png",
          route: "/mpp-status",
        },
        {
          name: "สถานะเเต่ละรายการ ITEM",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MenuPage/chart3.png",
          route: "/orderstatus-detail",
        },
        {
          name: "ยืนยันรับวัตถุดิบ",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MenuPage/receive.png",
          route: "/mpp-receiveBill",
        },
        {
          name: "ดูรายการบิลโอนวัตถุดิบ",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MenuPage/bill.png",
          route: "/mpp-billmaterails",
        },
        {
          name: "ดูรายการพลอย",
          icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MenuPage/stone2.png",
          route: "/stonefororder",
        },
        // {
        //   name: "TEST Insert Img",
        //   icon: "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MenuPage/stone2.png",
        //   route: "/mpp-testinsertimg",
        // },
      ],
    };
  },
  mounted() {
    setTimeout(async () => {
      this.spinner = false;
      if (
        this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber === "" ||
        this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber ===
          undefined ||
        this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber === null
      ) {
        await this.$router.push("/mpp-orderStatus").catch(() => {});
      }
    }, 500);
  },
  methods: {
    async gotoOrderStatus(route) {
      await this.$router.push(route).catch(() => {});
    },
  },
};
</script>

<style>
.bgTester {
  background-color: #ff0019;
}
</style>
