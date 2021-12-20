<template>
  <v-container id="repairdoc-master" class="fontPrompt">
    <!-- Summary Section -->
    <v-row>
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
      <v-data-table :search="search" :headers="headers" :items="billRepair" class="elevation-1 tableRepair" multi-sort :items-per-page="15">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ใบแจ้งซ่อม</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
                <v-checkbox
                color="amber lighten-1"
                class="mt-7"
                v-model="checkboxDepart.it"
                label="แผนก IT"
                @change="selectDepartSumBill"
              ></v-checkbox>
              <v-spacer></v-spacer>
              <v-checkbox
                color="amber lighten-1"
                class="mt-7"
                v-model="checkboxDepart.ma"
                label="แผนก MA"
                @change="selectDepartSumBill"
              ></v-checkbox>
            <!-- <v-spacer></v-spacer>
            <v-select
              v-model="departCode"
              :items="department"
              item-value="departCode"
              item-text="departName"
              label="เลือกแผนกที่จะแสดงข้อมูล"
              class="mt-7"
              width="20"
            />-->
            <v-spacer></v-spacer>
            <v-btn
              color="amber lighten-1"
              light
              class="mt-7 mb-5"
              @click="$router.push('/repairdoc-create')"
            >
              <v-icon left>add</v-icon>
              <span>สร้างใบแจ้งซ่อม</span>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }" >
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->
            <tr v-bind:class="{ 'color: amber lighten-4': item.Status === '3'}">
            <td @click="gotoDetail(item)" width="50">{{ item.BillDoc }}</td>
            <td @click="gotoDetail(item)" width="20">{{ item.JobTypeName }}</td>
            <td @click="gotoDetail(item)" width="150"><div>{{ item.FloorName }}<br><span class="grey--text">{{ item.RoomName }}</span></div></td>
            <!-- <td @click="gotoDetail(item)" width="100">{{ item.RoomName }}</td> -->
            <td @click="gotoDetail(item)" width="100">{{ item.CategoryName }}</td>
            <td @click="gotoDetail(item)" width="30">{{ item.DeviceNo }}</td>
            <td @click="gotoDetail(item)" align="center">({{item.dowJobDate}})_{{ item.JobDateShow }}<br>
                <span class="grey--text">(เวลา {{ item.JobDateTime }} น.)</span>
                <!-- <span class="grey--text">(เวลา {{ item.JobDate | moment('HH:MM: +0') }} น.)</span> -->
            </td>
            <!-- <td @click="gotoDetail(item)">({{item.dowDueDate}})_{{ item.DueDate | moment("DD/MM/YYYY") }}</td> -->
            <td @click="gotoDetail(item)" max-width="150"><div>{{ item.BrokenDes }}</div></td>
            <td>
              <v-btn color="#0000FF" v-if="item.Status == '0'" @click="changeStatus2(item)" dark small width="100">
                <v-icon size="16">mdi-briefcase-download</v-icon>แจ้งซ่อมแล้ว
              </v-btn>
              <v-btn color="#f39C12" v-if="item.Status == '1'" @click="changeStatus2(item)" dark small width="100">
                <v-icon size="16">mdi-wrench</v-icon><span class="ml-1">รอซ่อม</span> 
              </v-btn>
              <v-btn
              small
                color="#ff0000"
                full-width
                v-if="item.Status == '2'"
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
                v-if="item.Status == '3'"
                @click="changeStatus2(item)"
                dark
                width="100"
              >
                <v-icon size="16">mdi-emoticon-outline</v-icon><span class="ml-1">ซ่อมเสร็จ</span>
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
              <v-btn text color="error" @click="confirmChangeStatus" >Confirm</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <!-- Popup แก้ไขบิล -->
      <v-dialog v-model="$store.state.repairModify.ShowPopupRepairModify" max-width="1000">
        <RepairEdit @closePageModify="returnModify" />
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import StockCard from "../../components/card/StockCard";
import RepairEdit from "./repairdocEdit";
import apiRepairDoc from "../../services/apiRepairDoc";
import moment from "moment";

