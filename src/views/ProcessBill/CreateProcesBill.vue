<template>
  <v-container grid-list-xs class="mt-16">
    <v-app-bar
      app
      color="white"
      class="mt-12"
      height="80"
      v-if="$route.path === '/process-create-bill'"
    >
      <v-spacer></v-spacer>
      <v-btn
        class="mr-10"
        v-if="step !== 0"
        color="red"
        dark
        @click="step > 0 ? --step : (step = 0)"
        >กลับ</v-btn
      >

      <v-toolbar-title class="fontSarabun fontSize20">
        <b>{{ title[step] }} </b>
        <b v-if="step === 1"
          >แผนก :
          <u class="fontSize24">{{ selectedProcess.PDProcessName }}</u></b
        >
      </v-toolbar-title>
      <v-btn class="ml-10" color="success" @click="next()" v-if="step < 3"
        >ถัดไป</v-btn
      >
      <v-spacer></v-spacer>

      <!-- <v-badge color="red" content="16" class="mr-2" v-if="step >= 1">
        <v-icon large color="black">mdi-cart</v-icon>
      </v-badge> -->
      <v-badge
        :color="valuesCart.length > 0 ? 'red' : ''"
        :content="valuesCart.length"
        class="mr-2"
        v-if="step >= 1 && step < 3"
      >
        <v-menu bottom offset-y width="120">
          <template v-slot:activator="{ on, attrs }">
            <v-icon large color="black" v-bind="attrs" v-on="on"
              >mdi-cart</v-icon
            >
          </template>
          <v-list
            style="max-height: 500px"
            width="450"
            class="overflow-y-auto fontPrompt"
          >
            <v-list-item
              align="center"
              @click="() => {}"
              v-for="(item, index) in valuesCart"
              :key="index"
            >
              <div>{{ item.OrderItemNo }}</div>
              <v-list-item-avatar width="80" height="60" class="ml-5">
                <v-img :src="item.NewPict" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  ><b>{{ item.ProductCode }}</b>
                </v-list-item-title>
                <div>JobNumber : {{ item.JobNumber }}</div>
                <div class="fontSize18">
                  จำนวน :
                  <b>{{ item.QtySend.toLocaleString() }} ชิ้น</b>
                </div>
                <div class="grey--text">
                  น้ำหนัก :
                  <b>{{ item.WeightSend.toLocaleString() }} g.</b>
                </div>
              </v-list-item-content>

              <v-btn icon @click="deleteItem(item.OrderItemNo, index)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list align="center" class="fontSarabun">
              <div class="fontSize18">
                จำนวนรวมชิ้นงานที่ต้องการส่งทั้งหมด :
                <b class="fontSize20">{{
                  valuesCart
                    .reduce((pv, cv) => pv + cv.QtySend, 0)
                    .toLocaleString()
                }}</b>
                ชิ้น
              </div>
            </v-list>
          </v-list>
        </v-menu>
      </v-badge>
    </v-app-bar>

    <v-row>
      <v-col>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              :complete="step >= 0"
              step="FR"
              color="orange"
              complete-icon="done"
            >
              เลือกแผนกต้นทาง
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step >= 1"
              step="SE"
              color="blue"
              complete-icon="done"
            >
              เลือกงานที่ต้องการโอน
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step >= 2"
              step="TO"
              color="pink"
              complete-icon="done"
            >
              เลือกแผนกปลายทาง
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step >= 3"
              step="OK"
              color="green"
              complete-icon="done"
            >
              ยืนยันบิลแล้ว
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <ProcessChoice v-if="step === 0" @selectedProcess="returnProcess" />
        <ProcessSelectItem
          v-if="step === 1"
          :processCodeProps="selectedProcess.PDProcessCode"
          ref="selectedOrder"
          @ReturnupdateCart="updateCart"
          max-height="300"
        />
        <ProcessChoiceNew v-if="step === 2" />
        <VerifyBill
          v-if="step === 3"
          @insertSucess="SuccessBill"
          :propsValuesCart="valuesCart"
        />
      </v-col>
    </v-row>

    <v-row v-if="step < 3">
      <v-col align="center">
        <div class="fontSarabun fontSize18">{{ title[step] }}</div>
      </v-col>
    </v-row>

    <v-row v-if="step < 3">
      <v-col align="center" v-if="step !== 0">
        <v-btn color="red" dark @click="step > 0 ? --step : (step = 0)"
          >กลับ</v-btn
        >
      </v-col>

      <v-col align="center">
        <v-btn color="success" @click="next()">ถัดไป</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="step < 3">
      <v-col>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              :complete="step >= 0"
              step="FR"
              color="orange"
              complete-icon="done"
            >
              เลือกแผนกต้นทาง
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step >= 1"
              step="SE"
              color="blue"
              complete-icon="done"
            >
              เลือกงานที่ต้องการโอน
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step >= 2"
              step="TO"
              color="pink"
              complete-icon="done"
            >
              เลือกแผนกปลายทาง
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="step >= 3"
              step="OK"
              color="green"
              complete-icon="done"
            >
              ยืนยันบิลแล้ว
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackBar.showSnackBar" top>
      <div class="fontSarabun fontSize20 text-center">
        {{ snackBar.titleSnackBar }}
        <v-icon large class="ml-1" :color="snackBar.colorSnackBar">{{
          snackBar.iconSnackBar
        }}</v-icon>
      </div>
    </v-snackbar>

    <v-dialog v-model="dialogSuccessBill.showDialog">
      <v-card align="center" class="fontSarabun">
        <div align="right" class="pr-2 pt-2">
          <v-icon color="blue" large>mdi-printer</v-icon>
        </div>
        <v-img :src="dialogSuccessBill.urlImgSuccess" width="250" />
        <div align="center">
          <h3 class="headline mt-2">{{ dialogSuccessBill.title }}</h3>
          <div class="fontSize18">
            <b>เลขที่บิล :</b> {{ dialogSuccessBill.subtitle }}
          </div>
        </div>
        <v-card-actions class="mt-5 pb-5">
          <v-spacer></v-spacer>
          <v-btn color="green" width="120" dark @click="goCreateBillAgain()"
            >เปิดบิลโอนใหม่
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue" width="150" dark @click="gotoReceiveBill()"
            >ดูรายการบิลทั้งหมด</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="red" width="120" dark @click="backtomenu()"
            >กลับเมนูหลัก</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ProcessChoice from "./ProcessChoice";
