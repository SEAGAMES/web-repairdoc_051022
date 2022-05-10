<template>
  <v-container>
    <v-col>
      <v-card>
        <v-data-table
          :search="dataFilter.search"
          :headers="headers"
          class="elevation-1 tablePurchase mt-5"
          :items="getPurchaseBillMaster2"
          :items-per-page="15"
        >
          <template v-slot:top>
            <v-row>
              <v-col cols="5">
                <v-toolbar flat color="white">
                  <v-toolbar-title>ใบแจ้งซื้อ</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-text-field
                    append-icon="search"
                    v-model="dataFilter.search"
                    label="ค้นหาด้วยชื่อ"
                    class="mt-6"
                    outlined
                  ></v-text-field>
                </v-toolbar>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="statusShow.id"
                  :items="statusShow"
                  item-value="id"
                  item-text="Status"
                  label="สถานะที่ต้องการค้นหา"
                  @change="filterByStatus(statusShow.id)"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="SectionSelect.SectionCode"
                  :items="SectionSelect"
                  item-value="SectionCode"
                  item-text="SectionName"
                  label="เเผนกที่ต้องการค้นหา"
                  @change="filterBySection(SectionSelect.SectionCode)"
                  outlined
                  required
                />
              </v-col>
              <v-col cols="3" class="mt-3">
                <button class="red--text" @click="cancelSort()">ยกเลิก</button>
                <v-btn
                  class="ml-9"
                  color="yellow lighten-1"
                  @click="gotoPurchaseCreate()"
                  >+ สร้างใบเเจ้งซื้อ</v-btn
                >
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="{ item, index }">
            <tr
              v-bind:class="{
                tableFinish: item.Status_Code >= '5',
              }"
            >
              <!-- <tr height="60"> -->
              <td @click="gotoDetail(item, index)" align="center">
                {{ item.Purchase_Bill_Doc }}
              </td>
              <td @click="gotoDetail(item, index)" align="center">
                {{ item.SectionName }}
              </td>
              <td @click="gotoDetail(item, index)" align="center">
                {{ item.Request_FullName }} <br />
                ({{ item.Request_NickName }}) ({{ item.Request_ID }})
              </td>
              <td @click="gotoDetail(item, index)" align="center" width="250">
                <div
                  v-for="(data, index) in item.MiniList"
                  :key="index"
                  class="mb-2"
                >
                  • {{ data.ITEM_NAME }}
                </div>
              </td>
              <td @click="gotoDetail(item, index)" align="center">
                {{ item.Bill_Date | moment("L") }} <br />
                <span class="grey--text"
                  >(เวลา {{ item.Bill_Date | moment("LT") }} น.)</span
                >
                <!-- {{ DateShow(item.Bill_Date) }} -->
              </td>

              <td align="center">
                <v-btn
                  color="#f39C12"
                  v-if="item.Status_Code == '0'"
                  dark
                  small
                  width="120"
                >
                  <v-icon size="15">mdi-alarm</v-icon>รอการอนุมัติ
                </v-btn>
                <v-btn
                  color="#40C4FF"
                  align="center"
                  v-if="item.Status_Code == '1'"
                  @click="changeStatus2(item, index)"
                  dark
                  small
                  width="120"
                >
                  <v-icon size="15">mdi-clipboard-check</v-icon
                  ><span class="ml-1">อนุมัติเเล้ว</span>
                </v-btn>
                <v-btn
                  color="#FF7043"
                  align="center"
                  v-if="item.Status_Code == '2'"
                  @click="changeStatus2(item, index)"
                  dark
                  small
                  width="120"
                >
                  <v-icon size="15">mdi-clipboard-check</v-icon
                  ><span class="ml-1">รอจัดซื้อ</span>
                </v-btn>
                <v-btn
                  small
                  color="#0000FF"
                  align="center"
                  full-width
                  v-if="item.Status_Code == '3'"
                  @click="changeStatus2(item, index)"
                  dark
                  width="120"
                >
                  <v-icon size="15">mdi-cart-arrow-down</v-icon>จัดเตรียมสินค้า
                </v-btn>
                <v-btn
                  color="#64DD17"
                  align="center"
                  v-if="item.Status_Code == '4'"
                  @click="changeStatus2(item, index)"
                  dark
                  small
                  width="120"
                >
                  <v-icon size="15">mdi-package-variant-closed</v-icon
                  ><span class="ml-1">สินค้าพร้อมรับ</span>
                </v-btn>
                <v-btn
                  color="#00a65a"
                  align="center"
                  v-if="item.Status_Code == '5'"
                  @click="changeStatus2(item, index)"
                  dark
                  small
                  width="120"
                >
                  <v-icon size="15">mdi-account-check</v-icon
                  ><span class="ml-1">รับสินค้าเเล้ว</span>
                </v-btn>
                <v-btn
                  color="#F44336"
                  align="center"
                  v-if="item.Status_Code == '6'"
                  @click="changeStatus2(item, index)"
                  dark
                  small
                  width="120"
                >
                  <v-icon size="15">mdi-window-close</v-icon
                  ><span class="ml-1">ไม่อนุมัติ</span>
                </v-btn>
              </td>

              <!-- <td>
                <v-icon class="mr-1" @click="deleteItem(index)">delete</v-icon>
              </td> -->
              <td width="100">
                <v-icon class="ml-2" @click="editItem(item, index)"
                  >edit</v-icon
                >
                <v-icon class="mr-1 ml-2" @click="deleteItem(item, index)"
                  >delete</v-icon
                >
              </td>
            </tr>
          </template>
        </v-data-table>

        <!-- Popup เปลี่ยนสถานะ -->
        <v-dialog
          v-model="changeStatusShowPop"
          max-height="600"
          max-width="600"
          class="fontPrompt"
        >
          <v-form class="fontPrompt">
            <v-card class="pa-5">
              <v-row>
                <v-col>
                  <v-select
                    v-model="DataStatuschange.Status_Code"
                    :items="statusShow"
                    item-value="id"
                    item-text="Status"
                    label="เปลี่ยนสถานะ"
                    outlined
                    color="blue"
                  />
                </v-col>
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="changeStatusShowPop = false">Cancle</v-btn>
                <v-btn color="error" @click="confirmChangeStatus()"
                  >Confirm</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>

        <!-- snackbarUpdate คิว -->
        <div class="text-center ma-2">
          <v-snackbar
            v-model="snackBarWerning"
            top
            width="1000"
            align="center"
            :timeout="7000"
          >
            <div class="fontSarabun fontSize16 text-center">
              หากรับสินค้าไปเเล้ว กรุณากดรับสินค้าด้วยค่ะ
              <v-icon small class="ml-1" color="yellow"
                >mdi-shield-check</v-icon
              >
              <br />
              <br />
              <v-btn elevation="2" color="success" @click="linkToBill()"
                >กดรับสินค้า</v-btn
              >
            </div>
          </v-snackbar>
        </div>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import apiPurchaseRequest from "../../services/apiPurchaseRequest";
