<template>
 <v-container class="fontPrompt">


    <v-row >
      <v-spacer></v-spacer>
      <v-card width="1000">
     <v-row class="pt-5">
      <v-spacer></v-spacer>
      <h1 class="text-bold">แก้ไขเอกสารใบขอยืมแม่พิมพ์</h1>
      <v-spacer></v-spacer>
    </v-row>

        <v-form @submit.prevent="submit" class="mt-5">
          <v-container>
            <v-row class="ml-5 mr-5 mt-0">
              <!-- เลือกแผนก -->
              <v-col lg="4" md="4" sm="12">
                <v-text-field
                  v-model="$store.getters.mouldModifybill.Owner"
                  label="รหัสผู้ขอยืม"
                  outlined
                  required
                  disabled
                />
              </v-col>
              <!-- เลือกประเภทอุปกรณ์ -->
              <v-col lg="8" md="8" sm="12">
                <v-text-field
                  v-model="$store.getters.mouldModifybill.EmpFullName"
                  label="ชื่อผู้ขอยืม"
                  outlined
                  required
                  disabled
                />
              </v-col>
            </v-row>
            
            <v-row class="ml-5 mr-5 mt-0">
              <v-col lg="6" md="6" sm="6">
                <v-autocomplete
                  label="เลือกแผนกผู้ขอยืม"
                  v-model="$store.getters.mouldModifybill.DepartCode"
                  :items="depart"
                  item-value="DepartCode"
                  item-text="DepartName"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>

              <v-col lg="6" md="6" sm="6">
                <v-text-field
                  label="กำหนดวันคืนแม่พิมพ์"
                  v-model="$store.getters.mouldModifybill.DueDate"
                  type="date"
                  outlined
                  required
                />
              </v-col>
            </v-row>

            <v-row class="ml-7 mr-7 mt-0"  v-if="$store.state.mould.mouldModify.checkOrder === null || $store.state.mould.mouldModify.checkOrder === '02' ">
                <v-checkbox
                  v-model="$store.state.mould.mouldModify.checkOrder"
                  value="02"
                  hide-details
                  @change="changeCheckBox()"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                ></v-checkbox>
                <v-autocomplete
                  label="สร้างแม่พิมพ์ใหม่"
                  v-model="$store.getters.mouldModifybill.OrderNumber"
                  :disabled="$store.state.mould.mouldModify.checkOrder !== '02'"
                  :items="$store.getters.orderModifySelect"
                  item-value="OrderNumber"
                  item-text="OrderNumber"
                  outlined
                  required
                   @change="loadDataModelMould()" 
                ></v-autocomplete>
            </v-row>

            <v-row class="ml-7 mr-7 mt-0"  v-if="$store.state.mould.mouldModify.checkOrder === null || $store.state.mould.mouldModify.checkOrder === '00' ">
                <v-checkbox
                  v-model="$store.state.mould.mouldModify.checkOrder"
                  value="00"
                  hide-details
                  @change="changeCheckBox()"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                ></v-checkbox>
                <v-autocomplete
                  label="ชื่อ Order"
                  v-model="$store.getters.mouldModifybill.OrderNumber"
                  :items="$store.getters.orderModifySelect"
                  :disabled="$store.state.mould.mouldModify.checkOrder !== '00'"
                  item-value="OrderNumber"
                  item-text="OrderNumber"
                  outlined
                  required
                   @change="loadDataModelMould()" 
                ></v-autocomplete>
            </v-row>

            <v-row class="ml-7 mr-7 mt-0" v-if="$store.state.mould.mouldModify.checkOrder === null || $store.state.mould.mouldModify.checkOrder === '01' ">
                <v-checkbox
                  v-model="$store.state.mould.mouldModify.checkOrder"
                  value="01"
                  label="เลือกแม่พิมพ์แบบไม่ระบุ Order"
                  @change="changeCheckBox()"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                ></v-checkbox>
            </v-row>

            <v-row class="ml-5 mr-8 mt-0">
              <v-col lg="3" md="3" sm="3">
                <v-img :src="$store.getters.dataPictMouldModify" max-height="150" max-width="200"> </v-img>
              </v-col>
                <v-col lg="9" md="9" sm="9">
                  <v-row>
                    <v-select
                    v-model="$store.getters.mouldModifybill.ModelNo"
                    :items="$store.state.mould.mouldModify.dataMouldAll"
                    item-value="ModelNo"
                    item-text="ModelNo"
                    label="รหัสแม่พิมพ์"
                    outlined
                    required
                    @change="changePict()"
                    />
                  </v-row>
                  <v-row>
                    <v-text-field
                    v-model="$store.getters.mouldModifybill.Qty"
                    type="number"
                    label="จำนวนของแม่พิมพ์ / ชิ้น"
                    outlined
                    required
                    />
                  </v-row>
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
                <v-col>
                   <v-select
                  v-model="$store.getters.mouldModifybill.JobType"
                  :items="$store.getters.jobTypeModifySelect"
                  item-value="JobType"
                  item-text="JobTypeName"
                  label="เลือกประเภทการยืม"
                  outlined
                  required
                />
                </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
              <v-col>
                   <v-text-field
                  v-model="$store.getters.mouldModifybill.remark"
                  type="text"
                  label="หมายเหตุ"
                  outlined
                  required
                />
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

            <v-row class="ml-5 mr-5 pt-10 pb-5">
              <v-spacer></v-spacer>
                <v-btn class="mr-4" color="" @click="$store.state.mould.mouldModify.showPopupModify = false">Cancel</v-btn>
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
import apiMould from "../../services/apiMould";

