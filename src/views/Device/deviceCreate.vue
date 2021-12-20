<template>
  <v-container class="fontPrompt">
    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <h1 class="text-bold">เพิ่มอุปกรณ์ใหม่</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <v-card width="1000">
        <v-form @submit.prevent="submit">
          <v-container>
            <v-row class="ml-5 mr-5 mt-0">
              <!-- เลือกแผนก -->
              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="deviceCreate.JobTypeCode"
                  :items="JobType"
                  item-value="JobTypeCode"
                  item-text="JobTypeName"
                  label="แผนก"
                  outlined
                  required
                  @change="filterCategory(deviceCreate.JobTypeCode)"
                  :rules= Rules.JobTypeCode
                />
              </v-col>
              <!-- เลือกประเภทอุปกรณ์ -->
              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="deviceCreate.CategoryCode"
                  :items="category"
                  item-value="CategoryCode"
                  item-text="CategoryName"
                  label="ประเภทอุปกรณ์"
                  outlined
                  required
                  :disabled="disableDevice"
                  :rules= Rules.CategoryCode
                />
              </v-col>
              <!-- กรอกหมายเลขเครื่อง -->
              <v-col lg="4" md="4" sm="12">
                <v-text-field
                  type="text"
                  label="หมายเลขเครื่อง"
                  v-model="deviceCreate.DeviceNo"
                  outlined
                  required
                  :rules= Rules.DeviceNo
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- เลือกชั้น ห้อง และผู้ดูแล-->
            <v-row class="ml-5 mr-5 mt-0">
              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="deviceCreate.FloorCode"
                  :items="floor"
                  item-value="FloorCode"
                  item-text="FloorName"
                  label="ชั้นที่"
                  outlined
                  required
                  @change="filterRoom(deviceCreate.FloorCode)"
                  :rules= Rules.FloorCode
                />
              </v-col>

              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="deviceCreate.RoomCode"
                  :items="room"
                  item-value="RoomCode"
                  item-text="RoomName"
                  label="ห้อง"
                  outlined
                  required
                  :disabled="disableRoom"
                  :rules= Rules.RoomCode
                />
              </v-col>

              <v-col lg="4" md="4" sm="12">
                <v-autocomplete
                  label="ผู้ได้รับมอบหมายดูแลเครื่อง"
                  v-model="deviceCreate.Owner"
                  :items="emp"
                  item-value="EmpCode"
                  item-text="EmpFullName"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
            </v-row>

            <!-- วันที่จัดซื้อ และ วันที่หมดประกัน  -->
            <v-row class="ml-5 mr-5 mt-0">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="deviceCreate.PurchaseDate"
                  type="date"
                  label="วันที่จัดซื้อ"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="deviceCreate.OutWarranty"
                  type="date"
                  label="วันที่หมดประกัน"
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
              <v-col>
                <v-text-field
                  v-model="deviceCreate.Desciption"
                  :counter="200"
                  type="text"
                  label="รายละเอียดเพิ่มเติม"
                  outlined
                  height="100"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0" v-if="deviceCreate.JobTypeCode === '01'">
              <v-col>
                <v-text-field
                  v-model="deviceCreate.IPv4_1"
                  type="text"
                  label="IPv4_1"
                  outlined
                >
                </v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="deviceCreate.IPv4_2"
                  type="text"
                  label="IPv4_2"
                  outlined
                >
                </v-text-field>
              </v-col>
            </v-row>

            <!-- เลือกสถานะใช้งานหรือไม่ -->
            <v-row class="ml-5 mr-5 mt-0">
              <v-col lg="2">
                <v-checkbox
                  v-model="deviceCreate.Status1"
                  label="กำลังใช้งาน"
                  color="blue"
                  value="0"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-col lg="2">
                <v-checkbox
                  v-model="deviceCreate.Status1"
                  label="เลิกใช้งาน"
                  color="red"
                  value="1"
                  hide-details
                ></v-checkbox>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
            
            <v-row v-if="error.length" class="ml-5 mr-5 mt-5">
              <p >
              <b class="red--text">Please correct the following error</b>
              <ul>
                <li v-for="error in error" :key="error.index" class="red--text">{{ error }}</li>
              </ul>
            </p>
            </v-row>

            <v-row class="ml-5 mr-5 pt-10 pb-5">
              <v-spacer></v-spacer>
                <v-btn class="mr-4" color="" @click="goback()">Cancel</v-btn>
                <v-btn color="success" type="submit">Confirm</v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import apiDevice from "../../services/apiDevice";

