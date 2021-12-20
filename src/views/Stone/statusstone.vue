<template>
  <v-container grid-list-xs>
    <v-row class="mt-5">
      <v-spacer></v-spacer>
      <h1>สถานะรายการสั่งซื้อพลอย</h1>
      <v-spacer></v-spacer>
    </v-row>

        <v-card class="mt-10">
        <v-data-table :search="search" :headers="headers" :items="dataStonePurchase" class="tableStone">
        <!-- Header -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>สถานะพลอย</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <div>วันที่ผลิตจะได้รับ</div>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
                label="FROM"
                type="date"
                class="mt-6"
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div>ถึงวันที่</div>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
                label="TO"
                type="date"
                class="mt-6"
            ></v-text-field>
          </v-toolbar>
        </template>

        <!-- Table -->
        <template v-slot:item="{ item }">
          <tr @click="gotoDetail(item)">
            <td width="200">
                <span class="fontSize14">{{ item.OrderNumber }}</span>
            </td>
            <td width="250">
                <div class="fontSize14">
                    {{ item.InvCode }}
                </div>
                <div class="fontSize12 grey--text" >
                    {{ item.InvDescE }}
                </div>
            </td>
            <td  width="100" class="fontSize14"> <div><b>{{ item.QtyReq.toLocaleString() }}</b> pcs.</div></td>

            <td width="500">
                <v-stepper v-model="item.timeLine" alt-labels tile class="mt-1 mb-1">
                    <v-stepper-header align="center" class="ma-n4">
                      <v-stepper-step
                        :complete="item.timeLine >= 1"
                        step="1"
                        complete-icon="done"
                         color="green"
                      >
                        <small align="center">สั่งซื้อแล้ว</small>
                        <small align="center">{{ item.SupplierName }}</small>
                        <small align="center">{{ item.DueDataSup | moment("DD/MM/YYYY")}}</small>
                      </v-stepper-step>
                      <v-divider></v-divider>

                      <v-stepper-step
                        :complete="item.timeLine >= 2"
                        step="2"
                        complete-icon="done"
                         color="red"
                      >
                        <small align="center">รับจากซับแล้ว</small>
                        <small align="center">{{ item.person }}</small>
                        <small align="center">{{ item.ReciveDateSup | moment("DD/MM/YYYY")}}</small>
                      </v-stepper-step>
                      <v-divider></v-divider>

                       <v-stepper-step
                        :complete="item.timeLine >= 4"
                        step="4"
                        complete-icon="done"
                        color="green"
                      >
                        <small>ฝ่ายผลิตรับแล้ว</small> 
                        <small>{{ item.facDate | moment("DD/MM/YYYY")}}</small>
                      </v-stepper-step>
                    </v-stepper-header>
                  </v-stepper>
            </td>

            <td  width="80" class="fontSize14"> <div> {{item.balance.toFixed(0)}} pcs.</div></td>
            <td  width="100" class="fontSize14" align="center" justify="center">               
              <v-chip             
                  v-bind:class="{
                  'color: green': item.datelate >= 3 ,
                  'color: orange': item.datelate > 0 && item.datelate < 3,
                  'color: red': item.datelate < 0,
                }" dark>
                <span class="fontSize13" >{{ item.datelate.toFixed(0) }}</span>
              </v-chip></td>

          </tr>
        </template>
      </v-data-table>
        </v-card>
  </v-container>
</template>

<script>
import apiStone from "../../services/apiStone";
export default {
  name: "statusstone",
  data() {
    return {
      dataStonePurchase: [],
      headers: [
        { text: "ชื่อ Order", value: "OrderNumber", align: "left" },
        { text: "รหัสพลอย", value: "InvCode", align: "left"},
        { text: "จำนวนที่สั่ง", value: "QtyReq", align: "left"},
        { text: "ขั้นตอน", align: "center", value: "timeLine" },
        { text: "คงค้าง", value: "balance", align: "center"},
        { text: "เหลือวัน ส่งFac", value: "datelate", align: "center"},
      ],
      search: ''
    };
  },
  methods: {
    async loadDataStonePurchase() {
      this.dataStonePurchase = await apiStone.getStonePurchase();
      this.dataStonePurchase.forEach((data, index) => {
        this.dataStonePurchase[index].timeLine = Math.random() * 5;
        this.dataStonePurchase[index].DueDataSup = this.randomDate(0);
        this.dataStonePurchase[index].ReciveDateSup = this.randomDate(2);
        this.dataStonePurchase[index].person = "กันต์กมล แก้วประเสริฐ";
        this.dataStonePurchase[index].personDate = this.randomDate(1);
        this.dataStonePurchase[index].facDate = this.randomDate(1);
        this.dataStonePurchase[index].facPerson = "กันต์กมล แก้วประเสริฐ";
        this.dataStonePurchase[index].datelate = ((Math.random() * -10) + (Math.random() * 10)) ;
        this.dataStonePurchase[index].balance =  (this.dataStonePurchase[index].QtyReq - (Math.random() * 10)) * 1;
      });

    },
    randomDate(i) {
      let start = new Date(2021, 6, 18);
      let end = new Date(2021, 6, 22);
      if (i === 1) {
        start = new Date(2021, 6, 27);
        end = new Date(2021, 6, 30);
      } else if (2) {
        start = new Date(2021, 6, 23);
        end = new Date(2021, 6, 26);
      } else if (3) {
        start = new Date(2021, 6, 28);
        end = new Date(2021, 6, 30)
      }
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    },
    async gotoDetail(item) {
      await this.$store.dispatch({
        type: "SendDataOrderStatus",
        data: item,
      });
      await this.$router.push('/stonefororder')
    }
  },
  async mounted() {
    // console.log((Math.random() * 5 + 1))
    // console.log(new Date( Math.random() * (30 - 1)));
    // console.log(this.randomDate())
    await this.loadDataStonePurchase();
  },
};
</script>

<style>

.tableStone table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgb(243, 198, 180);
}


</style>