export default {
  name: "mould-modify",
  data() {
    return {
      error: [],
      dataCreate: {
        Owner: this.$store.state.username,
        OrderNumber: "",
        ModelNo: "",
        Qty: 0,
        JobType: "",
        Receiver: "",
        RepairModelDesc: "",
        Status: "01",
      },
      dataCreate2: {},
      dataOrder: [],
      dataModel: [],
      disableModel: true,
      dataJobType: [],
      dataJobType2: [],
      dataTest: [],
      dataTest2: [],
      emp: [],
      dataModelAll: [],
      checkOrder: null,
      depart: [],
    };
  },
  async mounted() {
    // console.log('hello', this.$store.state.mould.mouldModify.dataMouldAll)
    // this.dataCreate2 = this.dataCreate;
    // await this.loadDataOrder();
    // await this.loadDataJobType();
    await this.loadDataEmp();
    await this.loadDataDepart();
    // console.log(this.$store.getters.dataPictMouldModify);
    this.dataModelAll = this.$store.state.mould.mouldModify.dataMouldAll;
    // await this.changeCheckBox();
  },
  methods: {
    async loadDataOrder() {
      const result = await apiMould.getOrderNumber();
      this.$store.state.mould.mouldModify.OrderNumberSelect = result;
      //   console.log(this.dataOrder);
    },
    async loadDataModelMould() {
      const result = await apiMould.getModelMould(
        this.$store.getters.mouldModifybill
      );
      this.$store.state.mould.mouldModify.dataMouldAll = result;
      // console.log(this.$store.state.mould.mouldModify.dataMouldAll);
    },
    async loadDataJobType() {
      const result = await apiMould.getJobmould();
      this.dataJobType = result;
      this.dataJobType2 = result;
    },
    async loadDataEmp() {
      await this.$store.dispatch("loadFormDevice");
      this.emp = this.$store.getters.formDeviceEmp;
    },
    async loadDataDepart() {
      const result = await apiMould.getMouldDepart();
      this.depart = result;
    },
    checkformData() {
      if (
        this.$store.getters.mouldModifybill.OrderNumber !== "" &&
        this.$store.getters.mouldModifybill.ModelNo !== "" &&
        this.$store.getters.mouldModifybill.Qty !== 0 &&
        this.$store.getters.mouldModifybill.JobType !== "" &&
        this.$store.getters.mouldModifybill.Receiver !== ""
      ) {
        return true;
      }
      this.error = [];
      if (this.$store.getters.mouldModifybill.OrderNumber == "") {
        this.error.push("โปรดระบุชื่อ Order");
      }
      if (this.$store.getters.mouldModifybill.ModelNo == "") {
        this.error.push("โปรดเลือกรหัสแม่พิมพ์");
      }
      if (this.$store.getters.mouldModifybill.Qty == 0) {
        this.error.push("โปรดใส่จำนวนที่จะยืมแม่พิมพ์");
      }
      if (this.$store.getters.mouldModifybill.JobType == "") {
        this.error.push("โปรดเลือกประเภทการยืมแม่พิมพ์");
      }
      if (this.$store.getters.mouldModifybill.Receiver == "") {
        this.error.push("โปรดระบุชื่อผู้ยืมแม่พิมพ์");
      }
    },
    async submit() {
      if (this.$store.state.mould.mouldModify.checkOrder === "01") {
        this.$store.state.mould.mouldModify.dataModifyBill.OrderNumber =
          "non_specific";
        this.$store.state.mould.mouldModify.dataModifyBill.Status = "01";
      } else if (this.$store.state.mould.mouldModify.checkOrder === "02") {
        this.$store.state.mould.mouldModify.dataModifyBill.Status = "05";
      } else if (this.$store.state.mould.mouldModify.checkOrder === "00") {
        this.$store.state.mould.mouldModify.dataModifyBill.Status = "01";
      }
      this.$store.state.mould.mouldModify.dataModifyBill.Qty = Number(
        this.$store.state.mould.mouldModify.dataModifyBill.Qty
      );
      if (this.checkformData()) {
        console.log(this.$store.state.mould.mouldModify.dataModifyBill);
        const result = await apiMould.modifyBill(
          this.$store.state.mould.mouldModify.dataModifyBill
        );
        if (result == "ok") {
          await this.$swal({
            title: "สร้างใบยืมแล้ว",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 2500,
          });
          // this.dataCreate = this.dataCreate2;
          this.error = [];
          this.$store.state.mould.mouldModify.showPopupModify = false;
          this.$emit("closePageModify", true);
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
    // filterImg() {
    //   this.MouldAll = this.$store.state.mould.mouldModify.dataMouldAll;
    // },
    changePict() {
      let filterImg = this.$store.state.mould.mouldModify.dataMouldAll.filter(
        (i) => {
          return i.ModelNo === this.$store.getters.mouldModifybill.ModelNo;
        }
      );
      this.$store.state.mould.mouldModify.PictMould = filterImg[0].NewPict;
      // console.log(this.$store.state.mould.mouldModify.dataMouldAll);
      // console.log(this.$store.state.mould.mouldModify.PictMould);
      // console.log(filterImg);
    },
    async changeCheckBox() {
      await this.loadDataJobType();
      this.dataJobType = this.dataJobType2;
      if (this.$store.state.mould.mouldModify.checkOrder === "01") {
        this.$store.state.mould.mouldModify.dataMouldAll = await apiMould.getModelAll();
        this.$store.state.mould.mouldModify.JobTypeSelect = this.dataJobType.filter(
          (i) => {
            return i.JobType !== "05";
          }
        );
      } else if (this.$store.state.mould.mouldModify.checkOrder === "00") {
        await this.loadDataOrder();
        this.$store.state.mould.mouldModify.JobTypeSelect = this.dataJobType.filter(
          (i) => {
            return i.JobType !== "05";
          }
        );
      } else if (this.$store.state.mould.mouldModify.checkOrder === "02") {
        await this.getOrderNumberEX();
        this.$store.state.mould.mouldModify.JobTypeSelect = this.dataJobType.filter(
          (i) => {
            return i.JobType === "05";
          }
        );
      } else if (this.$store.state.mould.mouldModify.checkOrder === null) {
        this.$store.state.mould.mouldModify.JobTypeSelect = this.dataJobType2;
        this.$store.state.mould.mouldModify.OrderNumberSelect = [];
        this.$store.state.mould.mouldModify.dataMouldAll = [];
        this.$store.state.mould.mouldModify.dataModifyBill.OrderNumber = "";
        this.$store.state.mould.mouldModify.dataModifyBill.ModelNo = "";
        this.$store.state.mould.mouldModify.dataModifyBill.JobType = "";
        this.$store.state.mould.mouldModify.dataModifyBill.remark = "";
      }
    },
    async getOrderNumberEX() {
      const result = await apiMould.getOrderNumberEX();
      // console.log(result);
      this.$store.state.mould.mouldModify.OrderNumberSelect = result;
    },
  },
};
</script>

<style>
</style>