export default {
  name: "device-create",
  async mounted() {
    await this.$store.dispatch('loadFormDevice')
    this.category = this.$store.getters.formDeviceCat;
    this.floor = this.$store.getters.formDeviceFloor;
    this.room = this.$store.getters.formDeviceRoom;
    this.emp = this.$store.getters.formDeviceEmp;
    // console.log(this.emp)
    // console.log(this.$store.getters.formDeviceCat);
    // console.log(this.$store.getters.formDeviceFloor);
    // console.log(this.$store.getters.formDeviceRoom);
  },

  data() {
    return {
      error: [],
      disableDevice: true,
      disableRoom: true,
      deviceCreate: {
        JobTypeCode: null,
        CategoryCode: null,
        DeviceNo: null,
        FloorCode: null,
        RoomCode: null,
        PurchaseDate: new Date("2000/01/01"),
        OutWarranty: new Date("2000/01/01"),
        Owner: "",
        Desciption: "",
        IPv4_1: "",
        IPv4_2: "",
        Status1: "0",
        Status2: "",
      },
      JobType: [
        {
          JobTypeCode: "01",
          JobTypeName: "แผนก IT",
        },
        {
          JobTypeCode: "02",
          JobTypeName: "แผนกซ่อมบำรุง",
        },
      ],
      category: [],
      floor: [],
      room: [],
      emp: [],
      imageURL: null,
      Rules: {
        JobTypeCode: [(v1) => !!v1 || "กรุณาเลือกแผนก"],
        CategoryCode: [(v1) => !!v1 || "กรุณาเลือกประเภทอุปกรณ์"],
        DeviceNo: [(v1) => !!v1 || "กรุณาใส่หมายเลขเครื่อง"],
        FloorCode: [(v1) => !!v1 || "กรุณาเลือกชั้นที่อยู่ของเครื่อง"],
        RoomCode: [(v1) => !!v1 || "กรุณาเลือกห้องอยู่ของเครื่อง"],
      },
      checkform: false,
    };
  },
  methods: {
    filterRoom(FloorCode) {
      this.room = this.$store.getters.formDeviceRoom;
      this.room = this.room.filter((r) => {
        return r.FloorCode == FloorCode;
      });
      this.disableRoom = false;
    },
    filterCategory(JobType) {
      this.category = this.$store.getters.formDeviceCat;
      this.category = this.category.filter((P) => {
        return P.JobTypeCode == JobType;
      });
      this.disableDevice = false;
    },
    async submit() {
      this.$store.state.InsertDevice = this.deviceCreate
      const checkdata = this.checkformData();
      // console.log(checkdata);
      // console.log('Font',this.deviceCreate)
      if (checkdata) {
        const result = await apiDevice.createDevice(this.deviceCreate);
        if (result == "ok") {
          await this.$swal({
            title: "Import Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          }),
            (this.deviceCreate = this.deviceCreate2),
            (this.error = []);
            await this.$router.push('/device-master');
            // ใช้เฉพาะตอนอัพข้อมูล
            // await this.$store.dispatch('loadFormDevice')
            //   this.category = this.$store.getters.formDeviceCat;
            //   this.floor = this.$store.getters.formDeviceFloor;
            //   this.room = this.$store.getters.formDeviceRoom;
            //   this.emp = this.$store.getters.formDeviceEmp;
            //   // console.log(this.$store.state.InsertDevice);
            //   this.deviceCreate = this.$store.state.InsertDevice
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    },
    checkformData() {
      if (
        this.deviceCreate.JobTypeCode &&
        this.deviceCreate.CategoryCode &&
        this.deviceCreate.DeviceNo &&
        this.deviceCreate.FloorCode &&
        this.deviceCreate.RoomCode
      ) {
        return true;
      }
      this.error = [];
      if (!this.deviceCreate.JobTypeCode) {
        this.error.push("โปรดเลือกแผนก");
      }
      if (!this.deviceCreate.CategoryCode) {
        this.error.push("โปรดเลือกประเภทอุปกรณ์");
      }
      if (!this.deviceCreate.DeviceNo) {
        this.error.push("กรอกหมายเลขเครื่อง");
      }
      if (!this.deviceCreate.FloorCode) {
        this.error.push("โปรดเลือกชั้นที่อยู่ของเครื่อง");
      }
      if (!this.deviceCreate.RoomCode) {
        this.error.push("โปรดเลือกห้องอยู่ของเครื่อง");
      }
    },
    goback(){
      this.$store.state.deviceMaster.ShowTable = false;
      this.$router.back()
    }
  },
};
</script>

<style>
</style>