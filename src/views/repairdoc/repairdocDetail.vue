<template>
  <v-container grid-list-xs class="fontPrompt">
    <template>
      <v-row class="borderTop mt-5 ml-5 mr-5">
        <v-col lg="2" md="2" sm="2" class="BGColorWhiteBlue">
          <v-img
            :src="$store.state.repairDetail.dataHeader.ContactPersonPict"
            width="150"
            align="center"
            justify="center"
          />
        </v-col>

        <v-col lg="4" md="4" sm="4" class="BGColorWhiteBlue">
          <span class="fontSize18">
            <b> ผู้แจ้งซ่อม: </b>
            <span class="pl-5 brown--text">{{
              $store.state.repairDetail.dataHeader.ContactPersonName
            }}</span>
          </span>
          <br />

          <span class="fontSize18">
            <b> วันที่แจ้ง : </b>
            <span class="pl-6 brown--text"
              >({{ $store.state.repairDetail.dataHeader.dowJobDate }})
              {{ $store.state.repairDetail.dataHeader.JobDateShow }}
              ({{ $store.state.repairDetail.dataHeader.JobDateTime }} น.)</span
            >
          </span>
          <br />

          <span class="fontSize18">
            <b> วันที่ต้องการให้เสร็จ : </b>
            <span class="pl-0 brown--text"
              >({{ $store.state.repairDetail.dataHeader.dowDueDate }})
              {{
                $store.state.repairDetail.dataHeader.DueDate
                  | moment("DD/MM/YYYY")
              }}</span
            >
          </span>
          <br />

          <span class="fontSize18">
            <b> เลขที่เอกสาร : </b>
            <span class="pl-0 brown--text">{{
              $store.state.repairDetail.dataHeader.BillDoc
            }}</span>
          </span>
        </v-col>

        <v-col lg="2" md="2" sm="2" class="BGColorWhiteYellow">
          <v-img
            :src="$store.state.repairDetail.dataHeader.NotifierPict"
            width="150"
          />
          <!-- <v-img :src="$store.getters.dataMouldDetail.NewPict"></v-img> -->
          <!-- <v-img :src="$store.getters.pictDetail"></v-img> -->
        </v-col>

        <v-col lg="4" md="4" sm="4" align="left" class="BGColorWhiteYellow">
          <span class="fontSize18">
            <b> ชื่อผู้ดำเนินการ : </b>
            <span class="brown--text">
              {{ $store.state.repairDetail.dataHeader.NotifierName }}
            </span>
          </span>
          <br />

          <span class="fontSize18">
            <b> วันที่แก้ไขเสร็จ : </b>
            <span class="brown--text"
              >({{ $store.state.repairDetail.dataHeader.dowFinishDate }})
              {{ $store.state.repairDetail.dataHeader.FinishDateShow }}</span
            >
          </span>
          <br />
          <div class="fontSize18">
            <b> เวลา : </b>
            <span class="brown--text">
              {{ $store.state.repairDetail.dataHeader.FinishDateTime }} น.
            </span>
          </div>

          <div class="fontSize18">
            <b> วิธีการแก้ไข : </b>
            <span class="brown--text">
              {{ $store.state.repairDetail.dataHeader.RepairDes }}
            </span>
          </div>
        </v-col>
      </v-row>

      <v-row class="borderBottom ml-5 mr-5 mt-n3">
        <v-col lg="6" md="6" sm="6" align="left" class="BGColorWhiteBlue">
          <span class="fontSize18">
            <b> อุปกรณ์ที่เสีย : </b>
            <span class="brown--text">
              {{ $store.state.repairDetail.dataHeader.CategoryName }}
            </span>
          </span>
          <br />
          <span class="fontSize18">
            <b> เลขเครื่อง : </b>
            <span class="pl-6 brown--text">
              {{ $store.state.repairDetail.dataHeader.DeviceNo }}
            </span>
          </span>
          <br />

          <span class="fontSize18">
            <b> อาการเสีย : </b>
            <span class="pl-6 brown--text">
              {{ $store.state.repairDetail.dataHeader.BrokenDes }}
            </span>
          </span>
          <br />

          <span class="fontSize18">
            <b> ชั้นที่แจ้ง : </b>
            <span class="pl-9 brown--text">
              {{ $store.state.repairDetail.dataHeader.FloorName }}
            </span>
          </span>
          <br />

          <div class="fontSize18">
            <b> ห้องที่แจ้ง : </b>
            <span class="pl-6 brown--text">
              {{ $store.state.repairDetail.dataHeader.RoomName }}
            </span>
          </div>

          <div class="fontSize18">
            <b> เบอร์โทรผู้แจ้ง : </b>
            <span class="pl-5 brown--text">
              {{ $store.state.repairDetail.dataHeader.Tel }}
            </span>
          </div>
        </v-col>

        <v-col lg="6" md="6" sm="6" align="left" class="BGColorWhitePink">
          <v-row>
            <v-checkbox
              label="ข้าพเจ้าได้อ่านเอกสารใบแจ้งแล้ว และข้าพเจ้าอนุมัติใบแจ้งซ่อมนี้"
              v-model="$store.state.repairDetail.dataHeader.ApprovStatus"
              value="1"
              class="ml-10"
              @change="confirmDlg = true"
              :disabled="
                $store.state.repairDetail.dataHeader.ApprovStatus === '1' ||
                $store.getters.policyAppove !== '1'
              "
            />
          </v-row>
          <v-row>
            <h3 class="ml-10">
              ผู้อนุมัติการแจ้งซ่อม :
              <u class="pl-1">
                {{ $store.state.repairDetail.dataHeader.ApprovName }}
              </u>
            </h3>
          </v-row>
          <v-row>
            <v-col lg="5" md="5" sm="5">
              <v-img
                :src="$store.state.repairDetail.dataHeader.ApproverPict"
                width="120"
                class="ml-10"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- ประวัดิการซ่อม -->

      <v-row class="borderTable mr-5 ml-5">
        <v-col lg="12" md="12" sm="12">
          <v-row align="center" justify="center">
            <h3 class="fontPrompt20"><b>ประวัติการแก้ไขและซ่อมอุปกรณ์</b></h3>
          </v-row>
        </v-col>
        <v-col lg="12" md="12" sm="12">
          <v-row align="center" justify="center">
            <v-simple-table class="border" width="1500">
              <template v-slot:default>
                <thead>
                  <tr align="center" justify="center" class="border BGColor">
                    <th class="text-center" width="80">วันที่แจัง</th>
                    <th class="text-center" width="80">เลขที่เอกสาร</th>
                    <th class="text-center" width="200">ผู้แจ้ง</th>
                    <th class="text-center" width="300">รายละเอียดเสีย</th>
                    <th class="text-center" width="300">รายละเอียดการซ่อม</th>
                    <th class="text-center" width="80">ค่าซ่อม</th>
                    <th class="text-center" width="200">ค่าอะไหล่</th>
                    <th class="text-center" width="200">วันที่แก้ไขเสร็จ</th>
                    <th class="text-center" width="200">ผู้ดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in historyBill"
                    :key="item.ID"
                    align="center"
                    justify="center"
                  >
                    <td>
                      ({{ item.dowJobDate }})_{{
                        item.JobDate | moment("DD/MM/YYYY")
                      }}
                    </td>
                    <td>{{ item.BillDoc }}</td>
                    <td>{{ item.ContactPersonName }}</td>
                    <td>{{ item.BrokenDes }}</td>
                    <td>{{ item.RepairDes }}</td>
                    <td>{{ item.RepairPrice }}</td>
                    <td>{{ item.PartPrice }}</td>
                    <td>
                      ({{ item.dowFinishDate }})_{{
                        item.FinishDate | moment("DD/MM/YYYY")
                      }}
                    </td>
                    <td>{{ item.NotifierName }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-row>
        </v-col>
      </v-row>

      <!-- อนุมัติใบแจ้ง -->
      <v-dialog v-model="confirmDlg" max-width="290">
        <v-card class="fontPrompt">
          <v-card-title primary-title>Comfirm Approve</v-card-title>
          <v-card-text class="body"
            >Are you sure to Approve this Bill?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="cancelDlgChange">Cancel</v-btn>
            <v-btn text @click="confirmDlgChange" color="error">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <v-stepper v-model="timeLine" class="mt-10">
      <v-stepper-header>
        <v-stepper-step
          :complete="timeLine >= 1"
          step="1"
          color="orange"
          complete-icon="done"
        >
          แจ้งซ่อมแล้ว
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="timeLine >= 2"
          step="WAIT"
          color="blue"
          complete-icon="done"
        >
          รอซ่อม
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="timeLine >= 3"
          step="WIP"
          color="pink"
          complete-icon="done"
        >
          รออะไหล่
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="timeLine >= 4"
          step="OK"
          color="green"
          complete-icon="done"
        >
          ซ่อมเสร็จ
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>

    <v-row class="ma-5">
      <v-spacer></v-spacer>
      <v-btn color="error" @click="$router.back()">กลับหน้าหลัก</v-btn>
      <v-btn class="ml-5" @click="testPrint()">Print</v-btn>
    </v-row>
  </v-container>
</template>


<script>
import apiRepairDoc from "../../services/apiRepairDoc";
import moment from "moment";
// import pdfMake from "pdfmake";
// import pdfFonts from "../../assets/Font/Sarabun/Sarabun-fonts.js";
import apiCreatePDF from "../../services/apiCreatePDF"

export default {
  name: "repairdoc-detail",
  data() {
    return {
      timeLine: 0,
      dataTable: [],
      approveDoc: false,
      confirmDlg: false,
      historyBill: [],
    };
  },
  async mounted() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // moment.locale("th");
    moment.tz("America/New_York");
    // console.log(this.$store.state.repairDetail.dataHeader)
    this.checktimeLine();
    await this.loadDataHistoryBill();
    //convert Date
    // this.$store.state.repairDetail.dataHeader.DueDate.toString()
    // console.log('DATE',moment(this.$store.state.repairDetail.dataHeader.DueDate).format('L'));
  },
  methods: {
    convertName() {
      if (this.$store.state.repairDetail.dataHeader.ApprovName == null) {
        this.$store.state.repairDetail.dataHeader.ApprovName = "_________________________";
      }
      if (this.$store.state.repairDetail.dataHeader.NotifierName == null) {
        this.$store.state.repairDetail.dataHeader.NotifierName = "_________________________";
      }
      if(this.$store.state.repairDetail.dataHeader.DeviceNo == 'null') {
        this.$store.state.repairDetail.dataHeader.DeviceNo == ''
      }
    },
    checktimeLine() {
      if (this.$store.state.repairDetail.dataHeader.Status === "0") {
        this.timeLine = 1;
      } else if (this.$store.state.repairDetail.dataHeader.Status === "1") {
        this.timeLine = 2;
      } else if (this.$store.state.repairDetail.dataHeader.Status === "2") {
        this.timeLine = 3;
      } else if (this.$store.state.repairDetail.dataHeader.Status === "3") {
        this.timeLine = 4;
      }
    },
    async confirmDlgChange() {
      let data = {
        ID: this.$store.state.repairDetail.dataHeader.BillID,
        Approver: this.$store.getters.username,
      };
      const result = await apiRepairDoc.updateApprove(data);
      if (result === "ok") {
        await this.loadDataDetailHeader();
        this.confirmDlg = false;
      }
    },
    cancelDlgChange() {
      this.confirmDlg = false;
      this.$store.state.repairDetail.dataHeader.ApprovStatus = "0";
    },
    async loadDataDetailHeader() {
      const result = await apiRepairDoc.getBillRepairDetail(
        this.$store.state.repairDetail.dataHeader.BillID
      );
      // console.log('comeback', result)
      this.$store.state.repairDetail.dataHeader = result[0];
    },
    async loadDataHistoryBill() {
      // console.log(this.$store.state.repairDetail.dataHeader.DeviceNo);
      if (this.$store.state.repairDetail.dataHeader.DeviceNo !== "null") {
        const result = await apiRepairDoc.getHistoryBill(
          this.$store.state.repairDetail.dataHeader.DeviceNo
        );
        this.historyBill = result;
        // this.historyBill2 = result
      }
      // console.log(result);
    },
    async testPrint() {
      //แปลงชื่อเป็น _ ถ้าไม่มีชื่อ
      this.convertName();
      //loadImg
      const logoHeader = await this.convertImg(
        "http://192.168.3.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
      );
      // console.log(logoHeader);

      const docDefinition = {
        content: [
          //Header Logo และ JobNumber
          {
            columns: [
              {
                image: logoHeader,
                width: 150,
                alignment: "center",
              },


              { text: "", width: 230 },

              {
                table: {
                  body: [
                    [
                      { text: "Job : ", alignment: "center" },
                      { text: ` ${this.$store.state.repairDetail.dataHeader.BillDoc} `, alignment: "center" }
                    ],

                    [
                      {
                        text:  `วันที่แจ้ง : ${this.$store.state.repairDetail.dataHeader.JobDateShow} `,
                        colSpan: 2,
                        alignment: "center",
                        fontSize: 11
                      },
                    ],
                  ],
                },
                alignment: "center",
                
              },
            ],
          },
          //Header หัวเรื่องแจ้งซ่อม
          {
            text: "ใบแจ้งซ่อม",
            style: "header",
            margin: [0, 20],
          },
          {
            text: [
              { text: `ข้าพเจ้า ` },
              {
                text: ` ${this.$store.state.repairDetail.dataHeader.ContactPersonName} `,
                fontSize: 14,
                bold: true,
              },
              ` รหัสพนักงาน :  `,
              {
                text: `${this.$store.state.repairDetail.dataHeader.ContactPerson} `,
                fontSize: 14,
                bold: true,
              },
              ` ขอแจ้งซ่อมแผนก : `,
              {
                text: `${this.$store.state.repairDetail.dataHeader.JobTypeName}`,
                fontSize: 14,
                bold: true,
              },
            ],
            style: "marginLeft",
          },
          {
            text: [
              { text: "ประเภทที่แจ้ง", fontSize: 12 },
              {
                text: ` ${this.$store.state.repairDetail.dataHeader.CategoryName} `,
                fontSize: 14,
                bold: true,
              },
              { text: "โดยมีรายละเอียดดังนี้", fontSize: 12 },
            ],
            // style: "text",
          },
          {
            columns: [
              {
                width: "*",
                table: {
                  body: [
                    [
                      {
                        text: "หัวข้อ : ",
                        alignment: "left",
                        styles: "text",
                        bold: true,
                      },
                      { text: "แจ้งซ่อม", alignment: "center" },
                    ],
                    [
                      {
                        text: "ประเภท : ",
                        styles: "text",
                        bold: true,
                      },
                      {
                        text: `${this.$store.state.repairDetail.dataHeader.CategoryName} `,
                        alignment: "center",
                      },
                    ],
                    [
                      {
                        text: "หมายเลขเครื่อง : ",
                        styles: "text",
                        bold: true,
                      },
                      {
                        text: `${this.$store.state.repairDetail.dataHeader.DeviceNo} `,
                        alignment: "center",
                      },
                    ],
                    [
                      {
                        text: "ชั้นที่ : ",
                        styles: "text",
                        bold: true,
                      },
                      {
                        text: `${this.$store.state.repairDetail.dataHeader.FloorName} `,
                        alignment: "center",
                      },
                    ],
                    [
                      {
                        text: "ห้อง : ",
                        styles: "text",
                        bold: true,
                      },
                      {
                        text: `${this.$store.state.repairDetail.dataHeader.RoomName} `,
                        alignment: "center",
                      },
                    ],
                  ],
                },
              },
              {
                width: 90,
                text: "",
              },
              {
                width: "*",
                table: {
                  body: [
                    [
                      {
                        text: "แจ้งแผนก : ",
                        alignment: "left",
                        styles: "text",
                        bold: true,
                      },
                      {
                        text: `${this.$store.state.repairDetail.dataHeader.JobTypeName} `,
                        alignment: "center",
                      },
                    ],
                    [
                      {
                        text: "วันที่ต้องการให้เสร็จ : ",
                        alignment: "left",
                        styles: "text",
                        bold: true,
                      },
                      {
                        text: `${moment(this.$store.state.repairDetail.dataHeader.DueDate).format('LL')}`,
                        alignment: "center",
                      },
                    ],
                  ],
                },
              },
            ],
            margin: [0, 10, 0, 0],
          },
          {
            text: "รายละเอียดอาการเสีย : ",
            style: "title",
          },
          // รายละเอียด
          {
            text: `${this.$store.state.repairDetail.dataHeader.BrokenDes}`,
            margin: [20, 10, 0, 0],
          },

          {
            text: "รายละเอียดการแก้ไขปัญหา : ",
            style: "title",
          },
          // รายละเอียด
          {
            text: `${this.$store.state.repairDetail.dataHeader.RepairDes}`,
            margin: [20, 10, 0, 0],
          },
          {
            columns: [
              {
                text: "..........................................................",
                style: "textAlign",
              },
              { text: "", width: 110 },
              {
                text: "..........................................................",
                style: "textAlign",
              },
            ],
            margin: [0, 50, 0, 0],
          },
          {
            columns: [
              {
                text: `(   ${this.$store.state.repairDetail.dataHeader.ApprovName}    )`,
                style: "textAlign",
              },
              { text: "", width: 150 },
              {
                text: `(   ${this.$store.state.repairDetail.dataHeader.NotifierName}    )`,
                style: "textAlign",
              },
            ],
            margin: [15, 5, 0, 0],
          },
          {
            columns: [
              {
                text: "ลงชื่อผู้อนุมัติใบแจ้งซ่อม",
                style: "textAlign",
              },
              { text: "", width: 170 },
              {
                text: "ลงชื่อผู้ดำเนินงาน",
                style: "textAlign",
              },
            ],
            margin: [25, 5, 0, 0],
          },
        ],
        defaultStyle: {
          font: "Sarabun",
        },
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            alignment: "center",
          },
          title: {
            fontSize: 14,
            bold: true,
            alignment: "left",
            margin: [0, 20, 0, 0],
          },
          textAlign: {
            fontSize: 12,
            alignment: "left",
            margin: [20, 0, 0, 0],
          },
          marginLeft: {
            margin: [20, 0, 0, 0],
          },
          text: {
            fontSize: 12,
          },
        },
      };
      await apiCreatePDF.createPDF(docDefinition);
    },
    async convertImg(Url) {
      const result = await apiRepairDoc.convertImg(Url);
      return result;
    },
  },
};
</script>

<style>
.borderTop {
  border-top-style: groove;
  border-left-style: groove;
  border-right-style: groove;
}
.borderBottom {
  /* border-bottom-style: groove; */
  border-left-style: groove;
  border-right-style: groove;
}

.borderTable {
  border-bottom-style: groove;
  border-left-style: groove;
  border-right-style: groove;
}

.BGColor {
  background-color: rgba(255, 196, 0, 0.644);
}

.BGColorWhiteBlue {
  background-color: rgb(239, 244, 255);
}

.BGColorWhiteYellow {
  background-color: rgb(241, 250, 207);
}

.BGColorWhitePink {
  background-color: rgb(253, 226, 242);
}
</style>