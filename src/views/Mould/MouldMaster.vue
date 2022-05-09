<template>
  <v-container grid-list-xs class="fontPrompt" v-if="!$store.state.loadingPage">
    <v-card >
      <v-data-table :search="search" :headers="headers" :items="mouldBill" :items-per-page="15"  multi-sort class="elevation-1 tableMould" max-width="3000">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title class="fontSize14" @click="$router.push('/mould-history')"
              >ประวัติยืมแม่พิมพ์</v-toolbar-title
            >
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
              color="orange"
              class="mt-7"
              v-model="checkBoxStatus.status01"
              label="คำขอยืมแม่พิมพ์"
              @change="filtersBillStatus()"
              on-icon="check_box"
              off-icon="check_box_outline_blank"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox
              color="blue"
              class="mt-7"
              v-model="checkBoxStatus.status02"
              label="แม่พิมพ์พร้อมรับ"
              @change="filtersBillStatus()"
                            on-icon="check_box"
              off-icon="check_box_outline_blank"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox
              color="pink"
              class="mt-7"
              v-model="checkBoxStatus.status03"
              label="ยังไม่ส่งคืน"
              @change="filtersBillStatus()"
                            on-icon="check_box"
              off-icon="check_box_outline_blank"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox
              color="green"
              class="mt-7"
              v-model="checkBoxStatus.status04"
              label="รับแม่พิมพ์คืนแล้ว"
              @change="filtersBillStatus()"
                            on-icon="check_box"
              off-icon="check_box_outline_blank"
            ></v-checkbox>
            <v-spacer></v-spacer>
            <v-checkbox
              color="lime darken-1"
              class="mt-7"
              v-model="checkBoxStatus.status05"
              label="สร้างแม่พิมพ์ใหม่"
              @change="filtersBillStatus()"
                            on-icon="check_box"
              off-icon="check_box_outline_blank"
            ></v-checkbox>

            <v-spacer></v-spacer>
            <v-btn
              color="success"
              dark
              class="mt-7 mb-5 mr-n4"
              @click="$router.push('/mould-multicreate')"
            >
              <v-icon left>add</v-icon>
              <span>สร้างเอกสารใบขอยืม</span>
            </v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
          <!-- <tr class="color: grey and myImg"> v-bind:class="{ active: isActive, 'text-danger': hasError }" -->
          <tr v-bind:class="{ 'color: green accent-1': item.Status == '04' }">
            <td @click="goDetail(item)" width="40" align="center" justify="center"> <span class="fontSize13">{{ item.DocID }}</span> </td>
            <td @click="goDetail(item)" width="180" align="center" justify="center">
              <span class="fontSize13"> ({{ item.dowBillDate }})_{{ item.BillDate | moment("DD/MM/YYYY") }}</span>
            </td>
            <td @click="goDetail(item)" width="250" align="center" justify="center">
              <span class="fontSize13">{{ item.OwnerFullName }}</span>
            </td>
            <td @click="goDetail(item)" width="100" align="center" justify="center">
              <span class="fontSize13">{{ item.DepartName }}</span>
            </td>
            <td @click="goDetail(item)" >
              <span class="fontSize13">{{ item.OrderNumber }}</span>
            </td>
            <td @click="goDetail(item)" align="center" justify="center" width="130">
              <span class="fontSize13"> {{ item.ModelNo }}</span>
            </td>
            <td @click="goDetail(item)" width="140" align="center" justify="center"> <span class="fontSize13" >{{ item.JobTypeName }}</span> </td>

            <td @click="goDetail(item)" align="center" justify="center">
              <v-chip dark 
              v-bind:class="{ 'green': item.LateDate > 3 , 'orange': item.LateDate <= 3 && item.LateDate >= 0, 'pink': item.LateDate < 0 }">  
                <span class="fontSize13">
                  {{ item.LateDate }}
                </span> 
              </v-chip>
              <!-- {{ item.Datelate }} -->
            </td>
            <td align="center" justify="center">
              <v-btn
                color="orange"
                v-if="item.Status === '01'"
                dark
                small
                width="110"
                @click="PopupChangeStatus(item)"
              >
                <v-icon class="ml-n1">record_voice_over</v-icon>
                <span class="fontSize10">คำขอยืมแม่พิมพ์</span>
              </v-btn>

              <v-btn
                color="blue"
                v-if="item.Status === '02'"
                dark
                small
                width="110"
                @click="PopupChangeStatus(item)"
              >
                <v-icon class="ml-n1">add_task</v-icon>
                <span class="fontSize10">แม่พิมพ์พร้อมรับ</span>
              </v-btn>

              <v-btn
                color="pink"
                v-if="item.Status === '03'"
                dark
                small
                width="110"
                @click="PopupChangeStatus(item)"
              >
                <v-icon class="ml-n1">gavel</v-icon>
                <span class="fontSize10 ml-1">ยังไม่ส่งคืน</span>
              </v-btn>

              <v-btn
                color="green"
                v-if="item.Status === '04'"
                dark
                small
                width="110"
                @click="PopupChangeStatus(item)"
              >
                <v-icon class="ml-n1">thumb_up_off_alt</v-icon>
                <span class="fontSize10  ml-1">รับกลับแล้ว</span>
              </v-btn>
              <v-btn
                color="lime darken-1"
                v-if="item.Status === '05'"
                dark
                small
                width="110"
                @click="PopupChangeStatus(item)"
              >
                <v-icon class="ml-n1">loupe</v-icon>
                <span class="fontSize10">สร้างแม่พิมพ์ใหม่</span>
              </v-btn>
            </td>

            <td width="120" align="center" justify="center">
              <v-icon @click="modifyItem(item)">edit</v-icon>
              <v-icon @click="deleteItem(item)">delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>

      <!-- หน้า Confirm Delete -->
      <v-dialog v-model="showPopupDelete" max-width="290">
        <v-card>
          <v-card-title primary-title> Confirm Delete </v-card-title>

          <v-card-text class="body">
            Are you sure to delete this Device? You cannot restore it after
            clicking confirm.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="(showPopupDelete = false), (deleteID = 0)">
              Cancel
            </v-btn>
            <v-btn color="error" text @click="confirmDelete"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Popup เปลี่ยนสถานะ -->
      <v-dialog
        v-model="showPopupChangeStatus"
        max-height="600"
        max-width="600"
        class="fontPrompt"
      >
        <v-form class="fontPrompt">
          <v-card class="pa-5">
            <v-row>
              <v-col>
                <v-select
                  v-model="DataChangeStatus.StatusID"
                  :items="statusShow"
                  item-value="StatusID"
                  item-text="StatusName"
                  label="เปลี่ยนสถานะ"
                  outlined
                  color="blue"
                />
              </v-col>
            </v-row>

            <v-row v-if="DataChangeStatus.StatusID == '04'">
              <v-col>
                <v-text-field
                  label="กรุณาบอกรายละเอียดการแก้ไขหรือยกเลิกพิมพ์"
                  type="text"
                  v-model="DataChangeStatus.RepairModelDesc"
                  outlined
                  required
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

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="
                  (showPopupChangeStatus = false),
                    (DataChangeStatus.billID = 0),
                    DataChangeStatus.StatusID == ''
                "
                >Cancel</v-btn
              >
              <v-btn text color="error" @click="confirmChangeStatus()"
                >Confirm</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-dialog
        v-model="$store.state.mould.mouldModify.showPopupModify"
        max-width="1030"
        class="fontPrompt"
      >
        <MouldModify @closePageModify="returnModify" />
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
import apiMould from "../../services/apiMould";
import MouldModify from "../Mould/MouldModify";
import api from "../../services/api"


