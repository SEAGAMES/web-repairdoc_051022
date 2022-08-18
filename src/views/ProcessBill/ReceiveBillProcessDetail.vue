<template>
  <v-container grid-list-xs v-if="!$store.state.loadingPage">
    <v-card>
      <v-row>
        <v-col align="end">
          <v-btn
            color="red lighten-2"
            dark
            class="mr-1"
            @click="$router.back(-1)"
            >กลับ</v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <!-- ผู้ส่งงาน -->
        <v-col lg="2" md="2" sm="2" class="ml-2" align="center">
          <v-img
            :src="dataReceive.EmpDocMaker.EmpPict"
            width="150"
            height="100"
          />
          <v-btn color="blue " dark small class="mt-2">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </v-col>

        <v-col lg="4" md="4" sm="4">
          <span class="fontSize14">
            <b> ผู้ส่งบิล: </b>
            <span class="pl-4"
              >{{ dataReceive.EmpDocMaker.EmpFName }} (
              {{ dataReceive.EmpDocMaker.NickName }} )</span
            >
          </span>
          <br />

          <span class="fontSize14">
            <b> วันที่ส่งบิล : </b>
            {{ dataReceive.billDate | moment("L") }}
          </span>
          <br />

          <span class="fontSize14">
            <b> เลขที่เอกสาร : </b>
            <span>{{ dataReceive.billDocNumber }}</span>
          </span>
          <br />

          <span class="fontSize14">
            <b> OrderNumber : </b>
            <br />
            <span class="pl-0">{{ dataReceive.orderNumber }}</span>
          </span>
          <br />
        </v-col>

        <!-- ผู้รับงาน -->
        <v-col lg="2" md="2" sm="2">
          <v-img
            :src="
              dataReceive.EmpReceive !== null
                ? dataReceive.EmpReceive.EmpPict
                : ''
            "
            width="150"
          />
        </v-col>

        <v-col lg="3" md="3" sm="3">
          <span class="fontSize14">
            <b> ผู้รับบิล: </b>
            <span class="pl-7 brown--text">....</span>
          </span>
          <br />

          <span class="fontSize14">
            <b> วันที่รับบิล : </b>

            55555
          </span>
          <br />

          <br />
          <v-btn color="success" @click="clickReceiveBill()" dark
            >ยืนยันรับงาน</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-if="dataReceive.productBill.length > 0" class="mt-n5">
        <v-col>
          <v-card class="ma-7">
            <v-simple-table class="border">
              <template v-slot:default>
                <thead>
                  <tr align="center" class="bgColorHeader">
                    <th class="text-center" width="80">
                      <div class="fontSize16"><b>รายการที่</b></div>
                    </th>
                    <th class="text-center" width="80">
                      <div class="fontSize16">
                        <b>รหัสสินค้า</b>
                      </div>
                    </th>
                    <th class="text-center" width="200">
                      <div class="fontSize16">
                        <b>จำนวนที่โอน</b>
                      </div>
                    </th>
                    <th class="text-center" width="200">
                      <div class="fontSize16">
                        <b>นน. ที่โอน</b>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="Product in dataReceive.productBill"
                    :key="Product.itemNo"
                    align="center"
                  >
                    <td>
                      <div class="fontSize14">
                        {{ Product.itemNo }}
                      </div>
                    </td>

                    <!-- รหัสสินค้า -->
                    <td align="center" width="200">
                      <v-img
                        :src="Product.NewPict"
                        :lazy-src="$store.state.no_picture"
                        width="130"
                        class="mt-1"
                      />
                      <div class="fontSize13">{{ Product.ProductCode }}</div>
                      <div class="fontSize13 grey--text">
                        {{ Product.JobNumber }}
                      </div>
                    </td>

                    <!-- จำนวนที่โอน -->
                    <td>
                      <div class="fontSize14">
                        {{ Product.QtySend }}
                      </div>
                    </td>

                    <!-- น้ำหนักที่โอน -->
                    <td>
                      <div class="fontSize14">
                        {{ Product.WeightSend }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="ma-5" align="end">
          <v-btn color="red" dark @click="$router.back(-1)">กลับ</v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog
      v-model="dialogConfirm.showDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="fontPrompt">
        <v-card-title
          primary-title
          :class="dialogConfirm.colorHeader + ' white--text'"
        >
          <div class="fontSize22">
            {{ dialogConfirm.titleDialog }}
          </div>
        </v-card-title>

        <v-card-title>
          <div>
            <div class="fontSarabun fontSize18">
              {{ dialogConfirm.subtitleDialog }}
            </div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-Spacer></v-Spacer>
          <v-btn color="success" @click="dialogConfirm.summitConfirm()"
            >ยืนยัน</v-btn
          >
          <v-btn color="white" @click="showDialog(false)" light>ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import apiProcess from "../../services/apiProcess";
export default {
  data() {
    return {
      dataReceive: {
        bill_ID: 0,
        orderNumber: "",
        billDocNumber: "",
        fromProcess: "",
        toProcess: "",
        billDate: "",
        DocMaker: "",
        ReceivePerson: "",
        statusBill: "",
        EmpDocMaker: {
          EmpFName: "",
          NickName: "",
          EmpPict: "",
        },
        EmpReceive: {
          EmpFName: "",
          NickName: "",
          EmpPict: "555",
        },
        FromPDProcess: {
          PDProcessName: "",
        },
        ToPDProcess: {
          PDProcessName: "",
        },
        productBill: [],
      },
      dialogConfirm: {
        showDialog: false,
        titleDialog: "",
        subtitleDialog: "",
        colorHeader: "",
        summitConfirm: () => {},
      },
    };
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    this.dataReceive = this.$route.params;
    await this.loadPict();
    setTimeout(async () => {
      this.$store.state.loadingPage = false;
    }, 500);
    // console.log(this.dataReceive);
  },
  methods: {
    async loadPict() {
      const { data } = await apiProcess.getPict(this.dataReceive.bill_ID);
      this.dataReceive.productBill = data;
      this.dataReceive.EmpDocMaker.EmpPict = `http://192.168.3.5:3000/picture/PICTURE2/employee/${this.dataReceive.DocMaker}.jpg`;
      if (this.dataReceive.EmpReceive !== null) {
        this.dataReceive.EmpReceive.EmpPict = `http://192.168.3.5:3000/picture/PICTURE2/employee/${this.dataReceive.ReceivePerson}.jpg`;
      }
      // console.log(this.dataReceive);
      //
      // console.log(this.dataReceive.statusBill);
    },
    async clickReceiveBill() {
      // console.log(this.dataReceive.statusBill);
      if (this.dataReceive.statusBill === null) {
        this.showDialog(
          true,
          "คุณต้องการยืนยันรับงานในบิลนี้ใช่หรือไม่ ? ",
          "คุณได้ตรวจสอบข้อมูลของบิลนี้แล้ว และยินยอมรับสินค้าในบิลนี้",
          "green",
          () => {
            console.log("confirmBill => OK");
          }
        );
      }
    },
    showDialog(isShow, title, subtitle, color, fn) {
      this.dialogConfirm.showDialog = isShow;
      this.dialogConfirm.titleDialog = title;
      this.dialogConfirm.subtitleDialog = subtitle;
      this.dialogConfirm.colorHeader = color;
      this.dialogConfirm.summitConfirm = fn;
    },
  },
};
</script>

<style>
</style>