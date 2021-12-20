<template>
  <v-container grid-list-xs>
    <v-card justify="center" align="center" width="3000"> 

        <h1 class="pa-3">
            รายการของ Order : {{ $store.getters.statusDetailHeader.OrderNumber }}
        </h1>

        <!-- HeaderStatus -->
        <v-simple-table class="border" >
            <template v-slot:default>
              <thead>
                <tr align="center" justify="center" class="bgColorHeader" >
                  <th class="text-center" >Sales</th>
                  <th class="text-center" >ชื่อOrder</th>
                  <th class="text-center" >กำหนดส่ง</th>
                  <th class="text-center" >จำนวนทั้งOrder</th>
                  <th class="text-center" >เทียน</th>
                  <th class="text-center" >หล่อ</th>
                  <th class="text-center" >แต่ง</th>
                  <th class="text-center" >Supนอก</th>
                  <th class="text-center" >PMG</th>
                  <th class="text-center" >ฝัง</th>
                  <th class="text-center" >ขัด</th>
                  <th class="text-center" >ชุบ</th>
                  <th class="text-center" >ติดกาว</th>
                  <th class="text-center" >ลงยาสี</th>
                  <th class="text-center" >มัดมุก</th>
                  <th class="text-center" >QCสำเร็จ</th>
                  <th class="text-center" >ส่งQA</th>
                  <th class="text-center" >เหลือวันผลิต</th>
                  <th class="text-center" >สถานะการณ์</th>
                </tr>
              </thead>
              <tbody>
                <!-- {{ $store.getters.statusDetailHeader.SalesManager }} -->
              <tr height="60">
                <td  align="left" justify="center">
                  <span class="fontSize13">{{ $store.getters.statusDetailHeader.SalesManager }}</span>
                </td>
                <td width="200">
                  <span class="fontSize13"> {{ $store.getters.statusDetailHeader.OrderNumber }}</span>
                </td>

                <td align="center" justify="center" width="150">
                  <span class="fontSize13">({{ $store.getters.statusDetailHeader.thaiDate }})_{{ $store.getters.statusDetailHeader.DueDate | moment("DD/MM/YYYY") }}</span>
                </td>

                <td align="center" justify="center" >
                  <span class="fontSize13 ">{{ $store.getters.statusDetailHeader.TotalQty.toLocaleString() }}</span>
                </td>


                <!-- { text: "จำนวน เทียน"} -->
                <td  align="center" justify="center" width="10">
                  <v-chip dark
                      v-bind:class="{
                      red: $store.getters.statusDetailHeader.P4 > 0,
                      white: $store.getters.statusDetailHeader.P4 <= 0,
                    }"
                  >
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P4 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน หล่อ"} -->
              <td  align="center" justify="center" width="10">
                  <v-chip dark
                      v-bind:class="{
                      red: $store.getters.statusDetailHeader.P5 > 0,
                      white: $store.getters.statusDetailHeader.P5 <= 0,
                    }"
                    >
                    <span class="fontSize13 ">{{ $store.getters.statusDetailHeader.P5 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน แต่ง"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip  dark
                      v-bind:class="{
                      orange: $store.getters.statusDetailHeader.P8 > 0,
                      white: $store.getters.statusDetailHeader.P8 <= 0,
                    }">
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P8 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน Supนอก"} -->
                <td  align="center" justify="center" width="10">
                  <v-chip  dark
                      v-bind:class="{
                      orange: $store.getters.statusDetailHeader.P7 > 0,
                      white: $store.getters.statusDetailHeader.P7 <= 0,
                    }"
                  >
                    <span class="fontSize13 text-xs-right"> {{ $store.getters.statusDetailHeader.P7 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน PMG"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip dark
                      v-bind:class="{
                      orange: $store.getters.statusDetailHeader.P6 > 0,
                      white: $store.getters.statusDetailHeader.P6 <= 0,
                    }"
                  >
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P6 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน ฝัง"} -->
                <td  align="center" justify="center" width="10">
                    <v-chip dark
                    v-bind:class="{
                      orange: $store.getters.statusDetailHeader.P9 > 0,
                      white: $store.getters.statusDetailHeader.P9 <= 0,
                    }"
                    >
                      <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P9 }}</span>
                    </v-chip>
                  </td>

                <!-- { text: "จำนวน ขัด"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip dark
                  v-bind:class="{
                      orange: $store.getters.statusDetailHeader.P10 > 0,
                      white: $store.getters.statusDetailHeader.P10 <= 0,
                    }">
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P10 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน ชุบ"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip dark
                  v-bind:class="{
                      green: $store.getters.statusDetailHeader.P11 > 0,
                      white: $store.getters.statusDetailHeader.P11 <= 0,
                    }">
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P11 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน ติดกาว"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip  dark
                      v-bind:class="{
                      green: $store.getters.statusDetailHeader.P12 > 0,
                      white: $store.getters.statusDetailHeader.P12 <= 0,
                    }"
                  >
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P12 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน ลงยาสี"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip dark 
                      v-bind:class="{
                      green: $store.getters.statusDetailHeader.P13 > 0,
                      white: $store.getters.statusDetailHeader.P13 <= 0,
                    }">
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P13 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน มัดมุก"} -->
                <td  align="center" justify="center" width="10" >
                  <v-chip dark
                      v-bind:class="{
                      green: $store.getters.statusDetailHeader.P14 > 0,
                      white: $store.getters.statusDetailHeader.P14 <= 0,
                    }"
                    >
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P14 }}</span>
                  </v-chip>
                </td>

                <!-- { text: "จำนวน QC สำเร็จ"} -->
                <td  align="center" justify="center" width="10">
                  <v-chip dark
                      v-bind:class="{
                      green: $store.getters.statusDetailHeader.P15 > 0,
                      white: $store.getters.statusDetailHeader.P15 <= 0,
                    }"
                  >
                    <span class="fontSize13 text-xs-right">{{ $store.getters.statusDetailHeader.P15 }}</span>
                  </v-chip>
                </td>

                <!-- จำนวน QA  -->
                <td  align="center" justify="center">
                  <v-chip             
                      v-bind:class="{
                      blue: $store.getters.statusDetailHeader.TotalQa > 0,
                      white: $store.getters.statusDetailHeader.TotalQa <= 0,
                      
                    }" dark>
                    <span class="fontSize13">{{ $store.getters.statusDetailHeader.TotalQa.toLocaleString()}} 
                      <!-- ({{item.PerQa.toFixed(0)}}%) -->
                      </span>
                  </v-chip>
                  
                </td>


                <td align="center" justify="center">
                  <v-chip
                    dark
                    v-bind:class="{
                      green: $store.getters.statusDetailHeader.dateLate > 5,
                      orange: $store.getters.statusDetailHeader.dateLate <= 5 && $store.getters.statusDetailHeader.dateLate >= 0,
                      pink: $store.getters.statusDetailHeader.dateLate < 0,
                    }"
                  >
                    <span class="fontSize13">
                      {{ $store.getters.statusDetailHeader.dateLate }}
                    </span>
                  </v-chip>
                </td>
                <td align="center" justify="center">
                  <v-btn
                    dark
                    small
                    width="110"
                    v-bind:class="{
                      'color: blue': $store.getters.statusDetailHeader.Status === 'ปกติ',
                      'color: green': $store.getters.statusDetailHeader.Status === 'ดีมาก',
                      'color: orange': $store.getters.statusDetailHeader.Status === 'เร่งการผลิต',
                      'color: red': $store.getters.statusDetailHeader.Status === 'เลยกำหนดส่ง',
                    }"
                  >
                    <v-icon class="ml-n1" v-if="$store.getters.statusDetailHeader.Status === 'ปกติ'"
                      >mdi-camera-timer</v-icon
                    >
                    <v-icon class="ml-n1" v-if="$store.getters.statusDetailHeader.Status === 'ดีมาก'">
                      thumb_up_off_alt
                    </v-icon>
                    <v-icon class="ml-n1" v-if="$store.getters.statusDetailHeader.Status === 'เร่งการผลิต'"
                      >mdi-alarm</v-icon
                    >
                    <v-icon class="ml-n1" v-if="$store.getters.statusDetailHeader.Status === 'เลยกำหนดส่ง'"
                      >mdi-calendar-remove</v-icon
                    >
                    <span class="fontSize10">{{ $store.getters.statusDetailHeader.Status }}</span>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
        </v-simple-table>


      <v-card width="2500" class="mt-10">
      <v-data-table :search="search" :headers="headers" :items="dataProduct" :items-per-page="15" class="elevation-1 mytable2">
        <template v-slot:top>
        <!-- หัวตาราง -->
          <v-toolbar flat color="white">
            <v-toolbar-title class="fontSize14">Product :</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>
            <v-btn color="purple" dark @click="gotoDetail()">ดูรายการพลอย</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }" >
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->
          <tr height="60">
            <td align="center" justify="center" width="100">
              <v-img :src="item.NewPict" width="100" class="mt-2"/>
              <div class="fontSize13 mt-1">{{ item.ProductCode }}</div>
            </td>
            <td  width="90" align="left" justify="center">
              <span class="fontSize13"> {{ item.JobNumber }}</span>
            </td>

            <td align="left" justify="center" width="90">
              <span class="fontSize13">{{item.JobQty}}</span>
            </td>

            <!-- สถานะงานพลอย -->
            <td align="center" justify="center" width="80">
              <v-btn color="green" small v-if="item.StatusStone === 2" dark><span class="fontSize10" width="20" >ครบแล้ว</span></v-btn>
              <v-btn color="orange" small v-if="item.StatusStone === 1" dark><span class="fontSize10" width="20" >ยังไม่ครบ</span></v-btn>
              <v-btn color="red" small v-if="item.StatusStone === 0" dark><span class="fontSize10" width="20" >ยังไม่ได้รับ</span></v-btn>
            </td>

            <!-- สถานะงานอะไหล่ -->
            <td align="center" justify="center" width="80">
              <v-btn color="green" small v-if="item.StatusPart === 2" dark><span class="fontSize10" width="20" >ครบแล้ว</span></v-btn>
              <v-btn color="orange" small v-if="item.StatusPart === 1" dark><span class="fontSize10" width="20" >ยังไม่ครบ</span></v-btn>
              <v-btn color="red" small v-if="item.StatusPart === 0" dark><span class="fontSize10" width="20">ยังไม่ได้รับ</span></v-btn>
            </td>

            <!-- { text: "จำนวน เทียน"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark
                  v-bind:class="{
                  red: item.P4 > 0,
                  white: item.P4 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P4 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน หล่อ"} -->
           <td  align="left" justify="center" width="10">
              <v-chip dark
                  v-bind:class="{
                  red: item.P5 > 0,
                  white: item.P5 <= 0,
                }"
                >
                <span class="fontSize13 text-xs-right">{{ item.P5 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน แต่ง"} -->
            <td  align="left" justify="center" width="10">
              <v-chip  dark
                  v-bind:class="{
                  orange: item.P8 > 0,
                  white: item.P8 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P8 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน Supนอก"} -->
            <td  align="left" justify="center" width="10">
              <v-chip  dark
                  v-bind:class="{
                  orange: item.P7 > 0,
                  white: item.P7 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right"> {{ item.P7 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน PMG"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark
                  v-bind:class="{
                  orange: item.P6 > 0,
                  white: item.P6 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P6 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ฝัง"} -->
            <td  align="left" justify="center" width="10">
                <v-chip dark
                v-bind:class="{
                  orange: item.P9 > 0,
                  white: item.P9 <= 0,
                }"
                >
                  <span class="fontSize13 text-xs-right">{{ item.P9 }}</span>
                </v-chip>
              </td>

            <!-- { text: "จำนวน ขัด"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark
              v-bind:class="{
                  orange: item.P10 > 0,
                  white: item.P10 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P10 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ชุบ"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark
              v-bind:class="{
                  green: item.P11 > 0,
                  white: item.P11 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P11 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ติดกาว"} -->
            <td  align="left" justify="center" width="10">
              <v-chip  dark
                  v-bind:class="{
                  green: item.P12 > 0,
                  white: item.P12 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P12 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ลงยาสี"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark 
                  v-bind:class="{
                  green: item.P13 > 0,
                  white: item.P13 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P13 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน มัดมุก"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark
                  v-bind:class="{
                  green: item.P14 > 0,
                  white: item.P14 <= 0,
                }"
                >
                <span class="fontSize13 text-xs-right">{{ item.P14 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน QC สำเร็จ"} -->
            <td  align="left" justify="center" width="10">
              <v-chip dark
                  v-bind:class="{
                  green: item.P15 > 0,
                  white: item.P15 <= 0,
                }"
              >
                <span class="fontSize13 text-xs-right">{{ item.P15 }}</span>
              </v-chip>
            </td>

            <!-- จำนวน QA  -->
            <td  align="left" justify="center" width="50" >
              <v-chip             
                  v-bind:class="{
                  blue: item.TotalQA > 0,
                  white: item.TotalQA <= 0,
                }" dark>
                <span class="fontSize13">{{ item.TotalQA.toLocaleString()}} ({{item.perTotalQa.toFixed(0)}}%)</span>
              </v-chip>
            </td>

          </tr>
        </template>
      </v-data-table>
    </v-card>

      <v-row class="mt-5 mr-3 pb-5">
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click="$router.back()">กลับ</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import apiOrder from '../../services/apiOrderStatus'

export default {
  name: "orderstatus-detail",
  data() {
    return {
      dataProduct: [],
      search: "",
      headers: [
        { text: "รูป", value: "ProductID", align: "center", justify: "center" },
        { text: "เลขที่_JOB", value: "JobNumber", align: "left", justify: "center", },
        { text: "จำนวนผลิต", value: "Qty", align: "left", justify: "center", },
        { text: "สถานะงานพลอย", align: "center", justify: "center", },
        { text: "สถานะงานอะไหล่", align: "center", justify: "center", },
        { text: "เทียน", align: "center", justify: "center"},
        { text: "หล่อ", align: "center", justify: "center"},
        { text: "แต่ง", align: "center", justify: "center"},
        { text: "Supนอก", align: "center", justify: "center"},
        { text: "PMG", align: "center", justify: "center"},
        { text: "ฝัง", align: "center", justify: "center"},
        { text: "ขัด", align: "center", justify: "center"},
        { text: "ชุบ", align: "center", justify: "center"},
        { text: "ติดกาว", align: "center", justify: "center"},
        { text: "ลงยาสี", align: "center", justify: "center"},
        { text: "มัดมุก", align: "center", justify: "center"},
        { text: "QCสำเร็จ", align: "center", justify: "center"},
        { text: "ส่งQA", value: "TotalQa" , align: "center", justify: "center"},
      ],
      checkbox: {
        check1: true,
        check2: true,
        check3: true,
        check4: true,
      },
      timeLine: 3,
      popUpShow: false,
      stepper: 0,
      steps: [
          {
              label: 'เทียน',
              dlDate: '24/06/2564',
              timeLineStep: 1,
              color: 'green',
              
          },
          {
              label: 'หล่อ',
              dlDate: '27/06/2564',
              timeLineStep: 2,
              color: 'orange',
          },
          {
              label: 'แต่ง',
              dlDate: '29/06/2564',
              timeLineStep: 3,
              color: 'green',
          },
          {
              label: 'ฝัง',
              dlDate: '01/07/2564',
              timeLineStep: 4,
              color: 'red',
          },
          {
              label: 'ขัด',
              dlDate: '03/07/2564',
              timeLineStep: 5,
              color: 'green',
          },
          {
              label: 'ชุบ',
              dlDate: '05/07/2564',
              timeLineStep: 6,
              color: 'green',
          },
          {
              label: 'QC สำเร็จ',
              dlDate: '06/07/2564',
              timeLineStep: 7,
              color: 'green',
          },
          {
              label: 'QA & แพ็ค',
              dlDate: '10/07/2564',
              timeLineStep: 8,
              color: 'green',
          }
      ],
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
    },
    async loadData() {
      // console.log(this.$store.getters.statusDetailHeader.OrderNumber)
      const result = await apiOrder.getdetailStatus(this.$store.getters.statusDetailHeader.OrderNumber)
      this.dataProduct = result
      this.dataProduct.forEach((product, index) => {
        this.dataProduct[index].StatusStone = Math.round(Math.random() * 2);
        this.dataProduct[index].StatusPart = Math.round(Math.random() * 2);
      })
      // console.log(this.dataProduct)
    },
    async gotoDetail() {
      await this.$router.push('/stonefororder')
    }
  },
  async mounted() {
    await this.loadData();
    // console.log(this.$store.getters.statusDetailHeader);
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

.bgColorHeader {
    background-color: rgb(232, 214, 245);
}

.bgColorRed {
    background-color: rgb(241, 94, 94);
}
.bgColorGreen {
    background-color: rgb(117, 255, 168);
}

.mytable2 table th {
  font-size: 12px !important;
  text-align: center;
  background-color: rgb(200, 240, 207);
}

</style>