import moment from "moment";
import api from "../../services/api";

export default {
  data() {
    return {
      getPurchaseBillMaster: [],
      getPurchaseBillMaster2: [],
      SectionSelect: [],
      SectionFilter: [],
      changeStatusShowPop: false,
      confirmDeleteDlg: false,
      snackBarWerning: false,
      deleteID: 0,
      index: [],
      DataStatuschange: [],
      statusChange: [],
      ItemsName: [],
      dataFilter: {
        search: "",
      },
      headers: [
        {
          text: "เลขที่บิล",
          value: "Purchase_Bill_Doc",
          sortable: false,
          align: "center",
          justify: "center",
          class: "#",
        },
        {
          text: "เเผนกที่เเจ้ง",
          value: "SectionName",
          align: "center",
          justify: "center",
        },
        {
          text: "ผู้เเจ้ง",
          value: "Request_ID",
          align: "center",
          justify: "center",
        },
        {
          text: "รายการ",
          value: "Mini_List",
          align: "center",
          justify: "center",
        },
        {
          text: "วันที่เเจ้ง",
          value: "Bill_Date",
          align: "center",
          justify: "center",
        },
        {
          text: "สถานะ",
          value: "Status_Code",
          align: "center",
          justify: "center",
        },
        {
          text: "Action",
          value: "Delete_Order",
          sortable: false,
          align: "center",
          justify: "center",
        },
      ],
      statusShow: [
        {
          id: "0",
          Status: "รอการอนุมัติ",
        },
        {
          id: "1",
          Status: "อนุมัติเเล้ว",
        },
        {
          id: "2",
          Status: "รอจัดซื้อ",
        },
        {
          id: "3",
          Status: "กำลังจัดเตรียมสินค้า",
        },
        {
          id: "4",
          Status: "สินค้าพร้อมรับ",
        },
        {
          id: "5",
          Status: "รับสินค้าเเล้ว",
        },
        {
          id: "6",
          Status: "ไม่อนุมัติ",
        },
      ],

      statusShow2: [
        {
          id: "0",
          Status: "รอการอนุมัติ",
        },
        {
          id: "1",
          Status: "อนุมัติเเล้ว",
        },
        {
          id: "2",
          Status: "รอจัดซื้อ",
        },
        {
          id: "3",
          Status: "กำลังจัดเตรียมสินค้า",
        },
        {
          id: "4",
          Status: "สินค้าพร้อมรับ",
        },
        {
          id: "5",
          Status: "รับสินค้าเเล้ว",
        },
        {
          id: "6",
          Status: "ไม่อนุมัติ",
        },
      ],
    };
  },
  async mounted() {
    this.$emit("isCheckLogin", !(await api.isLoggedIn()));
    moment.locale("th");
    if(this.$store.state.purchaseBillMaster.dataFilter) {
      this.dataFilter = this.$store.state.purchaseBillMaster.dataFilter
    }
    await this.getBillMaster();
    await this.getSection();
    await this.getItemsName();
    await this.getWarningStatus(this.$store.getters.username);
    // console.log(this.$store.getters.username);
  },
  methods: {
    async getWarningStatus(empCode) {
      this.warningStatus = await apiPurchaseRequest.StatusWarning(empCode);
      // console.log('result : ' , this.warningStatus)
      if (this.warningStatus > 0) {
        this.snackBarWerning = true;
      } else {
        this.snackBarWerning = false;
      }
    },

    // เมื่อกดจะพาไปที่บิลที่พร้อมรับของ
    async linkToBill() {
      this.dataFilter.search = this.$store.getters.username;
      this.snackBarWerning = false;
    },

    async getBillMaster() {
      this.getPurchaseBillMaster = await apiPurchaseRequest.getBillMaster();
    },
    async getSection() {
      this.SectionSelect = await apiPurchaseRequest.getSection();
    },
    //getItemsName
    async getItemsName() {
      const BackupItemName = await apiPurchaseRequest.getItemsName();
      this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
      this.getPurchaseBillMaster2.forEach((data, index) => {
        // this.getPurchaseBillMaster3 = this.getPurchaseBillMaster2
        this.getPurchaseBillMaster2[index].MiniList = BackupItemName.filter(
          (dataFilter, index) => {
            return dataFilter.Purchase_Bill_ID === data.Purchase_Bill_ID;
          }
        );
      });
      // this.ItemsName = await apiPurchaseRequest.getItemsName();
      // console.log(this.ItemsName);
      // return await apiPurchaseRequest.getItemsName();
    },

    async gotoDetail(item, index) {
      this.$store.state.purchaseDetail.dataHeader = item;
      this.$store.state.purchaseBillMaster.dataFilter = this.dataFilter;
      await this.$router.push("/purchase-detail").catch(() => {});
    },

    async gotoPurchaseCreate() {
      // console.log(this.getPurchaseBillMaster)
      let checkState4 = this.getPurchaseBillMaster.filter((dataFilter) => {
        return (
          dataFilter.Request_ID === this.$store.state.username &&
          dataFilter.Status_Code === "4"
        );
      });
      // console.log(checkState4);
      if (checkState4.length > 0) {
        await this.$swal({
          title: "กรุณากดรับสินค้าของบิลเก่าก่อนครับ",
          icon: "error",
          text: "ไม่อนุญาตให้สร้างบิล !!",
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        await this.$router.push("/purchase-request").catch(() => {});
      }
    },
    //filterBySection
    filterBySection(section_code) {
      this.getPurchaseBillMaster2 = this.getPurchaseBillMaster.filter((S) => {
        return S.Section_Code == section_code;
      });
    },
    //filterByStatus
    filterByStatus(Status_Code) {
      this.getPurchaseBillMaster2 = this.getPurchaseBillMaster.filter((Z) => {
        return Z.Status_Code == Status_Code;
      });
    },
    changeStatus2(item, index) {
      //console.log("item : ", item);
      this.statusShow = this.statusShow2;
      if (
        this.$store.getters.policyCode === "03" ||
        this.$store.getters.policyCode === "08"
      ) {
        //ถ้าเป็นพี่จี ให้กดเปลี่ยนสถานะได้แต่เปลี่ยนสถานะเสร็จแล้วไม่ได้
        if (
          item.Status_Code !== "5" &&
          this.$store.getters.policyCode === "08"
        ) {
          // this.statusShow = this.statusShow2;
          if (item.Status_Code === "1") {
            this.changeStatusShowPop = true;
            this.DataStatuschange.Status_Code = item.Status_Code;
            this.DataStatuschange.Purchase_Bill_ID = item.Purchase_Bill_ID;
            this.index = index;
            this.statusShow = this.statusShow.filter((i) => {
              return i.id === "2" || i.id === "3" || i.id === "6";
            });
          } else if (item.Status_Code === "2") {
            this.changeStatusShowPop = true;
            this.DataStatuschange.Status_Code = "3";
            this.DataStatuschange.Purchase_Bill_ID = item.Purchase_Bill_ID;
            this.index = index;
            this.statusShow = this.statusShow.filter((i) => {
              return i.id === "3";
            });
          } else if (item.Status_Code === "3") {
            this.changeStatusShowPop = true;
            this.DataStatuschange.Status_Code = "4";
            this.DataStatuschange.Purchase_Bill_ID = item.Purchase_Bill_ID;
            this.index = index;
            this.statusShow = this.statusShow.filter((i) => {
              return i.id === "4";
            });
          }

          //ถ้าเป็น SuperUser ให้กดดูได้เลย
        } else if (this.$store.getters.policyCode === "03") {
          this.changeStatusShowPop = true;
          // this.changeStatusShowPop = true;
          this.DataStatuschange.Status_Code = item.Status_Code;
          this.DataStatuschange.Purchase_Bill_ID = item.Purchase_Bill_ID;
          this.index = index;
          // console.log("item.Status_Code : " , item.Status_Code)
          // console.log('DataStatuschange.Purchase_Bill_ID : ' ,this.DataStatuschange.Purchase_Bill_ID)
        }
      }
      if (
        this.$store.state.username === item.Request_ID &&
        item.Status_Code === "4"
      ) {
        //console.log("ตัวเองจะกดรับสินค้าเเล้ว");
        this.changeStatusShowPop = true;
        this.DataStatuschange.Status_Code = "5";
        this.DataStatuschange.Purchase_Bill_ID = item.Purchase_Bill_ID;
        this.index = index;
        this.statusShow = this.statusShow.filter((i) => {
          return i.id === "5";
        });
      }
    },
    DateShow(date) {
      moment.locale("th");
      const dateParse = new Date(date);
      // const TestDate = new Date();
      // console.log(`${moment(dateParse).add(543, "year").format("L")} <br>(${moment(dateParse).format("LT")} น.)`)
      return `${moment(dateParse)
        .add(543, "year")
        .format("L")} (${moment(dateParse).format("LT")} น.)`;

      // return `${moment.utc(dateParse).add(543, "year").format("L")} (${moment.utc(dateParse).add(543, "year").format("LT")} น.)`;
    },

    async editItem(item, index) {
      //ถ้าเป็นใบเเจ้งซื้อของตนเองสามารถเเก้ไขได้
      if (
        localStorage.getItem("username") ===
        this.getPurchaseBillMaster[index].Request_ID
      ) {
        //ถ้ายังไม่มีการอนุมัตบิล เเละ สถานะบิลยังไม่เป็นรับสินค้าเเล้วหรืออนุมัติ สามารถเเก้ไขได้
        if (
          this.getPurchaseBillMaster[index].Inspactor_ID == null &&
          this.getPurchaseBillMaster[index].Status_Code < 5
        ) {
          //console.log("เเก้ไขได้");
          // console.log("EditItem : ", item);
          // console.log("index : ", index);
          localStorage.setItem(
            "Purchase_Bill_ID",
            JSON.stringify(item.Purchase_Bill_ID)
          );

          this.$router.push("/purchase-edit").catch(() => {});
        } else {
          //console.log("เเก้ไขไม่ได้");
        }
        //หากเป็น admin หรือ super user สามารถเเก้ไขได้
      }
      if (
        this.$store.getters.policyCode === "03" ||
        this.$store.getters.policyCode === "08"
      ) {
        if (
          this.$store.getters.policyCode === "08" &&
          this.getPurchaseBillMaster[index].Status_Code < 5
        ) {
          //console.log("item.Purchase_Bill_ID : ", item.Purchase_Bill_ID);
          localStorage.setItem(
            "Purchase_Bill_ID",
            JSON.stringify(item.Purchase_Bill_ID)
          );
          this.$router.push("/purchase-edit").catch(() => {});
          //console.log("08 เข้าเเก้ไข");
        } else if (
          this.$store.getters.policyCode === "08" &&
          this.getPurchaseBillMaster[index].Status_Code > 4
        ) {
          // ให้ 03 สามารถลบได้เลย
        } else if (this.$store.getters.policyCode === "03") {
          localStorage.setItem(
            "Purchase_Bill_ID",
            JSON.stringify(item.Purchase_Bill_ID)
          );
          //console.log("เข้าได้");
          this.$router.push("/purchase-edit").catch(() => {});
        }
      }
    },

    deleteItem(item, index) {
      // console.log("getPurchaseBillMaster : ",this.getPurchaseBillMaster[index]);
      // console.log(this.getPurchaseBillMaster[index].Request_ID);
      // console.log("this.$store.getters.username : ",this.$store.getters.username);
      // console.log("status : ", item.Status_Code);
      // console.log("item.Purchase_Bill_ID : ", item.Purchase_Bill_ID);
      // console.log("this.$store.getters.policyCode : ",this.$store.getters.policyCode);

      // console.log("User : ", localStorage.getItem("username"));
      // console.log("Request_ID : ",this.getPurchaseBillMaster[index].Request_ID);
      if (
        localStorage.getItem("username") ===
          this.getPurchaseBillMaster[index].Request_ID &&
        this.getPurchaseBillMaster[index].Status_Code < 5
      ) {
        if (confirm("คุณต้องการลบบิลสั่งซื้อนี้ใช่หรือไม่ ?")) {
          this.getPurchaseBillMaster.splice(index, 1);
          const deleteID = item.Purchase_Bill_ID;
          this.confirmDelete(deleteID);
        }
      } else if (
        item.ContactPerson === this.$store.getters.username &&
        item.Status === "0"
      ) {
        (this.deleteID = item.BillID), (this.confirmDeleteDlg = true);
      } else if (
        this.$store.getters.policyCode === "03" ||
        this.$store.getters.policyCode === "08"
      ) {
        if (
          this.$store.getters.policyCode === "08" &&
          this.getPurchaseBillMaster[index].Status_Code < 5
        ) {
          if (confirm("คุณต้องการลบบิลสั่งซื้อนี้ใช่หรือไม่ ?")) {
            if (
              this.getPurchaseBillMaster[index].Request_ID ===
                this.$store.getters.username &&
              item.Status_Code === "0"
            ) {
              this.getPurchaseBillMaster.splice(index, 1);
              //console.log("เข้า Delete");
              const deleteID = item.Purchase_Bill_ID;
              this.confirmDelete(deleteID);
            } else if (
              this.$store.getters.policyCode === "03" ||
              this.$store.getters.policyCode === "08"
            ) {
              this.getPurchaseBillMaster.splice(index, 1);
              //console.log("เข้า Delete 2");
              const deleteID = item.Purchase_Bill_ID;
              this.confirmDelete(deleteID);
            }
          }
        }
        if (this.$store.getters.policyCode === "03") {
          if (confirm("คุณต้องการลบบิลสั่งซื้อนี้ใช่หรือไม่ ?")) {
            if (
              this.getPurchaseBillMaster[index].Request_ID ===
                this.$store.getters.username &&
              item.Status_Code === "0"
            ) {
              this.getPurchaseBillMaster.splice(index, 1);
              //console.log("เข้า Delete");
              const deleteID = item.Purchase_Bill_ID;
              this.confirmDelete(deleteID);
            } else if (
              this.$store.getters.policyCode === "03" ||
              this.$store.getters.policyCode === "08"
            ) {
              this.getPurchaseBillMaster.splice(index, 1);
              //console.log("เข้า Delete 2");
              const deleteID = item.Purchase_Bill_ID;
              this.confirmDelete(deleteID);
            }
          }
        }
      }
    },
    async confirmDelete(id) {
      const result = await apiPurchaseRequest.deletePuechaseAllBill(id);
      if (result == "ok") {
        await this.$swal({
          title: "Update Success",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.getBillMaster();
        this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
        this.changeStatusShowPop = false;
      } else {
        await this.$swal({
          title: "Error",
          icon: "error",
          text: "Cannot be saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async updateStatus_Code(Status_Code, bill_ID) {
      const result = await apiPurchaseRequest.updateStatus(
        Status_Code,
        bill_ID
      );
    },

    cancelSort() {
      this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
      this.statusShow.id = null;
      this.SectionSelect.SectionCode = null;
      this.dataFilter.search = null;
    },
    async confirmChangeStatus() {
      //console.log("มาถึง confirmChangeStatus")
      //console.log("this.DataStatuschange.Status_Code : " , this.DataStatuschange.Status_Code)
      if (this.DataStatuschange.Status_Code == "0") {
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "0");
        //console.log("this.getPurchaseBillMaster2[this.index].Status_Code : ",this.getPurchaseBillMaster2[this.index].Status_Code);
        this.getPurchaseBillMaster2[this.index].Status_Code = "0";
        //console.log("statusCode : ", statusCode);
        //console.log("this.DataStatuschange.Purchase_Bill_ID : ",this.DataStatuschange.Purchase_Bill_ID);
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      }
      if (this.DataStatuschange.Status_Code == "1") {
        //console.log("มาถึง");
        //console.log("this.getPurchaseBillMaster2[this.index].Status_Code : ",this.index);
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "1");
        this.getPurchaseBillMaster2[this.index].Status_Code = "1";
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        //console.log("result : " , result.statusText);
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      }
      if (this.DataStatuschange.Status_Code == "2") {
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "2");
        this.getPurchaseBillMaster2[this.index].Status_Code = "2";
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      }
      if (this.DataStatuschange.Status_Code == "3") {
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "3");
        this.getPurchaseBillMaster2[this.index].Status_Code = "3";
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      }
      if (this.DataStatuschange.Status_Code == "4") {
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "4");
        this.getPurchaseBillMaster2[this.index].Status_Code = "4";
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      }
      if (this.DataStatuschange.Status_Code == "5") {
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "5");
        this.getPurchaseBillMaster2[this.index].Status_Code = "5";
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      }
      if (this.DataStatuschange.Status_Code == "6") {
        const statusCode = (this.getPurchaseBillMaster2[
          this.index
        ].Status_Code = "6");
        this.getPurchaseBillMaster2[this.index].Status_Code = "6";
        const result = await apiPurchaseRequest.updateStatus(
          statusCode,
          this.DataStatuschange.Purchase_Bill_ID
        );
        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getBillMaster();
          this.getPurchaseBillMaster2 = this.getPurchaseBillMaster;
          this.changeStatusShowPop = false;
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
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

.tablePurchase table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgba(208, 134, 243, 0.753);
}
.tableFinish {
  background-color: rgba(241, 222, 247, 0.753);
}
</style>
