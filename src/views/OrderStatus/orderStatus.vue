<template>
  <v-container grid-list-xs>

    <v-card width="2500">
      <v-data-table :search="search" :headers="headers" :items="orderStatus" :items-per-page="15" class="elevation-1 mytable">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title class="fontSize14">FACTORY {{$store.getters.Factory}}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-toolbar-title class="fontSize14"> DL </v-toolbar-title>
            <v-text-field type="date" class="pt-7 ml-3 mr-3" v-model="dateFilter.start" @change="filterDueDate()"/>
            <v-toolbar-title class="fontSize14"> ถึง </v-toolbar-title>
            <v-text-field type="date" class="pt-7 ml-3 mr-3" v-model="dateFilter.to" @change="filterDueDate()"/>

            <v-spacer></v-spacer>
            <v-checkbox
              color="green"
              class="mt-7"
              v-model="checkbox.status2"
              label="ดีมาก"
              @change="filterStatus()"
            ></v-checkbox>
            <v-spacer></v-spacer>
                        <v-checkbox
              color="blue"
              class="mt-7"
              v-model="checkbox.status1"
              label="ปกติ"
              @change="filterStatus()"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox
              color="amber darken-4"
              class="mt-7"
              v-model="checkbox.status3"
              label="เร่งผลิต"
              @change="filterStatus()"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox
              color="red"
              class="mt-7"
              v-model="checkbox.status4"
              label="เลยกำหนดส่ง"
              @change="filterStatus()"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <!-- <v-btn color="red" dark @click="$router.push('/product-late')">ดูรายการเลทแผนก</v-btn> -->
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }" >
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->
          <tr height="60">
            <td @click="goDetail(item)" align="left" justify="center">
              <span class="fontSize13">{{ item.SalesManager }}</span>
            </td>
            <td @click="goDetail(item)" width="200">
              <span class="fontSize13"> {{ item.OrderNumber }}</span>
            </td>

            <td @click="goDetail(item)" align="center" justify="center" width="150">
              <span class="fontSize13">({{item.thaiDate}})_{{ item.DueDate | moment("DD/MM/YYYY") }}</span>
            </td>

            <td @click="goDetail(item)"  align="center" justify="center" >
              <span class="fontSize13">{{ item.TotalQty.toLocaleString() }}</span>
            </td>


            <!-- { text: "จำนวน เทียน"} -->
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
           <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
              <v-chip  dark
                  v-bind:class="{
                  orange: item.P8 > 0,
                  white: item.P8 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P8 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน Supนอก"} -->
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
              <v-chip dark
              v-bind:class="{
                  orange: item.P10 > 0,
                  white: item.P10 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P10 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ชุบ"} -->
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
              <v-chip dark
              v-bind:class="{
                  green: item.P11 > 0,
                  white: item.P11 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P11 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน ติดกาว"} -->
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
              <v-chip dark 
                  v-bind:class="{
                  green: item.P13 > 0,
                  white: item.P13 <= 0,
                }">
                <span class="fontSize13 text-xs-right">{{ item.P13 }}</span>
              </v-chip>
            </td>

            <!-- { text: "จำนวน มัดมุก"} -->
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td  align="center" justify="center" width="10" @click="goDetail(item)">
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
            <td @click="goDetail(item)" align="center" justify="center">
              <v-chip             
                  v-bind:class="{
                  blue: item.TotalQa > 0,
                  white: item.TotalQa <= 0,
                  
                }" dark>
                <span class="fontSize13">{{ item.TotalQa.toLocaleString()}} ({{item.perQa.toFixed(0)}}%)
                  </span>
              </v-chip>
            </td>


            <td @click="goDetail(item)"  align="center" justify="center">
              <v-chip
                dark
                v-bind:class="{
                  green: item.dateLate > 5,
                  orange: item.dateLate <= 5 && item.dateLate >= 0,
                  pink: item.dateLate < 0,
                }"
              >
                <span class="fontSize13">
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
                  'color: blue': item.Status === 'ปกติ',
                  'color: green': item.Status === 'ดีมาก',
                  'color: orange': item.Status === 'เร่งการผลิต',
                  'color: red': item.Status === 'เลยกำหนดส่ง',
                }"
              >
                <v-icon class="ml-n1" v-if="item.Status === 'ปกติ'"
                  >mdi-camera-timer</v-icon
                >
                <v-icon class="ml-n1" v-if="item.Status === 'ดีมาก'">
                  thumb_up_off_alt
                </v-icon>
                <v-icon class="ml-n1" v-if="item.Status === 'เร่งการผลิต'"
                  >mdi-alarm</v-icon
                >
                <v-icon class="ml-n1" v-if="item.Status === 'เลยกำหนดส่ง'"
                  >mdi-calendar-remove</v-icon
                >
                <span class="fontSize10">{{ item.Status }}</span>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus";
