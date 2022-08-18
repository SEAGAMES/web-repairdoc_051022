<template>
  <v-container class="fontSarabun">
    <template>
      <v-card>
        <!-- Title Header -->
        <v-row>
          <v-col>
            <v-card
              height="50px"
              color="grey lighten-5"
              class="justify-center d-flex align-center"
            >
              <div
                align="center"
                style="font-family: Prompt; color: darkcyan; font-size: 22px"
                @click="convertThaiDate()"
              >
                สถานะของวันที่ :
                <span class="darkcyan--text">{{
                  getDate | moment("LLLL")
                }}</span>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2">
            <div>
              <div>By Time</div>
              <v-select
                :items="dataFilter.ByTime.timeLineShow"
                outlined
                dense
                v-model="dataFilter.ByTime.selectedTimeLine"
              />
            </div>
          </v-col>
          <v-col>
            <div>
              <div>Select Date</div>
              <v-text-field
                v-model="dataFilter.dateBetween.showDate"
                :disabled="
                  dataFilter.ByTime.selectedTimeLine === '' ||
                  dataFilter.ByTime.selectedTimeLine === undefined
                "
                outlined
                hide-details
                color="amber"
                readonly
                append-icon="mdi-calendar-month"
                @click="dataFilter.dateBetween.showPopup = true"
                dense
              />
            </div>
          </v-col>

          <v-col>
            <div>
              <div>By Order</div>
              <v-autocomplete outlined dense />
            </div>
          </v-col>
          <v-col>
            <div>
              <div>By Factory</div>
              <v-select
                outlined
                dense
                v-model="dataFilter.ByFac.selectedFac"
                :items="dataFilter.ByFac.showFac"
                @change="testLog()"
              />
            </div>
          </v-col>
        </v-row>

        <v-card>
          <v-tabs v-model="tabs" color="grey" @change="testLog()">
            <div align="left">
              <span
                >OrderNumber :
                <b class="black--text">{{ "CH-VI016/2022-S" }}</b></span
              >
              <v-divider></v-divider>
              <span>
                Factory : <b class="black--text">{{ 4 }}</b>
              </span>
              <span class="ml-6">
                จำนวนทั้งOrder : <b class="black--text">{{ "10,000" }}</b>
              </span>
            </div>

            <v-spacer></v-spacer>
            <v-tab>วัตถุดิบ</v-tab>
            <v-tab>รายการออเดอร์</v-tab>
            <v-tab-item v-for="tabShow in 2" :key="tabShow">
              <v-container fluid>
                <!-- tab 1 แสดง วัตถุดิบ -->
                <v-simple-table v-if="tabShow === 1">
                  <template v-slot:default>
                    <thead>
                      <tr align="center" class="headerColor">
                        <th
                          rowspan="2"
                          colspan="2"
                          class="text-center borderFull"
                        >
                          TIMELINE
                        </th>
                        <th colspan="8" class="text-center borderTop">
                          ยอด & สถานะ พลอย, สร้อย, อะไหล่
                        </th>
                      </tr>

                      <tr align="center" class="headerColor">
                        <th class="borderBottom">
                          <div align="center">ชนิด</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">วันจบสุดท้าย</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">จบเต็ม</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">toFac.</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">คัดพลอย</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">SUPP.</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">ติดขัด</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">สถานะ</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(materail, index) in dataMaterail"
                        :key="materail.name"
                        align="center"
                        @click="showDialogMaterail(index + 1)"
                      >
                        <td align="center">{{ materail.type }}</td>
                        <td align="center">{{ materail.date }}</td>
                        <td align="center">
                          <v-btn dense small width="60" color="grey" dark>
                            <span class="fontSize10">
                              {{ materail.name }}
                            </span>
                          </v-btn>
                        </td>
                        <td align="center">{{ materail.finalDay }}</td>
                        <td align="center">
                          {{ materail.totalQty.toLocaleString() }}
                        </td>
                        <td align="center">
                          {{ materail.toFac.toLocaleString() }}
                        </td>
                        <td align="center">
                          {{ materail.stone.toLocaleString() }}
                        </td>
                        <td align="center">
                          {{ materail.supp.toLocaleString() }}
                        </td>
                        <td align="center">
                          <v-chip color="red lighten-3" dark>{{
                            materail.problem.toLocaleString()
                          }}</v-chip>
                        </td>
                        <td align="center">
                          <v-btn
                            :color="
                              materail.status === 'ปกติ'
                                ? 'green lighten-3'
                                : 'red lighten-3'
                            "
                            dark
                            dense
                            small
                            >{{ materail.status }}</v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <!-- Table ที่ 2 -->
                <v-simple-table v-if="tabShow === 2">
                  <template v-slot:default>
                    <thead>
                      <tr class="headerColor">
                        <th rowspan="2">รายการ</th>
                        <th colspan="3" rowspan="1" class="borderFull">
                          <div align="center">พิมพ์</div>
                        </th>
                        <th
                          v-for="(process, index) in tabOrder.headerSection"
                          :key="index"
                          rowspan="2"
                          class="borderTop"
                          width="20"
                        >
                          <div align="center">{{ process.PDProcessName }}</div>
                        </th>
                      </tr>
                      <tr class="headerColor">
                        <th class="borderBottom borderLeft">
                          <div align="center">CAD</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">หล่อ WAX</div>
                        </th>
                        <th class="borderBottom">
                          <div align="center">แต่งฮั๊ว</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row, indexRow) in tabOrder.dataRow"
                        :key="indexRow"
                      >
                        <td>
                          <div class="fontSize12" align="left">
                            {{ row.title }}
                          </div>
                        </td>
                        <td>
                          <div align="center">
                            <v-icon color="green" v-if="row.cad">
                              mdi-check
                            </v-icon>
                          </div>
                        </td>
                        <td>
                          <div align="center">
                            <v-icon color="green" v-if="row.castingWax">
                              mdi-check
                            </v-icon>
                          </div>
                        </td>
                        <td>
                          <div align="center">
                            <v-icon color="green" v-if="row.filingWax">
                              mdi-check
                            </v-icon>
                          </div>
                        </td>
                        <td
                          v-for="(process, index) in tabOrder.headerSection"
                          :key="index"
                        >
                          <div v-if="indexRow === 0" align="center">2</div>
                          <div v-if="indexRow === 1" align="center">
                            10/10/2565
                          </div>
                          <div
                            v-if="indexRow === 2"
                            align="center"
                            @click="
                              showDialogItemInProcess(
                                process,
                                index,
                                row,
                                indexRow
                              )
                            "
                          >
                            {{ process.Total.toLocaleString() }}
                          </div>
                          <div v-if="indexRow === 3" align="center">
                            <v-chip
                              :color="
                                0 < 1 ? 'red lighten-3' : 'green lighten-3'
                              "
                              dark
                              >{{ -1 }}</v-chip
                            >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-card>
    </template>

    <!-- POPUP Tab 1  -->
    <v-dialog
      v-model="dialogMaterail.showDialog"
      persistent
      :overlay="false"
      width="900"
    >
      <v-card>
        <div align="right" class="pt-2 mr-2">
          <v-btn color="red" dark @click="dialogMaterail.showDialog = false"
            >close</v-btn
          >
        </div>
        <div align="center">
          <InvForOrderNewVue
            :dataInput="dialogMaterail"
            v-if="dialogMaterail.showDialog"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- POPUP Tab 2  -->
    <v-dialog
      v-model="dialogItemInProcess.showDialog"
      persistent
      :overlay="false"
      width="900"
    >
      <v-card>
        <div align="right" class="pt-2 mr-2">
          <v-btn
            color="red"
            dark
            @click="dialogItemInProcess.showDialog = false"
            >close</v-btn
          >
        </div>
        <div align="center">
          <ItemInProcessVue
            :dataInput="dialogItemInProcess"
            v-if="dialogItemInProcess.showDialog"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- POPUP ปฎิทิน -->
    <v-dialog
      v-model="dataFilter.dateBetween.showPopup"
      max-height="300"
      max-width="300"
      class="fontSarabun"
    >
      <v-date-picker
        v-model="dataFilter.dateBetween.values"
        range
        @change="filterDateBetween()"
        color="blue-grey lighten-2"
      ></v-date-picker>
    </v-dialog>
  </v-container>
