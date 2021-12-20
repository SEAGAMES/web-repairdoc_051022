<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-5">รายการที่คุณเลือก</h1>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col cols="1" class="mt-3">
        <b>เเผนก : </b>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="getx.SectionCode"
          :items="SectionSelect"
          item-value="SectionCode"
          item-text="SectionName"
          label="กรุณาแจ้งแผนก"
          outlined
          :rules="Rules1"
          required
          @change="filterPosition(getx.SectionCode)"
        />
      </v-col>

      <v-col cols="1" class="mt-3">
        <b>ฝ่าย : </b>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="getx.PositionCode"
          :items="PositionSelect"
          item-value="position_code"
          item-text="position_name"
          label="กรุณาแจ้งฝ่าย"
          outlined
          :rules="Rules2"
          required
          :disabled="getx.SectionCode == null"
        />
      </v-col>

      <v-col cols="1" class="mt-3">
        <b>เบอร์โทร : </b>
      </v-col>
      <v-col cols="2">
        <v-text-field
          align-center
          v-model="getx.PhoneNumber"
          label="เบอร์โทรภายใน"
          type="number"
          required
          outlined
          :rules="Rules3"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="2" class="mt-5">
        <v-img width="130" :src="EmpPict" />
      </v-col>
      <v-col class="mt-5">
        <h3 class="text-bold">ผู้ขอสั่งซื้อ : {{ FullName }}</h3>
      </v-col>
    </v-row> -->
    <v-col>
      <v-card>
        <v-data-table :headers="headers" :items="getx" :items-per-page="7">
          <template v-slot:item="{ item, index }">
            <tr height="60">
              <td align="center">{{ index + 1 }}</td>
              <td align="center">{{ item.ITEM_NAME }}</td>
              <td align="center">{{ item.remark }}</td>
              <td align="center">{{ item.Qty }}</td>
              <td align="center">{{ item.UNIT_NAME }}</td>
              <!-- <td>
                <v-icon class="mr-1" @click="deleteItem(index)">delete</v-icon>
              </td> -->
            </tr>
          </template>
        </v-data-table>
      </v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancle" class="ma-2" dark color="red">
          <v-icon dark left> mdi-minus-circle </v-icon>Cancel
        </v-btn>
        <v-btn @click="submit" class="ma-2" color="success" dark>
          Accept
          <v-icon dark right>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-col>
  </v-container>
</template>

<script>
import apiPurchaseRequest from "../../services/apiPurchaseRequest";
export default {
  data() {
    return {
      EmpPict: "",
      FullName: "",
      getx: [],
      SectionSelect: [],
      PositionSelect: [],
      PositionSelect2: [],
      headers: [
        {
          text: "รายการ",
          value: "order_nuber",
          align: "center",
          justify: "center",
          sortable: false,
          class: "light-blue lighten-4",
        },
        {
          text: "ชื่อ",
          align: "center",
          justify: "center",
          value: "ITEM_NAME",
          sortable: false,
          class: "light-blue lighten-4",
        },
        {
          text: "Remark",
          value: "remark",
          sortable: false,
          align: "center",
          justify: "center",
          class: "light-blue lighten-4",
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
        // { text: "Action", value: "Delete_Order", sortable: false },
      ],
      Rules1: [(v1) => !!v1 || "กรุณาใส่เเผนกด้วยครับ"],
      Rules2: [(v1) => !!v1 || "กรุณาใส่ฝ่ายด้วยครับ"],
      Rules3: [(v1) => !!v1 || "กรุณาใส่เบอร์ด้วยครับ"],
    };
  },

  async mounted() {
    await this.getSection();
    await this.getPosition();
    this.getx = localStorage.getItem("x");
    this.getx = JSON.parse(this.getx);
    this.EmpPict = localStorage.getItem("EmpPict");
    this.FullName = localStorage.getItem("fullname");
    //console.log(this.getx);
    this.PositionSelect2 = this.PositionSelect;
  },
  methods: {
    async submit() {
      if (
        this.getx.SectionCode != undefined &&
        this.getx.PositionCode != undefined &&
        this.getx.PhoneNumber != undefined &&
        this.getx.PhoneNumber != ""
      ) {
        //console.log("getx ; ", this.getx.PhoneNumber);
        this.getx.Request_ID = localStorage.getItem("username");
        const result = await apiPurchaseRequest.createPurchaseBill(
          this.getx.Request_ID,
          this.getx.SectionCode,
          this.getx.PositionCode,
          this.getx.PhoneNumber,
          //this.getx.
          this.getx
        );
        //console.log("return : ", result);
        //console.log("getx.SectionCode : " , this.getx.SectionCode)
        this.getx = [];
        localStorage.setItem("x", JSON.stringify(this.getx));
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
        alert("กรุณาใส่ข้อมูลให้ครบด้วยครับ");
      }
    },

    //filterPosition
    filterPosition(section_code) {
      //console.log(section_code.trim())
      // if(section_code == '004  ') {
      //   console.log("มาครับ")
      // }
      this.PositionSelect = this.PositionSelect2.filter((i) => {
        return i.section_code == section_code.trim();
      });
    },

    deleteItem(index) {
      //console.log(index);
      this.dataSelect.splice(index, 1);
      localStorage.setItem("x", JSON.stringify(this.dataSelect));
    },
    async cancle() {
      await this.$router.push("/purchase-request");
    },
    async getSection() {
      this.SectionSelect = await apiPurchaseRequest.getSection();
    },
    async getPosition() {
      this.PositionSelect = await apiPurchaseRequest.getPosition();
    },
  },
};
</script>

<style></style>