export default {
  name: "orderstatus",
  data() {
    return {
      checkbox: {
        status1: true,
        status2: true,
        status3: true,
        status4: true,
      },
      headers: [
        { text: "Sales", value: "SalesManager", align: "center", justify: "center"},
        { text: "ชื่อOrder", value: "OrderNumber" },
        { text: "กำหนดส่ง", value: "DueDate" , align: "center", justify: "center"},
        { text: "จำนวนทั้งOrder", value: "TotalQty" , align: "center", justify: "center"},
        { text: "เทียน", value: "P4",align: "center", justify: "center"},
        { text: "หล่อ", value: "P5", align: "center", justify: "center"},
        { text: "แต่ง", value: "P8", align: "center", justify: "center"},
        { text: "Supนอก", value: "P7", align: "center", justify: "center"},
        { text: "PMG", value: "P6", align: "center", justify: "center"},
        { text: "ฝัง", value: "P9", align: "center", justify: "center"},
        { text: "ขัด", value: "P10", align: "center", justify: "center"},
        { text: "ชุบ", value: "P11", align: "center", justify: "center"},
        { text: "ติดกาว", value: "P12", align: "center", justify: "center"},
        { text: "ลงยาสี", value: "P13", align: "center", justify: "center"},
        { text: "มัดมุก", value: "P14", align: "center", justify: "center"},
        { text: "QCสำเร็จ", value: "P15", align: "center", justify: "center"},
        { text: "ส่งQA", value: "TotalQa" , align: "center", justify: "center"},
        { text: "เหลือวันผลิต", value: "dateLate" , align: "center", justify: "center"},
        { text: "สถานการณ์", value: "Status" , align: "center", justify: "center"},
      ],
      search: "",
      orderStatus: [],
      orderStatus2: [],
      dataFilter: [],
      dateFilter: {
          start: null,
          to: null
      }
    };
  },
  async mounted() {
    await this.loadData();
    // console.log(this.$store.state.Factory)
  },
  methods: {
    async loadData() {
      const result = await apiOrder.getOrderStatus();
      this.orderStatus = result;
      this.orderStatus2 = result;
      //   console.log(result);
    },
    async goDetail(item) {
      await this.$store.dispatch({
        type: "SendDataOrderStatus",
        data: item,
      });
      await this.$router.push({path: "/orderstatus-detail"})

      // console.log('MasterPage', item);
    },
    filterStatus() {
        this.dataFilter= []
        this.orderStatus = this.orderStatus2
        // console.log('1',this.orderStatus)
        if (this.checkbox.status1) {
             this.dataFilter.push("ปกติ")
        } 
        if (this.checkbox.status2) {
             this.dataFilter.push("ดีมาก")
        }
        if (this.checkbox.status3) {
             this.dataFilter.push("เร่งการผลิต")
        }
        if (this.checkbox.status4) {
             this.dataFilter.push("เลยกำหนดส่ง")
        }
        // console.log('Filter',  this.dataFilter)
        this.orderStatus = this.orderStatus.filter((f) => {
          return  f.Status ==  this.dataFilter[0] || f.Status ==  this.dataFilter[1] || f.Status ==  this.dataFilter[2] || f.Status ==  this.dataFilter[3]
        });
        // console.log('2',this.orderStatus)
    },
    async filterDueDate() {
        if (this.dateFilter.start !== null && this.dateFilter.to !== null) {
            // console.log(this.dateFilter);
            const result = await apiOrder.getOrderStatusBetween(this.dateFilter)
            this.orderStatus = result;
            this.orderStatus2 = result;
        } else {
            await this.loadData();
        }
    }
  },
};
</script>

<style >

.mytable table tr {
    background-color: rgb(255, 255, 255);
}

.bgColor {
  background-color: rgb(74, 165, 89);
}

.mytable table th {
  font-size: 12px !important;
  text-align: center;
  background-color: rgb(232, 214, 245);
}

</style>