<template>
  <div fullscreen class="fontSarabun">
    <div align="right" class="mt-2 mr-2">
      <v-btn
        dark
        color="red lighten-2"
        @click="$router.go(-1)"
        dense
        small
        width="5"
        ><div class="ma-n16 fontSize9" align="center">กลับ</div>
      </v-btn>
    </div>

    <v-card color="grey lighten-5" class="justify-center d-flex align-center">
      <div
        align="center"
        style="font-family: Sarabun; color: darkcyan; font-size: 14px"
      >
        สถานะของวันที่ :
        <span class="darkcyan--text">{{ getDate | moment("LLLL") }}</span
        ><br />
        <span
          >Order NO : <b>{{ orderNumber }}</b>
        </span>
        <br />
        <span>จำนวน : 3,010</span>
      </div>
    </v-card>

    <v-card
      v-for="(item, indexProduct) in dataProduct"
      :key="indexProduct"
      class="mt-5"
    >
      <v-simple-table dense class="tableDetail">
        <template v-slot:default>
          <thead>
            <!-- Row1 -->
            <tr>
              <th class="borderLeft" colspan="2">
                <div class="fontSize10 my-2" align="center">
                  <b>Code & PIC</b>
                </div>
              </th>

              <th class="borderLeft">
                <div class="fontSize10 mx-1 my-2" align="center">วัตถุดิบ</div>
              </th>

              <th class="borderLeft">
                <div class="fontSize10 my-2" align="center">สถานะ</div>
              </th>

              <th class="borderLeft">
                <div class="fontSize10 mx-n3 my-2" align="center">แผนก</div>
              </th>

              <th
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R1' + indexProcess"
              >
                <div class="fontSize10 mx-n3 my-2" align="center">
                  {{ process.PDProcessName }}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <!-- Row2 -->
            <tr>
              <td class="borderLeft" rowspan="4" colspan="2">
                <div class="mx-n1" align="center">
                  <v-row>
                    <v-col cols="1">
                      <div align="left" class="fontSize9 mx-n3">
                        {{ item.ItemNo }}
                      </div>
                    </v-col>
                    <v-col cols="11">
                      <v-img
                        :src="item.NewPict"
                        :lazy-src="$store.state.no_picture"
                        width="120"
                        class="mx-n3 mt-n9 mr-n7"
                      ></v-img>
                    </v-col>
                  </v-row>
                </div>
              </td>
              <td
                v-bind:class="{
                  'borderLeft grey lighten-3': item.StatsInv.TotalReq === 0,
                  'borderLeft teal accent-3': item.StatsInv.LateDay > 3,
                  'borderLeft amber lighten-3':
                    item.StatsInv.LateDay <= 3 && item.StatsInv.LateDay >= 0,
                  'borderLeft red lighten-4': item.StatsInv.LateDay < 0,
                }"
                rowspan="2"
              >
                <div
                  class="fontSize12 mx-n3 my-3"
                  align="center"
                  @click="
                    showMaterail(item.ItemNo, 'stone', item.StatsInv.TotalReq)
                  "
                >
                  พลอย
                </div>
              </td>
              <td class="borderLeft" rowspan="2">
                <div
                  class="fontSize11 mx-n3 font-weight-bold"
                  v-bind:class="{
                    'red--text': item.StatsInv.LateDay < 0,
                    'orange--text':
                      item.StatsInv.LateDay >= 0 && item.StatsInv.LateDay <= 3,
                    'green--text': item.StatsInv.LateDay > 3,
                  }"
                  align="center"
                  v-if="item.StatsInv.TotalReq > 0"
                >
                  {{ item.StatsInv.IsFinish ? "จบ" : item.StatsInv.LateDay }}
                </div>
              </td>
              <td class="borderLeft">
                <div class="fontSize9 mx-n3 my-1" align="center">ขั้นตอน</div>
              </td>

              <td
                width="5"
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R2' + indexProcess"
              >
                <div class="fontSize9 mx-n3 colorTextTitle" align="center">
                  <!-- ยังไม่มี SUB  -->
                </div>
              </td>
            </tr>

            <!-- Row3 -->
            <tr>
              <td class="borderLeft">
                <div class="fontSize9 my-1 mx-n3" align="center">จน. จุด</div>
              </td>
              <td
                width="5"
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R3' + indexProcess"
              >
                <div class="fontSize9 mx-n3 colorTextTitle" align="center">
                  <!-- ยังไม่มี SUB  -->
                </div>
              </td>
            </tr>

            <!-- Row4 -->
            <tr>
              <td
                class="borderLeft grey lighten-3"
                rowspan="2"
                @click="showMaterail(item.ItemNo, 'part', 1)"
              >
                <div class="fontSize12" align="center">อะไหล่</div>
              </td>
              <td class="borderLeft" rowspan="2">
                <div class="fontSize11 mx-n3 font-weight-bold" align="center">
                  <!-- ยังไม่มี -->
                </div>
              </td>
              <td class="borderLeft">
                <div class="fontSize9 mx-n3 my-1" align="center">
                  จน. จุดรวม
                </div>
              </td>
              <td
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R4' + indexProcess"
              >
                <div class="fontSize9 mx-n3 colorTextTitle" align="center">
                  <!-- ยังไม่มี  -->
                </div>
              </td>
            </tr>

            <!-- Row5 -->
            <tr>
              <td class="borderLeft">
                <div class="fontSize9 mx-n4 my-1" align="center">
                  กำหนดเสร็จ
                </div>
              </td>
              <td
                width="5"
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R5' + indexProcess"
              >
                <div class="fontSize9 mx-n3 colorTextTitle" align="center">
                  <!-- ยังไม่มี -->
                </div>
              </td>
            </tr>

            <!-- Row6 -->
            <tr>
              <td class="borderLeft" colspan="2">
                <div class="fontSize10 mx-n3 font-weight-bold" align="center">
                  <span>{{ item.ProductCode }}</span>
                </div>
              </td>
              <td class="borderLeft yellow lighten-2">
                <div class="fontSize11 mx-n4" align="center">เหลือวันทำงาน</div>
              </td>
              <td class="borderLeft">
                <div
                  class="fontSize11 mx-n3 my-2 amber--text font-weight-bold"
                  align="center"
                >
                  5
                </div>
              </td>
              <td class="borderLeft">
                <div class="fontSize9 mx-n3" align="center">ยอดงาน</div>
              </td>
              <td
                width="5"
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R6' + indexProcess"
              >
                <div
                  :class="
                    process.TotalInProcess > 0
                      ? 'fontSize11 mx-n3 colorTextTitle font-weight-bold'
                      : 'fontSize11 mx-n3 red--text font-weight-bold'
                  "
                  align="center"
                  v-if="process.TotalInProcess > 0"
                >
                  {{ process.TotalInProcess }}
                </div>
              </td>
            </tr>

            <!-- Row7 -->
            <tr>
              <td class="borderLeft">
                <div class="fontSize9 mx-n4" align="center">จำนวน :</div>
              </td>
              <td class="borderLeft">
                <div
                  class="fontSize10 mx-5 font-weight-bold py-1"
                  align="center"
                >
                  {{ item.JobQty.toLocaleString() }}
                </div>
              </td>
              <td class="borderLeft yellow lighten-2">
                <div class="fontSize11 mx-n4" align="center">
                  เหลือวันทั้งหมด
                </div>
              </td>
              <td class="borderLeft font-weight-bold">
                <div class="fontSize11 mx-n3 green--text" align="center">7</div>
              </td>
              <td class="borderLeft">
                <div class="fontSize9" align="center">เลทแผนก</div>
              </td>
              <td
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R7' + indexProcess"
              >
                <div
                  align="center"
                  :class="
                    process.LateProcess > 0
                      ? 'fontSize9 mx-n3 colorTextTitle'
                      : 'fontSize11 mx-n3 red--text font-weight-bold'
                  "
                >
                  <!-- ยังไม่มี -->
                </div>
              </td>
            </tr>

            <!-- Row8 -->
            <tr>
              <td class="borderLeft" colspan="4">
                <div class="fontSize9 ml-n3 py-2" align="left">QA SPEC :</div>
              </td>

              <td class="borderLeft">
                <div class="fontSize9 mx-n3 py-2" align="center">
                  ข้อมูลการผลิต
                </div>
              </td>
              <td
                class="borderLeft"
                v-for="(process, indexProcess) in item.PDProcess"
                :key="'R8' + indexProcess"
              >
                <div class="fontSize9 mx-n3" align="center">
                  <!-- ยังไม่มี -->
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <!-- POPUP Product For Inv  -->
    <v-dialog
      v-model="showDialogMaterail.showDialog"
      persistent
      :overlay="false"
      width="900"
    >
      <v-card>
        <div align="right" class="pt-2 mr-2">
          <v-btn color="red" dark @click="showDialogMaterail.showDialog = false"
            >close</v-btn
          >
        </div>
        <div align="center">
          <ProductForInvNew
            :dataInput="showDialogMaterail"
            v-if="showDialogMaterail.showDialog"
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import apiFacWipStatus from "../services/apiFacWipStatus";
import apiOrderStatus from "../services/apiOrderStatus";
import InvForProductNewVue from "./OrderStatus/InvForProductNew.vue";
import ProductForInvNew from "./OrderStatus/ProductForInv.vue";

