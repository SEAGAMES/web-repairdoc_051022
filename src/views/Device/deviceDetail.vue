<template>
  <v-container grid-list-xs class="fontPrompt">
    <v-row>
      <v-spacer></v-spacer>
      <v-card width="1500">
        <v-row class="pt-10">
          <v-spacer></v-spacer>
          <h1 class="text-bold">รายละเอียดเพิ่มเติม</h1>
          <v-spacer></v-spacer>
        </v-row>
        <v-form>
          <v-container>
            <v-row class="ml-5 mr-5 mt-0">
              <!-- เลือกแผนก -->
              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="device.JobTypeCode"
                  :items="JobType"
                  item-value="JobTypeCode"
                  item-text="JobTypeName"
                  label="แผนก"
                  outlined
                  disabled
                />
              </v-col>
              <!-- เลือกประเภทอุปกรณ์ -->
              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="device.CategoryCode"
                  :items="category"
                  item-value="CategoryCode"
                  item-text="CategoryName"
                  label="ประเภทอุปกรณ์"
                  outlined
                  disabled
                />
              </v-col>
              <!-- กรอกหมายเลขเครื่อง -->
              <v-col lg="4" md="4" sm="12">
                <v-text-field
                  type="text"
                  label="หมายเลขเครื่อง"
                  v-model="device.DeviceNo"
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <!-- เลือกชั้น ห้อง และผู้ดูแล-->
            <v-row class="ml-5 mr-5 mt-0">
              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="device.FloorCode"
                  :items="floor"
                  item-value="FloorCode"
                  item-text="FloorName"
                  label="ชั้นที่"
                  outlined
                  disabled
                />
              </v-col>

              <v-col lg="4" md="4" sm="12">
                <v-select
                  v-model="device.RoomCode"
                  :items="room"
                  item-value="RoomCode"
                  item-text="RoomName"
                  label="ห้อง"
                  outlined
                  disabled
                />
              </v-col>

              <v-col lg="4" md="4" sm="12">
                <v-select
                  label="ผู้ได้รับมอบหมายดูแลเครื่อง"
                  v-model="device.Owner"
                  :items="emp"
                  item-value="EmpCode"
                  item-text="EmpFullName"
                  outlined
                  disabled
                />
              </v-col>
            </v-row>

            <!-- วันที่จัดซื้อ และ วันที่หมดประกัน  -->
            <v-row class="ml-5 mr-5 mt-0">
              <v-col cols="12" md="6">
                <v-card class="d-flex pa-2" tile>
                  <div class="grey--text">วันที่จัดซื้อ : {{device.PurchaseDate | moment("DD/MM/YYYY")}}</div>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="d-flex pa-2" tile>
                  <div class="grey--text">วันที่หมดประกัน : {{device.OutWarranty | moment("DD/MM/YYYY")}}</div>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
              <v-col>
                <v-text-field
                  v-model="device.Desciption"
                  type="text"
                  label="รายละเอียด"
                  outlined
                  height="100"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0" v-if="device.JobTypeCode === '01'">
              <v-col>
                <v-text-field
                  v-model="device.IPv4_1"
                  type="text"
                  label="IPv4_1"
                  outlined
                  disabled
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="device.IPv4_2"
                  type="text"
                  label="IPv4_2"
                  outlined
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>

          </v-container>
        </v-form>
      </v-card>
      <v-spacer></v-spacer>
    </v-row>

    <!-- Table Section -->
    <v-row class="pt-7">
      <v-spacer></v-spacer>
      <v-card width="1500">
        <v-data-table :search="search" :headers="headers" :items="repairData">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>ค้นหาบิลซ่อมที่คุณต้องการ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                color="yellow"
                v-if="device.Status1 == '0'"
                @click="showPopChangeStatus"
                light
              >กำลังใช้งาน</v-btn>
              <v-btn
                color="red"
                v-if="device.Status1 == '1'"
                @click="showPopChangeStatus"
                dark
              >เลิกใช้งาน</v-btn>
            </v-toolbar>
          </template>

          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.BillID }}</td>
              <td>{{ item.JobDate | moment("DD/MM/YYYY") }}</td>
              <td>{{ item.DueDate | moment("DD/MM/YYYY") }}</td>
              <td>{{ item.EmpFullName }}</td>
              <td>{{ item.BrokenDes }}</td>
              <td>{{ item.RepairDes }}</td>
              <td>{{ item.RepairPrice }}</td>
              <td>{{ item.PartPrice }}</td>
              <td>
                <v-btn color="#0000FF" v-if="item.Status == '0'" dark small width="120">
                  <v-icon>mdi-briefcase-download</v-icon>แจ้งซ่อมแล้ว
                </v-btn>
                <v-btn color="#f39C12" v-if="item.Status == '1'" dark small width="120">
                  <v-icon>mdi-wrench</v-icon>รอซ่อม
                </v-btn>
                <v-btn color="#ff0000" v-if="item.Status == '2'" dark small width="120">
                  <v-icon>mdi-cart-arrow-down</v-icon>รออะไหล่
                </v-btn>

                <v-btn color="#00a65a" v-if="item.Status == '3'" dark small width="120">
                  <v-icon>mdi-emoticon-outline</v-icon>ซ่อมเสร็จ
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="goback()">กลับ</v-btn>
    </v-row>

    <v-dialog v-model="popChangeStatus" max-width="290">
      <v-card>
        <v-card-title primary-title>Confirm Change</v-card-title>

        <v-card-text class="body">Are you sure to Change this Status ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="popChangeStatus = false">Cancel</v-btn>

          <v-btn color="error" text @click="updateStatusDevice">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import apiDevice from "../../services/apiDevice";

