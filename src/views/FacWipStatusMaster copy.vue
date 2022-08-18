<template>
  <div fullscreen class="fontSarabun" v-if="!loadingPage">
    <!-- Filter -->
    <v-row>
      <v-col>
        <div>
          <div>ค้นหาจาก Order</div>
          <v-autocomplete
            outlined
            hide-details
            dense
            :items="dataFilter.ByOrder.showOrder"
            v-model="dataFilter.ByOrder.selectedOrder"
            multiple
            close
          />
        </div>
      </v-col>
      <v-col>
        <div>
          <div>วันที่ส่งฝ่ายขาย</div>
          <v-text-field
            v-model="dataFilter.dateBetween.showDate"
            outlined
            hide-details
            readonly
            append-icon="mdi-calendar-month"
            @click="dataFilter.dateBetween.showPopup = true"
            dense
          />
        </div>
      </v-col>
      <v-col>
        <div>
          <div>สถานะฝ่ายขาย</div>
          <v-autocomplete
            outlined
            hide-details
            dense
            :items="dataFilter.ByStatus.showStatus"
            v-model="dataFilter.ByStatus.selectedStatus"
            multiple
            close
          />
        </div>
      </v-col>
      <v-col>
        <div>
          <div>Factory</div>
          <v-select
            outlined
            hide-details
            dense
            :items="dataFilter.ByFac.showFac"
            v-model="dataFilter.ByFac.selectedFac"
          />
        </div>
      </v-col>
    </v-row>

    <!-- ตาราง Record -->
    <v-card
      class="mt-5"
      v-for="(order, indexMaster) in dataMaster"
      :key="indexMaster"
    >
      <v-simple-table dense style="width: 100%" class="table">
        <template v-slot:default>
          <thead>
            <!-- row1 -->
            <tr>
              <th colspan="21" class="borderHeaderMonthTopLine">
                <div></div>
              </th>
              <th
                v-for="m in order.headerMonth"
                :key="m.month"
                :colspan="m.count"
                class="borderHeaderMonthTopLineOffMonth"
              >
                <div align="center">{{ m.month }}</div>
              </th>
            </tr>

            <!-- row2 -->
            <tr>
              <th class="borderHeaderTopLine" colspan="4">
                <div class="fontSize16 blue--text">
                  FACTORY : {{ order.ProductionTeam }}
                </div>
              </th>
              <th
                class="borderHeaderTopLineOffWeek"
                :colspan="order.Process.length"
              >
                <div align="center" class="fontSize16 blue--text">
                  สถานะการผลิต : <span>{{ getDate | moment("LLLL") }}</span>
                </div>
              </th>
              <th class="borderHeaderTopLine">
                <div class="fontSize8 mx-n2" align="center">แผน ส่ง QA</div>
              </th>

              <th class="borderHeaderTopLine">
                <div class="fontSize8" align="center">วันที่กำหนด</div>
              </th>
              <th class="borderHeaderTopLine">
                <div class="fontSize8 mx-n3" align="center">
                  จำนวน ครั้งเลื่อน
                </div>
              </th>

              <th
                v-for="(h, index) in order.qaCalender"
                :key="index"
                :class="
                  h.Dow === 'ศ.'
                    ? 'borderHeaderTopLineOffWeek'
                    : 'borderHeaderTopLine'
                "
              >
                <div class="fontSize8 mx-n3" align="center">
                  <div class="fontSize8">{{ h.Dow }}</div>
                  <v-divider></v-divider>
                  <div class="fontSize8">
                    {{ $moment(h.DayWip).format("D") }}
                  </div>
                </div>
              </th>
            </tr>

            <!-- row3 -->
            <tr>
              <th class="borderRight" colspan="2">
                <div class="fontSize8 mx-5" align="center">ORDER.NO/QTY</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">วัตถุดิบ</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n1" align="center">หัวข้อ</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n2" align="center">หล่อ WAX</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">แต่งพิมพ์</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ฉีดเทียน</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ฝัง WAX</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n1" align="center">หล่อ</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">แต่ง</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ประกอบ</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">LASER</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">PMG</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ฝัง</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ขัด</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ชุบ</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ติดกาว</div>
              </th>
              <th class="borderRightOffWeek">
                <div class="fontSize8 mx-n3" align="center">QA</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n3" align="center">เป้าแรก</div>
              </th>
              <th class="borderRight">
                <div class="fontSize8 mx-n4" align="center">
                  <span class="grey--text"
                    >{{
                      order.qaTarget.length > 0
                        ? $moment(order.qaTarget[0].FirstTarget).format("dd")
                        : ""
                    }} </span
                  >{{
                    order.qaTarget.length > 0
                      ? $moment(order.qaTarget.FirstTarget).format("l")
                      : "_/_/_"
                  }}
                </div>
              </th>
              <th class="borderRight">
                <div class="fontSize8" align="center"></div>
              </th>
              <th
                v-for="(h, index) in order.qaCalender"
                :key="index"
                :class="h.Dow === 'ศ.' ? 'borderRightOffWeek' : 'borderRight'"
              >
                <div
                  class="fontSize8 mx-n3"
                  align="center"
                  v-if="h.FirstTarget !== 0"
                >
                  {{ h.FirstTarget.toLocaleString() }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <!-- row 4  -->
            <tr>
              <td class="borderRight" rowspan="2" colspan="2">
                <div
                  class="fontSize10 mx-n3 font-weight-bold"
                  align="center"
                  @click="gotoDetail()"
                >
                  {{ order.OrderNumber }}
                </div>
              </td>
              <td
                class="borderRight amber lighten-3"
                width="20"
                @click="showDialogMaterail()"
              >
                <div class="fontSize8 mx-n3" align="center">พลอย</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n4" align="center">กำหนดเสร็จ</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center"></div>
              </td>
              <td class="borderRightOffWeek">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">จ. </span>10/10/22
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n4" align="center">เป้าส่งสุดท้าย</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">
                  <span class="grey--text">
                    {{
                      order.qaTarget.length > 0
                        ? $moment(order.qaTarget[0].LastTarget).format("dd")
                        : ""
                    }}
                  </span>
                  {{
                    order.qaTarget.length > 0
                      ? $moment(order.qaTarget[0].LastTarget).format("l")
                      : "_/_/_"
                  }}
                </div>
              </td>
              <td class="borderRight">
                <div
                  class="fontSize8 mx-n3 orange--text font-weight-bold"
                  align="center"
                >
                  เลื่อน
                </div>
                <v-divider></v-divider>
                <div
                  class="fontSize10 mx-n3 orange--text font-weight-bold"
                  align="center"
                >
                  {{
                    order.qaTarget.length > 0
                      ? order.qaTarget[0].sumLateQa
                      : "0"
                  }}
                  <span class="fontSize8"> ครั้ง</span>
                </div>
              </td>
              <td
                v-for="(h, index) in order.qaCalender"
                :key="index"
                :class="[
                  h.Dow === 'ศ.' ? 'borderRightOffWeek' : 'borderRight',
                  index === 8 &&
                  $moment(filterMonth.getDate).format('M') === '7'
                    ? 'green lighten-4'
                    : '',
                  h.ToQa > 0 && h.BalanceQty > 0 && h.LastTarget > 0
                    ? 'amber lighten-3'
                    : '',
                ]"
              >
                <div
                  class="fontSize8 mx-n3"
                  align="center"
                  v-if="h.LastTarget !== 0"
                >
                  {{ h.LastTarget }}
                </div>
              </td>
            </tr>

            <!-- row 5  -->
            <tr>
              <td class="borderRight yellow">
                <div class="fontSize8 mx-n3" align="center">อะไหล่</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n4" align="center">จำนวนค้าง</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center "></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8 mx-n3" align="center">1,449</div>
              </td>
              <td class="borderRight cyan lighten-3">
                <div class="fontSize8 mx-n3" align="center">1,500</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRightOffWeek cyan lighten-3">
                <div class="fontSize8" align="center">750</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">ยอดส่งจริง</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td
                v-for="(h, index) in order.qaCalender"
                :key="index"
                :class="[
                  h.Dow === 'ศ.' ? 'borderRightOffWeek' : 'borderRight',
                  index === 8 &&
                  $moment(filterMonth.getDate).format('M') === '7'
                    ? 'green lighten-4'
                    : '',
                  h.ToQa > 0 && h.BalanceQty > 0 && h.LastTarget > 0
                    ? 'amber lighten-3'
                    : '',
                ]"
              >
                <div class="fontSize8 mx-n3" align="center" v-if="h.ToQa">
                  {{ h.ToQa.toLocaleString() }}
                </div>
              </td>
            </tr>

            <!-- row 6  -->
            <tr>
              <td class="borderRight">
                <div class="fontSize8 mr-n16 ml-n1" align="left">
                  จำนวนรวม :
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize10 mx-n3" align="center">
                  <b>{{ order.TotalQty }}</b>
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n3" align="center">เลทแผนก</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div
                  class="fontSize10 red--text font-weight-bold mx-n3"
                  align="center"
                >
                  -11
                </div>
              </td>
              <td class="borderRight">
                <div
                  class="fontSize8 fontSize10 red--text font-weight-bold"
                  align="center"
                >
                  -10
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRightOffWeek">
                <div
                  class="fontSize10 red--text font-weight-bold"
                  align="center"
                >
                  -1
                </div>
              </td>
              <td class="borderRight">
                <div class="fontSize8 mx-n4" align="center">ยอดค้างส่ง</div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td class="borderRight">
                <div class="fontSize8" align="center"></div>
              </td>
              <td
                v-for="(h, index) in order.qaCalender"
                :key="index"
                :class="[
                  h.Dow === 'ศ.' ? 'borderRightOffWeek' : 'borderRight',
                  index === 8 &&
                  $moment(filterMonth.getDate).format('M') === '7'
                    ? 'green lighten-4'
                    : '',
                  h.ToQa > 0 && h.BalanceQty > 0 && h.LastTarget > 0
                    ? 'amber lighten-3'
                    : '',
                ]"
              >
                <div
                  :class="
                    h.ToQa > 0 && h.BalanceQty > 0 && h.LastTarget > 0
                      ? 'fontSize9 mx-n3 font-weight-bold red--text'
                      : 'fontSize8 mx-n3'
                  "
                  align="center"
                  mx-n3
                  v-if="h.BalanceQty || h.ToQa"
                >
                  {{ h.BalanceQty.toLocaleString() }}
                </div>
              </td>
            </tr>

            <!-- row7 -->
            <tr>
              <td class="borderBottom">
                <div class="fontSize8 mx-n3 py-1" align="center">วันทำงาน</div>
              </td>
              <td class="borderBottom">
                <div class="fontSize8 mx-n3" align="center">วันทั้งหมด</div>
              </td>
              <td class="borderBottom mt-5" colspan="2" rowspan="2">
                <div class="fontSize8 mx-n3">แผนการเร่งงาน :</div>
              </td>
              <td class="borderBottomOffWeek" colspan="14" rowspan="2">
                <div class="fontSize8"></div>
              </td>
              <td class="borderBottom" colspan="3" rowspan="2">
                <div class="fontSize8 mx-n3">สาเหตุล่าช้า / จำนวน :</div>
              </td>
              <td class="borderBottom" :colspan="headerQa.length" rowspan="2">
                <div class="fontSize8"></div>
              </td>
            </tr>

            <!-- row8 -->
            <tr>
              <td class="borderBottom">
                <div
                  class="fontSize10 red--text font-weight-bold mx-n3"
                  align="center"
                >
                  {{ order.WorkingDay }}
                </div>
              </td>
              <td class="borderBottom">
                <div
                  class="fontSize10 red--text font-weight-bold mx-n3"
                  align="center"
                >
                  {{ order.TotalDay }}
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

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

    <!-- POPUP INV  -->
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
  </div>
