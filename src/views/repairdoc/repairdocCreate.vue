<template>
  <v-container class="fontPrompt" v-if="!$store.state.loadingPage">
    <v-row class="justify-center ">
      <v-col cols="8">
        <v-card class="pa-5" outlined>
          <v-form @submit.prevent="submit">
            <!-- ผู้แจ้ง -->
            <v-row>
              <v-col lg="6" md="6" sm="12" xs="12">
                <v-text-field
                  v-model="createData.ContactPerson"
                  :counter="4"
                  label="รหัสผู้แจ้ง"
                  required
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
              <v-col lg="6" md="6" sm="12" xs="12">
                <v-text-field v-model="$store.state.fullName" label="ชื่อผู้แจ้ง" outlined disabled></v-text-field>
              </v-col>
            </v-row>

            <!-- แผนก -->
            <v-row>
              <v-col>
                <v-select
                  v-model="createData.JobTypeCode"
                  :items="JobType"
                  item-value="JobTypeCode"
                  item-text="JobTypeName"
                  label="แจ้งแผนก"
                  @change="filtercat(createData.JobTypeCode)"
                  outlined
                  required
                  :rules="Rules1"
                />
              </v-col>
            </v-row>

            <!-- ประเภทอุปกรณ์ เพิ่ม filterCatagory -->
            <v-row>
              <v-col>
                <v-select
                  v-model="createData.CategoryCode"
                  :items="category"
                  item-value="CategoryCode"
                  item-text="CategoryName"
                  label="ประเภทอุปกรณ์ที่แจ้ง"
                  :disabled="disableCate"
                  outlined
                  @change="filterDevice(1), filterCatagory(createData.CategoryCode)"
                />
              </v-col>
            </v-row>

            <!-- ชั้นและห้อง -->
            <v-row>
              <v-col>
                <v-select
                  v-model="createData.FloorCode"
                  :items="floor"
                  item-value="FloorCode"
                  item-text="FloorName"
                  label="ชั้นที่แจ้ง"
                  outlined
                  @change="filterRoom(createData.FloorCode) && filterDevice(1)"
                  required
                />
              </v-col>

              <v-col>
                <v-select
                  v-model="createData.RoomCode"
                  :items="room"
                  item-value="RoomCode"
                  item-text="RoomName"
                  label="ห้องที่แจ้ง"
                  outlined
                  :disabled="disableRoom"
                  @change="filterDevice(0)"
                />
              </v-col>
            </v-row>

            <!-- หมายเลขเครื่อง -->
            <v-row v-if="showDevice">
              <v-col>
                <v-select
                  v-model="createData.DeviceNo"
                  label="หมายเลขเครื่อง"
                  :items="deviceFilter"
                  item-value="DeviceNo"
                  item-text="DeviceNo"
                  :disabled="disableDeviceNo"
                  required
                  outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col  lg="9" md="9" sm="9">
                <v-text-field
                  v-model="createData.DueDate"
                  type="date"
                  label="วันที่ต้องการให้เสร็จ"
                  required
                  outlined
                  :disabled=" $store.getters.policyCode !== '03' && $store.state.username !== '0239' "
                />
              </v-col>

              <v-col  lg="3" md="3" sm="3">
                <v-text-field
                  v-model="createData.Tel"
                  type="number"
                  label="เบอร์โทรภายใน"
                  required
                  outlined
                />
              </v-col>
            </v-row>

            <!-- เพิ่ม -->
            <!-- เลขที่บิล -->
            <v-row v-if="showAcCatagory">
              <v-col lg="6" md="6" sm="6">
                <v-text-field
                 v-model="createData.RepairBillNo"
                 label="เลขที่บิล"
                 append-icon="mdi-barcode"
                 required
                 outlined
                 :counter="11"
                 :disabled= "createData.CategoryCode == null"
                  @change="checkPDProcessName()"
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
                  v-model="createData.BrokenDes"
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
              <v-btn class="mr-4" @click="cancel">Cancel</v-btn>
              <v-btn color="success" type="submit" :loading="submitLoading">Confirm</v-btn>
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
      submitLoading: false,
      disableCate: true,
      disableRoom: true,
      showDevice: false,
      showMaCatagory: false,
      showAcCatagory: false, // เพิ่ม
      createData: {
        JobTypeCode: null,
        CategoryCode: null,
        FloorCode: null,
        RoomCode: null,
        DeviceNo: null,
        ContactPerson: this.$store.state.username,
        Tel: "",
        DueDate: new Date(),
        BrokenDes: null,
        RepairDes: "",
        RepairPrice: 0,
        PartPrice: 0,
        Status: "0",
        ApprovStatus: "0", //เพิ่ม
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
          JobTypeCode: "03", // เพิ่ม
          JobTypeName: "แผนกบัญชี",
        },
      ],
      // เพิ่ม
      PDProcessName: [],
      SectionPDProcessName: [],
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
    this.$store.state.loadingPage = true;
    await this.loadForm();
    // console.log(this.deviceFilter);
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 100);
  },
  methods: {
    async loadForm() {
      await this.$store.dispatch("loadFormDevice");
      await this.$store.dispatch("getDeviceFilter");
      this.PDProcessName = await apiRepairDoc.getPDProcess(); // เพิ่ม
      this.category = this.$store.getters.formDeviceCat;
      this.floor = this.$store.getters.formDeviceFloor;
      this.room = this.$store.getters.formDeviceRoom;
      this.emp = this.$store.getters.formDeviceEmp;
      this.deviceFilter = this.$store.getters.DeviceFilter;
    },
    async submit() {
      this.submitLoading = true;
      const checkdata = this.checkformData();
      if (checkdata) {
        // console.log(this.createData);
        const result = await apiRepairDoc.createRepairDoc(this.createData);
        if (result == "ok") {
          await this.$swal({
            title: "Import Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.error = [];
          this.createData = this.createData2;
          await this.$router.push("/repairdoc-master");
          this.submitLoading = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.submitLoading = false;
        }
      } else {
        this.submitLoading = false;
      }
    },
    cancel() {
      this.$router.back();
    },
    filtercat(JobType) {
      // เพิ่ม เมื่อเปลี่ยนเเผนกให้ค่าของ Device หรือ Bill เป็น null

      this.createData.DeviceNo = "";

      this.createData.RepairBillNo = "";
      this.showAcCatagory = false;
      this.showDevice = false;
      this.showMaCatagory = false; // เพิ่ม
      this.category = this.$store.getters.formDeviceCat;
      this.category = this.category.filter((P) => {
        return P.JobTypeCode == JobType;
      });
      this.disableCate = false;
      if (JobType == "01") {
        this.showDevice = true;
      }
      if (JobType == "02") {
        this.showMaCatagory = true;
      }
    },
    filterRoom(FloorCode) {
      this.createData.RoomCode = null;
      this.room = this.$store.getters.formDeviceRoom;
      this.room = this.room.filter((r) => {
        return r.FloorCode == FloorCode;
      });
      this.disableRoom = false;
    },
    filterDevice(checkEnable) {
      // console.log(checkEnable);
      this.showDevice = true;
      // console.log(this.createData);
      this.createData.DeviceNo = null;
      if (
        this.createData.CategoryCode === "A6" ||
        this.createData.CategoryCode === "A5" ||
        this.createData.CategoryCode === "B1" ||
        this.createData.CategoryCode === "B2" ||
        this.createData.CategoryCode === "B99" ||
        this.createData.CategoryCode === "D1" // เพิ่ม
      ) {
        // this.createData.DeviceNo = null
        this.showDevice = false;
      }
      if (this.createData.CategoryCode === "D1") {
        // เพิ่ม
        this.showAcCatagory = true;
      }
      if (checkEnable === 0) {
        // console.log('เปิด')
        // console.log(this.deviceFilter);
        this.deviceFilter = this.$store.getters.DeviceFilter;
        this.deviceFilter = this.deviceFilter.filter((D) => {
          return (
            D.JobTypeCode == this.createData.JobTypeCode &&
            D.CategoryCode == this.createData.CategoryCode &&
            D.FloorCode == this.createData.FloorCode &&
            D.RoomCode == this.createData.RoomCode
          );
        });
        this.disableDeviceNo = false;
      } else if (checkEnable === 1) {
        // console.log('ปิด')
        // console.log(this.deviceFilter);
        this.deviceFilter = this.$store.getters.DeviceFilter;
        this.deviceFilter = this.deviceFilter.filter((D) => {
          return (
            D.JobTypeCode == this.createData.JobTypeCode &&
            D.CategoryCode == this.createData.CategoryCode &&
            D.FloorCode == this.createData.FloorCode &&
            D.RoomCode == this.createData.RoomCode
          );
        });
      }
    },
    // เพิ่ม
    filterCatagory() {
      if (this.JobTypeCode == "03" && this.CatagoryCode == "D1") {
        this.showAcCatagory = true;
      }
    },
    checkformData() {
      this.checkconsole();
      if (
        this.createData.JobTypeCode &&
        this.createData.CategoryCode &&
        this.createData.FloorCode &&
        this.createData.RoomCode &&
        this.createData.Tel &&
        this.createData.BrokenDes
      ) {
        // Check เลขที่บิลซ่อม บัญชี
        if (
          this.createData.CategoryCode === "D1" &&
          this.createData.RepairBillNo.length === 11
        ) {
          if (this.SectionPDProcessName.length > 0) {
            return true;
          }
        } else if (
          // เช็ค Device No
          this.createData.CategoryCode !== "A6" &&
          this.createData.CategoryCode !== "A5" &&
          this.createData.CategoryCode !== "B1" &&
          this.createData.CategoryCode !== "B2" &&
          this.createData.CategoryCode !== "B99" &&
          this.createData.DeviceNo !== null &&
          this.createData.DeviceNo !== ""
        ) {
          return true;
        } else if (
          // แจ้งอื่นๆโดยไม่ระบบเลขที่เครื่อง
          this.createData.CategoryCode === "A6" ||
          this.createData.CategoryCode === "A5" ||
          this.createData.CategoryCode === "B1" ||
          this.createData.CategoryCode === "B2" ||
          this.createData.CategoryCode === "B99"
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
      if (!this.createData.JobTypeCode) {
        this.error.push("โปรดเลือกแผนก");
      }
      if (!this.createData.CategoryCode) {
        this.error.push("โปรดเลือกประเภทอุปกรณ์");
      }
      if (!this.createData.FloorCode) {
        this.error.push("โปรดเลือกชั้นที่อยู่ของเครื่อง");
      }
      if (!this.createData.RoomCode) {
        this.error.push("โปรดเลือกห้องอยู่ของเครื่อง");
      }
      if (!this.createData.Tel) {
        this.error.push("โปรดระบุเบอร์โทร");
      }
      if (!this.createData.BrokenDes || this.createData.BrokenDes === "") {
        this.error.push("โปรดระบุอาการเสีย");
      }
      if (
        this.createData.CategoryCode !== "A6" &&
        this.createData.CategoryCode !== "A5" &&
        this.createData.CategoryCode !== "B1" &&
        this.createData.CategoryCode !== "B2" &&
        this.createData.CategoryCode !== "B99" &&
        this.createData.CategoryCode !== "D1" &&
        (this.createData.DeviceNo === "" || this.createData.DeviceNo === null)
      ) {
        this.error.push("โปรดระบุเลขที่เครื่อง");
      }
      if (
        this.createData.CategoryCode === "D1" &&
        (this.createData.RepairBillNo.length !== 11 ||
          this.SectionPDProcessName.length <= 0)
      ) {
        this.error.push("โปรดระบุเลขที่บิลให้ถูกต้อง");
      }
    },

    checkPDProcessName() {
      // เพิ่ม
      if (this.createData.RepairBillNo === null) {
      } else if (this.createData.RepairBillNo === "") {
      }
      if (this.createData.RepairBillNo.length != 11) {
        this.LengthBarWerning = true;
      } else {
        const subStringCode = this.createData.RepairBillNo.substring(1, 3);
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