export default {
  name: "repairdoc-master",
  data() {
    return {
      game: '',
      testif: true,
      checkboxDepart: {
        it: true,
        ma: true,
      },
      search: "",
      mDataArray: [],
      headers: [
        {
          text: "เลขที่บิล",
          align: "left",
          sortable: false,
          value: "BillDoc",
           align: "center", justify: "center"
        },
        { text: "แผนกที่แจ้ง", value: "JobTypeName" , align: "center", justify: "center"},
        { text: "ห้อง", value: "RoomName", align: "center", justify: "center" },
        // { text: "ห้อง", value: "RoomName", align: "center", justify: "center" },
        { text: "อุปกรณ์ที่เสีย", value: "CategoryName", align: "center", justify: "center" },
        { text: "หมายเลขเครื่อง", value: "DeviceNo", align: "center", justify: "center" },
        { text: "วันที่แจ้ง", value: "JobDate", align: "center", justify: "center" },
        // { text: "วันที่ต้องการให้เสร็จ", value: "DueDate", align: "center", justify: "center" },
        { text: "อาการเสีย", value: "BrokenDes", align: "center", justify: "center" },
        { text: "สถานะ", value: "Status", align: "center", justify: "center" },
        { text: "Action", value: "ContactPerson", sortable: false, align: "center", justify: "center" },
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
      ],
      modifyBill: false,
      billRepair: [],
      deleteID: 0,
      error: [],
      JobSum: {
        Job1: "01",
        Job2: "02",
      },
    };
  },
  components: {
    StockCard,
    RepairEdit,
  },
  async mounted() {
    await this.loadData();
    await this.loadSumBill();
  },
  methods: {
    moment: function () {
      return moment();
    },
    async returnModify(value) {
      if (value) {
        await this.loadData();
        await this.loadSumBill();
      }
    },
    async selectDepartSumBill() {
      // console.log('it',this.checkboxDepart.it);
      // console.log('ma',this.checkboxDepart.ma);
      // เช็ค Sumbill
      if (this.checkboxDepart.it && this.checkboxDepart.ma) {
        this.JobSum.Job1 = "01";
        this.JobSum.Job2 = "02";
        await this.loadData();
        await this.loadSumBill();
      } else if (!this.checkboxDepart.it && this.checkboxDepart.ma) {
        this.JobSum.Job1 = "";
        this.JobSum.Job2 = "02";
        await this.loadData();
        (this.billRepair = this.billRepair.filter((i) => {
          return i.JobTypeCode == "02";
        })),
          await this.loadSumBill();
      } else if (this.checkboxDepart.it && !this.checkboxDepart.ma) {
        this.JobSum.Job1 = "01";
        this.JobSum.Job2 = "";
        await this.loadData();
        (this.billRepair = this.billRepair.filter((i) => {
          return i.JobTypeCode == "01";
        })),
          await this.loadSumBill();
      } else if (!this.checkboxDepart.it && !this.checkboxDepart.ma) {
        this.JobSum.Job1 = "";
        this.JobSum.Job2 = "";
        await this.loadData();
        (this.billRepair = this.billRepair.filter((i) => {
          return i.JobTypeCode == "";
        })),
          await this.loadSumBill();
      }
      // await this.loadData()
      // //       this.dataDevice = this.dataDevice.filter((i) => {
      // //   return i.JobTypeCode == value;
      // // });
      // this.billRepair = this.billRepair.filter((i) => {
      //   return i.JobTypeName = "01"
      // })
    },
    async loadSumBill() {
      await this.$store.dispatch({
        type: "getSumBill",
        data: this.JobSum,
      });
    },
    async loadData() {
      await this.$store.dispatch("getBillRepair");
      this.billRepair = this.$store.getters.billRepair;
      // console.log(this.billRepair)
      // console.log(this.$store.getters.billRepair[2].toLocaleTimeString())
    },
    async editItem(item) {
      // เช็คว่ามีค่า Device ไหม ถ้าไม่มี ให้ disableInput
      // console.log(item.DeviceNo)
      if( item.DeviceNo !== 'null' && item.DeviceNo !== '') {
        this.$store.state.repairModify.disableInput.showDevice = true;
      } else {
        this.$store.state.repairModify.disableInput.showDevice = false;
      }
      if (item.ContactPerson === this.$store.getters.username && item.Status === "0") {
        await this.$store.dispatch({
          type: "getBillRepairModify",
          id: item.BillID,
        });
        // console.log(this.$store.getters.ShowPopupRepairModify)
        // console.log(this.$store.state.repairModify.ShowPopupRepairModify)
      } else if (this.$store.getters.policyCode === "02" || this.$store.getters.policyCode === "03") {
        await this.$store.dispatch({
          type: "getBillRepairModify",
          id: item.BillID,
        });
        // console.log(this.$store.state.repairModify.ShowPopupRepairModify)
      }
    },
    async gotoDetail(item) {
      this.$store.state.repairDetail.dataHeader = item;
      // await this.$router.push("/repairdoc-detail");
      this.$router.push("/repairdoc-detail");
      
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
      }
    },
    async confirmDelete() {
      // console.log('app', this.deleteID)
      const result = await apiRepairDoc.deleteBillRepeair(this.deleteID);
      // console.log(result)
      if (result == "ok") {
        await this.$swal({
          title: "Delete Success",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        }),
          (this.confirmDeleteDlg = false);
        this.deleteID = 0;
        await this.selectDepartSumBill();
        // await this.loadSumBill();
      } else {
        await this.$swal({
          title: "Error",
          icon: "error",
          text: "Cannot be saved",
          showConfirmButton: false,
          timer: 1500,
        });
        this.confirmDeleteDlg = false;
        this.deleteID = 0;
      }
    },
    changeStatus2(item) {
      if (
        this.$store.getters.policyCode === "02" ||
        this.$store.getters.policyCode === "03"
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
        }
      }
    },
    cancelChangeStatus() {
      this.changeStatusShowPop = false;
      this.DataStatuschange = this.DataStatuschange2;
    },
    async confirmChangeStatus() {
      this.DataStatuschange.Notifier = this.$store.getters.username;
      if (
        this.DataStatuschange.status === "3" &&
        this.DataStatuschange.description === ""
      ) {
        // alert('กรุณาใส่ข้อมูล')
        this.error = [];
        this.error.push("โปรดระบุวิธีแก้ไข");
      } else {
        // console.log('Page', this.DataStatuschange);
        const result = await apiRepairDoc.updateStatus(this.DataStatuschange);
        // console.log(result);
        if (result == "ok") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.changeStatusShowPop = false;
          this.DataStatuschange = this.DataStatuschange2;
          this.error = [];
          await this.selectDepartSumBill();
          // await this.loadSumBill();
        }
      }
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