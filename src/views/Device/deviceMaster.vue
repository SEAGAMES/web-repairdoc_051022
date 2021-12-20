<template>
  <v-container class="fontPrompt">
    <!-- หน้าเลือกแผนก -->
    <!-- <v-row class="mt-10" v-if="!$store.state.deviceMaster.ShowTable">

      <v-col lg="6" md="6" sm="12" align="center" justify="center">
        <v-card
          id="stock_card"
          height="200"
          width="500"
          @click="selectDepartment('02')"

        >
          <v-img src="../../assets/city.jpg" height="80" width="500"></v-img>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline; mb-1; fontPrompt" align="left">{{
                ma.title
              }}</v-list-item-title>
              <v-list-item-subtitle class="title; fontPrompt" align="left">{{
                ma.subtitle
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" :color="ma.avatar_bg">
              <v-icon color="white"> {{ ma.avatar_ic }} </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col lg="6" md="6" sm="12" align="center" justify="center">
        <v-card
          id="stock_card"
          height="200"
          width="500"
          @click="selectDepartment('01')"
          
        >
          <v-img src="../../assets/space.jpg" height="80" width="500"></v-img>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline; mb-1; fontPrompt" align="left">{{
                it.title
              }}</v-list-item-title>
              <v-list-item-subtitle class="title; fontPrompt" align="left">{{
                it.subtitle
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" :color="it.avatar_bg">
              <v-icon color="white"> {{ it.avatar_ic }} </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- Table Section -->
    <v-card >
      <v-data-table :search="search" :headers="headers" :items="dataDevice" :items-per-page="15"  class="tableDevice">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ค้นหาอุปกรณ์ที่คุณต้องการ</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
                <v-checkbox
                color="blue darken-1"
                class="mt-7"
                v-model="checkboxDepart.it"
                label="แผนก IT"
                @change="FilterJob"
              ></v-checkbox>
              <v-spacer></v-spacer>
              <v-checkbox
                color="blue darken-1"
                class="mt-7"
                v-model="checkboxDepart.ma"
                label="แผนก MA"
                @change="FilterJob"
              ></v-checkbox>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              dark
              class="mt-7 mb-5"
              @click="$router.push('/device-create')"
            >
              <v-icon left>add</v-icon>
              <span>เพิ่มอุปกรณ์</span>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td @click="gotoDetail(item)">{{ item.ID }}</td>
            <td @click="gotoDetail(item)">{{ item.CategoryName }}</td>
            <td @click="gotoDetail(item)">{{ item.DeviceNo }}</td>
            <td @click="gotoDetail(item)">{{ item.FloorName }}</td>
            <td @click="gotoDetail(item)">{{ item.RoomName }}</td>
            <td @click="gotoDetail(item)">{{ item.Desciption }}</td>
            <td @click="gotoDetail(item)">
              <v-btn color="yellow" v-if="item.Status1 == '0'">
                <v-icon>mdi-check-bold</v-icon>
                กำลังใช้งาน
              </v-btn>
              <v-btn color="red" v-if="item.Status1 == '1'" dark>
                <v-icon>mdi-close-thick</v-icon>
                เลิกใช้งาน
              </v-btn>
            </td>
            <td class="align-center">
              <v-icon class="mr-2" @click="clickModify(item.ID)">edit</v-icon>
              <span class="ma-1"></span>
              <v-icon class="mr-2" @click="showdeleteDevice(item.ID)"
                >delete</v-icon
              >
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- หน้า Modify Popup -->
      <v-dialog
        v-model="$store.getters.showModifyDevice"
        persistent
        :overlay="false"
        max-width="800px"
        transition="dialog-transition"
        class="fontPrompt"
      >
        <DeviceModify @closePageModify="returnModify"/>
      </v-dialog>

      <!-- หน้า Confirm Delete -->
      <v-dialog v-model="confirmDeleteDlg" max-width="290" class="fontPrompt">
        <v-card class="fontPrompt">
          <v-card-title primary-title> Confirm Delete </v-card-title>

          <v-card-text class="body">
            Are you sure to delete this Device? You cannot restore it after
            clicking confirm.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="confirmDeleteDlg = false, deleteID = 0"> Cancel </v-btn>

            <v-btn color="error" text @click="confirmDelete"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>


    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <v-btn color="#ff0000" dark @click="$store.state.deviceMaster.ShowTable = false" v-if="$store.state.deviceMaster.ShowTable"
        >กลับ</v-btn
      >
    </v-row>


  </v-container>
</template>

<script>
import DeviceModify from "./deviceModify";
import apiDevice from "../../services/apiDevice";

export default {
  name: "device-master",
  data() {
    return {
      ma: {
        title: "MA",
        subtitle: "ซ่อมบำรุง",
        avatar_bg: "#f39C12",
        avatar_ic: "mdi-wrench",
      },
      it: {
        title: "IT",
        subtitle: "Information Technology",
        avatar_bg: "#00FFFF",
        avatar_ic: "mdi-desktop-mac",
      },
      checkboxDepart: {
        it: true,
        ma: true
      },
      selectDepart: Number,
      search: "",
      mDataArray: [],
      headers: [
        {
          text: "เลขID",
          align: "left",
          sortable: false,
          value: "ID",
        },
        { text: "ประเภทอุปกรณ์", value: "CategoryName" },
        { text: "หมายเลขเครื่อง", value: "DeviceNo" },
        { text: "ชั้น", value: "FloorName" },
        { text: "ห้อง", value: "RoomName" },
        { text: "รายละเอียด", value: "Desciption", sortable: false},
        { text: "สถานะ", value: "Status1" },
        { text: "Action", value: "", sortable: false},
      ],
      dataDevice: [],
      dataDevice2: [],
      showModify: false,
      confirmDeleteDlg: false,
      deleteID: 0
    };
  },
  components: {
    DeviceModify,
  },
  async mounted() {
      await this.loadData();
      this.checkDepart();
      // console.log('นี้คือdata', this.$store.getters.DataDeviceMaster);
        },
  methods: {
    async returnModify(value) {
      if(value) {
        await this.loadData()
      }
    },
    selectDepartment(value) {
      this.$store.state.deviceMaster.selectDepart = value;
      this.dataDevice = this.$store.getters.DataDeviceMaster;
      this.dataDevice = this.dataDevice.filter((i) => {
        return i.JobTypeCode == value;
      });
      this.$store.state.deviceMaster.ShowTable = true;
    },
    gotoDetail(item) {
      this.$router.push(`/device-detail/${item.ID}`);
    },
    async loadData() {
      await this.$store.dispatch("loadDataDeviceMaster");
      this.dataDevice = this.$store.getters.DataDeviceMaster
    },
    showdeleteDevice(id) {
      this.confirmDeleteDlg = true;
      this.deleteID = id
      // console.log(id);
    },
    async confirmDelete() {
      await apiDevice.deleteDevice(this.deleteID);
      await this.loadData();
      this.checkDepart();
      this.confirmDeleteDlg = false;
    },
    checkDepart() {
      // console.log(this.$store.state.deviceMaster.selectDepart)
      if (this.$store.state.deviceMaster.selectDepart !== "") {
        // console.log('เข้าเงื่อนไข')
        this.selectDepart(this.$store.state.deviceMaster.selectDepart)
      }
    },
    async clickModify(id) {
      await this.$store.dispatch('loadFormDevice')
      await this.$store.dispatch({
              type: "modifyDeviceID",
              id: id
            });
      // console.log(this.$store.getters.editDeviceID);
      // console.log('getterdata', this.$store.getters.DataDeviceEdit);
    },
    FilterJob() {
      // เช็ค Sumbill
      this.dataDevice = this.$store.getters.DataDeviceMaster

      if(this.checkboxDepart.it && this.checkboxDepart.ma) {
        this.dataDevice = this.$store.getters.DataDeviceMaster
      } else if (! this.checkboxDepart.it && this.checkboxDepart.ma) {
         this.dataDevice = this.dataDevice.filter((i) => {
           return i.JobTypeCode === "02";
         })
      } else if (this.checkboxDepart.it && !this.checkboxDepart.ma) {
         this.dataDevice = this.dataDevice.filter((i) => {
           return i.JobTypeCode === "01";
         })
      } else if (! this.checkboxDepart.it && !this.checkboxDepart.ma) {
         this.dataDevice = []
      }

    },
  },
};
</script>

<style>


.tableDevice table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgba(117, 137, 248, 0.747);
}
</style>