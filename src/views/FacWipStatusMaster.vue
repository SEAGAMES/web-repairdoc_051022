<template>
  <div fullscreen class="fontSarabun px-3">
    <!-- Filter -->
    <v-row>
      <v-col>
        <div>
          <div>ค้นหาจาก Order</div>
          <v-text-field
            outlined
            hide-details
            dense
            v-model="dataFilter.ByOrder.selectedOrder"
            append-icon="search"
          />
          <!-- <v-autocomplete
            outlined
            hide-details
            dense
            :items="dataFilter.ByOrder.showOrder"
            v-model="dataFilter.ByOrder.selectedOrder"
            multiple
            close
          /> -->
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
            @click="dataFilter.dateBetween.showDialog = true"
            dense
          />
        </div>
      </v-col>
      <!-- <v-col>
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
      </v-col> -->
      <v-col>
        <div>
          <div>Factory</div>
          <v-select
            outlined
            hide-details
            dense
            :items="dataFilter.ByFac.showFac"
            item-value="value"
            item-text="name"
            v-model="dataFilter.ByFac.selectedFac"
            multiple
          />
        </div>
      </v-col>
      <v-col cols="1">
        <v-btn
          color="success"
          dense
          class="mt-6"
          :loading="loadingPage"
          @click="getDateMaster"
          >ค้นหา</v-btn
        >
      </v-col>
    </v-row>
    <div align="center" class="mt-10" v-if="loadingPage">
      <SpinnerLoading v-if="loadingPage" />
    </div>

    <!-- ตาราง Record -->
    <div v-if="!loadingPage">
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
                <!--START LOOP PROCESS -->
                <th
                  class="borderRight"
                  v-for="(process, indexProcess) in order.Process"
                  :key="'p3' + indexProcess"
                >
                  <div class="fontSize8 mx-n2" align="center">
                    {{ process.PDProcessName }}
                  </div>
                </th>
                <!--END LOOP PROCESS -->
                <th class="borderRight">
                  <div class="fontSize8 mx-n3" align="center">เป้าแรก</div>
                </th>
                <th class="borderRight">
                  <div class="fontSize8 mx-n4" align="center">
                    <span class="grey--text">
                      {{
                        order.qaTarget.length > 0
                          ? $moment(order.qaTarget[0].FirstTarget).format("dd")
                          : ""
                      }}
                    </span>
                    {{
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
                  :class="[
                    h.Dow === 'ศ.' ? 'borderRightOffWeek' : 'borderRight',
                    order.DueDate === h.DayWip ? 'green lighten-4' : '',
                  ]"
                  @click="
                    InputTarget(
                      h,
                      order.OrderNumber,
                      'first',
                      indexMaster,
                      index
                    )
                  "
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
                <td
                  class="borderRight"
                  rowspan="2"
                  colspan="2"
                  @click="gotoDetail(order.OrderNumber)"
                >
                  <div class="fontSize10 mx-n3 font-weight-bold" align="center">
                    {{ order.OrderNumber }}
                  </div>
                </td>
                <td
                  class="borderRight"
                  v-bind:class="{
                    'teal accent-3': order.statusStone.LateDay > 3,
                    'amber lighten-3':
                      order.statusStone.LateDay >= 0 &&
                      order.statusStone.LateDay <= 3,
                    'red lighten-3': order.statusStone.LateDay < 0,
                    'grey lighten-3': order.statusStone.QtyReq <= 0,
                  }"
                  width="20"
                  @click="
                    showDialogMaterail(
                      order.OrderNumber,
                      'stone',
                      order.statusStone.QtyReq
                    )
                  "
                >
                  <div class="fontSize8 mx-n3" align="center">พลอย</div>
                </td>
                <td class="borderRight">
                  <div class="fontSize8 mx-n4" align="center">กำหนดเสร็จ</div>
                </td>

                <!--START LOOP PROCESS -->
                <td
                  class="borderRight"
                  v-for="(process, indexProcess) in order.Process"
                  :key="'p4' + indexProcess"
                >
                  <div class="fontSize8 mx-n2 white--text" align="center">
                    __/__/__
                  </div>
                </td>
                <!--END LOOP PROCESS -->

                <td class="borderRight">
                  <div class="fontSize8 mx-n4" align="center">
                    เป้าส่งสุดท้าย
                  </div>
                </td>
                <td class="borderRight">
                  <div class="fontSize8 mx-n3" align="center">
                    <span class="grey--text">
                      {{
                        order.qaTarget.length > 0 &&
                        order.qaTarget[0].LastTarget !== null
                          ? $moment(order.qaTarget[0].LastTarget).format("dd")
                          : ""
                      }}
                    </span>
                    {{
                      order.qaTarget.length > 0 &&
                      order.qaTarget[0].LastTarget !== null
                        ? $moment(order.qaTarget[0].LastTarget).format("l")
                        : "_/_/_"
                    }}
                  </div>
                </td>
                <td
                  class="borderRight"
                  @click="
                    showHistoryLateQa(
                      order.OrderNumber,
                      order.qaTarget.length > 0
                        ? order.qaTarget[0].SumLateQa
                        : 0
                    )
                  "
                >
                  <div class="fontSize8 mx-n3 orange--text" align="center">
                    เลื่อน
                  </div>
                  <div class="fontSize10 mx-n3 orange--text" align="center">
                    {{
                      order.qaTarget.length > 0
                        ? order.qaTarget[0].SumLateQa
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
                    order.DueDate === h.DayWip ? 'green lighten-4' : '',
                  ]"
                  @click="
                    InputTarget(
                      h,
                      order.OrderNumber,
                      'last',
                      indexMaster,
                      index
                    )
                  "
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
                <td
                  class="borderRight grey lighten-3"
                  @click="showDialogMaterail(order.OrderNumber, 'parts', 1)"
                >
                  <div class="fontSize8 mx-n3" align="center">อะไหล่</div>
                </td>
                <td class="borderRight">
                  <div class="fontSize8 mx-n4" align="center">จำนวนค้าง</div>
                </td>

                <!--START LOOP PROCESS -->
                <td
                  class="borderRight"
                  v-for="(process, indexProcess) in order.Process"
                  :key="'p5' + indexProcess"
                >
                  <div
                    class="fontSize10 mx-n2"
                    align="center"
                    v-if="process.TotalInProcess != 0"
                  >
                    {{ process.TotalInProcess.toLocaleString() }}
                  </div>
                </td>
                <!--END LOOP PROCESS -->

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
                    order.DueDate === h.DayWip ? 'green lighten-4' : '',
                  ]"
                >
                  <div
                    :class="
                      h.ToQa > 0 && h.DayWip >= order.DueDate
                        ? 'fontSize9 mx-n3 font-weight-bold red--text'
                        : 'fontSize8 mx-n3'
                    "
                    align="center"
                    v-if="h.ToQa"
                  >
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
                    <b>{{ order.TotalQty.toLocaleString() }}</b>
                  </div>
                </td>
                <td class="borderRight">
                  <div class="fontSize8" align="center"></div>
                </td>
                <td class="borderRight">
                  <div class="fontSize8 mx-n3" align="center">เลทแผนก</div>
                </td>

                <td
                  class="borderRight"
                  v-for="(process, indexProcess) in order.Process"
                  :key="'p6' + indexProcess"
                >
                  <div
                    class="fontSize10 white--text font-weight-bold mx-n3"
                    align="center"
                  >
                    0
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
                    order.DueDate === h.DayWip ? 'green lighten-4' : '',
                  ]"
                >
                  <div
                    :class="
                      (h.BalanceQty > 0 || h.ToQa > 0) &&
                      h.DayWip >= order.DueDate
                        ? 'fontSize9 mx-n3 font-weight-bold red--text'
                        : 'fontSize8 mx-n3'
                    "
                    align="center"
                    v-if="
                      (h.BalanceQty || h.ToQa) &&
                      convertDate_JS_TO_SQL(getDate) >= h.DayWip
                    "
                  >
                    {{
                      h.ToQa && !h.BalanceQty
                        ? "จบ"
                        : h.BalanceQty.toLocaleString()
                    }}
                  </div>
                </td>
              </tr>

              <!-- row7 -->
              <tr>
                <td class="borderBottom">
                  <div class="fontSize8 mx-n3 py-1" align="center">
                    วันทำงาน
                  </div>
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
                <td
                  class="borderBottom"
                  :colspan="order.qaCalender.length"
                  rowspan="2"
                >
                  <div class="fontSize8"></div>
                </td>
              </tr>

              <!-- row8 -->
              <tr>
                <td class="borderBottom">
                  <!-- class="fontSize10 red--text font-weight-bold mx-n3" -->
                  <div
                    v-bind:class="{
                      'fontSize10 red--text font-weight-bold mx-n3':
                        order.WorkingDay < 0,
                      'fontSize10 orange--text font-weight-bold mx-n3':
                        order.WorkingDay >= 0 && order.WorkingDay <= 5,
                      'fontSize10 green--text font-weight-bold mx-n3':
                        order.WorkingDay > 5,
                    }"
                    align="center"
                  >
                    {{ order.WorkingDay }}
                  </div>
                </td>
                <td class="borderBottom">
                  <div
                    v-bind:class="{
                      'fontSize10 red--text font-weight-bold mx-n3':
                        order.TotalDay < 0,
                      'fontSize10 orange--text font-weight-bold mx-n3':
                        order.TotalDay >= 0 && order.TotalDay <= 5,
                      'fontSize10 green--text font-weight-bold mx-n3':
                        order.TotalDay > 5,
                    }"
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
    </div>

    <!-- POPUP ปฎิทิน -->
    <v-dialog
      v-model="dataFilter.dateBetween.showDialog"
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

    <!-- ใส่เป้าแรก -->
    <v-dialog
      v-model="dialogInputTarget.showDialog"
      :overlay="false"
      max-width="500px"
    >
      <v-card>
        <!-- <div align="right" class="pr-2 pt-2">
          <v-btn
            color="red"
            outlined
            dense
            small
            @click="dialogInputTarget.showDialog = false"
            >ปิด</v-btn
          >
        </div> -->
        <div class="px-5 pt-5">
          <v-row>
            <v-col cols="11">
              <v-text-field
                v-model="dialogInputTarget.dataInput.Qty"
                append-icon="mdi-edit"
                type="number"
                outlined
                dense
                :disabled="!dialogInputTarget.IsEditQty"
                :rules="dialogInputTarget.rulseInput"
              ></v-text-field>
            </v-col>
            <v-col cols="1"
              ><v-btn
                color="success"
                icon
                class="ml-n5"
                @click="
                  dialogInputTarget.IsEditQty = !dialogInputTarget.IsEditQty
                "
                ><v-icon>edit</v-icon></v-btn
              ></v-col
            >
          </v-row>
        </div>
        <div
          align="right"
          class="pb-2 pr-16"
          v-if="dialogInputTarget.IsEditQty"
        >
          <v-btn color="red" outlined dense class="mr-2">cancel</v-btn>
          <v-btn color="success" dense @click="confirmTarget()">Submit</v-btn>
        </div>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="showSnackBar"
      color="deep-orange lighten-2"
      timeout="1500"
    >
      <div class="fontSarabun fontSize16 text-center">
        กรุณาใส่ Order ที่ต้องการ
        <v-icon class="ml-1">mdi-order-alphabetical-ascending</v-icon>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import apiFacWip from "../services/apiFacWipStatus";