import ProcessChoiceNew from "./ProcessChoiceNew.vue";
import ProcessSelectItem from "./ProcessSelectItem";
import VerifyBill from "./verifyBillProcess.vue";
import apiProcess from "../../services/apiProcess";

export default {
  name: "process-create-bill",
  data() {
    return {
      valuesCart: [],
      step: 0,
      title: [
        "กรุณาเลือกแผนกต้นทาง ที่ต้องการโอน",
        "กรุณาเลือกงานที่ต้องการโอน",
        "กรุณาเลือกแผนกปลายทาง",
        "กรุณาตรวจสอบการโอน",
      ],
      orderList: [],
      selectedOrder: "",
      selectedProcess: {
        PDProcessCode: "",
        PDProcessName: "",
      },
      snackBar: {
        showSnackBar: false,
        titleSnackBar: "",
        colorSnackBar: "",
        iconSnackBar: "",
      },
      dialogSuccessBill: {
        urlImgSuccess: "",
        showDialog: false,
        title: "",
        subtitle: "",
      },
    };
  },
  components: {
    ProcessChoice,
    ProcessSelectItem,
    ProcessChoiceNew,
    VerifyBill,
  },
  mounted() {
    this.loadOrderforprocess();
  },
  methods: {
    alertShow(show, title, color, icon) {
      this.snackBar = {
        showSnackBar: show,
        titleSnackBar: title,
        colorSnackBar: color,
        iconSnackBar: icon,
      };
    },
    async loadOrderforprocess() {
      this.orderList = await (
        await apiProcess.getOrderforprocess()
      ).data.map(({ OrderNumber }) => OrderNumber);
      // console.log(this.orderList);
    },
    async selectedOrderlist() {
      this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber =
        this.selectedOrder;
      this.$refs.selectedOrder.selectedOrder(this.selectedOrder);
      // console.log(this.selectedOrder);
    },
    returnProcess(values) {
      // console.log("ที่นี้หน้าหลัก", values);
      if (
        this.selectedProcess.PDProcessCode === "" ||
        this.selectedProcess.PDProcessCode === undefined
      ) {
        this.selectedProcess.PDProcessCode = values.selectedProcessCode;
        this.selectedProcess.PDProcessName = values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step1.selectedProcess =
          values.selectedProcessCode;
        this.$store.state.processBill.processBillCreate.step1.selectedProcessName =
          values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step2.dataItem = [];
        this.valuesCart = [];
      } else if (
        this.valuesCart.length > 0 &&
        this.selectedProcess.PDProcessCode !== values.selectedProcessCode
      ) {
        this.alertShow(
          true,
          "หากเปลี่ยนแผนกจะลบข้อมูลในตะกร้าออก",
          "amber",
          "mdi-alert-circle"
        );
        this.selectedProcess.PDProcessCode = values.selectedProcessCode;
        this.selectedProcess.PDProcessName = values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step1.selectedProcess =
          values.selectedProcessCode;
        this.$store.state.processBill.processBillCreate.step1.selectedProcessName =
          values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step2.dataItem = [];
        this.valuesCart = [];
        this.$store.state.processBill.processBillCreate.step3.selectedProcess =
          "";
      } else if (
        this.selectedProcess.PDProcessCode === values.selectedProcessCode
      ) {
        this.selectedProcess.PDProcessCode = values.selectedProcessCode;
        this.selectedProcess.PDProcessName = values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step1.selectedProcess =
          values.selectedProcessCode;
        this.$store.state.processBill.processBillCreate.step1.selectedProcessName =
          values.selectedProcessName;
      } else {
        this.selectedProcess.PDProcessCode = values.selectedProcessCode;
        this.selectedProcess.PDProcessName = values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step1.selectedProcess =
          values.selectedProcessCode;
        this.$store.state.processBill.processBillCreate.step1.selectedProcessName =
          values.selectedProcessName;
        this.$store.state.processBill.processBillCreate.step2.dataItem = [];
        this.valuesCart = [];
        this.$store.state.processBill.processBillCreate.step3.selectedProcess =
          "";
      }

      // console.log("ที่นี้หน้าหลัก", this.selectedProcess.PDProcessName);
    },
    updateCart(values) {
      this.valuesCart = values;
      // console.log("ss", values);
    },
    next() {
      switch (this.step) {
        case 0:
          if (
            this.selectedProcess.PDProcessCode === "" ||
            this.selectedProcess.PDProcessCode === undefined
          ) {
            this.alertShow(
              true,
              "กรุณาเลือกแผนกต้นทางที่ต้องการโอน",
              "yellow",
              "mdi-alert-circle"
            );
          } else {
            this.step++;
          }
          break;
        case 1:
          if (this.valuesCart.length > 0) {
            this.step++;
          } else {
            this.alertShow(true, "กรุณาเลือกสินค้าเพื่อโอน", "red", "mdi-ring");
          }

          // console.log(this.step);
          break;
        case 2:
          if (
            this.$store.state.processBill.processBillCreate.step3
              .selectedProcess !== ""
          ) {
            this.step++;
          } else {
            this.alertShow(
              true,
              "กรุณาเลือกแผนกปลายทาง",
              "yellow",
              "mdi-alert-circle"
            );
          }
          break;
        case 3:
          // console.log(this.step);
          break;
      }
    },
    back() {
      // to do
    },
    deleteItem(ItemNo, index) {
      //ลบจากตะกร้า
      this.valuesCart.splice(index, 1);

      //ลบจากที่หน้าเลือก Item
      //กำลังจะทำลบ งานออกจากตะกร้าที่หน้าย่อย ต้องเอาข้อมูลไปใส่ไว้ใน Store State
      this.$store.state.processBill.processBillCreate.step2.dataItem[
        this.$store.state.processBill.processBillCreate.step2.dataItem.findIndex(
          ({ OrderItemNo }) => OrderItemNo === ItemNo
        )
      ].QtySend = 0;
    },
    SuccessBill(values) {
      const { resultInsert, toProcess } = values;
      console.log(resultInsert);
      this.dialogSuccessBill.urlImgSuccess =
        "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/Transfer/check.png";
      this.dialogSuccessBill.showDialog = true;
      this.dialogSuccessBill.title = "เปิดบิลโอนงานสำเร็จแล้ว";
      this.dialogSuccessBill.subtitle = resultInsert.DocMaker;
    },
    goCreateBillAgain() {
      this.valuesCart = [];
      this.step = 1;
      this.$store.state.processBill.processBillCreate.step2.dataItem = [];
      this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber = "";
      this.dialogSuccessBill.showDialog = false;
    },
    async gotoReceiveBill() {
      this.dialogSuccessBill.showDialog = false;
      await this.$router.push({
        name: "receivebill-process-master",
        params: {
          createDoc: this.dialogSuccessBill.subtitle,
          fromProcess:
            this.$store.state.processBill.processBillCreate.step1.selectedProcess.trim(),
          toProcess:
            this.$store.state.processBill.processBillCreate.step3.selectedProcess.trim(),
        },
      });
      this.setDefaultvaluesCreate();
    },
    async backtomenu() {
      this.dialogSuccessBill.showDialog = false;
      this.$router.go(-1);
      this.setDefaultvaluesCreate();
    },
    setDefaultvaluesCreate() {
      this.valuesCart = [];
      this.selectedOrder = [];
      this.selectedProcess.PDProcessCode = "";
      this.$store.state.processBill = {
        processBillCreate: {
          step1: {
            selectedProcess: "",
            selectedProcessName: "",
          },
          step2: {
            selectedItem: [],
            dataItem: [],
            orderNumber: "",
          },
          step3: {
            selectedProcess: "",
            selectedProcessName: "",
          },
        },
      };
    },
  },
};
</script>

<style>
</style>