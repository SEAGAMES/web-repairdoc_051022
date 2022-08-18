<template>
  <v-container class="fontPrompt" v-if="showPage">
    <v-row class="justify-center ">
      <v-col cols="12">
        <v-card class="pa-5" outlined>
          <v-form @submit.prevent="submit">
            <!-- ผู้แจ้ง -->
            <v-row>
              <v-col lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="$store.getters.DataRepairModify.ContactPerson"
                  :counter="4"
                  label="รหัสผู้แจ้ง"
                  required
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" xs="12">
                <v-text-field v-model="$store.getters.DataRepairModify.ContactPersonName" label="ชื่อผู้แจ้ง" outlined disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- แผนก -->
            <v-row>
              <v-col>
                <v-select
                  v-model="$store.getters.DataRepairModify.JobTypeCode"
                  :items="JobType"
                  item-value="JobTypeCode"
                  item-text="JobTypeName"
                  label="แจ้งแผนก"
                  @change="filtercat($store.getters.DataRepairModify.JobTypeCode)"
                  outlined
                  required
                  :rules="Rules1"
                />
              </v-col>
            </v-row>

            <!-- ประเภทอุปกรณ์ -->
            <v-row>
              <v-col>
                <v-select
                  v-model="$store.getters.DataRepairModify.CategoryCode"
                  :items="category"
                  item-value="CategoryCode"
                  item-text="CategoryName"
                  label="ประเภทอุปกรณ์ที่แจ้ง"
                  outlined
                  @change="filterDevice(1), filterCatagory($store.getters.DataRepairModify.CategoryCode)"
                />
              </v-col>
            </v-row>

            <!-- ชั้นและห้อง -->
            <v-row>
              <v-col>
                <v-select
                  v-model="$store.getters.DataRepairModify.FloorCode"
                  :items="floor"
                  item-value="FloorCode"
                  item-text="FloorName"
                  label="ชั้นที่แจ้ง"
                  outlined
                  @change="filterRoom($store.getters.DataRepairModify.FloorCode)&& filterDevice(1)"
                  required
                />
              </v-col>

              <v-col>
                <v-select
                  v-model="$store.getters.DataRepairModify.RoomCode"
                  :items="room"
                  item-value="RoomCode"
                  item-text="RoomName"
                  label="ห้องที่แจ้ง"
                  outlined
                  @change="filterDevice(0)"
                />
              </v-col>
            </v-row>

            <!-- หมายเลขเครื่อง-->
            <v-row v-if="$store.state.repairModify.disableInput.showDevice">
              <v-col>
                <v-select
                  v-model="$store.getters.DataRepairModify.DeviceNo"
                  label="หมายเลขเครื่อง"
                  :items="deviceFilter"
                  item-value="DeviceNo"
                  item-text="DeviceNo"
                  required
                  outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col  lg="9" md="9" sm="9">
                <v-text-field
                  v-model="$store.getters.DataRepairModify.DueDate"
                  type="date"
                  label="วันที่ต้องการให้เสร็จ"
                  required
                  outlined
                  :disabled=" $store.getters.policyCode !== '03' && $store.state.username !== '0239' "
                />
              </v-col>

              <v-col  lg="3" md="3" sm="3">
                <v-text-field
                  v-model="$store.getters.DataRepairModify.Tel"
                  type="text"
                  label="เบอร์โทรภายใน"
                  required
                  outlined
                />
              </v-col>
            </v-row>

            <!-- เลขที่บิล -->
            <v-row v-if="$store.state.repairModify.disableInput.showAcCatagory">
              <v-col lg="6" md="6" sm="6">
                <v-text-field
                 v-model="$store.getters.DataRepairModify.RepairBillNo"
                 label="เลขที่บิล"
                 append-icon="mdi-barcode"
                 required
                 outlined
                 :counter="11"
                 :disabled= "$store.getters.DataRepairModify.CategoryCode == null"
                 @change="checkPDProcessName($store.getters.DataRepairModify.RepairBillNo)"
                >
                </v-text-field>
              </v-col>

              <!-- บิลอยู่ที่เเผนก -->
              <v-col lg="6" md="6" sm="6">
                <v-text-field
                 v-model="SectionPDProcessName"
                 label="บิลอยู่ที่เเผนก"
                 required
                 outlined
                 disabled
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="$store.getters.DataRepairModify.BrokenDes"
                  type="text"
                  label="รายละเอียดหรืออาการเสีย"
                  required
                  outlined
                  :counter="200"
                  :rules="Rules1"
                  height="100"
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

            <v-row class="pt-10">
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel()">Cancel</v-btn>
              <v-btn color="success" type="submit">Confirm</v-btn>
            </v-row>
          </v-form>
          <!-- <span>{{product}}</span> -->
        </v-card>

        <!-- Warning Length -->
        <div class="text-center ma-2">
          <v-snackbar
            v-model="LengthBarWerning"
            top
            width="1000"
            align="center"
            :timeout="7000"
          >
            <div class="fontSarabun fontSize16 text-center">
              กรุณาใส่เลขที่บิลทั้ง 11 หลักให้ถูกต้องด้วยครับ
              <v-icon small class="ml-1" color="yellow"
                >mdi-shield-check</v-icon
              >
            </div>
          </v-snackbar>
        </div> 

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiRepairDoc from "../../services/apiRepairDoc";