import apiMould from "../services/apiMould";
import InvForOrderNewVue from "./OrderStatus/InvForOrderNew.vue";
import SpinnerLoading from "../components/Loadings/SpinnerLoading.vue";
// import ItemInProcessVue from "./ItemInProcess.vue";

export default {
  name: "facwipstatus-master",
  data: () => ({
    showSnackBar: false,
    dataMaster: [],
    loadingPage: false,
    getDate: new Date(),
    filterMonth: {
      pushMonth: 0,
      getDate: new Date(),
      showMonth: "",
    },
    dataFilter: {
      dateBetween: {
        showDialog: false,
        values: [],
        showDate: "",
      },
      ByFac: {
        selectedFac: [],
        showFac: [
          {
            name: "Factory 1",
            value: "1",
          },
          {
            name: "Factory 2",
            value: "2",
          },
          {
            name: "Factory 3",
            value: "3",
          },
          {
            name: "Factory 4",
            value: "4",
          },
        ],
      },
      ByOrder: {
        showOrder: [],
        selectedOrder: "",
      },
      ByStatus: {
        showStatus: ["เลยกำหนดส่ง", "เร่งการผลิต", "ดีมาก", "ปกติ"],
        selectedStatus: [],
      },
    },
    dialogMaterail: {
      showDialog: false,
      orderNumber: "",
      material: 0,
    },
    dialogInputTarget: {
      showDialog: false,
      IsEditQty: false,
      rulseInput: [(v1) => !!v1 || "required", (v2) => v2 > 500000 || "TEST"], // TEST Validate
      choseIndexMaster: 0,
      choseIndexCalender: 0,
      choseTarget: "",
      dataInput: {
        DueDate: "",
        OrderNumber: "",
        choseTarget: "",
        Qty: 0,
        EmpCode: "",
      },
    },
  }),
  computed: {},
  components: {
    InvForOrderNewVue,
    SpinnerLoading,
  },
  async mounted() {
    this.convertDate_JS_TO_SQL(this.getDate);
    if (this.$store.state.filterFacwip !== null) {
      this.dataFilter = this.$store.state.filterFacwip;
      await this.getDateMaster();
    } else {
      this.dataFilter.dateBetween.showDate = "2022-01-01 ~ 2022-12-31";
      this.dataFilter.dateBetween.values[0] = "2022-01-01";
      this.dataFilter.dateBetween.values[1] = "2022-12-31";
      // this.dataFilter.ByOrder.selectedOrder = "MEJ076";
      this.dataFilter.ByFac.selectedFac = ["1", "2", "3", "4"];
      // await this.getDateMaster();
    }
  },
  methods: {
    async getDateMaster() {
      if (this.dataFilter.ByOrder.selectedOrder === "") {
        this.loadingPage = true;
        this.showSnackBar = true;
        setTimeout(() => {
          this.loadingPage = false;
        }, 1500);
      } else {
        this.loadingPage = true;
        this.dataMaster = await apiFacWip.getOrderStatusNew({
          orderFilter: this.dataFilter.ByOrder.selectedOrder,
          factory: this.dataFilter.ByFac.selectedFac,
          dateBetween: this.dataFilter.dateBetween.values,
        });
        setTimeout(() => {
          this.loadingPage = false;
        }, 500);
        // console.log(this.dataMaster);
        // console.log(this.getDate);
      }
    },
    async getOrderForFilter() {
      this.dataFilter.ByOrder.showOrder = await apiMould.getOrderNumber();
      this.dataFilter.ByOrder.showOrder = this.dataFilter.ByOrder.showOrder.map(
        ({ OrderNumber }) => OrderNumber
      );
      // console.log(res);
    },
    showDialogMaterail(orderNumber, materail, isCheck) {
      // console.log(index);
      if (isCheck) {
        this.dialogMaterail.material = materail;
        this.dialogMaterail.orderNumber = orderNumber;
        this.dialogMaterail.showDialog = true;
      }
    },
    gotoDetail(orderNumber) {
      this.$router.push({
        name: "facwipstatus-detail",
        params: {
          orderNumber: orderNumber,
        },
      });
      this.$store.state.filterFacwip = this.dataFilter;
    },
    filterDateBetween() {
      this.dataFilter.dateBetween.showDialog = false;
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
    InputTarget(
      { DayWip, FirstTarget, LastTarget },
      orderNumber,
      chose,
      indexMaster,
      indexCalendar
    ) {
      const sumTargetFirst = this.dataMaster[indexMaster].qaCalender.reduce(
        (pv, cv) => pv + cv.FirstTarget,
        0
      );
      const sumTargetLast = this.dataMaster[indexMaster].qaCalender.reduce(
        (pv, cv) => pv + cv.LastTarget,
        0
      );
      if (
        chose === "first" &&
        sumTargetFirst < this.dataMaster[indexMaster].TotalQty
      ) {
        this.dialogInputTarget.dataInput.DueDate = DayWip;
        this.dialogInputTarget.dataInput.OrderNumber = orderNumber;
        this.dialogInputTarget.dataInput.choseTarget = chose;
        this.dialogInputTarget.dataInput.Qty =
          chose === "first" ? FirstTarget : LastTarget;
        this.dialogInputTarget.dataInput.EmpCode = this.$store.state.username;
        this.dialogInputTarget.choseIndexMaster = indexMaster;
        this.dialogInputTarget.choseIndexCalender = indexCalendar;
        this.dialogInputTarget.showDialog = true;
      } else if (
        chose === "last"
        // กดโชว์ POP ไม่ตรวจสอบ จำนวน
        // && sumTargetLast < this.dataMaster[indexMaster].TotalQty
      ) {
        this.dialogInputTarget.dataInput.DueDate = DayWip;
        this.dialogInputTarget.dataInput.OrderNumber = orderNumber;
        this.dialogInputTarget.dataInput.choseTarget = chose;
        this.dialogInputTarget.dataInput.Qty =
          chose === "first" ? FirstTarget : LastTarget;
        this.dialogInputTarget.dataInput.EmpCode = this.$store.state.username;
        this.dialogInputTarget.choseIndexMaster = indexMaster;
        this.dialogInputTarget.choseIndexCalender = indexCalendar;
        this.dialogInputTarget.showDialog = true;
      }

      // console.log(indexMaster, indexCalendar);
    },
    async confirmTarget() {
      const oldQty =
        this.dialogInputTarget.dataInput.choseTarget === "first"
          ? this.dataMaster[this.dialogInputTarget.choseIndexMaster].qaCalender[
              this.dialogInputTarget.choseIndexCalender
            ].FirstTarget
          : this.dataMaster[this.dialogInputTarget.choseIndexMaster].qaCalender[
              this.dialogInputTarget.choseIndexCalender
            ].LastTarget;
      // console.log(oldQty);
      switch (this.dialogInputTarget.dataInput.choseTarget) {
        case "first":
          // console.log("first", oldQty);
          this.dataMaster[this.dialogInputTarget.choseIndexMaster].qaCalender[
            this.dialogInputTarget.choseIndexCalender
          ].FirstTarget = Number(this.dialogInputTarget.dataInput.Qty);
          const sumFirstTarget = this.dataMaster[
            this.dialogInputTarget.choseIndexMaster
          ].qaCalender.reduce((pv, cv) => pv + cv.FirstTarget, 0);
          if (
            sumFirstTarget <=
            this.dataMaster[this.dialogInputTarget.choseIndexMaster].TotalQty
          ) {
            // console.log("success");
            //INSERT DATA
            const res = await apiFacWip.insertDueQa(
              this.dialogInputTarget.dataInput
            );
            // console.log(res);
            //CLEAR DATA
            this.dialogInputTarget.IsEditQty = false;
            this.dialogInputTarget.dataInput.Qty = 0;
            this.dialogInputTarget.showDialog = false;
          } else {
            // ไม่อัพเดท Array เอาค่าเดิมมาแทน
            this.dataMaster[this.dialogInputTarget.choseIndexMaster].qaCalender[
              this.dialogInputTarget.choseIndexCalender
            ].FirstTarget = oldQty;
            // Sum หาผลรวมค่าเดิม เพื่อนำมาคำนวนหาค่าที่ควรต้องใส่
            const sumTargetDefault = this.dataMaster[
              this.dialogInputTarget.choseIndexMaster
            ].qaCalender.reduce((pv, cv) => pv + cv.FirstTarget, 0);
            // แทนค่าจำนวนที่ต้องใส่
            this.dialogInputTarget.dataInput.Qty =
              this.dataMaster[this.dialogInputTarget.choseIndexMaster]
                .TotalQty - sumTargetDefault;
            // console.log("fail");
          }
          break;
        case "last":
          // console.log("last", oldQty);
          this.dataMaster[this.dialogInputTarget.choseIndexMaster].qaCalender[
            this.dialogInputTarget.choseIndexCalender
          ].LastTarget = Number(this.dialogInputTarget.dataInput.Qty);
          const sumLastTarget = this.dataMaster[
            this.dialogInputTarget.choseIndexMaster
          ].qaCalender.reduce((pv, cv) => pv + cv.LastTarget, 0);
          if (
            sumLastTarget <=
            this.dataMaster[this.dialogInputTarget.choseIndexMaster].TotalQty
          ) {
            // console.log("success");
            //INSERT DATA
            const res = await apiFacWip.insertDueQa(
              this.dialogInputTarget.dataInput
            );
            // console.log(res);
            //CLEAR DATA
            this.dialogInputTarget.IsEditQty = false;
            this.dialogInputTarget.dataInput.Qty = 0;
            this.dialogInputTarget.showDialog = false;
          } else {
            // ไม่อัพเดท Array เอาค่าเดิมมาแทน
            this.dataMaster[this.dialogInputTarget.choseIndexMaster].qaCalender[
              this.dialogInputTarget.choseIndexCalender
            ].LastTarget = oldQty;
            // Sum หาผลรวมค่าเดิม เพื่อนำมาคำนวนหาค่าที่ควรต้องใส่
            const sumLastTargetDefault = this.dataMaster[
              this.dialogInputTarget.choseIndexMaster
            ].qaCalender.reduce((pv, cv) => pv + cv.LastTarget, 0);
            // แทนค่าจำนวนที่ต้องใส่
            this.dialogInputTarget.dataInput.Qty =
              this.dataMaster[this.dialogInputTarget.choseIndexMaster]
                .TotalQty - sumLastTargetDefault;
            // console.log("fail");
          }

          break;
        default:
          break;
      }
    },
    convertDate_JS_TO_SQL(date) {
      const valueDate = `${this.$moment(date).format("YYYY")}-${this.$moment(
        date
      ).format("MM")}-${this.$moment(date).format("DD")}`;
      return valueDate;
    },
    showHistoryLateQa(OrderNumber, count) {
      if (count > 0) {
        console.log(OrderNumber);
      }
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
