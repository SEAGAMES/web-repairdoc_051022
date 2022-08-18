<template>
  <v-container grid-list-xs>
    <v-card class="fontSarabun" v-if="!showProduct">
      <div class="pt-5">
        <h2>{{ titleHeader }} ของ Order : {{ orderNumber }}</h2>
      </div>

      <v-simple-table class="border mt-5" width="1500">
        <template v-slot:default>
          <thead>
            <tr align="center" justify="center" class="yellow lighten-2">
              <th
                class="text-center"
                v-for="(header, index) in dataHeader"
                :key="index"
                :width="header.width"
              >
                <div class="fontSize14">
                  <b>{{ header.title }}</b>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              align="center"
              v-for="(item, index) in dataTable"
              :key="index"
              @click="gotoInvProduct(item.InvCode)"
            >
              <td>
                <div class="text-left">
                  <b>{{ item.InvCode }}</b>
                </div>
                <div class="grey--text text-left">
                  ผู้จำหน่าย : {{ item.SupplierName }}
                </div>
              </td>
              <td>
                <div>
                  <span>{{ item.DowSupDate }}</span>
                  {{ item.SupDueDate | moment("L") }}
                </div>
              </td>
              <td>
                <div>
                  {{ item.QtyReq.toLocaleString() }}
                </div>
              </td>
              <td>
                <div>
                  {{ item.QtyToFact.toLocaleString() }}
                </div>
              </td>
              <td>
                <div>
                  {{ item.QtyFactBalance.toLocaleString() }}
                </div>
              </td>
              <td>
                <div>
                  {{ (item.QtyPurchase - item.QtyPcReceive).toLocaleString() }}
                </div>
              </td>
              <td>
                <div>0</div>
              </td>
              <td>
                <div>
                  <v-btn
                    v-bind:class="{
                      'green lighten-2': item.StatusShow === 'ปกติ',
                      'red lighten-3': item.StatusShow === 'ล่าช้า',
                      'light-blue lighten-2':
                        item.StatusShow === 'สั่งซื้อแล้ว',
                      'amber lighten-2':
                        item.StatusShow === 'ยังไม่ได้สั่งซื้อ',
                      'teal lighten-1': item.StatusShow === 'ครบแล้ว',
                    }"
                    small
                    width="80"
                    dark
                    dense
                    >{{ item.StatusShow }}</v-btn
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-card v-if="showProduct">
      <InvForProductNew :inputProp="dataprop" @goback="closePageProduct" />
    </v-card>
  </v-container>
</template>

<script>
import apiOrderStatus from "../../services/apiOrderStatus";
import InvForProductNew from "./InvForProductNew.vue";

export default {
  props: ["dataInput"],
  components: {
    InvForProductNew,
  },
  name: "invforordernew",
  data() {
    return {
      dataTable: [],
      orderNumber: "",
      dataHeader: [],
      titleHeader: "",
      material: "",
      showProduct: false,
      dataprop: {
        orderNumber: "",
        InvCode: "",
      },
    };
  },
  async mounted() {
    this.material = this.dataInput.material;
    this.orderNumber = this.dataInput.orderNumber;
    this.setHeader(this.material);
    await this.loaData();
  },
  methods: {
    async loaData() {
      const res = await apiOrderStatus.getInvForOrder_New(
        this.orderNumber,
        this.material //ส่ง Materail
      );
      this.dataTable = res;
      // console.log(this.dataTable);
    },
    async gotoInvProduct(InvCode) {
      this.dataprop = {
        orderNumber: this.orderNumber,
        InvCode: InvCode,
      };
      this.showProduct = true;
    },
    setHeader(material) {
      if (material === "stone") {
        this.titleHeader = "สถานะพลอย";
        this.dataHeader = [
          { title: "รหัสพลอย", width: 150 },
          { title: "กำหนดส่ง", width: 100 },
          { title: "จำนวนพลอยทั้งหมด", width: 100 },
          { title: "FAC รับแล้ว", width: 100 },
          { title: "คัดพลอย", width: 100 },
          { title: "อยู่ที่ Sup", width: 100 },
          { title: "ติดขัด", width: 100 },
          { title: "Status", width: 100 },
        ];
      } else if (material === "parts") {
        this.titleHeader = "สถานะอะไหล่";
        this.dataHeader = [
          { title: "รหัสวัสถุดิบ", width: 150 },
          { title: "กำหนดส่ง", width: 100 },
          { title: "จำนวนวัสถุดิบทั้งหมด", width: 100 },
          { title: "FAC รับแล้ว", width: 100 },
          { title: "อยู่ที่แผนกอะไหล่", width: 100 },
          { title: "อยู่ที่ Sup", width: 100 },
          { title: "ติดขัด", width: 100 },
          { title: "Status", width: 100 },
        ];
      }
    },
    closePageProduct() {
      this.showProduct = false;
      this.dataprop = {
        orderNumber: "",
        InvCode: "",
      };
    },
  },
};
</script>

<style>
</style>