</template>

<script>
import apiFacWip from "../services/apiFacWipStatus";
import apiMould from "../services/apiMould";
import InvForOrderNewVue from "./OrderStatus/InvForOrderNew.vue";
// import ItemInProcessVue from "./ItemInProcess.vue";

export default {
  name: "facwipstatus-master",
  data: () => ({
    loadingPage: false,
    getDate: new Date(),
    filterMonth: {
      pushMonth: 0,
      getDate: new Date(),
      showMonth: "",
    },
    dataFilter: {
      dateBetween: {
        showPopup: false,
        values: [],
        showDate: "",
      },
      ByFac: {
        selectedFac: "",
        showFac: ["Factory 1", "Factory 2", "Factory 3", "Factory 4"],
      },
      ByOrder: {
        showOrder: [],
        selectedOrder: [],
      },
      ByStatus: {
        showStatus: ["เลยกำหนดส่ง", "เร่งการผลิต", "ดีมาก", "ปกติ"],
        selectedStatus: [],
      },
    },
    headerQa: [],
    headerMonth: [],
    dialogMaterail: {
      showDialog: false,
      orderNumber: "",
      rowRecode: 0,
    },
    qaTarget: {
      firstTaget: "",
      lastTarget: "",
      SumLateQa: 0,
    },
    dataOrder: {
      orderNumber: "CH-MEJ076/2022-F1-2",
      dueDate: "2022-07-14",
      workingDay: -2,
      totalDay: -4,
      planProcess: "",
      planQa: "",
      totalQty: 3010,
      headerQa: [],
      headerMonth: [],
      Process: [],
      qaTarget: {
        firstTaget: "",
        lastTarget: "",
        SumLateQa: 0,
      },
      dataMaster: [],
    },
  }),
  computed: {},
  components: {
    InvForOrderNewVue,
  },
  async mounted() {
    this.loadingPage = true;
    await this.getDateMaster();
    setTimeout(() => {
      this.loadingPage = false;
    }, 1500);
    // await this.getOrderForFilter();
  },
  methods: {
    filterDateBetween() {
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
      } else {
        // console.log("น้อยกว่า");
        data.minDate = this.dataFilter.dateBetween.values[1];
        data.maxDate = this.dataFilter.dateBetween.values[0];
      }
    },
    async getDateMaster() {
      this.dataMaster = await apiFacWip.getValuesInMonth();
      console.log(this.dataMaster);
    },
    async getOrderForFilter() {
      this.dataFilter.ByOrder.showOrder = await apiMould.getOrderNumber();
      this.dataFilter.ByOrder.showOrder = this.dataFilter.ByOrder.showOrder.map(
        ({ OrderNumber }) => OrderNumber
      );
      // console.log(res);
    },
    showDialogMaterail(index) {
      // console.log(index);

      this.dialogMaterail.rowRecode = 2;
      this.dialogMaterail.orderNumber = "CH-MEJ076/2022-F1-2";

      this.dialogMaterail.showDialog = true;
    },
    gotoDetail() {
      this.$router.push({
        name: "facwipstatus-detail",
      });
    },
  },
};
</script>

<style lang="scss">
table > thead > tbody > tr > th,
td {
  min-width: 1px !important;
  height: 1px !important;
}

.borderRight {
  border-right: 1px solid rgb(214, 214, 214);
}

.borderRightOffWeek {
  border-right: 2px solid rgb(190, 216, 255);
}

.borderHeaderTopLine {
  border-top: 1px solid rgb(214, 214, 214);
  border-right: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}

.borderHeaderMonthTopLine {
  border-right: 1px solid rgb(214, 214, 214);
}

.borderHeaderMonthTopLineOffMonth {
  border-top: 1px solid rgb(214, 214, 214);
  border-right: 2px solid rgb(190, 216, 255);
}

.borderHeaderTopLineOffWeek {
  border-top: 1px solid rgb(214, 214, 214);
  border-right: 2px solid rgb(190, 216, 255);
  border-bottom: 1px solid rgb(214, 214, 214);
}

.borderBottom {
  border-right: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}

.borderBottomOffWeek {
  border-right: 2px solid rgb(190, 216, 255);
  border-bottom: 1px solid rgb(214, 214, 214);
}
</style>
