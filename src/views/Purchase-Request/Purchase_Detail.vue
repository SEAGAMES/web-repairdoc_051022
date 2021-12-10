<template>
  <v-container>
    <template>
      <v-row>
        <v-spacer></v-spacer>
        <h1 class="text-bold mt-5">ใบเเจ้งซื้อ Purchase Request</h1>
        <v-spacer></v-spacer>
      </v-row>
      <v-row>
        <!-- EmpPict -->
        <v-col cols="2" class="ml-3">
          <img v-bind:src="`${EmpPict}`" width="120" />
        </v-col>
        <v-col class="mt-3">
          <span>
            <b> ผู้ขอสั่งซื้อ : </b>
            <span class="pl-4 brown--text">{{
              dataMaster.Request_FullName
            }}</span>
          </span>
          <br />
          <span>
            <b> เเผนก : </b>
            <span class="pl-11 brown--text">{{ dataMaster.SectionName }}</span>
          </span>
          <br />

          <!-- เพิ่มมาใหม่ดึงไม่เหมือนชาวบ้าน จากที่พี่จีให้เพิ่มตอนหลังเพื่อดึงข้อมูลฝ่ายมาเเสดง 19/10/2564 -->
          <span>
            <b> ฝ่าย : </b>
            <span class="pl-14 brown--text">{{
              dataMaster.position_name
            }}</span>
          </span>
          <br />
          <!-- --------------------------------------------------------->

          <span>
            <b> เบอร์ภายใน : </b>
            <span class="pl-2 brown--text">{{ dataMaster.Phone_Number }}</span>
          </span>
          <br />

          <span>
            <b> เลขที่บิล : </b>
            <span class="pl-7 brown--text">{{
              dataMaster.Purchase_Bill_Doc
            }}</span>
          </span>
          <br />
          <span>
            <b> วันที่ขอซื้อ : </b>
            <span class="pl-4 brown--text">{{
              dataMaster.Bill_Date | moment("L")
            }}</span>
          </span>
        </v-col>
      </v-row>
      <v-col>
        <v-card>
          <v-simple-table class="border" width="1500">
            <template v-slot:default>
              <thead>
                <tr align="center" justify="center" class="border BGColor">
                  <th class="text-center" width="80">รายการ</th>
                  <th class="text-center" width="200">ชื่อ</th>
                  <th class="text-center" width="150">Remark</th>
                  <th class="text-center" width="80">จำนวน</th>
                  <th class="text-center" width="100">หน่วย</th>
                  <th class="text-center" width="80">ราคา(บ.)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in billOrder"
                  :key="item.ITEM_NO"
                  align="center"
                  justify="center"
                >
                  <td>{{ item.ITEM_NO }}</td>
                  <td>{{ item.ITEM_NAME }}</td>
                  <td>{{ item.Remark }}</td>
                  <td>{{ item.ITEM_Qty }}</td>
                  <td v-if="index + 1 < billOrder.length">
                    {{ item.UNIT_NAME }}
                  </td>
                  <td v-if="index + 1 >= billOrder.length">
                    <h3>{{ item.UNIT_NAME }}</h3>
                  </td>
                  <td v-if="index + 1 < billOrder.length">{{ item.PRICE }}</td>
                  <td v-if="index + 1 >= billOrder.length">
                    <h3>{{ item.PRICE.toLocaleString() }}</h3>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <v-row>
          <v-col cols="1" class="ml-3 mt-7">
            <img v-bind:src="`${Inspactor_Pict}`" width="100" />
          </v-col>
          <v-col cols="4">
            <v-card height="110" class="mt-4 ml-3" color="blue lighten-5">
              <v-checkbox
                v-model="appove"
                color="amber lighten-1"
                class="mt-7"
                label="ข้าพเจ้าได้อ่านเอกสารใบสั่งซื้อเเล้ว เเละข้าพเจ้าอนุมัติการสั่งซื้อนี้"
                @change="changeStatusAppove()"
                :disabled="
                  dataMaster.Inspactor_ID != null ||
                    $store.getters.policyAppove !== '1'
                "
              ></v-checkbox>
              <b>ผู้อนุมัติการสั่งซื้อ : {{ Inspactor_ID }} </b>
            </v-card>
          </v-col>
        </v-row>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn color="error" @click="$router.back()">กลับหน้าหลัก</v-btn>
          <v-btn class="ml-5" @click="testPrintSelect()">Print</v-btn>
        </v-card-actions>
      </v-col>
    </template>
  </v-container>
