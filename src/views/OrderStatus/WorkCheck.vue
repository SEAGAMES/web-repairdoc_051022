<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-text-field label="ค้นหาจาก Order" outlined dense></v-text-field>
      </v-col>
    </v-row>

    <!-- Tab Slider -->
    <v-tabs v-model="tab">
      <v-tabs-slider color="white"></v-tabs-slider>

      <v-tab v-for="item in tabTitle" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-row>
      <v-col cols="4">
        <v-select :items="tabTitle" label="By Time" dense outlined></v-select>
      </v-col>
      <v-col cols="4">
        <v-select
          :items="tabTitle"
          label="By Factory"
          dense
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-card>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in tabTitle" :key="item">
          <v-card flat>
            <v-tabs v-model="tab2">
              <v-tabs-slider color="white"></v-tabs-slider>

              <v-tab v-for="item in statusShow" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>

            <!-- Table ที่ 1 -->
            <v-simple-table v-if="item == 'First'">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th rowspan="2" colspan="2" class="text-center">
                      TIMELINE
                    </th>
                    <th colspan="8" class="text-center">
                      ยอด & สถานะ พลอย, สร้อย, อะไหล่
                    </th>
                  </tr>

                  <tr>
                    <th>ชนิด</th>
                    <th>วันจบสุดท้าย</th>
                    <th>จบเต็ม</th>
                    <th>FAC.</th>
                    <th>คัดพลอย</th>
                    <th>SUPP.</th>
                    <th>ติดขัด</th>
                    <th>สถานะ</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in dataDetail" :key="item.name">
                    <td>{{ item.type }}</td>
                    <td>{{ item.date }}</td>
                    <td>
                      <v-btn
                        small
                        height="20"
                        width="70"
                        color="gray"
                        dark
                        @click="showDetail(index)"
                      >
                        <span class="fontSize10">
                          {{ item.name }}
                        </span>
                      </v-btn>
                    </td>
                    <td>{{ item.finalDay }}</td>
                    <td>{{ item.finalAll }}</td>
                    <td>{{ item.fac }}</td>
                    <td>{{ item.stone }}</td>
                    <td>{{ item.supp }}</td>
                    <td>{{ item.problem }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <!-- Table ที่ 2 -->
            <v-simple-table class="my-border" v-if="item == 'Second'">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th colspan="2" rowspan="3" class="my-border">
                      ORDER NO. & QTY
                    </th>
                    <th rowspan="3"></th>
                    <th colspan="17" class="text-center">ขั้นตอนการผลิต</th>
                  </tr>

                  <tr>
                    <th colspan="3" class="text-center">พิมพ์</th>
                    <th
                      class="text-center my-border"
                      v-for="item in headerSection"
                      :key="item.name"
                    >
                      {{ item }}
                    </th>
                  </tr>

                  <tr>
                    <th class="my-border">CAD</th>
                    <th class="my-border">หล่อ WAX</th>
                    <th class="my-border">เเต่งผิว</th>
                  </tr>

                  <tr>
                    <td rowspan="5">1</td>
                    <td rowspan="5" class="text-center">
                      <div>MEJ-CHO0711/2022LOT1</div>
                      <div class="mt-10">2000</div>
                    </td>
                  </tr>

                  <tr v-for="item in desserts2" :key="item.name">
                    <td>
                      {{ item.from }}
                    </td>
                    <td>
                      <span class="fontSize10" v-if="item.check1">
                        <v-icon color="grey" small> mdi-check </v-icon>
                      </span>

                      <span v-if="item.date1">
                        {{ item.date1 }}
                      </span>

                      <span v-if="item.balance">
                        {{ item.balance }}
                      </span>
                    </td>

                    <td>
                      <span class="fontSize10" v-if="item.check1">
                        <v-icon color="grey" small> mdi-check </v-icon>
                      </span>

                      <span v-if="item.date1">
                        {{ item.date1 }}
                      </span>

                      <span v-if="item.balance">
                        {{ item.balance }}
                      </span>
                    </td>
                    <td>
                      <span class="fontSize10" v-if="item.check1">
                        <v-icon color="grey" small> mdi-check </v-icon>
                      </span>
                    </td>
                    <td>
                      {{ item.name }}
                    </td>
                    <td>
                      {{ item.calories }}
                    </td>
                    <td>
                      {{ item.fat }}
                    </td>
                    <td>
                      {{ item.carbs }}
                    </td>
                    <td>
                      {{ item.protein }}
                    </td>
                    <td>
                      {{ item.iron }}
                    </td>
                    <td>
                      {{ item.a }}
                    </td>
                    <td>
                      {{ item.b }}
                    </td>
                    <td>
                      {{ item.c }}
                    </td>
                    <td>
                      {{ item.d }}
                    </td>
                    <td>
                      {{ item.e }}
                    </td>
                    <td>
                      {{ item.f }}
                    </td>
                    <td>
                      {{ item.g }}
                    </td>
                    <td>
                      {{ item.h }}
                    </td>
                    <td>
                      {{ item.i }}
                    </td>
                    <td>
                      {{ item.j }}
                    </td>
                    <td></td>
                  </tr>
                </thead>

                <tbody>
                  <!-- <tr v-for="item in dataDetail" :key="item.name">
              <td>{{ item.type }}</td>
              <td>{{ item.date }}</td>
              <td>
                <v-btn
                  small
                  height="20"
                  width="70"
                  color="gray"
                  dark
                  @click="showDetail(index)"
                >
                  <span class="fontSize10">
                    {{ item.name }}
                  </span>
                </v-btn>
              </td>
              <td>{{ item.finalDay }}</td>
              <td>{{ item.finalAll }}</td>
              <td>{{ item.fac }}</td>
              <td>{{ item.stone }}</td>
              <td>{{ item.supp }}</td>
              <td>{{ item.problem }}</td>
              <td>{{ item.status }}</td>
            </tr> -->
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <!-- PopUp เเสดงรายละเอียดการฝังพลอย -->
    <v-dialog v-model="popUpShowDetail" max-width="900" class="fontSarabun">
      <v-card>
        <InvForOrderNew :inputProp="dataDialogInv" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import InvForOrderNew from "../OrderStatus/InvForOrderNew.vue";

export default {
  components: {
    InvForOrderNew,
  },
  data() {
    return {
      dataDialogInv: {
        orderNo: "",
        rowRecode: 0,
      },
      tab: null,
      tab2: null,
      tabTitle: ["First", "Second"],
      statusShow: [
        "จ.",
        "30",
        "พ.ค.",
        "2022",
        "10:30",
        "FAC.4",
        "Mgr.K กรณ์",
        "CH-PJ-EX005/2021",
      ],
      search: "",
      headers: [
        {
          text: "TIMELINE",
          filterable: false,
          value: "name",
          align: "center",
        },
        { text: "ชนิด", value: "calories", align: "center" },
        { text: "วันจบสุดท้าย", value: "fat", align: "center" },
        { text: "จบเต็ม", value: "carbs", align: "center" },
        { text: "FAC.", value: "protein", align: "center" },
        { text: "ค้ดพลอย", value: "iron", align: "center" },
        { text: "SUPP.", value: "iron", align: "center" },
        { text: "ติดขัด", value: "iron", align: "center" },
        { text: "สถานะ", value: "iron", align: "center" },
      ],
      headers2: [
        {
          text: "",
          align: "start",
          filterable: false,
          value: "name",
          width: 15,
        },
        {
          text: "ORDER NO. & Qty",
          align: "start",
          filterable: false,
          value: "name",
          width: 100,
        },
        { text: "", value: "calories", align: "center", width: 80 },
        { text: "พิมพ์", value: "iron", align: "center" },
        { text: "ฉีดเทียน", value: "fat", align: "center" },
        { text: "ฝังเทียน", value: "carbs", align: "center" },
        { text: "หล่อ", value: "protein", align: "center" },
        { text: "เเต่งประกอบ", value: "iron", align: "center" },
        { text: "ฝังมือ", value: "iron", align: "center" },
        { text: "PMG", value: "iron", align: "center" },

        { text: "ขัด", value: "iron", align: "center" },
        { text: "ซ่อม", value: "iron", align: "center" },
        { text: "ชุบ", value: "iron", align: "center" },
        { text: "ติดกาว", value: "iron", align: "center" },
        { text: "ลงยาสี", value: "iron", align: "center" },
        { text: "ติดมุก มัดมุก", value: "iron", align: "center" },
        { text: "QC Final ", value: "iron", align: "center" },
        { text: "QA ซ่อม", value: "iron", align: "center" },
        { text: "Complete", value: "iron", align: "center" },
        { text: "ติดขัด", value: "iron", align: "center" },
      ],
      headerSection: [
        "ฉีดเทียน",
        "ฝังเทียน",
        "หล่อ",
        "เเต่งประกอบ",
        "ฝังมือ",
        "PMG",
        "ขัด",
        "ซ่อม",
        "ชุบ",
        "ติดกาว",
        "ลงยาสี",
        "ติดมุกมัดมุก",
        "QC FINAL",
        "QA ซ่อม",
        "Complete",
        "งานติดปัญหา",
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      desserts2: [
        {
          check1: true,
          check2: true,
          check3: true,
          from: "วันผลิต",
          orderNo: "MEJ-CHO711/2022LOT1",
          qty: 2000,
          name: 3,
          calories: 2,
          fat: 1,
          carbs: 3,
          protein: "-",
          iron: 0.5,
          a: 3,
          b: 7,
          c: 2,
          d: "-",
          e: "-",
          f: "-",
          g: 1,
          h: 1,
          i: "23.5",
          j: "-",
        },
        {
          date1: "อ. 10/06/65",
          from: "กำหนดจบ",
          orderNo: "",
          qty: 2000,
          name: "อ. 10/06/65",
          calories: "อ. 10/06/65",
          fat: "อ. 10/06/65",
          carbs: "อ. 10/06/65",
          protein: "",
          iron: "อ. 10/06/65",
          a: "อ. 10/06/65",
          b: "อ. 10/06/65",
          c: "อ. 10/06/65",
          d: "",
          e: "",
          f: "",
          g: "อ. 10/06/65",
          h: "อ. 10/06/65",
          i: "อ. 10/06/65",
          j: "",
        },
        {
          balance: 100,
          from: "ยอดเคลื่อน",
          orderNo: "",
          qty: 2000,
          name: 100,
          calories: "",
          fat: 500,
          carbs: 1500,
          protein: "",
          iron: "",
          a: 400,
          b: 7,
          c: 2,
          d: "",
          e: "",
          f: "",
          g: "",
          h: "",
          i: "",
          j: "",
        },
        {
          from: "เลทเเผนก",
          orderNo: "",
          qty: 2000,
          name: -1,
          calories: "",
          fat: 3,
          carbs: "",
          protein: "",
          iron: "",
          a: "",
          b: "",
          c: "",
          d: "",
          e: "",
          f: "",
          g: "",
          h: "",
          i: "",
          j: "",
        },
      ],
      dataStatus: [
        {
          statusCode: "S001",
          statusName: "พ.",
        },
        {
          statusCode: "S002",
          statusName: "สั่งซื้อแล้ว",
        },
        {
          statusCode: "S003",
          statusName: "ปกติ",
        },
        {
          statusCode: "S004",
          statusName: "ล่าช้า",
        },
        {
          statusCode: "S005",
          statusName: "ครบแล้ว",
        },
      ],
      dataDetail: [
        {
          type: "DI",
          date: "อ. 10/06/22",
          name: "พ.ฝัง WAX",
          finalDay: "พ. 11/06/22",
          finalAll: 100000,
          fac: 80000,
          stone: 10000,
          supp: 5000,
          problem: 5000,
          status: "ปกติ",
        },
        {
          type: "WD",
          date: "อ. 26/06/22",
          name: "พ.ฝังมือ",
          finalDay: "พ. 11/06/22",
          finalAll: 10000,
          fac: 0,
          stone: 5000,
          supp: 5000,
          problem: 1000,
          status: "เลท",
        },
        {
          type: "DL",
          date: "อ. 10/06/22",
          name: "สร้อย",
          finalDay: "พ. 11/06/22",
          finalAll: 100000,
          fac: 80000,
          stone: 10000,
          supp: 5000,
          problem: 5000,
          status: "ปกติ",
        },
        {
          type: "EX",
          date: "อ. 10/06/22",
          name: "อะไหล่",
          finalDay: "พ. 11/06/22",
          finalAll: 100000,
          fac: 80000,
          stone: 10000,
          supp: 5000,
          problem: 5000,
          status: "เลท",
        },
      ],

      //popUpShowDetail
      popUpShowDetail: false,
    };
  },
  methods: {
    async showDetail(index) {
      this.dataDialogInv.rowRecode = index + 1;
      this.dataDialogInv.orderNo = "CH-VI016/2022-S";

      this.popUpShowDetail = true;
    },
  },
};
</script>

<style>
.myImg {
  filter: brightness(50%);
}

.tableWorkCheck table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgb(218, 217, 217);
}

.fontSizeTable table th {
  font-size: 7px !important;
  text-align: center;
}

.fontSizeTD table th {
  font-size: 10px !important;
  text-align: center;
}

.my-border {
  border-left: 5px solid red;
}
</style>