export default {
  name: "mould-master",
  components: {
    MouldModify,
  },
  data() {
    return {
      error: [],
      search: "",
      mouldBill: [],
      headers: [
        { text: "เลขที่บิล", value: "DocID", align: "center", justify: "center"},
        { text: "วันที่ยืม", value: "BillDate", align: "center", justify: "center"},
        { text: "ผู้ขอยืม", value: "OwnerFullName", align: "center", justify: "center" },
        { text: "แผนก", value: "DepartName", align: "center", justify: "center" },
        { text: "ชื่อ Order", value: "OrderNumber", align: "center", justify: "center"},
        { text: "รหัสแม่พิมพ์", value: "ModelNo", align: "center", justify: "center" },
        { text: "ประเภทการยืม", value: "JobTypeName", align: "center", justify: "center" },
        { text: "เหลือวันคืน", value: "LateDate", align: "center", justify: "center" },
        { text: "สถานะ", value: "Status", align: "center", justify: "center" },
        { text: "Action", value: "", align: "center", justify: "center" },
      ],
      showPopupDelete: false,
      deleteID: 0,
      checkBoxStatus: {
        status01: true,
        status02: true,
        status03: true,
        status04: true,
        status05: true,
      },
      dataFilter: {

      },
      checkBoxStatus2: [],
      showPopupChangeStatus: false,
      statusShow: [
        {
          StatusID: "01",
          StatusName: "คำขอยืมแม่พิมพ์",
        },
        {
          StatusID: "02",
          StatusName: "แม่พิมพ์พร้อมรับ",
        },
        {
          StatusID: "03",
          StatusName: "รับแม่พิมพ์แล้ว (ยังไม่ส่งคืน)",
        },
        {
          StatusID: "04",
          StatusName: "รับแม่พิมพ์คืนแล้ว",
        },
      ],
      statusShow2: [
        {
          StatusID: "01",
          StatusName: "คำขอยืมแม่พิมพ์",
        },
        {
          StatusID: "02",
          StatusName: "แม่พิมพ์พร้อมรับ",
        },
        {
          StatusID: "03",
          StatusName: "รับแม่พิมพ์แล้ว (ยังไม่ส่งคืน)",
        },
        {
          StatusID: "04",
          StatusName: "รับแม่พิมพ์คืนแล้ว",
        },
      ],
      DataChangeStatus: {
        billID: 0,
        ReturnPerson: this.$store.getters.username,
        StatusID: "",
        RepairModelDesc: "",
        ReturnDate: "",
      },
      DataFilter: [],
      rowsPerPageItems: [
        5, 10, 20, 30, 40
      ]
    };
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    await this.loadData();
    this.$emit("isCheckLogin", !await api.isLoggedIn());
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 500);
  },
  methods: {
    async loadData() {
      await this.$store.dispatch("getMouldBill");
      this.mouldBill = this.$store.getters.mouldBill;
      // const result = await apiMould.getMouldBill();
      // console.log(this.mouldBill);
    },
    start() {
      const date = new Date();
      // const date1 = moment(date).format('MMMM Do YYYY, h:mm:ss a');
      const docPrefix = `MOLD${date.getFullYear()}${date.getMonth()}`;
      // console.log(docPrefix);
      // console.log(date1)
    },
    deleteItem(item) {
      if (item.Owner === this.$store.getters.username && item.Status === '01' || item.Owner === this.$store.getters.username && item.Status === '05') {
        this.showPopupDelete = true;
        this.deleteID = item.ID;
        // console.log(this.deleteID);
      } else if (
        this.$store.getters.policyCode === "03"
      ) {
        this.showPopupDelete = true;
        this.deleteID = item.ID;
        // console.log(this.deleteID);
      }
    },
    async modifyItem(item) {
      // console.log(item.ModelNo)
      if (item.Owner === this.$store.getters.username && item.Status === "01") {
        this.$store.state.mould.mouldModify.showPopupModify = true;
        await this.$store.dispatch({
          type: "getMouldModifyBill",
          id: item.ID,
        });
        await this.$store.dispatch({
          type: "getModelMouldAll",
          ModelNo: item.ModelNo,
        });
        if (item.OrderNumber !== "non_specific") {
          this.$store.state.mould.mouldModify.checkOrder = "00";
        } else if (item.OrderNumber === "non_specific") {
          this.$store.state.mould.mouldModify.checkOrder = "01";
        }
      } else if (this.$store.getters.policyCode === "03") {
        this.$store.state.mould.mouldModify.showPopupModify = true;
        await this.$store.dispatch({
          type: "getMouldModifyBill",
          id: item.ID,
        });
        await this.$store.dispatch({
          type: "getModelMouldAll",
          ModelNo: item.ModelNo,
        });
        if (item.OrderNumber !== "non_specific" && item.Status === '01') {
          this.$store.state.mould.mouldModify.checkOrder = "00";
        } else if (item.OrderNumber === "non_specific") {
          this.$store.state.mould.mouldModify.checkOrder = "01";
        } else if (item.OrderNumber !== "non_specific" && item.Status === '05') {
          this.$store.state.mould.mouldModify.checkOrder = "02";
        }
      }
    },
    async confirmDelete() {
      const result = await apiMould.deleteBillMould(this.deleteID);
      if (result == "ok") {
        await this.loadData();
        alert("ลบบิลแล้ว");
        (this.deleteID = 0), (this.showPopupDelete = false);
      }
    },
    filtersBillStatus() {
      this.DataFilter = [];
      this.mouldBill = this.$store.getters.mouldBill;
      if (
        this.checkBoxStatus.status01 &&
        this.checkBoxStatus.status02 &&
        this.checkBoxStatus.status03 &&
        this.checkBoxStatus.status04 &&
        this.checkBoxStatus.status05
      ) {
        this.mouldBill = this.$store.getters.mouldBill;
      } else {
        this.mouldBill = this.$store.getters.mouldBill;
        this.DataFilter = [];
        if (this.checkBoxStatus.status01) {
          this.DataFilter.push("01");
        }
        if (this.checkBoxStatus.status02) {
          this.DataFilter.push("02");
        }
        if (this.checkBoxStatus.status03) {
          this.DataFilter.push("03");
        }
        if (this.checkBoxStatus.status04) {
          this.DataFilter.push("04");
        }
        if (this.checkBoxStatus.status05) {
          this.DataFilter.push("05");
        }
        // console.log(this.DataFilter)
        this.mouldBill = this.mouldBill.filter((i) => {
          return (
            i.Status == this.DataFilter[0] ||
            i.Status == this.DataFilter[1] ||
            i.Status == this.DataFilter[2] ||
            i.Status == this.DataFilter[3] ||
            i.Status == this.DataFilter[4]
          );
        });
      }
    },
    PopupChangeStatus(item) {
      this.error = [];
      this.statusShow = this.statusShow2;
      if (item.Owner === this.$store.getters.username && item.Status === "02") {
        this.DataChangeStatus.billID = item.ID;
        this.DataChangeStatus.StatusID = "03";
        this.showPopupChangeStatus = true;
        this.statusShow = this.statusShow.filter((i) => {
          return i.StatusID === "03";
        });
      } else if (
        this.$store.getters.policyCode === "04" &&
        item.Status === "01"
      ) {
        this.DataChangeStatus.billID = item.ID;
        this.DataChangeStatus.StatusID = "02";
        this.showPopupChangeStatus = true;
        this.statusShow = this.statusShow.filter((e) => {
          return e.StatusID === "02";
        });
      } else if (
        this.$store.getters.policyCode === "04" && item.Status === "03") {
        this.DataChangeStatus.billID = item.ID;
        this.DataChangeStatus.StatusID = "04";
        this.showPopupChangeStatus = true;
        this.statusShow = this.statusShow.filter((e) => {
          return e.StatusID === "04";
        });
      } else if (
        this.$store.getters.policyCode === "04" && item.Status === "05"
      ) {
        this.DataChangeStatus.billID = item.ID;
        this.DataChangeStatus.StatusID = "04";
        this.showPopupChangeStatus = true;
        this.statusShow = this.statusShow.filter((e) => {
          return e.StatusID === "04";
        });
      } else if (this.$store.getters.policyCode == "03") {
        this.DataChangeStatus.billID = item.ID;
        this.DataChangeStatus.StatusID = item.Status;
        this.showPopupChangeStatus = true;
        this.statusShow = this.statusShow2;
      }
    },
    async confirmChangeStatus() {
      if (this.DataChangeStatus.StatusID === "02") {
        const dataInsert = {
          billID: this.DataChangeStatus.billID,
          PreparePerson: this.$store.getters.username,
          ReturnDate: new Date(),
          RepairModelDesc: "",
          StatusID: "02",
        };
        // console.log("dataInsert", dataInsert);
        const result = await apiMould.updateStatus02(dataInsert);
        if (result == "ok") {
          this.showPopupChangeStatus = false;
          await this.loadData();
          alert("เปลี่ยน Status แล้ว");
        }
      } else if (this.DataChangeStatus.StatusID === "03") {
        const dataInsert = {
          billID: this.DataChangeStatus.billID,
          Receiver: this.$store.getters.username,
          ReceiveDate: new Date(),
          RepairModelDesc: "",
          StatusID: "03",
        };
        // console.log("dataInsert", dataInsert);
        const result = await apiMould.updateStatus03(dataInsert);
        if (result == "ok") {
          this.showPopupChangeStatus = false;
          await this.loadData();
          alert("เปลี่ยน Status แล้ว");
        }
      } else if (this.DataChangeStatus.StatusID === "04") {
        this.checkformData();
        if (this.checkformData()) {
          const dataInsert = {
            billID: this.DataChangeStatus.billID,
            ReturnPerson: this.$store.getters.username,
            ReturnDate: new Date(),
            RepairModelDesc: this.DataChangeStatus.RepairModelDesc,
            StatusID: "04",
          };
          console.log("dataInsert", dataInsert);
          const result = await apiMould.updateStatus04(dataInsert);
          console.log(result)
          if (result == "ok") {
            this.showPopupChangeStatus = false;
            await this.loadData();
            alert("เปลี่ยน Status แล้ว");
          }
        }
      }
    },
    async returnModify(value) {
      if (value) {
        await this.loadData();
      }
    },
    async goDetail(item) {
      await this.$store.dispatch({
        type: "setDataMouldDetail",
        data: item,
      });
      await this.$router.push("/mould-detail");
    },
    checkformData() {
      if (
        this.DataChangeStatus.RepairModelDesc !== "" &&
        this.DataChangeStatus.StatusID === "04"
      ) {
        return true;
      }
      this.error = [];
      if (this.DataChangeStatus.RepairModelDesc == "") {
        this.error.push("โปรดระบุการแก้ไขหรือรายละเอียดการยืมแม่พิมพ์");
      }
    },
  },
};
</script>

<style>
.fontSize10 {
  font-size: 10px;
}

.fontSize14 {
  font-size: 14px;
}

.tableMould table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgb(255, 249, 213);
}
</style>