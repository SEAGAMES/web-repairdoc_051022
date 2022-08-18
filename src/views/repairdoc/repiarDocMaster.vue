<template>
  <v-container id="repairdoc-master" class="fontSarabun" v-if="!$store.state.loadingPage">
    <!-- Summary Section -->
    <v-row v-if="showHeaderSum">
      <v-col lg="3" md="6" sm="12" cols="12" class="fontPrompt">
        <StockCard
          title="แจ้งซ่อมแล้ว"
          :subtitle= $store.getters.getSumBill.request
          avatar_bg="#0000FF"
          avatar_ic="mdi-briefcase-download"
          dark
          class="fontPrompt"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard title="รอซ่อม" :subtitle= $store.getters.getSumBill.confirm avatar_bg="#f39C12" avatar_ic="mdi-wrench" dark />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="รออะไหล่"
          :subtitle= $store.getters.getSumBill.waitPart
          avatar_bg="#ff0000"
          avatar_ic="mdi-cart-arrow-down"
          dark
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="ซ่อมเสร็จ"
          :subtitle= $store.getters.getSumBill.finish
          avatar_bg="#00a65a"
          avatar_ic="mdi-emoticon-outline"
          dark
        />
      </v-col>
    </v-row>

    <!-- Table Section -->
    <v-card>
      <v-data-table :search="dataFilter.search" :headers="headers" :items="billRepair" class="elevation-1 tableRepair" multi-sort :items-per-page="15">
        <template v-slot:top>
          <v-toolbar flat color="white" class="fontSarabun fontSize12">
            <v-text-field
              v-model="dataFilter.search"
              append-icon="search"
              label="ค้นหาจากเลขที่บิล"
              single-line
              hide-details
              outlined
              dense
              class="mr-1"
            ></v-text-field>

            <v-select
              label="เลือกแผนก"
              :items="dataFilter.jobType.showFilter"
              item-text="typeName"
              item-value="id"
              v-model="dataFilter.jobType.values"
              outlined
              dense
              hide-details
              append-icon="build"
              multiple
              clearable
              class="mr-1"
              color="amber"
              @change="filterAll()"
            />

            <v-text-field
              label="ค้นหาจากวันที่"
              v-model="dataFilter.dateBetween.showDate"
              outlined
              hide-details
              color="amber"
              readonly
              append-icon="mdi-calendar-month"
              dense
              class="mr-1"
              @click="dataFilter.dateBetween.showPopup = true"
            />

            <v-select
              label="ค้นหาจากสถานะ"
              :items="statusShow"
              item-text="Status"
              item-value="id"
              v-model="dataFilter.status.values"
              color="amber"
              outlined
              dense
              hide-details
              append-icon="mdi-format-line-spacing"
              multiple
              clearable
              class="mr-1"
              @change="filterAll()"
            />
            <v-spacer></v-spacer>
             <v-btn 
             v-if="$store.state.levelUser.policyCode === '03' || $store.state.levelUser.policyCode === '02'" 
             color="amber lighten-4" 
             class="mr-2" 
             @click="printReport()"
             :loading="printLoading"
             >
             <v-icon>mdi-printer</v-icon>
             </v-btn>

            <v-btn
              color="amber lighten-1"
              light

              @click="gotoCreate()"
              width="150"
            >
              <v-icon left>add</v-icon>
              <span>สร้างใบแจ้งซ่อม</span>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }" >
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->
            <tr v-bind:class="{ 'color: amber lighten-4': item.Status === '3'}">

            <!-- เพิ่ม  -->
            <td @click="gotoDetail(item)" align="center" width="10">
              <div class="mx-n5">
                <v-icon color="green"  v-if="item.ApprovStatus === '1'">mdi-check</v-icon>
             </div>
            </td>
            <td @click="gotoDetail(item)" width="50">{{ item.BillDoc }}</td>
            <td @click="gotoDetail(item)" width="20"><div class="mx-5">{{ item.JobTypeName }}</div></td>
            <td @click="gotoDetail(item)" width="150"><div>{{ item.FloorName }}<br><span class="grey--text">{{ item.RoomName }}</span></div></td>
            <!-- <td @click="gotoDetail(item)" width="100">{{ item.RoomName }}</td> -->
            <td @click="gotoDetail(item)" width="100">{{ item.CategoryName }}</td>

            <!-- เพิ่ม  -->
            <td @click="gotoDetail(item)" width="30">{{ item.RepairBillNo !== "" && item.CategoryName === 'เเก้ไขบิลช่าง' ? item.RepairBillNo : item.DeviceNo }}</td> 
            <td @click="gotoDetail(item)" align="center">({{item.dowJobDate}})_{{ item.JobDateShow }}<br>
                <span class="grey--text">(เวลา {{ item.JobDateTime }} น.)</span>
                <!-- <span class="grey--text">(เวลา {{ item.JobDate | moment('HH:MM: +0') }} น.)</span> -->
            </td>
            <!-- <td @click="gotoDetail(item)">({{item.dowDueDate}})_{{ item.DueDate | moment("DD/MM/YYYY") }}</td> -->
            <td @click="gotoDetail(item)" max-width="150"><div>{{ item.BrokenDes }}</div></td>
            <td @click="gotoDetail(item)" align="center" max-width="40">
              <div>
                <v-chip
                  dark
                  v-bind:class="{ 
                    'green': item.DateWIP > 0 , 
                    'orange': item.DateWIP === 0, 
                    'red': item.DateWIP < 0 ,
  'blue': item.Status === '3'
                    
                    }"
                >{{  item.Status === '3' ? item.WorkinTime : item.DateWIP }}</v-chip>
              </div> 
            </td>
            <td class="fontPrompt"> 
              <v-btn color="#0000FF" v-if="item.Status === '0'" @click="changeStatus2(item)" dark small width="100">
                <v-icon size="16">mdi-briefcase-download</v-icon>แจ้งซ่อมแล้ว
              </v-btn>
              <v-btn color="#f39C12" v-if="item.Status === '1'" @click="changeStatus2(item)" dark small width="100">
                <v-icon size="16">mdi-wrench</v-icon><span class="ml-1">รอซ่อม</span> 
              </v-btn>
              <v-btn
              small
                color="#ff0000"
                full-width
                v-if="item.Status === '2'"
                @click="changeStatus2(item)"
                dark
                width="100"
              >
                <v-icon size="16">mdi-cart-arrow-down</v-icon>รออะไหล่
              </v-btn>

              <v-btn
              small
                color="#00a65a"
                full-width
                v-if="item.Status === '3'"
                @click="changeStatus2(item)"
                dark
                width="100"
              >
                <v-icon size="16">mdi-emoticon-outline</v-icon><span class="ml-1 ">ซ่อมเสร็จ</span>
              </v-btn>

               <v-btn
              small
                color="grey lighten-1"
                full-width
                v-if="item.Status === '4'"
                @click="changeStatus2(item)"
                dark
                width="100"
              >
                <v-icon size="16">mdi-emoticon-outline</v-icon><span class="">ตรวจสอบแล้ว</span>
              </v-btn>
            </td>

            <td width="100">
              <v-icon @click="editItem(item)">edit</v-icon>
              <v-icon class="mr-1" @click="deleteItem(item)">delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- Popup ลบบิล -->
      <v-dialog v-model="confirmDeleteDlg" max-width="290" >
        <v-card class="fontPrompt">
          <v-card-title primary-title>Comfirm Delete</v-card-title>
          <v-card-text class="body">Are you sure to delete this product?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteDlg = false , deleteID = 0">Cancel</v-btn>
            <v-btn text @click="confirmDelete" color="error">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Popup เปลี่ยนสถานะ -->
      <v-dialog v-model="changeStatusShowPop" max-height="600" max-width="600" class="fontPrompt">
        <v-form class="fontPrompt">
          <v-card class="pa-5">
            <v-row>
              <v-col>
                <v-select
                  v-model="DataStatuschange.status"
                  :items="statusShow"
                  item-value="id"
                  item-text="Status"
                  label="เปลี่ยนสถานะ"
                  outlined
                  color="blue"
                />
              </v-col>
            </v-row>

            <v-row v-if="DataStatuschange.status == '3'">
              <v-col>
                <v-text-field
                  label="ราคาค่าซ่อม"
                  type="number"
                  v-model="DataStatuschange.repairCost"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="ราคาค่าอะไหล่"
                  type="number"
                  v-model="DataStatuschange.partsCost"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="DataStatuschange.status == '3'">
              <v-col>
                <v-text-field
                  label="วิธีการแก้ไข"
                  type="text"
                  v-model="DataStatuschange.description"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="error.length" class="ml-5 mr-5 mt-5">
              <p >
              <b class="red--text">Please correct the following error</b>
              <ul>
                <li v-for="error in error" :key="error.index" class="red--text">{{ error }}</li>
              </ul>
            </p>
            </v-row>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancelChangeStatus" >Cancel</v-btn>
              <v-btn text color="error" @click="confirmChangeStatus" :loading="changeLoading">Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <!-- Popup แก้ไขบิล -->
      <v-dialog v-model="$store.state.repairModify.ShowPopupRepairModify" max-width="1000">
        <RepairEdit @closePageModify="returnModify" />
      </v-dialog>

      <!-- Popupปฎิทิน -->
      <v-dialog
        v-model="dataFilter.dateBetween.showPopup"
        max-height="300"
        max-width="300"
        class="fontSarabun"
      >
        <v-date-picker
          label="วันที่แจ้งซ่อม"
          v-model="dataFilter.dateBetween.values"
          range
          @change="filterAll()"
          color="amber"
        ></v-date-picker>
      </v-dialog>

      <!-- snackbarUpdate คิว -->
    <div class="text-center ma-2">
      <v-snackbar v-model="snackBar.updateStatusSuccess">
        <div class="fontSarabun fontSize16 text-center">
          อัพเดทข้อมูลสำเร็จแล้ว
          <v-icon small class="ml-1" color="green">mdi-shield-check</v-icon>
        </div>
      </v-snackbar>

      <v-snackbar v-model="snackBar.updateStatusFailed">
        <div class="fontSarabun fontSize16 text-center">
          ไม่สามารถอัพเดทข้อมูลได้
          <v-icon small class="ml-1" color="red">mdi-close</v-icon>
        </div>
      </v-snackbar>

      <v-snackbar v-model="snackBar.deleteBillSuccess">
        <div class="fontSarabun fontSize16 text-center">
          ลบบิลสำเร็จแล้ว
          <v-icon small class="ml-1" color="red">mdi-shield-check</v-icon>
        </div>
      </v-snackbar>

      <v-snackbar v-model="snackBar.deleteBillFailed">
        <div class="fontSarabun fontSize16 text-center">
          ไม่สามารถลบได้
          <v-icon small class="ml-1" color="red">mdi-close</v-icon>
        </div>
      </v-snackbar>


    </div>


    </v-card>
  </v-container>
