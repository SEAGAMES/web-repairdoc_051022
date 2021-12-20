<template>
 <v-container class="fontPrompt">
    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <h1 class="text-bold">สร้างเอกสารใบขอยืมแม่พิมพ์</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="mt-10">
      <v-spacer></v-spacer>
      <v-card width="1000">
        <v-row class="ma-5">
          <v-spacer></v-spacer>
              <v-btn color="grey" @click="$router.push('/mould-multicreate')">เพิ่มทีละหลายรายการ</v-btn>
        </v-row>
        

        <v-form @submit.prevent="submit">
          <v-container>
            <v-row class="ml-5 mr-5 mt-0">
              <!-- เลือกแผนก -->
              <v-col lg="4" md="4" sm="12">
                <v-text-field
                  v-model="dataCreate.Owner"
                  label="รหัสผู้ให้ยืม"
                  outlined
                  required
                  disabled
                />
              </v-col>
              <!-- เลือกประเภทอุปกรณ์ -->
              <v-col lg="8" md="8" sm="12">
                <v-text-field
                  v-model="$store.state.fullName"
                  label="ชื่อผู้ให้ยืม"
                  outlined
                  required
                  disabled
                />
              </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">

                <v-autocomplete
                  label="ชื่อ Order"
                  v-model="dataCreate.OrderNumber"
                  :items="dataOrder"
                  item-value="OrderNumber"
                  item-text="OrderNumber"
                  outlined
                  required
                   @change="loadDataModelMould()" 
                ></v-autocomplete>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
                <v-col lg="8" md="8" sm="12">
                    <v-select
                    v-model="dataCreate.ModelNo"
                    :items="dataModel"
                    item-value="ModelNo"
                    item-text="ModelNo"
                    label="รหัสแม่พิมพ์"
                    outlined
                    required
                    :disabled='disableModel'
                    />
              </v-col>

              <v-col lg="4" md="4" sm="12">
                    <v-text-field
                    v-model="dataCreate.Qty"
                    type="number"
                    label="จำนวนของแม่พิมพ์ / ชิ้น"
                    outlined
                    required
                    />
              </v-col>

            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
                <v-col>
                   <v-select
                  v-model="dataCreate.JobType"
                  :items="dataJobType"
                  item-value="JobType"
                  item-text="JobTypeName"
                  label="เลือกประเภทการยืม"
                  outlined
                  required
                />
                </v-col>
            </v-row>

            <v-row class="ml-5 mr-5 mt-0">
                <v-col lg="4" md="4" sm="12">
                <v-autocomplete
                  label="รหัสผู้ขอยืมแม่พิมพ์"
                  v-model="dataCreate.Receiver"
                  :items="emp"
                  item-value="EmpCode"
                  item-text="EmpCode"
                  outlined
                  required
                ></v-autocomplete>
              </v-col>
                 <v-col lg="8" md="8" sm="12">
                <v-autocomplete
                  label="ชื่อผู้ขอยืมแม่พิมพ์"
                  v-model="dataCreate.Receiver"
                  :items="emp"
                  item-value="EmpCode"
                  item-text="EmpFullName"
                  outlined
                  required
                ></v-autocomplete>
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
  name: "mould-create",
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
      dataTest: [],
      dataTest2: [],
      emp: [],
    };
  },
  async mounted() {
    this.dataCreate2 = this.dataCreate;
    await this.loadDataOrder();
    await this.loadDataJobType();
    await this.loadDataEmp();
    this.dataCreate.Owner = this.$store.getters.username;
  },
  methods: {
    async loadDataOrder() {
      const result = await apiMould.getOrderNumber();
      this.dataOrder = result;
      // console.log(this.dataOrder);
    },
    async loadDataModelMould() {
      // console.log(this.dataCreate.OrderNumber)
      this.disableModel = false;
      const result = await apiMould.getModelMould(this.dataCreate);
      this.dataModel = result;
      // console.log(this.dataModel);
    },
    async loadDataJobType() {
      const result = await apiMould.getJobmould();
      this.dataJobType = result;
    },
    async loadDataEmp() {
      await this.$store.dispatch("loadFormDevice");
      this.emp = this.$store.getters.formDeviceEmp;
    },
    checkformData() {
      if (
        this.dataCreate.OrderNumber !== "" &&
        this.dataCreate.ModelNo !== "" &&
        this.dataCreate.Qty !== 0 &&
        this.dataCreate.JobType !== "" &&
        this.dataCreate.Receiver !== ""
      ) {
        return true;
      }
      this.error = [];
      if (this.dataCreate.OrderNumber == "") {
        this.error.push("โปรดระบุชื่อ Order");
      }
      if (this.dataCreate.ModelNo == "") {
        this.error.push("โปรดเลือกรหัสแม่พิมพ์");
      }
      if (this.dataCreate.Qty == 0) {
        this.error.push("โปรดใส่จำนวนที่จะยืมแม่พิมพ์");
      }
      if (this.dataCreate.JobType == "") {
        this.error.push("โปรดเลือกประเภทการยืมแม่พิมพ์");
      }
      if (this.dataCreate.Receiver == "") {
        this.error.push("โปรดระบุชื่อผู้ยืมแม่พิมพ์");
      }
    },
    async submit() {
      this.dataCreate.Qty = Number(this.dataCreate.Qty);
      this.dataCreate.Owner = this.$store.getters.username;
      if (this.checkformData()) {
        // console.log(this.dataCreate);
        const result = await apiMould.insertBillMould(this.dataCreate);
        if (result == "ok") {
          await this.$swal({
            title: "สร้างใบยืมแล้ว",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.error = []
          this.dataCreate = this.dataCreate2;
          await this.$router.push("mould-master");
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
  },
};
</script>

<style>
</style>