export default {
  name: "device-detail",
  data() {
    return {
      popChangeStatus: false,
      headers: [
        {
          text: "เลขที่บิลซ่อม",
          align: "left",
          sortable: false,
          value: "BillID",
        },
        { text: "วันที่แจ้งซ่อม", value: "JobDate" },
        { text: "วันที่ซ่อมเสร็จ", value: "DueDate" },
        { text: "ผู้แจ้งซ่อม", value: "EmpFullName" },
        { text: "อาการเสีย", value: "BrokenDes" },
        { text: "วิธีการแก้ไข", value: "RepairDes" },
        { text: "ค่าแรงซ่อม", value: "RepairPrice" },
        { text: "ค่าอะไหล่", value: "PartPrice" },
        { text: "สถานะงานซ่อม", value: "" },
      ],
      search: "",
      value: "",
      date: new Date(),
      category: [],
      floor: [],
      room: [],
      emp: [],
      JobType: [
        {
          JobTypeCode: "01",
          JobTypeName: "แผนก IT",
        },
        {
          departCode: "02",
          JobTypeName: "แผนกซ่อมบำรุง",
        },
      ],
      repairData: [],
      device: {
        // JobTypeCode: null,
        // CategoryCode: null,
        // DeviceNo: null,
        // FloorCode: null,
        // RoomCode: null,
        // PurchaseDate: new Date("2000/01/01"),
        // OutWarranty: new Date("2000/01/01"),
        // Owner: "",
        // Desciption: "",
        // Status1: "0",
        // Status2: "",
      },
    };
  },
  async mounted() {
    await this.loadForm();
    await this.loadDataDevice();
    await this.loadRepairDetail();
  },
  methods: {
    async loadForm() {
      await this.$store.dispatch("loadFormDevice");
      this.category = this.$store.getters.formDeviceCat;
      this.floor = this.$store.getters.formDeviceFloor;
      this.room = this.$store.getters.formDeviceRoom;
      this.emp = this.$store.getters.formDeviceEmp;
    },
    async loadDataDevice() {
      let id = this.$route.params.id;
      const result = await apiDevice.geteditDevice(id);
      this.device = result[0];
      // console.log(result);
    },
    async loadRepairDetail() {
      let id = this.$route.params.id;
      // console.log(id)
      const result = await apiDevice.getRepairDetail(id);
      this.repairData = result;
      // console.log("page", this.repairData);
    },
    showPopChangeStatus() {
      this.popChangeStatus = true;
    },
    async updateStatusDevice() {
      let id = this.$route.params.id;

      if (this.device.Status1 == "0") {
        let data = {
          ID: id,
          Status1: "1",
        };
        const result = await apiDevice.updateStatusDevice(data);
        if (result == "ok") {
          await this.loadDataDevice();
          this.popChangeStatus = false;
        }
      } else if (this.device.Status1 == "1") {
        let data = {
          ID: id,
          Status1: "0",
        };
        const result = await apiDevice.updateStatusDevice(data);
        if (result == "ok") {
          await this.loadDataDevice();
          this.popChangeStatus = false;
        }
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