export default {
  name: "facwipstatus-detail",
  data: () => ({
    orderNumber: "",
    getDate: new Date(),

    dataProduct: [],
    dataPDSubProcess: [],
    showDialogMaterail: {
      showDialog: false,
      orderNumber: "",
      orderItemNo: "",
      select: "",
    },
  }),
  computed: {},
  components: {
    InvForProductNewVue,
    ProductForInvNew,
  },
  async mounted() {
    // console.log(this.$route.params.orderNumber);
    this.orderNumber = this.$route.params.orderNumber;
    await this.loadDataProduct();
    // this.mapSubProcess();
    // orderNumber
  },
  methods: {
    async loadDataProduct() {
      // const res = await apiOrderStatus.getProduct(this.orderNumber);
      // this.dataProduct = res;
      const response = await apiFacWipStatus.getProductStatusNew({
        orderNumber: this.orderNumber,
      });
      this.dataProduct = response;
      // console.log(response);
    },
    mapSubProcess() {
      let aa = this.dataInProcess;
      this.dataPDSubProcess = [];
      aa.forEach((i, index) => {
        this.dataPDSubProcess = this.dataPDSubProcess.concat(i.PDSubProcess);
      });
    },
    showMaterail(orderItemNo, select, isCheck) {
      if (isCheck > 0) {
        this.showDialogMaterail.orderItemNo = orderItemNo;
        this.showDialogMaterail.select = select;
        this.showDialogMaterail.orderNumber = this.orderNumber;
        this.showDialogMaterail.showDialog = true;
      }
    },
  },
};
</script>

<style lang="scss">
.borderLeft {
  border-left: 1px solid rgb(214, 214, 214);
}

.borderRight {
  border-right: 1px solid rgb(214, 214, 214);
}
.borderHeaderTopLine {
  border-top: 1px solid rgb(214, 214, 214);
  border-left: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}

.borderBottom {
  border-left: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}

.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
td {
  width: 1px !important;
  height: 1px !important;
}

.colorTextTitle {
  color: rgb(110, 108, 108);
}

.tableDetail table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgba(233, 233, 233, 0.644);
  height: 50px !important;
}
</style>