export default {
  name: "repairdoc-create",
  data() {
    return {
      showPage: false,
      submitLoading: false,
      disableCate: true,
      disableRoom: true,
      showDevice: false,
      showMaCatagory: false,
      showAcCatagory: false,
      createData: {
        JobTypeCode: null,
        CategoryCode: null,
        FloorCode: null,
        RoomCode: null,
        DeviceNo: "",
        ContactPerson: this.$store.state.username,
        Tel: "",
        DueDate: new Date(),
        BrokenDes: null,
        RepairDes: "",
        RepairPrice: 0,
        PartPrice: 0,
        Status: "0",
        ApprovStatus: "0",
        RepairBillNo: "",
      },
      createData2: {
        JobTypeCode: null,
        CategoryCode: null,
        FloorCode: null,
        RoomCode: null,
        DeviceNo: "",
        ContactPerson: this.$store.state.username,
        Tel: null,
        DueDate: new Date(),
        BrokenDes: null,
        RepairDes: "",
        RepairPrice: 0,
        PartPrice: 0,
        Status: "0",
        ApprovStatus: "0",
        RepairBillNo: "",
      },
      imageURL: null,
      roomEnable: true,
      JobType: [
        {
          JobTypeCode: "01",
          JobTypeName: "แผนก IT",
        },
        {
          JobTypeCode: "02",
          JobTypeName: "แผนกซ่อมบำรุง",
        },
        {
          JobTypeCode: "03",
          JobTypeName: "แผนกบัญชี",
        },
      ],
      SectionPDProcessName: "",
      PDProcessName: "",
      LengthBarWerning: false,

      category: [],
      floor: [],
      room: [],
      deviceFilter: [],
      disableDeviceNo: true,
      Rules1: [(v1) => !!v1 || "กรุณาใส่ข้อมูลด้วยครับ"],
      checkform: false,
      error: [],
    };
  },
  async mounted() {
    this.showPage = false;
    await this.loadForm();
    setTimeout(() => {
      this.showPage = true;
    }, 200);
    // console.log(this.$store.state.repairModify.disableInput.showDevice);
  },
  methods: {
    async loadForm() {
      await this.$store.dispatch("loadFormDevice");
      await this.$store.dispatch("getDeviceFilter");
      this.PDProcessName = await apiRepairDoc.getPDProcess();
      this.category = this.$store.getters.formDeviceCat;
      this.floor = this.$store.getters.formDeviceFloor;
      this.room = this.$store.getters.formDeviceRoom;
      this.emp = this.$store.getters.formDeviceEmp;
      this.deviceFilter = this.$store.getters.DeviceFilter;

      // เพิ่ม
      if (this.$store.getters.DataRepairModify.RepairBillNo) {
        this.checkPDProcessName(
          this.$store.getters.DataRepairModify.RepairBillNo
        );
      }
    },
    async submit() {
      //console.log(this.SectionPDProcessName)
      this.createData = this.$store.getters.DataRepairModify;
      const checkdata = this.checkformData();
      if (checkdata) {
        const result = await apiRepairDoc.updateRepairDoc(
          this.$store.getters.BillRepairModify,
          this.createData
        );
        // alert('ผ่าน')
        if (result == "ok") {
          this.error = [];
          this.createData = this.createData2;
          this.$store.state.repairModify.dataRepair = {};
          this.$store.state.repairModify.BillRepairModify = 0;
          this.$store.state.repairModify.ShowPopupRepairModify = false;
          this.$emit("closePageModify", true);
          this.$store.state.repairModify.showPopupRepairModify = false;
        } else {
          this.$emit("closePageModify", false);
        }
      }
    },
    cancel() {
      this.$store.state.repairModify.ShowPopupRepairModify = false;
    },
    filtercat(JobType) {
      this.$store.getters.DataRepairModify.DeviceNo = "";
      this.$store.getters.DataRepairModify.RepairBillNo = "";
      this.$store.getters.DataRepairModify.CategoryCode = "";
      this.SectionPDProcessName = "";
      this.$store.state.repairModify.disableInput.showAcCatagory = false;
      this.$store.state.repairModify.disableInput.showDevice = false;
      this.$store.state.repairModify.disableInput.showAcCatagory = false;
      this.category = this.$store.getters.formDeviceCat;
      this.category = this.category.filter((P) => {
        return P.JobTypeCode == JobType;
      });
      this.disableCate = false;
      if (JobType == "01") {
        this.$store.state.repairModify.disableInput.showDevice = true;
      }
      if (JobType == "02") {
        this.showMaCatagory = true;
      }
    },
    filterRoom(FloorCode) {
      this.room = this.$store.getters.formDeviceRoom;
      this.room = this.room.filter((r) => {
        return r.FloorCode == FloorCode;
      });
      this.disableRoom = false;
    },
    filterDevice(checkEnable) {
      // console.log(checkEnable);
      this.$store.state.repairModify.disableInput.showDevice = true;
      // console.log(this.createData);
      this.$store.state.repairModify.dataRepair.DeviceNo = null;
      // console.log(this.$store.state.repairModify.dataRepair.DeviceNo);
      if (
        this.$store.getters.DataRepairModify.CategoryCode === "A6" ||
        this.$store.getters.DataRepairModify.CategoryCode === "A5" ||
        this.$store.getters.DataRepairModify.CategoryCode === "B1" ||
        this.$store.getters.DataRepairModify.CategoryCode === "B2" ||
        this.$store.getters.DataRepairModify.CategoryCode === "B99" ||
        this.$store.getters.DataRepairModify.CategoryCode === "D1"
      ) {
        // this.$store.state.repairModify.dataRepair.DeviceNo = null
        this.$store.state.repairModify.disableInput.showDevice = false;
      }
      if (this.$store.getters.DataRepairModify.CategoryCode === "D1") {
        // เพิ่ม
        this.$store.state.repairModify.disableInput.showAcCatagory = true;
      }
      if (checkEnable === 0) {
        // console.log('เปิด')
        // console.log(this.deviceFilter);
        this.deviceFilter = this.$store.getters.DeviceFilter;
        this.deviceFilter = this.deviceFilter.filter((D) => {
          return (
            D.JobTypeCode == this.$store.getters.DataRepairModify.JobTypeCode &&
            D.CategoryCode ==
              this.$store.getters.DataRepairModify.CategoryCode &&
            D.FloorCode == this.$store.getters.DataRepairModify.FloorCode &&
            D.RoomCode == this.$store.getters.DataRepairModify.RoomCode
          );
        });
        this.disableDeviceNo = false;
      } else if (checkEnable === 1) {
        // console.log('ปิด')
        // console.log(this.deviceFilter);
        this.deviceFilter = this.$store.getters.DeviceFilter;
        this.deviceFilter = this.deviceFilter.filter((D) => {
          return (
            D.JobTypeCode == this.$store.getters.DataRepairModify.JobTypeCode &&
            D.CategoryCode ==
              this.$store.getters.DataRepairModify.CategoryCode &&
            D.FloorCode == this.$store.getters.DataRepairModify.FloorCode &&
            D.RoomCode == this.$store.getters.DataRepairModify.RoomCode
          );
        });
      }
    },

    filterCatagory(CatagoryCode) {
      if (
        this.$store.getters.DataRepairModify.JobTypeCode === "03" &&
        CatagoryCode === "D1"
      ) {
        this.$store.state.repairModify.disableInput.showAcCatagory = true;
      }
    },

    checkformData() {
      this.checkconsole();
      console.log(this.$store.getters.DataRepairModify);
      // if (this.SectionPDProcessName == '') {
      //   console.log('ว่าง')
      // }
      if (
        this.$store.getters.DataRepairModify.JobTypeCode &&
        this.$store.getters.DataRepairModify.CategoryCode &&
        this.$store.getters.DataRepairModify.FloorCode &&
        this.$store.getters.DataRepairModify.RoomCode &&
        this.$store.getters.DataRepairModify.Tel &&
        this.$store.getters.DataRepairModify.BrokenDes
      ) {
        // Check เลขที่บิลซ่อม บัญชี
        if (
          this.$store.getters.DataRepairModify.CategoryCode === "D1" &&
          this.$store.getters.DataRepairModify.RepairBillNo.length === 11
        ) {
          // console.log(this.SectionPDProcessName)
          if (this.SectionPDProcessName === "") {
          }
          if (this.SectionPDProcessName.length > 0) {
            return true;
          }
        } else if (
          // เช็ค Device No
          this.$store.getters.DataRepairModify.CategoryCode !== "A6" &&
          this.$store.getters.DataRepairModify.CategoryCode !== "A5" &&
          this.$store.getters.DataRepairModify.CategoryCode !== "B1" &&
          this.$store.getters.DataRepairModify.CategoryCode !== "B2" &&
          this.$store.getters.DataRepairModify.CategoryCode !== "B99" &&
          this.$store.getters.DataRepairModify.DeviceNo !== null &&
          this.$store.getters.DataRepairModify.DeviceNo !== ""
        ) {
          return true;
        } else if (
          // แจ้งอื่นๆโดยไม่ระบบเลขที่เครื่อง
          this.$store.getters.DataRepairModify.CategoryCode === "A6" ||
          this.$store.getters.DataRepairModify.CategoryCode === "A5" ||
          this.$store.getters.DataRepairModify.CategoryCode === "B1" ||
          this.$store.getters.DataRepairModify.CategoryCode === "B2" ||
          this.$store.getters.DataRepairModify.CategoryCode === "B99"
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    checkconsole() {
      // console.log(this.createData);
      this.error = [];
      if (!this.$store.getters.DataRepairModify.JobTypeCode) {
        this.error.push("โปรดเลือกแผนก");
      }
      if (!this.$store.getters.DataRepairModify.CategoryCode) {
        this.error.push("โปรดเลือกประเภทอุปกรณ์");
      }
      if (!this.$store.getters.DataRepairModify.FloorCode) {
        this.error.push("โปรดเลือกชั้นที่อยู่ของเครื่อง");
      }
      if (!this.$store.getters.DataRepairModify.RoomCode) {
        this.error.push("โปรดเลือกห้องอยู่ของเครื่อง");
      }
      if (!this.$store.getters.DataRepairModify.Tel) {
        this.error.push("โปรดระบุเบอร์โทร");
      }
      if (
        !this.$store.getters.DataRepairModify.BrokenDes ||
        this.$store.getters.DataRepairModify.BrokenDes === ""
      ) {
        this.error.push("โปรดระบุอาการเสีย");
      }
      if (
        this.$store.getters.DataRepairModify.CategoryCode !== "A6" &&
        this.$store.getters.DataRepairModify.CategoryCode !== "A5" &&
        this.$store.getters.DataRepairModify.CategoryCode !== "B1" &&
        this.$store.getters.DataRepairModify.CategoryCode !== "B2" &&
        this.$store.getters.DataRepairModify.CategoryCode !== "B99" &&
        this.$store.getters.DataRepairModify.CategoryCode !== "D1" &&
        (this.$store.getters.DataRepairModify.DeviceNo === "" ||
          this.$store.getters.DataRepairModify.DeviceNo === null)
      ) {
        this.error.push("โปรดระบุเลขที่เครื่อง");
      }
      if (
        this.$store.getters.DataRepairModify.CategoryCode === "D1" &&
        (this.$store.getters.DataRepairModify.RepairBillNo.length !== 11 ||
          this.SectionPDProcessName.length <= 0)
      ) {
        this.error.push("โปรดระบุเลขที่บิลให้ถูกต้อง");
      }
    },
    checkPDProcessName(RepairBillNo) {
      if (RepairBillNo.length != 11) {
        this.LengthBarWerning = true;
      } else {
        const subStringCode =
          this.$store.getters.DataRepairModify.RepairBillNo.substring(1, 3);
        this.SectionPDProcessName = this.PDProcessName.filter(
          ({ PDProcessCode }) => subStringCode === PDProcessCode
        ).map(({ PDProcessName }) => PDProcessName);
      }
    },
  },
};
</script>

<style>
</style>