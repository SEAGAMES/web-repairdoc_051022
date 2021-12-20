<template>
  <v-container class="fontPrompt">
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

            <!-- ประเภทอุปกรณ์ -->
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
                  @change="filterDevice(1)"
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
                  @change="filterRoom(createData.FloorCode)&& filterDevice(1)"
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
                />
              </v-col>

              <v-col  lg="3" md="3" sm="3">
                <v-text-field
                  v-model="createData.Tel"
                  type="text"
                  label="เบอร์โทรภายใน"
                  required
                  outlined
                />
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
              <v-btn color="success" type="submit">Confirm</v-btn>
            </v-row>
          </v-form>
          <!-- <span>{{product}}</span> -->
        </v-card>
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
      disableCate: true,
      disableRoom: true,
      showDevice: false,
      showMaCatagory: false,
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
        ApprovStatus: "0"
      },
      createData2: {
        JobTypeCode: null,
        CategoryCode: null,
        FloorCode: null,
        RoomCode: null,
        DeviceNo: null,
        ContactPerson: this.$store.state.username,
        Tel: null,
        DueDate: new Date(),
        BrokenDes: null,
        RepairDes: "",
        RepairPrice: 0,
        PartPrice: 0,
        Status: "0",
        ApprovStatus: "0"
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
      ],
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
    await this.loadForm();
    // console.log(this.deviceFilter);
  },
  methods: {
    async loadForm() {
      await this.$store.dispatch("loadFormDevice");
      await this.$store.dispatch("getDeviceFilter");
      this.category = this.$store.getters.formDeviceCat;
      this.floor = this.$store.getters.formDeviceFloor;
      this.room = this.$store.getters.formDeviceRoom;
      this.emp = this.$store.getters.formDeviceEmp;
      this.deviceFilter = this.$store.getters.DeviceFilter;
    },
    async submit() {
      console.log(this.createData)
      const checkdata = this.checkformData();
      if (checkdata) {
        const result = await apiRepairDoc.createRepairDoc(this.createData)
        if (result == "ok") {
          await this.$swal({
            title: "Import Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          (this.error = []);
          this.createData = this.createData2;   
          await this.$router.push('/repairdoc-master');
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
    cancel() {
      this.$router.back();
    },
    filtercat(JobType) {
      // console.log(JobType);
      this.showDevice = false;
      this.showMaCatagory = false;
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
      this.room = this.$store.getters.formDeviceRoom;
      this.room = this.room.filter((r) => {
        return r.FloorCode == FloorCode;
      });
      this.disableRoom = false;
    },
    filterDevice(checkEnable) {
      // console.log(checkEnable);
      this.showDevice = true
      // console.log(this.createData);
      if(this.createData.CategoryCode === 'A6' ||
         this.createData.CategoryCode === 'A5' ||
         this.createData.CategoryCode === 'B1' ||
         this.createData.CategoryCode === 'B2' ||
         this.createData.CategoryCode === 'B99'
      ) {
        this.createData.DeviceNo = null
        this.showDevice = false
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
    checkformData() {
      if (
        this.createData.JobTypeCode &&
        this.createData.CategoryCode &&
        this.createData.FloorCode &&
        this.createData.RoomCode &&
        this.createData.Tel &&
        this.createData.BrokenDes) { 
          if(this.createData.DeviceNo) {
            return true;
          } else if (!this.createData.DeviceNo) {
            if(this.createData.CategoryCode === 'A6' ||
              this.createData.CategoryCode === 'A5' ||
              this.createData.CategoryCode === 'B1' ||
              this.createData.CategoryCode === 'B2' ||
              this.createData.CategoryCode === 'B99') {
              return true;
            }
          }
           }
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
      if (!this.createData.BrokenDes) {
        this.error.push("โปรดระบุอาการเสีย");
      }
      if (!this.createData.DeviceNo) {
        if(this.createData.CategoryCode !== 'A6' ||
          this.createData.CategoryCode !== 'A5' ||
           this.createData.CategoryCode !== 'B1' ||
           this.createData.CategoryCode !== 'B2' ||
           this.createData.CategoryCode !== 'B99') {
              this.error.push("โปรดระบุเลขที่เครื่อง");
            }
      }
      if (!this.createData.Tel) {
        this.error.push("โปรดระบุเบอร์โทร");
      }
    },
    checkconsole() {
      console.log(this.createData)
    }
  },
};


</script>

<style>
</style>


    {
        "ID": number,
        "DocID": string,
    },