</template>

<script>
import apiPurchaseRequest from "../../services/apiPurchaseRequest";
import apiCreatePDF from "../../services/apiCreatePDF";
import apiRepairDoc from "../../services/apiRepairDoc";
import moment from "moment";
export default {
  data() {
    return {
      SectionSelect: [],
      getPurchaseBillMaster: [],
      dataMaster: [],
      Inspactor_ID: "",
      billOrder: [],
      billByID: [],
      inSpacter_ID: "",
      Request_ID: "",
      EmpPict: [],
      Inspactor_Pict: [],
      PdfDate: "",
      appove: null,
      date: '' ,
      time: '' ,
      //sum: 0,
      headers: [
        {
          text: "รายการ",
          value: "order_nuber",
          sortable: false,
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
        },
        {
          text: "ชื่อ",
          align: "center",
          justify: "center",
          value: "ITEM_NAME",
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
          sortable: false,
        },
        {
          text: "Remark",
          align: "center",
          justify: "center",
          value: "Remark",
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
          sortable: false,
        },
        {
          text: "จำนวน",
          value: "Qty",
          sortable: false,
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
        },
        {
          text: "หน่วย",
          value: "UNIT_NAME",
          sortable: false,
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
        },
        {
          text: "ราคา(บ.)",
          value: "PRICE",
          sortable: false,
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
        },
        // { text: "Action", value: "Delete_Order", sortable: false },
      ],
    };
  },

  async mounted() {
    if (
      this.$store.state.purchaseDetail.dataHeader == null ||
      this.$store.state.purchaseDetail.dataHeader == undefined
    ) {
      this.$store.state.purchaseDetail.dataHeader = {};
    } else {
      this.dataMaster = this.$store.getters.dataPurchaseDetail;
      // console.log(" this.dataMaster : ", this.dataMaster);

      await this.getBillOrder(this.dataMaster.Purchase_Bill_ID);
      // console.log(" this.billOrder : ", this.billOrder);
      this.EmpPict = this.dataMaster.Request_EmpPict;

      if (this.dataMaster.Inspactor_ID != null) {
        this.Inspactor_ID = this.dataMaster.Inspactor_FullName;
        this.Inspactor_Pict = this.dataMaster.Inspactor_EmpPict;
        this.appove = true;
      }
      //this.PdfDate = this.dataMaster.Bill_Date | moment("L")
      //console.log("this.PdfDate :" , this.PdfDate)
      //console.log(this.Inspactor_Pict);
    }
  },
  methods: {
    async getBillOrder(Bill_ID) {
      this.billOrder = await apiPurchaseRequest.getBillOrder(Bill_ID);
    },

    async updateStatus_Code(Status_Code, bill_ID) {
      const result = await apiPurchaseRequest.updateStatus(
        Status_Code,
        bill_ID
      );
    },

    async updateInspactor(Emp_Code, bill_ID) {
      const result = await apiPurchaseRequest.updateInspactor(
        Emp_Code,
        bill_ID
      );
    },

    async changeStatusAppove() {
      if (this.dataMaster.Status_Code >= 0) {
        if (this.$store.getters.policyAppove === "1") {
          if (this.dataMaster.Status_Code == 0) {
            //console.log("เข้า");

            if (confirm("คุณต้องอนุมัติใบเเจ้งซื้อนี้ใช่หรือไม่ ?")) {
              //เมื่อติ๊กอนุมัติจะเปลี่ยนสถานะรออนุมัติ(0) เป็นอนุมัติเเล้ว(1)
              this.appove = true;
              this.updateStatus_Code(1, this.dataMaster.Purchase_Bill_ID);
              this.inSpacter_ID = localStorage.getItem("username");
              //console.log("this.inSpacter_ID : ", this.inSpacter_ID);
              this.updateInspactor(
                this.inSpacter_ID,
                this.dataMaster.Purchase_Bill_ID
              );
              //console.log("appove : ", this.appove);
              const result = await apiPurchaseRequest.getEmployee(
                this.inSpacter_ID
              );
              //console.log('result : ' , result)
              this.Inspactor_ID = result[0].EmpFullName;
              this.Inspactor_Pict = result[0].EmpPict;
            } else {
              this.appove = false;
            }
          } else {
            this.appove = true;
            this.updateStatus_Code(
              this.dataMaster.Status_Code,
              this.dataMaster.Purchase_Bill_ID
            );
            this.inSpacter_ID = localStorage.getItem("username");
            //console.log("this.inSpacter_ID : ", this.inSpacter_ID);
            this.updateInspactor(
              this.inSpacter_ID,
              this.dataMaster.Purchase_Bill_ID
            );
          }
        }
        if (this.appove == true) {
          //console.log("true");
        }
      }
    },
    testPrintSelect() {
      if (this.dataMaster.Status_Code == 5) {
        //this.testPrint2(); ถ้าเเก้ DB เเล้วให้ใช้อันนี้ได้
        this.testPrint();
      } else {
        this.testPrint();
      }
    },
    async testPrint() {
      //loadImg
      const logoHeader = await this.convertImg(
        "http://172.16.0.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
      );

      var rows = [];
      rows.push(["ลำดับ", "รหัสสินค้า", "รายการ", "จำนวน", "หน่วย", "ราคา"]);
      //console.log("this.dataMaster : ", this.dataMaster);
      this.billOrder.forEach((data, index) => {
        var x = data.ITEM_NAME;
        if (data.ITEM_ID == undefined) {
          data.ITEM_ID = " ";
        }
        if (data.ITEM_NAME == undefined) {
          data.ITEM_NAME = " ";
        }
        if (data.ITEM_Qty == undefined) {
          data.ITEM_Qty = " ";
        }
        if (data.ITEM_UNIT_ID == 0) {
          //console.log("เป็น 0")
          data.ITEM_NAME = data.Remark;
        }

        //จัดการกับลำดับเเละให้บรรทัดสุดท้ายว่าง
        index = index + 1;
        if (index == this.billOrder.length) {
          index = " ";
        }

        rows.push([
          index,
          data.ITEM_ID,
          data.ITEM_NAME,
          data.ITEM_Qty,
          data.UNIT_NAME,
          data.PRICE.toLocaleString(),
        ]);
      });

      const docDefinition = {
        content: [
          {
            columns: [
              {
                image: logoHeader,
                width: 150,
                alignment: "center",
              },
            ],
          },
          " ",
          " ",
          {
            text: "ใบเเจ้งซื้อ Purchase Request ",
            alignment: "center",
            fontSize: 23,
            bold: true,
          },
          " ",
          " ",
          	{
			columns: [
				{
					text: `ผู้ขอสั่งซื้อ :  ${this.dataMaster.Request_FullName}  `,
          width: 225,
     
				},
				{
          text: '',
					width: 150,
				},
				{
					text: `วันที่เเจ้งซื้อ :  ${moment(this.dataMaster.Bill_Date).format("L")}  `,
          width: 225,
				}
			]
		},
    {
			columns: [
				{
					text: `เเผนก :  ${this.dataMaster.SectionName} / ${this.dataMaster.position_name}  `,
          width: 225,
				},
				{
          text: '',
					width: 150,
				},
				{
					text: `เวลา :  ${moment(this.dataMaster.Bill_Date).format("LT")} น. `,
          width: 225,
				}
			]
		},
    {
			columns: [
				{
					text: `เบอร์ภายใน :  ${this.dataMaster.Phone_Number}  `
				},
			]
		},
    {
			columns: [
				{
					text: `เลขที่บิล :  ${this.dataMaster.Purchase_Bill_Doc}  `
				},
			]
		},
       

          //{ text:  `วันที่ขอซื้อ :  ${this.billByID.Bill_Date | moment("L")}  `},
          " ",
          {
            width: "*",
            table: {
              widths: ["*", 130, 200, "*", "*", "*"],
              body: rows,
            },
          },
          " ",
          " ",
          {
            columns: [
              {
                text:
                  "ผู้อนุมัติ : .................................................",
                style: "textAlign",
              },
              { text: "", width: 60 },
              {
                text:
                  "ผู้รับสินค้า : .................................................",
                style: "textAlign",
              },
            ],
            margin: [0, 25, 0, 0],
          },
          {
            columns: [
              {
                text: "",
                style: "textAlign",
              },
              { text: "", width: 150 },
              {
                text: "วันที่ : _________/_________/____________",
                style: "textAlign",
              },
            ],
            margin: [0, 25, 0, 0],
          },
        ],

        defaultStyle: {
          font: "Sarabun",
        },
      };
      await apiCreatePDF.createPDF(docDefinition);
    },
    async testPrint2() {
      //loadImg
      const logoHeader = await this.convertImg(
        "http://172.16.0.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
      );

      var rows = [];
      rows.push(["ลำดับ", "รหัสสินค้า", "รายการ", "จำนวน", "หน่วย", "ราคา"]);
      // console.log("this.dataMaster : ", this.dataMaster);
      this.billOrder.forEach((data, index) => {
        var x = data.ITEM_NAME;
        if (data.ITEM_ID == undefined) {
          data.ITEM_ID = " ";
        }
        if (data.ITEM_NAME == undefined) {
          data.ITEM_NAME = " ";
        }
        if (data.ITEM_Qty == undefined) {
          data.ITEM_Qty = " ";
        }
        if (data.ITEM_UNIT_ID == 0) {
          //console.log("เป็น 0")
          data.ITEM_NAME = data.Remark;
        }
        


        //จัดการกับลำดับเเละให้บรรทัดสุดท้ายว่าง
        index = index + 1;
        if (index == this.billOrder.length) {
          index = " ";
        }

        rows.push([
          index,
          data.ITEM_ID,
          data.ITEM_NAME,
          data.ITEM_Qty,
          data.UNIT_NAME,
          data.PRICE.toLocaleString(),
        ]);
      });

      if(this.dataMaster.Receive_Date == null) {
        // console.log('ไม่มี Receive_Date')
        this.date = ' '
      } else {
        this.date = moment(this.dataMaster.Receive_Date).format("L")
        this.time = moment(this.dataMaster.Receive_Date).format("LT")
      }

   

      const docDefinition = {
        content: [
          {
            columns: [
              {
                image: logoHeader,
                width: 150,
                alignment: "center",
              },
            ],
          },
          " ",
          " ",
          {
            text: "ใบเเจ้งซื้อ Purchase Request ",
            alignment: "center",
            fontSize: 23,
            bold: true,
          },
          " ",
          " ",
          {
			columns: [
				{
					text: `ผู้ขอสั่งซื้อ :  ${this.dataMaster.Request_FullName}  `,
          width: 225,
     
				},
				{
          text: '',
					width: 150,
				},
				{
					text: `วันที่เเจ้งซื้อ :  ${moment(this.dataMaster.Bill_Date).format("L")}  `,
          width: 225,
				}
			]
		},
    {
			columns: [
				{
					text: `เเผนก :  ${this.dataMaster.SectionName} / ${this.dataMaster.position_name}  `,
          width: 225,
				},
				{
          text: '',
					width: 150,
				},
				{
					text: `เวลา :  ${moment(this.dataMaster.Bill_Date).format("LT")} น. `,
          width: 225,
				}
			]
		},
    {
			columns: [
				{
					text: `เบอร์ภายใน :  ${this.dataMaster.Phone_Number}  `
				},
			]
		},
    {
			columns: [
				{
					text: `เลขที่บิล :  ${this.dataMaster.Purchase_Bill_Doc}  `
				},
			]
		},
          " ",
          {
            width: "*",
            table: {
              widths: ["*", 130, 200, "*", "*", "*"],
              body: rows,
            },
          },
          " ",
          " ",
          " ",
          " ",
          {
			columns: [
				{
					text: `ผู้อนุมัติ : .................................................`,
          width: 225
				},
				{
				  text: ``,
          width: 80
				},
				{
					text: `ผู้รับสินค้า : ...............................................`,
          width: 230
				}
			]
		},
    " ",
    {
			columns: [
				{
          text: ``,
          width: 215
				},
				{
          text: ``,
				  width: 90
				},
				{
					text: `วันที่รับสินค้า :  ${this.date}`,
          width: 220
				}
			]
		},
    {
			columns: [
				{
          text: ``,
          width: 215
				},
				{
				  text: ``,
          width: 92
				},
				{
					text: `เวลา : ${this.time} น.`,
          width: 235
				}
			]
		},
        ],

        defaultStyle: {
          font: "Sarabun",
        },
      };
      await apiCreatePDF.createPDF(docDefinition);
    },
    async convertImg(Url) {
      const result = await apiRepairDoc.convertImg(Url);
      return `data:image/jpeg;base64,${result}`;
    },
  },
};
</script>

<style></style>
