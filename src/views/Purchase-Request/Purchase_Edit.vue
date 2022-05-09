<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-5">เเก้ไขใบเเจ้งซื้อ</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="mt-5" justify="center">
      <v-card width="1300">
        <v-container>
          <v-row>
            <v-col cols="5">
              <v-card>
                <v-data-table
                  :search="search"
                  :headers="headers"
                  :items="invetory2"
                  :items-per-page="7"
                >
                  <template v-slot:top>
                    <v-row>
                      <v-col cols="5">
                        <v-text-field
                          append-icon="search"
                          v-model="search"
                          label="ค้นหาด้วยชื่อ"
                          class="mx-4"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <!-- type="checkbox"
                    v-model="toggle"
                    true-value="yes"
                    false-value="no" -->
                      <v-col cols="3">
                        <v-checkbox
                          v-model="itemStatus.office"
                          color="amber lighten-1"
                          class="mt-7"
                          label="สำนักงาน"
                          @change="filterByTypeId()"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="4">
                        <v-checkbox
                          v-model="itemStatus.tools"
                          color="amber lighten-1"
                          class="mt-7"
                          label="อุปกรณ์ช่าง"
                          @change="filterByTypeId()"
                        ></v-checkbox>
                      </v-col>
                    </v-row>
                  </template>

                  <template v-slot:item="{ item, index }">
                    <tr height="60">
                      <td @click="getData(item, index)">
                        {{ item.ITEM_NAME }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>

            <v-col cols="7" justify="center" class="mt-9">
              <v-card>
                <div justify="center" align="center">
                  <h2 class="text-bold mt-3">รายการที่เลือก</h2>
                </div>
                <v-data-table
                  :headers="headers2"
                  :items="dataSelect"
                  :items-per-page="30"
                >
                  <template v-slot:item="{ item, index }">
                    <tr>
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.ITEM_NAME }}</td>
                      <td>
                        <v-text-field
                          align-center
                          v-model="item.Remark"
                          width="10"
                          type="text"
                          @change="addRemark(item.Remark, index)"
                        ></v-text-field>
                      </td>
                      <td width="70">
                        <v-text-field
                          align-center
                          v-model="item.ITEM_Qty"
                          type="number"
                          @change="checkQty(item.Qty, index)"
                        ></v-text-field>
                      </td>
                      <td>{{ item.UNIT_NAME }}</td>
                      <td width="100">
                        <v-text-field
                          align-center
                          v-model="item.PRICE"
                          type="number"
                          :disabled="
                            $store.getters.policyCode !== '08' &&
                              $store.getters.policyAppove !== '1'
                          "
                        ></v-text-field>
                      </td>
                      <td>
                        <v-icon
                          class="mr-1"
                          @click="deleteItem(index, item.Purchase_Bill_ID)"
                          >delete</v-icon
                        >
                      </td>
                    </tr>
                  </template>
                </v-data-table>
                <!-- <v-row>
                  <v-col cols="2">
                    <h4 class="text-bold mt-5 red--text">**หมายเหตุ :</h4>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="dataSelect.remark"
                      type="text"
                      label="กรณีที่หารายการที่ต้องการไม่เจอ"
                      outlined
                      :counter="200"
                    ></v-text-field>
                  </v-col>
                </v-row> -->
              </v-card>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="$router.back()"
                  >กลับหน้าหลัก</v-btn
                >
                <v-btn @click="submit" class="ma-2" color="success" dark>
                  Confirm
                  <v-icon dark right>
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import apiPurchaseRequest from "../../services/apiPurchaseRequest";
export default {
  data() {
    return {
      search: "",
      todayDate: "",
      Request_ID: "",
      invetory: [],
      invetory2: [],
      invetoryfull: [],
      dataSelect: [],
      Purchase_Bill_ID: [],
      category: [],
      gety: [],
      DataFilter: [],
      billOrder: [],
      JobSum: {
        Job1: "01",
        Job2: "02",
      },
      itemStatus: {
        office: false,
        tools: false,
      },

      headers: [
        {
          text: "รายการ",
          align: "center",
          justify: "center",
          value: "ITEM_NAME",
          sortable: false,
          class: "light-blue lighten-4",
        },
      ],
      headers2: [
        {
          text: "รายการ",
          value: "order_nuber",
          sortable: false,
          class: "green lighten-4",
        },
        {
          text: "ชื่อ",
          align: "center",
          justify: "center",
          value: "ITEM_NAME",
          sortable: false,
          class: "green lighten-4",
        },
        {
          text: "Remark",
          value: "ITEM_N",
          align: "center",
          justify: "center",
          sortable: false,
          class: "green lighten-4",
        },
        {
          text: "จำนวน",
          value: "ITEM_N",
          sortable: false,
          class: "green lighten-4",
        },
        {
          text: "หน่วย",
          value: "UNIT_NAME",
          sortable: false,
          class: "green lighten-4",
        },
        {
          text: "ราคา(บ.)",
          value: "PRICE",
          sortable: false,
          class: "green lighten-4",
        },
        {
          text: "Action",
          value: "Delete_Order",
          sortable: false,
          class: "green lighten-4",
        },
      ],
    };
  },
  async mounted() {
    await this.getInventory();
    //console.log("inventory : " , this.invetory)
    // this.getx = localStorage.getItem("x");
    // console.log("getx : " , this.getx)
    this.invetory2 = this.invetory;
    //console.log("invetory2 : ", this.invetory2);
    // เรียกค่าที่เก็บไว้ใน localStorage จากนั้นเเปลงเป็น obj
    if (this.gety == null || this.gety == undefined) {
      this.dataSelect = [];
    }
    // } else {
    //   this.dataSelect = JSON.parse(this.getx);
    // }
    // this.getx = localStorage.getItem('x');
    //console.log("getx : " , this.getx)
    // this.dataSelect = JSON.parse(this.getx)
    //console.log("start : ", this.dataSelect);
    //console.log("result : " , this.dataSelect)

    this.Purchase_Bill_ID = localStorage.getItem("Purchase_Bill_ID");
    this.Purchase_Bill_ID = JSON.parse(this.Purchase_Bill_ID);
    //console.log("this.Purchase_Bill_ID : ", this.Purchase_Bill_ID);

    await this.getBillOrder(this.Purchase_Bill_ID);
    //console.log("dataSelect : ", this.dataSelect);
  },

  methods: {
    async submit() {
      //console.log("ที่เลือกทั้งหมด : ", this.dataSelect);
      let checkPass = true;

      if (this.dataSelect.length > 0) {
        //console.log("จำนวนทั้งหมด : ", this.dataSelect.length);
        for (let index = 0; index < this.dataSelect.length; index++) {
          if (
            this.dataSelect[index].INV_TYPE_ID == 0 &&
            this.dataSelect[index].Remark == null
          ) {
            //console.log("Remark ค่าว่าง");
            alert("กรุณาใส่ข้อความใน Remark ช่องรายการอื่นๆด้วยครับ");
            checkPass = false;
            break;
          }
        }
        if (checkPass == true) {
          if (confirm("ยืนยันรายการที่เเก้ไขใช่หรือไม่ ?")) {
            //console.log("dataSelect : ", this.dataSelect);

            //delete billDetail ตัวที่เลือกทั้งหมด
            //นำค่าที่เพิ่มหรือเเก้ไขใหม่ใส่ลงไป
            this.upDateDetail(this.Purchase_Bill_ID, this.dataSelect);

            //localStorage.setItem("y", []);
          }
        }
      }

      // if (this.dataSelect.length > 0) {
      //   console.log("dataSelect : ", this.dataSelect);
      //   localStorage.setItem("x", JSON.stringify(this.dataSelect));
      //   await this.$router.push("/purchase-confirm");
      // } else {
      //   alert("ไม่ผ่าน");
      // }
    },

    async getInventory() {
      this.invetory = await apiPurchaseRequest.getInvetoryFull();
      // console.log("inventory : " , this.invetory)
    },

    async getBillOrder(Bill_ID) {
      this.dataSelect = await apiPurchaseRequest.getBillOrder(Bill_ID);
      //console.log("this.dataSelect : " , this.dataSelect)
      this.dataSelect.splice(-1, 1);
    },

    async upDateDetail(Bill_ID, dataDetail) {
      //console.log("Bill_ID ฟังก์ชั่น : " , Bill_ID)
      // console.log("index ฟังก์ชั่น : " , index)
      //console.log("dataDetail ฟังก์ชั่น : ", dataDetail)
      const result0 = await apiPurchaseRequest.deleteBillDetail(Bill_ID);
      //console.log("result0 : ", result0);
      //result0 = "nok"
      if (result0 == "ok") {
        //console.log("ผ่าน");
        //console.log("dataDetail : " , dataDetail)
        const result = await apiPurchaseRequest.updateBillDetail(
          Bill_ID,
          dataDetail
        );

        if (result.statusText == "OK") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.$router.push("/purchase-master");
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.$router.push("/purchase-master");
        }
      } else {
        //console.log("ไม่ผ่าน");
        await this.$swal({
          title: "Error",
          icon: "error",
          text: "Cannot be saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async upDateNewItem(Bill_ID, index, dataDetail) {
      // console.log("Bill_ID ฟังก์ชั่น : ", Bill_ID);
      // console.log("index ฟังก์ชั่น : ", index);
      // console.log("dataDetail ฟังก์ชั่น : ", dataDetail);

      const result = await apiPurchaseRequest.updateNewItem(
        Bill_ID,
        index,
        dataDetail
      );
      //console.log(result);
      if (result.statusText == "OK") {
        await this.$swal({
          title: "Update Success",
          icon: "success",
          text: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.$router.push("/purchase-master");
      } else {
        await this.$swal({
          title: "Error",
          icon: "error",
          text: "Cannot be saved",
          showConfirmButton: false,
          timer: 1500,
        });
        await this.$router.push("/purchase-master");
      }
    },

    // ส่งค่าที่คลิกไปเช็กว่า ตัวนั้นมีใน array หรือยัง ถ้าไม่(n=0 เพิ่มลง) ถ้ามี(ซ้ำ ให้ค่า dataSelect.n เพิ่ม 1)
    //  if (n == 1) ใช้เพื่อ push ค่าลง array ให้ตารางหน้า web update จากนั้นลบทิ้งเพื่อไม่ให้ record ซ้ำ
    async getData(item, index) {
      let check = 0;

      if (this.dataSelect.length == 0) {
        //console.log("ซ้ำ00");
        // console.log(this.dataSelect)
        item.Qty = 1;
        this.dataSelect.push(item);
        //console.log("เพิ่มตัวเเรก");
        localStorage.setItem("y", JSON.stringify(this.dataSelect));
        //console.log("dataSelect : " , this.dataSelect)
      } else {
        if (item.INV_TYPE_ID != 0) {
          for (let index = 0; index < this.dataSelect.length; index++) {
            // console.log("this.dataSelect[index].ITEM_ID : " , this.dataSelect[index].ITEM_NAME)
            // console.log("item.ITEM_ID : " , item.ITEM_NAME)
            if (this.dataSelect[index].ITEM_NAME == item.ITEM_NAME) {
              this.dataSelect[index].ITEM_Qty =
                this.dataSelect[index].ITEM_Qty + 1;
              this.dataSelect.push(item);
              this.deleteItem(-1);
              check = 1;
              //console.log("ซ้ำ");
              break;
            }
          }
        }

        //console.log("check : ", check);
        if (item.INV_TYPE_ID == 0) {
          //console.log("อื่นๆ");
          item.ITEM_Qty = 1;
          this.dataSelect.push(item);
          localStorage.setItem("y", JSON.stringify(this.dataSelect));
          this.gety = localStorage.getItem("y");
          this.dataSelect = JSON.parse(this.gety);
          //console.log("item อื่นๆ : ", item);
        } else {
          if (check == 0) {
            item.ITEM_Qty = 1;
            this.dataSelect.push(item);
            localStorage.setItem("y", JSON.stringify(this.dataSelect));
            //console.log("เพิ่มใหม่");
            //console.log("itemy: ", item);
          }
        }
      }
    },
    async deleteItem(index, bill_id) {
      //console.log("เหลือ : ", this.dataSelect.length);
      if (this.dataSelect.length > 1) {
        //console.log("bill_id : ", bill_id);
        //console.log("index : ", index);
        this.dataSelect.splice(index, 1);
        localStorage.setItem("y", JSON.stringify(this.dataSelect));
      } else {
        alert("ไม่สามารถลบรายการทั้งหมดได้ ต้องมีอย่างน้อย 1 รายการ");
      }
    },

    checkQty(qty, index) {
      if (qty <= 0) {
        this.deleteItem(index);
      } else {
        this.dataSelect[index].Qty = Number(this.dataSelect[index].Qty);
        // console.log(this.dataSelect[index])
        localStorage.setItem("y", JSON.stringify(this.dataSelect));
      }
    },

    addRemark(Remark, index) {
      //console.log("remark ที่นับมาคือ : " , remark)
      //console.log("index : " , index)
      //console.log("this.dataSelect[index] : " , this.dataSelect[index])
      this.dataSelect[index].Remark = Remark;
      //console.log("หลังจากเพิ่ม Remark : ", this.dataSelect);
      localStorage.setItem("y", JSON.stringify(this.dataSelect));
    },

    clear() {
      this.dataSelect = [];
      localStorage.setItem("y", JSON.stringify(this.dataSelect));
    },

    async filterByTypeId() {
      this.DataFilter = [];
      //this.invetory2 = this.invetory;
      if (this.itemStatus.office && this.itemStatus.tools) {
        //console.log("True ทั้งหมด");
        this.invetory2 = await apiPurchaseRequest.getItemStatus(1, 2);
      } else {
        if (this.itemStatus.office) {
          //console.log("สำนักงาน");
          this.invetory2 = await apiPurchaseRequest.getItemStatus(1, 0);
        }
        if (this.itemStatus.tools) {
          //console.log("อุปกรณ์ช่าง");
          this.invetory2 = await apiPurchaseRequest.getItemStatus(0, 2);
        }
        if (!this.itemStatus.office && !this.itemStatus.tools) {
          //console.log("ทั้งหมด");
          this.invetory2 = await apiPurchaseRequest.getInvetoryFull();
        }
      }
    },
  },
};
</script>

<style></style>
