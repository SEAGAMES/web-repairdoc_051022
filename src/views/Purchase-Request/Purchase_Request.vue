<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-5">ใบเเจ้งซื้อ Purchase Request</h1>
      <v-spacer></v-spacer>
    </v-row>

    <v-row class="mt-5" justify="center">
      <v-card width="1300">
        <v-container>
          <v-row>
            <v-col cols="5" >
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
                        class="mt-3"
                        label="สำนักงาน"
                        @change="filterByTypeId()"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="4">
                      <v-checkbox
                        v-model="itemStatus.tools"
                        color="amber lighten-1"
                        class="mt-3"
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
                  :items-per-page="15"
                >
                  <template v-slot:item="{ item, index }">
                    <tr  align="center">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.ITEM_NAME }}</td>
                      <td>
                        <v-text-field
                          align-center
                          v-model="item.remark"
                          width="10"
                          type="text"
                          @change="addRemark(item.remark, index)"
                        ></v-text-field>
                      </td>
                      <td width="70">
                        <v-text-field
                          v-model="item.Qty"
                          type="number"
                          @change="checkQty(item.Qty, index)"
                        ></v-text-field>
                      </td>
                      <td>{{ item.UNIT_NAME }}</td>
                      <td>
                        <v-icon class="mr-1" @click="deleteItem(index)"
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
                <v-btn @click="submit" class="ma-2" color="success" dark>
                  Confirm
                  <v-icon dark right>
                    mdi-checkbox-marked-circle
                  </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="clear" class="ma-2" dark color="black">
                  <v-icon dark left> mdi-minus-circle </v-icon>Clear
                </v-btn>
                <v-btn color="error" @click="$router.push('/purchase-master')">กลับหน้าหลัก</v-btn>
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
      category: [],
      getx: [],
      DataFilter: [],
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
    // console.log("inventory : " , this.invetory)
    this.getx = localStorage.getItem("x");

    this.invetory2 = this.invetory;
    //console.log("invetory2 : ", this.invetory2);
    // เรียกค่าที่เก็บไว้ใน localStorage จากนั้นเเปลงเป็น obj
    if (this.getx == null || this.getx == undefined) {
      this.dataSelect = [];
    } else {
      this.dataSelect = JSON.parse(this.getx);
    }
    // this.getx = localStorage.getItem('x');
    //console.log("getx : " , this.getx)
    // this.dataSelect = JSON.parse(this.getx)
    //console.log("start : ", this.dataSelect);
    //console.log("result : " , this.dataSelect)
  },

  methods: {
    async submit() {
      //console.log(this.dataSelect);
      let checkPass = true;

      if (this.dataSelect.length > 0) {
        for (let index = 0; index < this.dataSelect.length; index++) {
          if (
            this.dataSelect[index].INV_TYPE_ID == 0 &&
            this.dataSelect[index].remark == null
          ) {
            //console.log("remark ค่าว่าง");
            alert("กรุณาใส่ข้อความใน remark ช่องรายการอื่นๆด้วยครับ");
            checkPass = false;
            break;
          }
        }
        if (checkPass == true) {
            //this.dataSelect.ITEM_NAME = this.dataSelect.remark
            // console.log("dataSelect : ", this.dataSelect);
            localStorage.setItem("x", JSON.stringify(this.dataSelect));
            await this.$router.push("/purchase-confirm");
          }
      }
    },

    async getInventory() {
      this.invetory = await apiPurchaseRequest.getInvetoryFull();
      // console.log("inventory : " , this.invetory)
    },

    // ส่งค่าที่คลิกไปเช็กว่า ตัวนั้นมีใน array หรือยัง ถ้าไม่(n=0 เพิ่มลง) ถ้ามี(ซ้ำ ให้ค่า dataSelect.n เพิ่ม 1)
    //  if (n == 1) ใช้เพื่อ push ค่าลง array ให้ตารางหน้า web update จากนั้นลบทิ้งเพื่อไม่ให้ record ซ้ำ
    async getData(item, index) {
      let check = 0;

      if (this.dataSelect.length == 0) {
        // console.log(this.dataSelect)
        item.Qty = 1;
        this.dataSelect.push(item);
        //console.log("เพิ่มตัวเเรก");
        localStorage.setItem("x", JSON.stringify(this.dataSelect));
        //console.log("dataSelect : " , this.dataSelect)
      } else {
        if (item.INV_TYPE_ID != 0) {
          for (let index = 0; index < this.dataSelect.length; index++) {
            if (this.dataSelect[index].ITEM_ID == item.ITEM_ID) {
              this.dataSelect[index].Qty = this.dataSelect[index].Qty + 1;
              this.dataSelect.push(item);
              this.deleteItem(-1);
              check = 1;
              //console.log("ซ้ำ");
              break;
            }
          }
        }

      
        if (item.INV_TYPE_ID == 0) {
          //console.log("อื่นๆ");
          item.Qty = 1;
          //item.ITEM_NAME = item.remark
          //console.log("item อื่นๆ : " , item)
          this.dataSelect.push(item);
          localStorage.setItem("x", JSON.stringify(this.dataSelect));
          this.getx = localStorage.getItem("x");
          this.dataSelect = JSON.parse(this.getx);
          //console.log("item อื่นๆ ใหม่: ", item);
        } else {
          if (check == 0) {
            item.Qty = 1;
            this.dataSelect.push(item);
            localStorage.setItem("x", JSON.stringify(this.dataSelect));
            //console.log("เพิ่มใหม่");
            //console.log("itemx: ", item);
          }
        }
      }
    },
    deleteItem(index) {
      //console.log(index);
      this.dataSelect.splice(index, 1);
      localStorage.setItem("x", JSON.stringify(this.dataSelect));
    },

    checkQty(qty, index) {
      if (qty <= 0) {
        this.deleteItem(index);
      } else {
        this.dataSelect[index].Qty = Number(this.dataSelect[index].Qty);
        // console.log(this.dataSelect[index])
        localStorage.setItem("x", JSON.stringify(this.dataSelect));
      }
    },

    addRemark(remark, index) {
     
      this.dataSelect[index].remark = remark;
      //console.log("หลังจากเพิ่ม Remark : ", this.dataSelect);
      localStorage.setItem("x", JSON.stringify(this.dataSelect));
    },

    clear() {
      this.dataSelect = [];
      localStorage.setItem("x", JSON.stringify(this.dataSelect));
    },

    async filterByTypeId() {
      this.DataFilter = [];
      //this.invetory2 = this.invetory;
      if (this.itemStatus.office && this.itemStatus.tools) {
        //console.log("True ทั้งหมด");
        this.invetory2 = await apiPurchaseRequest.getItemStatus(1 , 2);
      } else {
        if (this.itemStatus.office) {
          //console.log("สำนักงาน");
          this.invetory2 = await apiPurchaseRequest.getItemStatus(1 , 0);
        }
        if (this.itemStatus.tools) {
          //console.log("อุปกรณ์ช่าง");
          this.invetory2 = await apiPurchaseRequest.getItemStatus(0 , 2);
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