</template>

<script>
import apiOrderStatus from "../../services/apiOrderStatus";
import InvForOrderNewVue from "./InvForOrderNew.vue";
import ItemInProcessVue from "./ItemInProcess.vue";

export default {
  name: "statusnew",
  data() {
    return {
      isTab: {
        isRightTab: false,
        countTabLeft: 0,
      },
      tabs: null,
      orderNumber: "",
      getDate: new Date(),
      dataMaterail: [],
      headerSection: [],
      dataOrderStatus: [],
      dialogMaterail: {
        showDialog: false,
        orderNumber: "",
        rowRecode: 0,
      },
      dialogItemInProcess: {
        showDialog: false,
        orderNumber: "",
        PDProcessCode: "",
        PDProcessName: "",
      },
      dataFilter: {
        ByTime: {
          timeLineShow: ["DI", "WD", "DL", "EX"],
          selectedTimeLine: "",
          selectedDate: "",
        },
        dateBetween: {
          showPopup: false,
          values: [],
          showDate: "",
        },
        ByFac: {
          selectedFac: "",
          showFac: ["Factory 1", "Factory 2", "Factory 3", "Factory 4"],
        },
      },
      tabOrder: {
        headerSection: [],
        dataRow: [
          {
            title: "วันผลิต",
            cad: true,
            castingWax: true,
            filingWax: true,
          },
          {
            title: "กำหนดจบ",
            cad: false,
            castingWax: false,
            filingWax: false,
          },
          {
            title: "ยอดเคลื่อน",
            cad: false,
            castingWax: false,
            filingWax: false,
          },
          {
            title: "เลทแผนก",
            cad: false,
            castingWax: false,
            filingWax: false,
          },
        ],
      },
    };
  },
  components: {
    InvForOrderNewVue,
    ItemInProcessVue,
  },
  async mounted() {
    this.orderNumber = "CH-VI016/2022-S";
    this.loadDataMaterail();
    await this.loadDataHeader();
  },
  methods: {
    loadDataMaterail() {
      this.dataMaterail = [
        {
          type: "DI",
          date: "อ. 10/06/22",
          name: "พ.ฝัง WAX",
          finalDay: "พ. 11/06/22",
          totalQty: 100000,
          toFac: 80000,
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
          totalQty: 10000,
          toFac: 0,
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
          totalQty: 100000,
          toFac: 80000,
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
          totalQty: 100000,
          toFac: 80000,
          stone: 10000,
          supp: 5000,
          problem: 5000,
          status: "เลท",
        },
      ];
    },
    async loadDataHeader() {
      const { data } = await apiOrderStatus.getTotalQtybyPDProcess({
        orderNumber: this.orderNumber,
      });
      this.tabOrder.headerSection = data;

      // console.log(data);
    },
    loadDataOrderStatusNew() {
      // TO DO
    },
    showDialogMaterail(index) {
      // console.log(index);

      this.dialogMaterail.rowRecode = index;
      this.dialogMaterail.orderNumber = "CH-VI016/2022-S";

      this.dialogMaterail.showDialog = true;
    },
    async showDialogItemInProcess(process, index, row, indexRow) {
      // console.log(process.PDProcessCode);
      if (process.Total > 0) {
        this.dialogItemInProcess.orderNumber = this.orderNumber;
        this.dialogItemInProcess.PDProcessCode = process.PDProcessCode;
        this.dialogItemInProcess.PDProcessName = process.PDProcessName;
        this.dialogItemInProcess.showDialog = true;
      }
    },

    async filterDateBetween() {
      this.dataFilter.dateBetween.showPopup = false;
      this.dataFilter.dateBetween.showDate = `${this.dataFilter.dateBetween.values[0]} ~ ${this.dataFilter.dateBetween.values[1]}`;
      //console.log(this.dataFilter.dateBetween.showDate);

      let data = {
        maxDate: null,
        minDate: null,
      };
      if (
        this.dataFilter.dateBetween.values[1] >
        this.dataFilter.dateBetween.values[0]
      ) {
        // console.log("มากกว่า");
        data.maxDate = this.dataFilter.dateBetween.values[1];
        data.minDate = this.dataFilter.dateBetween.values[0];
        //console.log("data.maxDate : ", data.maxDate);
        //console.log("data.minDate : ", data.minDate);
      } else {
        // console.log("น้อยกว่า");
        data.minDate = this.dataFilter.dateBetween.values[1];
        data.maxDate = this.dataFilter.dateBetween.values[0];
        //console.log("data.minDate : ", data.minDate);
        //console.log("data.maxDate : ", data.maxDate);
      }

      //เรียก api
    },
    testLog() {
      // console.log("Tab", this.tabs);
      if (this.tabs === 1) {
        this.isTab.isRightTab = true;
        this.isTab.countTabLeft = 0;
      } else if (this.tabs === 0) {
        this.isTab.countTabLeft = 0;
        if (this.isTab.isRightTab) {
          ++this.isTab.countTabLeft;
          if (this.isTab.countTabLeft <= 2) {
            setTimeout(() => {
              this.tabs = 1;
              this.isTab.isRightTab = false;
              this.isTab.countTabLeft = 0;
            }, 5);
          }
        }
      }
      // console.log(this.isTab.isRightTab);
      // console.log(this.isTab.countTabLeft);
    },
    convertThaiDate(date) {
      const date1 = date ? date : new Date();
      return `(${this.$moment(date1).format("dd")}) ${this.$moment(
        date1
      ).format("L")}`;
    },
  },
};
</script>

<style scoped>
.headerColor {
  background-color: rgb(233, 232, 232);
}
.borderFull {
  /* border-left: 5px solid red !important; */
  border-block: 1px solid rgb(214, 214, 214);
  border-inline: 1px solid rgb(214, 214, 214);
}
.borderTop {
  border-top: 1px rgb(214, 214, 214);
  border-right: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}
.borderBottom {
  border-right: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}
.borderLeft {
  border-left: 1px solid rgb(214, 214, 214);
}
</style>