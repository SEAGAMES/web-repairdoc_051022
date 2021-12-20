<template>
 <v-container class="fontPrompt">
    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <h1 class="text-bold">สร้างเอกสารใบขอยืมแม่พิมพ์</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <v-card width="1000" >

        <v-form @submit.prevent="submit">
          <v-container>
            <!-- ผู้ขอยืมแม่พิมพ์ -->
            <v-row class="ml-5 mr-5 mt-0">
              <v-col lg="4" md="4" sm="12">
                <v-text-field
                  v-model="dataCreate.Owner"
                  label="รหัสผู้ขอยืม"
                  outlined
                  required
                  disabled
                />
              </v-col>
              <v-col lg="8" md="8" sm="12">
                <v-text-field
                  v-model="$store.state.fullName"
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
                  v-model="dataCreate.DepartCode"
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
                  v-model="dataCreate.DueDate"
                  type="date"
                  outlined
                  required
                />
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-5" v-if="checkOrder === null || checkOrder === '02'">
                <v-checkbox
                  v-model="checkOrder"
                  value="02"
                  hide-details
                  @change="selectType()"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                ></v-checkbox>
                <v-autocomplete
                  label="สร้างแม่พิมพ์ใหม่"
                  v-model="dataCreate.OrderNumber"
                  :disabled="checkOrder !== '02'"
                  :items="dataOrder"
                  item-value="OrderNumber"
                  item-text="OrderNumber"
                  outlined
                  required
                   @change="loadDataModelMould()" 
                ></v-autocomplete>
            </v-row>

            <v-row class="ml-5 mr-5 mt-5" v-if="checkOrder === null || checkOrder === '00'">
                <v-checkbox
                  v-model="checkOrder"
                  value="00"
                  hide-details
                  @change="selectType()"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                ></v-checkbox>
                <v-autocomplete
                  label="ชื่อ Order"
                  v-model="dataCreate.OrderNumber"
                  :disabled="checkOrder !== '00'"
                  :items="dataOrder"
                  item-value="OrderNumber"
                  item-text="OrderNumber"
                  outlined
                  required
                   @change="loadDataModelMould()" 
                ></v-autocomplete>
            </v-row>
            <v-row class="mt-n10 ml-5 mr-5" v-if="checkOrder === '00' || checkOrder === '02'">
                <v-col lg="3" md="3" sm="4" v-for="(item, index) in dataModel" :key="index" class="mt-0">
                    <v-card align="center" justify="center">
                        <v-checkbox 
                        v-model="item.checkBox" 
                        :value="checkBox" 
                        color="success"
                        @change="selectItem(item, index)"
                        on-icon="check_box"
                        off-icon="check_box_outline_blank"
                        ></v-checkbox>
                        <v-img :src="item.NewPict" max-height="110" class="pt-0 mt-n5" ></v-img>
                        <h3 class="mt-5" > ModelNo: {{ item.ModelNo }}</h3>
                    <v-text-field
                        label="จำนวน"
                        prepend-icon="shopping_cart"
                        type="number"
                        v-if="item.checkBox == true"
                        v-model="item.Qty"
                    ></v-text-field>
                    <v-text-field
                        label="หมายเหตุ"
                        prepend-icon="edit"
                        type="text"
                        v-if="item.checkBox == true"
                        v-model="item.remark"
                    >
                    </v-text-field>
                    <v-select
                        v-if="item.checkBox == true"
                        v-model="item.JobType"
                         prepend-icon="format_list_bulleted"
                        :items="dataJobType"
                        item-value="JobType"
                        item-text="JobTypeName"
                        label="เลือกประเภทการยืม"
                        :disabled="checkOrder === '02'"
                        />
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0" v-if="checkOrder === null || checkOrder === '01'">
                <v-checkbox
                  v-model="checkOrder"
                  value="01"
                  label="เลือกแม่พิมพ์แบบไม่ระบุ Order"
                  @change="selectType()"
                  on-icon="check_box"
                  off-icon="check_box_outline_blank"
                ></v-checkbox>
            </v-row>

            <v-row class="mt-0 ml-5 mr-5" v-if="checkOrder === '01'">
                <v-col lg="3" md="3" sm="4" class="mt-0" v-for="(cdm, index) in CreateDataModelAll" :key="index">
                  <v-card align="center" justify="center">
                    <v-card-actions class="justify-end mb-n5"> 
                        <v-icon color="red" class="mt-n2 mr-n2" @click="deleteDataMouldAll(index)">close</v-icon>
                      </v-card-actions> 
                    <v-autocomplete
                      label="ModelNo"
                      prepend-icon="menu_book"
                      v-model="cdm.ModelNo"
                      :items="dataModelAll"
                      item-value="ModelNo"
                      item-text="ModelNo"
                      required
                      @change="filterImgMouldAll(cdm.ModelNo, index)"
                    />
                    <v-img :src="pictModelAll[index]" max-height="140" class="pt-0 mt-0"></v-img>
                    <v-text-field
                        label="จำนวน"
                        prepend-icon="shopping_cart"
                        type="number"
                        v-model="cdm.Qty"
                    ></v-text-field>

                    <v-text-field
                        label="หมายเหตุ"
                        prepend-icon="edit"
                        type="text"
                        v-model="cdm.remark"
                    >
                    </v-text-field>
                    
                    <v-select
                        v-model="cdm.JobType"
                         prepend-icon="format_list_bulleted"
                        :items="dataJobType"
                        item-value="JobType"
                        item-text="JobTypeName"
                        label="เลือกประเภทการยืม"
                        />
                    </v-card>
                </v-col>

                 <v-col lg="3" md="3" sm="4" justify="center" align="center" class="mt-16">        
                        <v-btn color="green " class="mt-16" @click="pushMouldAll()" dark justify="center" align="center" fab> <v-icon>add</v-icon> </v-btn>
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
                <v-btn class="mr-4" color="" @click="$router.back()">Cancel</v-btn>
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
  name: "mould-multicreate",
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
        DepartCode: "",
        DueDate: null,
        remark: "",
      },
      dataCreate2: {},
      dataOrder: [],
      dataOrder2: [],
      dataModel: [],
      disableModel: true,
      dataJobType: [],
      dataJobType2: [],
      dataTest: [],
      dataTest2: [],
      emp: [],
      checkBox: null,
      depart: [],
      checkOrder: null,
      dataModelAll: [],
      dataModelAll2: [],
      CreateDataModelAll: [
        {
          ModelNo: "",
          Qty: 0,
          JobType: "",
          NewPict: "",
          remark: ""
        },
      ],
      imgShowMouldAll: false,
      pictModelAll: [],
      selectJobType: "05",
    };
  },
  async mounted() {
    this.dataCreate2 = this.dataCreate;
    await this.loadDataOrder();
    await this.loadDataJobType();
    await this.loadDataEmp();
    await this.loadDataDepart();
    await this.loadDataModelAll();
    this.dataCreate.Owner = this.$store.getters.username;
    // console.log(this.checkOrder);
  },
  methods: {
    async loadDataOrder() {
      const result = await apiMould.getOrderNumber();
      this.dataOrder = result;
      this.dataOrder2 = result;
      // console.log(this.dataOrder);
    },
    async loadDataModelAll() {
      const result = await apiMould.getModelAll();
      this.dataModelAll = result;
      this.dataModelAll2 = result;
      // console.log(this.dataModelAll);
    },
    async loadDataModelMould() {
      // console.log(this.dataCreate.OrderNumber)
      this.disableModel = false;
      const result = await apiMould.getModelMould(this.dataCreate);
      this.dataModel = result;
      //   console.log(this.dataModel);
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
      // console.log(this.depart)
    },
    checkformData() {
      if (
        this.dataCreate.DepartCode !== "" &&
        this.dataCreate.DueDate !== null
      ) {
        return true;
      }
      this.error = [];
      // if (this.dataCreate.OrderNumber === "") {
      //   this.error.push("โปรดระบุชื่อ Order");
      // }
      if (this.dataCreate.DepartCode === "") {
        this.error.push("โปรดระบุแผนกที่ขอยืม");
      }
      if (this.dataCreate.DueDate === null) {
        this.error.push("โปรดระบุวันที่จะคืนแม่พิมพ์");
      }
    },
    async submit() {
      if (this.checkOrder === "00") {
        await this.submitMedthod1();
      } else if (this.checkOrder === "01") {
        await this.submitMedthod2();
      } else if (this.checkOrder === "02") {
        await this.submitMedthod3();
      }
    },
    selectItem(item, index) {
      if (this.dataModel[index].checkBox == true) {
        if (this.checkOrder === "02") {
          this.dataModel[index].Qty = 1;
          this.dataModel[index].JobType = "05";
        } else if (this.checkOrder === "00") {
          this.dataModel[index].Qty = 1;
        }
      }
      if (
        this.dataModel[index].checkBox == false &&
        item.ModelNo == this.dataModel[index].ModelNo
      ) {
        (this.dataModel[index].Qty = 0), (this.dataModel[index].JobType = "");
      }
      //   console.log(this.dataModel);
    },
    async submitMedthod1() {
      let checkData2 = 0;
      let checkData3 = 0;
      this.dataModel.forEach((item) => {
        if (item.checkBox && item.JobType === "") {
          checkData2 = checkData2 + 1;
        }
        if (item.checkBox) {
          checkData3 = checkData3 + 1;
        }
      });
      this.error = [];
      let checkData1 = this.checkformData();
      console.log("C1", checkData1);
      console.log("C2", checkData2);
      console.log("C3", checkData3);
      if (checkData1 && checkData2 === 0 && checkData3 !== 0) {
        let checkErrorLoop = 0;
        this.dataModel.forEach(async (data) => {
          if (data.checkBox) {
            const dataInsert = {
              Owner: this.$store.state.username,
              OrderNumber: this.dataCreate.OrderNumber,
              ModelNo: data.ModelNo,
              Qty: data.Qty,
              JobType: data.JobType,
              DepartCode: this.dataCreate.DepartCode,
              DueDate: this.dataCreate.DueDate,
              RepairModelDesc: "",
              Status: "01",
              remark: data.remark,
            };
            //  console.log(dataInsert);
            const result = await apiMould.insertBillMould(dataInsert);
            console.log(result, dataInsert);
            if (result == "nok") {
              checkErrorLoop = checkErrorLoop + 1;
            }
          }
        }),
          await this.$swal({
            title: "สร้างใบยืมแล้ว",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 2000,
          });
        await this.$router.push("/mould-master");
        console.log(checkErrorLoop);
      } else if (checkData3 === 0) {
        this.error.push("ไม่พบข้อมูลที่เลือก");
      } else if (checkData2 !== 0) {
        this.error.push("โปรดเลือกประเภทการยืมแม่พิมพ์");
      }
    },
    async submitMedthod2() {
      // console.log(this.CreateDataModelAll)
      this.error = [];
      // เช็คข้อมูลใส้ในของรายการ
      let checkData2 = 0;
      this.CreateDataModelAll.forEach((item) => {
        if (item.ModelNo === "" || item.JobType === "") {
          checkData2 = checkData2 + 1;
        }
      });
      //เช็คข้อมูลหัวของบิล
      let checkData1 = this.checkformData();
      // console.log("C1", checkData1);
      // console.log("C2", checkData2);
      if (checkData1 && checkData2 === 0) {
        let checkErrorLoop = 0;
        this.CreateDataModelAll.forEach(async (data) => {
          if (data.Qty > 0) {
            const dataInsert = {
              Owner: this.$store.state.username,
              OrderNumber: "non_specific",
              ModelNo: data.ModelNo,
              Qty: data.Qty,
              JobType: data.JobType,
              DepartCode: this.dataCreate.DepartCode,
              DueDate: this.dataCreate.DueDate,
              RepairModelDesc: "",
              Status: "01",
              remark: data.remark,
            };
            //  console.log(dataInsert);
            const result = await apiMould.insertBillMould(dataInsert);
            // console.log(result, dataInsert);
            if (result == "nok") {
              checkErrorLoop = checkErrorLoop + 1;
            }
          }
        }),
          await this.$swal({
            title: "สร้างใบยืมแล้ว",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 2500,
          });
        await this.$router.push("/mould-master");
        console.log(checkErrorLoop);
      } else if (checkData2 !== 0) {
        this.error.push("โปรดเลือกรหัสแม่พิมพ์และประเภทการยืมแม่พิมพ์");
      }
    },
    async submitMedthod3() {
      let checkData2 = 0;
      let checkData3 = 0;
      this.dataModel.forEach((item) => {
        if (item.checkBox && item.JobType === "") {
          checkData2 = checkData2 + 1;
        }
        if (item.checkBox) {
          checkData3 = checkData3 + 1;
        }
      });
      this.error = [];
      let checkData1 = this.checkformData();
      // console.log("C1", checkData1);
      // console.log("C2", checkData2);
      // console.log("C3", checkData3);
      if (checkData1 && checkData2 === 0 && checkData3 !== 0) {
        let checkErrorLoop = 0;
        this.dataModel.forEach(async (data) => {
          if (data.checkBox) {
            const dataInsert = {
              Owner: this.$store.state.username,
              OrderNumber: this.dataCreate.OrderNumber,
              ModelNo: data.ModelNo,
              Qty: data.Qty,
              JobType: data.JobType,
              DepartCode: this.dataCreate.DepartCode,
              DueDate: this.dataCreate.DueDate,
              RepairModelDesc: "",
              Status: "05",
              remark: data.remark,
            };
            //  console.log(dataInsert);
            const result = await apiMould.insertBillMould(dataInsert);
            console.log(result, dataInsert);
            if (result == "nok") {
              checkErrorLoop = checkErrorLoop + 1;
            }
          }
        }),
          await this.$swal({
            title: "สร้างใบยืมแล้ว",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 2000,
          });
        await this.$router.push("/mould-master");
        console.log(checkErrorLoop);
      } else if (checkData3 === 0) {
        this.error.push("ไม่พบข้อมูลที่เลือก");
      } else if (checkData2 !== 0) {
        this.error.push("โปรดเลือกประเภทการยืมแม่พิมพ์");
      }
    },
    filterImgMouldAll(Model, index) {
      this.pictModelAll = [];
      this.CreateDataModelAll.forEach((DataCreate) => {
        let PP = this.dataModelAll2.filter((Data) => {
          return Data.ModelNo === DataCreate.ModelNo;
        });
        this.pictModelAll.push(PP[0].NewPict);
      });
      this.dataModelAll2 = this.dataModelAll;
      this.imgShowMouldAll = true;
      this.CreateDataModelAll[index].Qty = 1;
      // console.log(this.pictModelAll)
    },
    pushMouldAll() {
      const Data = {
        ModelNo: "",
        Qty: 0,
        JobType: "",
        NewPict: "",
        remark:""
      };
      this.CreateDataModelAll.push(Data);
      // console.log(this.CreateDataModelAll);
    },
    deleteDataMouldAll(index) {
      this.CreateDataModelAll.splice(index);
    },
    async selectType() {
      console.log(this.checkOrder);
      if (this.checkOrder === "02") {
        await this.getOrderNumberEX();
      } else if (this.checkOrder === "00" || this.checkOrder === "01") {
        this.dataOrder = this.dataOrder2;
        this.dataJobType = this.dataJobType.filter((i) => {
          return i.JobType !== "05";
        });
      }
      if (this.checkOrder === null) {
        this.dataCreate.OrderNumber = "";
        this.dataModel = [];
        this.dataJobType = this.dataJobType2;
      }
    },
    async getOrderNumberEX() {
      const result = await apiMould.getOrderNumberEX();
      // console.log(result);
      this.dataOrder = result;
    },
  },
};
</script>

<style>
</style>