</template>

<script>
import StockCard from "../../components/card/StockCard";
import RepairEdit from "./repairdocEdit";
import apiRepairDoc from "../../services/apiRepairDoc";
import apiCreatePDF from "../../services/apiCreatePDF";
import api from "../../services/api";
import moment from "moment";

export default {
  name: "repairdoc-master",
  data() {
    return {
      printLoading: false,
      changeLoading: false,
      showHeaderSum: false,
      checkboxDepart: {
        it: true,
        ma: true,
      },
      // search: "",
      mDataArray: [],
      headers: [
        // เพิ่ม
        {
          text: "",
          align: "center",
          value: "",
          justify: "center",
        },
        {
          text: "เลขที่บิล",
          align: "left",
          sortable: false,
          value: "BillDoc",
          align: "center",
          justify: "center",
        },
        {
          text: "แผนกที่แจ้ง",
          value: "JobTypeName",
          align: "center",
          justify: "center",
        },
        { text: "ห้อง", value: "RoomName", align: "center", justify: "center" },
        // { text: "ห้อง", value: "RoomName", align: "center", justify: "center" },
        {
          text: "อุปกรณ์ที่เสีย",
          value: "CategoryName",
          align: "center",
          justify: "center",
        },
        {
          text: "หมายเลขเครื่อง / เลขที่บิล",
          value: "DeviceNo",
          align: "center",
          justify: "center",
        },
        {
          text: "วันที่แจ้ง",
          value: "JobDate",
          align: "center",
          justify: "center",
        },
        // { text: "วันที่ต้องการให้เสร็จ", value: "DueDate", align: "center", justify: "center" },
        {
          text: "อาการเสีย",
          value: "BrokenDes",
          align: "center",
          justify: "center",
        },
        {
          text: "เหลือวันกำหนดเสร็จ",
          value: "DateWIP",
          align: "center",
        },
        { text: "สถานะ", value: "Status", align: "center", justify: "center" },
        {
          text: "Action",
          value: "ContactPerson",
          sortable: false,
          align: "center",
          justify: "center",
        },
      ],
      confirmDeleteDlg: false,
      changeStatusShowPop: false,
      DataStatuschange: {
        BillID: 0,
        status: "",
        repairCost: 0,
        partsCost: 0,
        description: "",
      },
      DataStatuschange2: {
        BillID: 0,
        status: "",
        repairCost: 0,
        partsCost: 0,
        description: "",
      },
      statusShow: [
        {
          id: "0",
          Status: "แจ้งซ่อมแล้ว",
          color: "#0000FF",
        },
        {
          id: "1",
          Status: "รอซ่อม",
          color: "#f39C12",
        },
        {
          id: "2",
          Status: "รออะไหล่",
          color: "#ff0000",
        },
        {
          id: "3",
          Status: "ซ่อมเสร็จ",
          color: "#00a65a",
        },
        {
          id: "4",
          Status: "ตรวจสอบแล้ว",
          color: "#00a65a",
        },
      ],
      modifyBill: false,
      billRepair: [],
      billRepair2: [],
      deleteID: 0,
      error: [],
      JobSum: {
        Job1: "01",
        Job2: "02",
        Job3: "03", // เพิ่ม
      },
      dataFilter: {
        jobType: {
          showFilter: [
            {
              id: "01",
              typeName: "IT",
            },
            {
              id: "02",
              typeName: "MA",
            },
            {
              id: "03", // เพิ่ม
              typeName: "AC",
            },
          ],
          values: [],
        },
        dateBetween: {
          values: [],
          showPopup: false,
          showDate: "",
        },
        status: {
          values: [],
        },
        search: "",
      },
      snackBar: {
        updateStatusSuccess: false,
        updateStatusFailed: false,
        deleteBillSuccess: false,
        deleteBillFailed: false,
      },
    };
  },
  components: {
    StockCard,
    RepairEdit,
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    if (this.$store.getters.policyCode === "03") {
      this.dataFilter.jobType.values.push("01");
    } else if (this.$store.getters.policyCode === "02") {
      this.dataFilter.jobType.values.push("02");
    } else if (this.$store.getters.policyCode === "09") {
      // เพิ่ม
      this.dataFilter.jobType.values.push("03");
    }

    if (this.$store.state.deviceMaster.dataFilter) {
      this.dataFilter = this.$store.state.deviceMaster.dataFilter;
    }
    await this.loadData();
    await this.loadSumBill();
    this.$emit("isCheckLogin", !(await api.isLoggedIn()));
    setTimeout(() => {
      this.$store.state.loadingPage = false;
      // console.log(this.billRepair);
    }, 500);
  },
  methods: {
    moment: function () {
      return moment();
    },
    async returnModify(value) {
      if (value) {
        this.snackBar.updateStatusSuccess = true;
        setTimeout(async () => {
          this.snackBar.updateStatusSuccess = false;
        }, 1500);
        await this.loadData();
      } else {
        this.snackBar.updateStatusFailed = true;
        setTimeout(async () => {
          this.snackBar.updateStatusFailed = false;
        }, 1500);
      }
    },
    async loadSumBill() {
      this.showHeaderSum = false;
      const sumRequest = this.billRepair.filter((obj) => obj.Status === "0");
      this.$store.state.repairMaster.getSumBill.request = sumRequest.length;
      const sumConfirm = this.billRepair.filter((obj) => obj.Status === "1");
      this.$store.state.repairMaster.getSumBill.confirm = sumConfirm.length;
      const sumWaitPart = this.billRepair.filter((obj) => obj.Status === "2");
      this.$store.state.repairMaster.getSumBill.waitPart = sumWaitPart.length;
      const sumFinish = this.billRepair.filter((obj) => obj.Status === "3");
      this.$store.state.repairMaster.getSumBill.finish = sumFinish.length;
      setTimeout(() => {
        this.showHeaderSum = true;
      }, 200);
    },
    async loadData() {
      await this.$store.dispatch("getBillRepair");
      this.billRepair = this.$store.getters.billRepair;
      this.billRepair2 = this.$store.getters.billRepair;
      await this.filterAll();
      //console.log(this.billRepair)
      // console.log(this.$store.getters.billRepair[2].toLocaleTimeString())
    },
    async editItem(item) {
      // เช็คว่ามีค่า Device ไหม ถ้าไม่มี ให้ disableInput
      // console.log(item.DeviceNo)
      if (item.DeviceNo !== "null" && item.DeviceNo !== "") {
        this.$store.state.repairModify.disableInput.showDevice = true;
      } else if (item.RepairBillNo !== null && item.RepairBillNo !== "") {
        // เพิ่ม
        this.$store.state.repairModify.disableInput.showAcCatagory = true;
      } else {
        this.$store.state.repairModify.disableInput.showDevice = false;
      }
      if (
        item.ContactPerson === this.$store.getters.username &&
        item.Status === "0"
      ) {
        await this.$store.dispatch({
          type: "getBillRepairModify",
          id: item.BillID,
        });
        // console.log(this.$store.getters.ShowPopupRepairModify)
        // console.log(this.$store.state.repairModify.ShowPopupRepairModify)
      } else if (
        this.$store.getters.policyCode === "02" ||
        this.$store.getters.policyCode === "03"
      ) {
        await this.$store.dispatch({
          type: "getBillRepairModify",
          id: item.BillID,
        });
        // console.log(this.$store.state.repairModify.ShowPopupRepairModify)
      } else if (
        this.$store.getters.policyCode === "09" &&
        item.JobTypeCode === "03"
      ) {
        // เพิ่ม
        await this.$store.dispatch({
          type: "getBillRepairModify",
          id: item.BillID,
        });
      }
    },
    async gotoDetail(item) {
      this.$store.state.repairDetail.dataHeader = item;
      // await this.$router.push("/repairdoc-detail");
      this.$store.state.deviceMaster.dataFilter = this.dataFilter;
      await this.$router.push("/repairdoc-detail");
    },
    deleteItem(item) {
      if (
        item.ContactPerson === this.$store.getters.username &&
        item.Status === "0"
      ) {
        (this.deleteID = item.BillID), (this.confirmDeleteDlg = true);
      } else if (
        this.$store.getters.policyCode === "02" ||
        this.$store.getters.policyCode === "03"
      ) {
        (this.deleteID = item.BillID), (this.confirmDeleteDlg = true);
      } else if (
        this.$store.getters.policyCode === "09" &&
        item.JobTypeCode === "03"
      ) {
        (this.deleteID = item.BillID), (this.confirmDeleteDlg = true);
      }
    },
    async confirmDelete() {
      // console.log('app', this.deleteID)
      const result = await apiRepairDoc.deleteBillRepeair(this.deleteID);
      // console.log(result)
      if (result == "ok") {
        this.snackBar.deleteBillSuccess = true;
        setTimeout(() => {
          this.snackBar.deleteBillSuccess = false;
        }, 1500);
        this.confirmDeleteDlg = false;
        this.deleteID = 0;
        await this.loadData();
      } else {
        this.snackBar.deleteBillFailed = true;
        setTimeout(() => {
          this.snackBar.deleteBillFailed = false;
        }, 1500);
        this.confirmDeleteDlg = false;
        this.deleteID = 0;
      }
    },
    changeStatus2(item) {
      if (
        this.$store.getters.policyCode === "02" ||
        this.$store.getters.policyCode === "03" ||
        this.$store.getters.policyCode === "09" // เพิ่ม
      ) {
        //ถ้าเป็น ผู้ดูแล ให้กดเปลี่ยนสถานะได้แต่เปลี่ยนสถานะเสร็จแล้วไม่ได้
        if (item.Status !== "3" && this.$store.getters.policyCode === "02") {
          this.changeStatusShowPop = true;
          this.DataStatuschange.BillID = item.BillID;
          this.DataStatuschange.status = item.Status;
          this.DataStatuschange.repairCost = item.RepairPrice;
          this.DataStatuschange.partsCost = item.PartPrice;
          this.DataStatuschange.description = item.RepairDes;
          // console.log(this.DataStatuschange)
          //ถ้าเป็น SuperUser ให้กดดูได้เลย
        } else if (this.$store.getters.policyCode === "03") {
          this.changeStatusShowPop = true;
          this.DataStatuschange.BillID = item.BillID;
          this.DataStatuschange.status = item.Status;
          this.DataStatuschange.repairCost = item.RepairPrice;
          this.DataStatuschange.partsCost = item.PartPrice;
          this.DataStatuschange.description = item.RepairDes;
        } else if (
          item.Status !== "3" &&
          this.$store.getters.policyCode === "09" &&
          item.JobTypeCode === "03"
        ) {
          // เพิ่ม
          this.changeStatusShowPop = true;
          this.DataStatuschange.BillID = item.BillID;
          this.DataStatuschange.status = item.Status;
          this.DataStatuschange.repairCost = item.RepairPrice;
          this.DataStatuschange.partsCost = item.PartPrice;
          this.DataStatuschange.description = item.RepairDes;
        }
      }
    },
    cancelChangeStatus() {
      this.changeStatusShowPop = false;
      this.DataStatuschange = this.DataStatuschange2;
    },
    async confirmChangeStatus() {
      this.changeLoading = true;
      //สร้างตัวแปลรับชคนเปลี่ยนสถานะ
      this.DataStatuschange.Notifier = this.$store.getters.username;
      if (
        this.DataStatuschange.status === "3" &&
        this.DataStatuschange.description === ""
      ) {
        // alert('กรุณาใส่ข้อมูล')
        this.error = [];
        this.error.push("โปรดระบุวิธีแก้ไข");
        this.changeLoading = false;
      } else {
        // console.log('Page', this.DataStatuschange);
        const result = await apiRepairDoc.updateStatus(this.DataStatuschange);
        // console.log(result);
        if (result == "ok") {
          this.snackBar.updateStatusSuccess = true;
          this.error = [];
          this.changeStatusShowPop = false;
          this.DataStatuschange = this.DataStatuschange2;
          setTimeout(async () => {
            this.snackBar.updateStatusSuccess = false;
            this.changeLoading = false;
          }, 1500);
          await this.loadData();
        } else {
          this.snackBar.updateStatusFailed = true;
          this.error = [];
          this.changeStatusShowPop = false;
          this.DataStatuschange = this.DataStatuschange2;
          setTimeout(async () => {
            this.snackBar.updateStatusFailed = false;
            this.changeLoading = false;
          }, 1500);
        }
      }
    },
    async filterAll() {
      this.billRepair = this.billRepair2;
      if (this.dataFilter.jobType.values.length > 0) {
        this.filterJobType();
      }
      if (this.dataFilter.status.values.length > 0) {
        this.filterStatus();
      }
      if (this.dataFilter.dateBetween.values.length > 1) {
        await this.filterDateBetween();
      }
      await this.loadSumBill();
    },
    filterJobType() {
      // console.log(this.dataFilter.jobType.values);
      this.billRepair = this.billRepair.filter((obj) =>
        this.dataFilter.jobType.values.includes(obj.JobTypeCode)
      );
    },
    filterStatus() {
      // console.log(this.dataFilter.jobType.values);
      this.billRepair = this.billRepair.filter((obj) =>
        this.dataFilter.status.values.includes(obj.Status)
      );
    },
    async filterDateBetween() {
      this.dataFilter.dateBetween.showPopup = false;
      this.dataFilter.dateBetween.showDate = `${this.dataFilter.dateBetween.values[0]} ~ ${this.dataFilter.dateBetween.values[1]}`;
      //หาค่ามากกว่าตอนกดเลือกวันที่ เวลาพนักงานกดสลับ
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
      // console.log(data);
      const res = await apiRepairDoc.getFilterRepairDate(data);
      // console.log(res);
      this.billRepair = this.billRepair.filter((obj) =>
        res.includes(obj.BillID)
      );
    },
    async printReport() {
      this.printLoading = true;
      await apiCreatePDF.printReportRepairDoc(this.billRepair);
      // console.log(this.billRepair);
      setTimeout(() => {
        this.printLoading = false;
      }, 1000);
      // this.billRepair.sort((a, b) => a.ItemNo > b.ItemNo ? 1 : b.ItemNo > a.ItemNo ? -1 : 0);
    },
    async gotoCreate() {
      this.$store.state.deviceMaster.dataFilter = this.dataFilter;
      await this.$router.push("/repairdoc-create");
    },
  },
};
</script>

<style>
.myImg {
  filter: brightness(50%);
}

.tableRepair table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgba(255, 196, 0, 0.644);
}
</style>