<template>
  <v-container grid-list-xs>
    <v-card justify="center" align="center">

        <h1 class="pa-3">
            รายการ Bag ที่เกินวันกำหนดแผนก
        </h1>

      <v-data-table :search="search" :headers="headers" :items="Product" class="dataTable elevation-3" :items-per-page="15">
        <template v-slot:top>
            <!-- หัวตาราง -->
          <v-toolbar flat color="white">
            <v-toolbar-title class="fontSize14">รายการ Bag</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            
          </v-toolbar>
        </template>

        <!-- ตาราง -->
        <template v-slot:item="{ item }">
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->

          <tr @click="showPopup()" height="80">
            <!-- OrderNumber -->
            <td align="left" justify="center">
              <span class="fontSize16"> {{ item.OrderNumber }}</span>
            </td>

            <!-- ProductCode -->
            <td align="center" justify="center">
              <span class="fontSize16"> {{ item.ProductID }}</span>
            </td>

            <!-- รูป -->
            <td align="center" justify="center">
              <v-img :src="item.NewPict" width="100" />
            </td>

            <!-- เลขกระเป๋า -->
            <td>
              <span class="fontSize16">
                {{ item.BagNo }} ({{ item.BagItem }})</span
              >
            </td>

            <!-- จำนวน Item ในกระเป๋า -->
            <td align="center" justify="center">
              <span class="fontSize16"> {{ item.Qty }}</span>
            </td>

            <!-- วันที่เลทแผนก -->
            <td  align="center" justify="center">
              <v-chip
                dark
                v-bind:class="{
                  green: item.dateLate > 5,
                  orange: item.dateLate <= 5 && item.dateLate >= 0,
                  pink: item.dateLate < 0,
                }"
              >
                <span class="fontSize16">
                  {{ item.dateLate }}
                </span>
              </v-chip>
            </td>

            <td align="center" justify="center">
              <v-btn
                dark
                small
                width="110"
                v-bind:class="{
                  'color: light-green darken-1': item.Process === 'เทียน',
                  'color: red': item.Process === 'หล่อ',
                  'color: yellow darken-1': item.Process === 'แต่ง',
                  'color: purple': item.Process === 'PMG',
                  'color: orange': item.Process === 'ฝัง',
                  'color: grey': item.Process === 'ขัด',
                  'color: pink': item.Process === 'ชุบ',
                  'color: blue': item.Process === 'ติดกาว',
                }"
              >
                <span class="fontSize12">{{ item.Process }} </span>
              </v-btn>
            </td>

            <td align="center" justify="center">
              <v-btn
                dark
                small
                width="110"
                v-bind:class="{
                  'color: light-green darken-1': item.Process === 'เทียน',
                  'color: red': item.Process === 'หล่อ',
                  'color: yellow darken-1': item.Process === 'แต่ง',
                  'color: purple': item.Process === 'PMG',
                  'color: orange': item.Process === 'ฝัง',
                  'color: grey': item.Process === 'ขัด',
                  'color: pink': item.Process === 'ชุบ',
                  'color: blue': item.Process === 'ติดกาว',
                }"
              >
              <v-icon v-if="item.Status ==='รอจ่ายช่าง'">mdi-account-question</v-icon>
              <v-icon v-if="item.Status ==='งานอยู่ที่ช่าง'">mdi-hammer</v-icon>
              <v-icon v-if="item.Status ==='รอโอนข้ามแผนก'">mdi-share</v-icon>
                <span class="fontSize10 ml-1">{{ item.Status }}</span>
              </v-btn>
            </td>
            <td align="center" justify="center">
              <span class="fontSize16">{{ item.person }}</span>
            </td>
          </tr>

          <v-dialog v-model="popUpShow" class="fontPrompt" max-width="1030">
            <v-card >
                <v-row>
                    <v-col justify="center" align="center">
                        <v-img src="http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg" width="300" />
                        <h2>AR1234Z/R</h2>
                    </v-col>
                </v-row>
              <v-row>
                <v-col>
                  <v-stepper v-model="timeLine" class="mt-10">
                    <v-stepper-header>
                      <v-stepper-step
                        :complete="timeLine >= 1"
                        step="เทียน"
                        color="orange"
                        complete-icon="done"
                      >
                        เทียน
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step
                        :complete="timeLine >= 2"
                        step="หล่อ"
                        color="red"
                        complete-icon="done"
                      >
                        หล่อ
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step
                        :complete="timeLine >= 3"
                        step="แต่ง"
                        color="yellow darken-1"
                        complete-icon="done"
                      >
                        แต่ง
                      </v-stepper-step>

                      <v-divider></v-divider>

                      <v-stepper-step
                        :complete="timeLine >= 4"
                        step="ฝัง"
                        color="orange"
                        complete-icon="done"
                      >
                        ฝัง
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step
                        :complete="timeLine >= 5"
                        step="ขัด"
                        color="grey"
                        complete-icon="done"
                      >
                        ขัด
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step
                        :complete="timeLine >= 6"
                        step="ชุบ"
                        color="pink"
                        complete-icon="done"
                      >
                        ชุบ
                      </v-stepper-step>
                      <v-divider></v-divider>
                      <v-stepper-step
                        :complete="timeLine >= 7"
                        step="ลงสี"
                        color="brown"
                        complete-icon="done"
                      >
                        ลงยาสี
                      </v-stepper-step>
                    </v-stepper-header>
                  </v-stepper>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
      <v-row class="mt-5 mr-3 pb-5">
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="$router.back()">กลับ</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "product-late",
  data() {
    return {
      Product: [
        {
          OrderNumber : "CH-ABC12345",
          ProductID: "AR1234Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg",
          BagNo: "BAG210500001",
          BagItem: "1/3",
          ProductDescription:
            "POST EARRING WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -5,
          Status: "รอจ่ายช่าง",
          Process: "เทียน",
          person: "กันต์กมล แก้วประเสริฐ",
        },
        {
          OrderNumber : "CH-TEST-123",
          ProductID: "AR1234Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg",
          BagNo: "BAG210500002",
          BagItem: "2/3",
          ProductDescription:
            "POST EARRING WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -1,
          Status: "งานอยู่ที่ช่าง",
          Process: "หล่อ",
          person: "วรเชษฐ์ อนุจร",
        },
        {
          OrderNumber : "CH-AE30-TEST",
          ProductID: "AR1234Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg",
          BagNo: "BAG210500003",
          BagItem: "3/3",
          ProductDescription:
            "POST EARRING WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -3,
          Status: "รอโอนข้ามแผนก",
          Process: "PMG",
          person: "สมลักษณ์ เสียงเพราะ",
        },
        {
          OrderNumber : "CH-AE30-TEST",
          ProductID: "AP15555Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/PENDANT/AP12311.jpg",
          BagNo: "BAG210500004",
          BagItem: "1/1",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -1,
          Status: "รอโอนข้ามแผนก",
          Process: "ฝัง",
          person: "อรรถพล หอมนาน",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500005",
          BagItem: "1/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 50,
          dateLate: -3,
          Status: "งานอยู่ที่ช่าง",
          Process: "แต่ง",
          person: "มินตรา พิศโฉม",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500006",
          BagItem: "2/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -3,
          Status: "รอจ่ายช่าง",
          Process: "ชุบ",
          person: "สุวิทย์ สิงห์แสน",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500006",
          BagItem: "2/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -3,
          Status: "รอจ่ายช่าง",
          Process: "ขัด",
          person: "ประทีป พูลชนะ",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500006",
          BagItem: "2/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -7,
          Status: "รอโอนข้ามแผนก",
          Process: "หล่อ",
          person: "ประชา ปัตถาพงษ์",
        },
        {
          OrderNumber : "CH-MEJ001/1993",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500100",
          BagItem: "1/1",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -10,
          Status: "รอจ่ายช่าง",
          Process: "ติดกาว",
          person: "ปิยนันท์ ตรีรัตนจุฑาวัฒน์",
        },
                {
          OrderNumber : "CH-ABC12345",
          ProductID: "AR1234Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg",
          BagNo: "BAG210500001",
          BagItem: "1/3",
          ProductDescription:
            "POST EARRING WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -5,
          Status: "รอจ่ายช่าง",
          Process: "เทียน",
          person: "กันต์กมล แก้วประเสริฐ",
        },
        {
          OrderNumber : "CH-TEST-123",
          ProductID: "AR1234Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg",
          BagNo: "BAG210500002",
          BagItem: "2/3",
          ProductDescription:
            "POST EARRING WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -1,
          Status: "งานอยู่ที่ช่าง",
          Process: "หล่อ",
          person: "วรเชษฐ์ อนุจร",
        },
        {
          OrderNumber : "CH-AE30-TEST",
          ProductID: "AR1234Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/CUSTOMER/AP/AR7444Z_R.jpg",
          BagNo: "BAG210500003",
          BagItem: "3/3",
          ProductDescription:
            "POST EARRING WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -3,
          Status: "รอโอนข้ามแผนก",
          Process: "PMG",
          person: "สมลักษณ์ เสียงเพราะ",
        },
        {
          OrderNumber : "CH-AE30-TEST",
          ProductID: "AP15555Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/PENDANT/AP12311.jpg",
          BagNo: "BAG210500004",
          BagItem: "1/1",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -1,
          Status: "รอโอนข้ามแผนก",
          Process: "ฝัง",
          person: "อรรถพล หอมนาน",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500005",
          BagItem: "1/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 50,
          dateLate: -3,
          Status: "งานอยู่ที่ช่าง",
          Process: "แต่ง",
          person: "มินตรา พิศโฉม",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500006",
          BagItem: "2/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -3,
          Status: "รอจ่ายช่าง",
          Process: "ชุบ",
          person: "สุวิทย์ สิงห์แสน",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500006",
          BagItem: "2/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -3,
          Status: "รอจ่ายช่าง",
          Process: "ขัด",
          person: "ประทีป พูลชนะ",
        },
        {
          OrderNumber : "CH-AE30-TEST555",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500006",
          BagItem: "2/2",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 20,
          dateLate: -7,
          Status: "รอโอนข้ามแผนก",
          Process: "หล่อ",
          person: "ประชา ปัตถาพงษ์",
        },
        {
          OrderNumber : "CH-MEJ001/1993",
          ProductID: "AE56789Z/R",
          NewPict:
            "http://172.16.0.15/aeweb/picture/PICTURE2/EARRINGS/AE1635.jpg",
          BagNo: "BAG210500100",
          BagItem: "1/1",
          ProductDescription:
            "POST  WITH WHITE FRESH WATER PEARL WITH  POLISH FINISHING(RHODIUM)",
          Qty: 100,
          dateLate: -10,
          Status: "รอจ่ายช่าง",
          Process: "ติดกาว",
          person: "ปิยนันท์ ตรีรัตนจุฑาวัฒน์",
        },
      ],
      search: "",
      headers: [
        { text: "ชื่อOrder", value: "OrderNumber", align: "center", justify: "center" },
        { text: "ProductCode", value: "ProductID", align: "center", justify: "center" },
        { text: "รูป", value: "SalesManager", align: "center", justify: "center" },
        { text: "Bag No", value: "BagNo" },
        { text: "จำนวน Bag", value: "Qty", align: "center", justify: "center", },
        { text: "เหลือวันครบกำหนดแผนก", value: "dateLate", align: "center", justify: "center",},
        { text: "ขั้นตอน", value: "Process", align: "center", justify: "center",},
        { text: "สถานะ", value: "Status",  align: "center", justify: "center", },
        { text: "ผู้รับงานล่าสุด", value: "person" , align: "center", justify: "center",},
      ],
      checkbox: {
        check1: true,
        check2: true,
        check3: true,
        check4: true,
      },
      timeLine: 3,
      popUpShow: false,
    };
  },
  methods: {
    showPopup() {
      this.popUpShow = true;
    },
    filtersBillStatus() {
      let dataFilter = []
      this.Product = this.$store.getters.mouldBill;
      if (
        this.checkBoxStatus.status01 &&
        this.checkBoxStatus.status02 &&
        this.checkBoxStatus.status03 &&
        this.checkBoxStatus.status04 &&
        this.checkBoxStatus.status05
      ) {
        this.mouldBill = this.$store.getters.mouldBill;
      } else {
        this.mouldBill = this.$store.getters.mouldBill;
        this.DataFilter = [];
        if (this.checkBoxStatus.status01) {
          this.DataFilter.push("01");
        }
        if (this.checkBoxStatus.status02) {
          this.DataFilter.push("02");
        }
        if (this.checkBoxStatus.status03) {
          this.DataFilter.push("03");
        }
        if (this.checkBoxStatus.status04) {
          this.DataFilter.push("04");
        }
        if (this.checkBoxStatus.status05) {
          this.DataFilter.push("05");
        }
        // console.log(this.DataFilter)
        this.mouldBill = this.mouldBill.filter((i) => {
          return (
            i.Status == this.DataFilter[0] ||
            i.Status == this.DataFilter[1] ||
            i.Status == this.DataFilter[2] ||
            i.Status == this.DataFilter[3] ||
            i.Status == this.DataFilter[4]
          );
        });
      }
    }
  },
};
</script>

<style>

.dataTable {
   font-size: 15px !important;
}
table.v-table thead th {
  font-size: 16px;
}
</style>