<template>
  <v-container grid-list-xs>
    <v-card>
      <v-simple-table dense class="tableDetail">
        <template>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <!-- row 1 -->
                <tr class="border fontSarabun">
                  <th class="text-center borderLeft" rowspan="2">
                    <div align="center" class="fontSizeHeader">
                      รหัสสินค้า
                    </div>
                  </th>
                  <th align="center" class="text-center borderLeft" rowspan="2">
                    <div class="fontSizeHeader">จำนวนทั้ง Order</div>
                  </th>
                  <th
                    align="center"
                    class="text-center borderLeft"
                    :colspan="dataMaster.select === 'stone' ? 9 : 8"
                  >
                    <div class="fontSizeHeader my-2">
                      {{
                        dataMaster.select === "stone"
                          ? "สถานะพลอย"
                          : "สถานะอะไหล่"
                      }}
                    </div>
                  </th>
                </tr>

                <!-- row 2 -->
                <tr class="fontSarabun">
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">
                      {{
                        dataMaster.select === "stone"
                          ? "รหัสพลอย"
                          : "รหัสอะไหล่"
                      }}
                    </div>
                  </th>
                  <th class="borderLeft" v-if="dataMaster.select === 'stone'">
                    <div align="center" class="fontSizeSubHeader">
                      ฝังในเทียน
                    </div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">
                      กำหนดส่งผลิตเเรก
                    </div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">
                      กำหนดส่งผลิตล่าสุด
                    </div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">สถานะ</div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">
                      {{
                        dataMaster.select === "stone"
                          ? "จำนวนพลอยทั้งหมด"
                          : "จำนวนอะไหล่ทั้งหมด"
                      }}
                    </div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">
                      ผลิตรับเเล้ว
                    </div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">ค้างรับ</div>
                  </th>
                  <th class="borderLeft">
                    <div align="center" class="fontSizeSubHeader">
                      เหลือวันกำหนดเสร็จ
                    </div>
                  </th>
                </tr>
              </thead>

              <!-- row 3 -->
              <tbody>
                <tr v-for="(item, index) in dataStone" :key="index">
                  <td
                    v-if="index < 1"
                    :rowspan="dataStone.length"
                    align="center"
                  >
                    <!-- รหัสสินค้า รูปภาพ -->
                    <v-img
                      :src="dataMaster.NewPict"
                      width="120"
                      :lazy-src="$store.state.no_picture"
                      class="mt-1"
                      align="center"
                    >
                      <div align="start" class="fontSizeData">
                        {{ dataMaster.orderItemNo }}
                      </div>
                    </v-img>
                    <div align="center" class="fontSizeData">
                      {{ dataMaster.ProductCode }}
                    </div>
                  </td>

                  <!-- จำนวนทั้ง Order -->
                  <td
                    align="center"
                    class="borderLeft"
                    :rowspan="dataStone.length"
                    v-if="index < 1"
                  >
                    <div class="fontSizeData">
                      {{ dataMaster.Qty }}
                    </div>
                  </td>

                  <!-- รหัสพลอย -->
                  <td
                    width="150"
                    align="center"
                    justify="center"
                    class="borderLeft"
                  >
                    <div class="fontSizeData" v-if="dataStone.length > 0">
                      {{ item.InvCode }}
                    </div>
                  </td>

                  <!-- ฝังในเทียน -->
                  <td
                    align="center"
                    justify="center"
                    class="borderLeft"
                    v-if="dataMaster.select === 'stone'"
                  >
                    <div class="fontSizeData" v-if="dataStone.length > 0">
                      {{ item.IsWaxSet }}
                    </div>
                  </td>

                  <!-- กำหนดส่งผลิตเเรก -->
                  <td align="center" justify="center" class="borderLeft">
                    <div class="fontSizeData mx-n3" v-if="dataStone.length > 0">
                      <span class="grey--text">({{ item.DowDueFacMin }})</span>
                      {{ item.FactDueDateMin | moment("L") }}
                    </div>
                  </td>

                  <!-- กำหนดส่งผลิตล่าสุด -->
                  <td align="center" justify="center" class="borderLeft">
                    <div
                      v-if="dataStone.length > 0"
                      v-bind:class="{
                        'yellow lighten-2': item.IsDefer === 1,
                      }"
                      class="fontSizeData mx-n3"
                    >
                      <span class="grey--text">({{ item.DowDueFacMax }})</span>
                      {{ item.FactDueDateMax | moment("L") }}
                    </div>
                  </td>

                  <!-- สถานะ -->
                  <td align="center" justify="center" class="borderLeft">
                    <div class="fontSizeData" v-if="dataStone.length > 0">
                      <v-btn
                        v-bind:class="{
                          'green lighten-2': item.StoneStatus === 'ปกติ',
                          'red lighten-3': item.StoneStatus === 'ล่าช้า',
                          'light-blue lighten-2':
                            item.StoneStatus === 'สั่งซื้อแล้ว',
                          'amber lighten-2':
                            item.StoneStatus === 'ยังไม่ได้สั่งซื้อ',
                          'teal lighten-1': item.StoneStatus === 'ครบแล้ว',
                        }"
                        small
                        max-height="25"
                        max-width="70"
                        dark
                      >
                        <span class="fontSizeData">
                          {{ item.StoneStatus }}
                        </span>
                      </v-btn>
                    </div>
                  </td>

                  <!-- จำนวนพลอยทั้งหมด -->
                  <td align="center" justify="center" class="borderLeft">
                    <div class="fontSizeData" v-if="dataStone.length > 0">
                      {{
                        dataMaster.select === "stone"
                          ? item.QtyStone.toLocaleString()
                          : item.TotalQty.toLocaleString()
                      }}
                    </div>
                  </td>

                  <!-- ผลิตรับเเล้ว -->
                  <td align="center" justify="center" class="borderLeft">
                    <div class="fontSizeData" v-if="dataStone.length > 0">
                      {{
                        dataMaster.select === "stone"
                          ? item.QtyFacReceive.toLocaleString()
                          : 0
                      }}
                      <span class="grey--text"
                        >({{
                          dataMaster.select === "stone"
                            ? (
                                (item.QtyFacReceive / item.QtyStone) *
                                100
                              ).toFixed()
                            : 0
                        }})%</span
                      >
                    </div>
                  </td>

                  <!-- ค้างรับ -->
                  <td align="center" justify="center" class="borderLeft">
                    <div class="fontSizeData" v-if="dataStone.length > 0">
                      {{
                        dataMaster.select === "stone"
                          ? (
                              item.QtyStone - item.QtyFacReceive
                            ).toLocaleString()
                          : 0
                      }}
                    </div>
                  </td>

                  <!-- เหลือวันกำหนดเสร็จ -->
                  <td
                    align="center"
                    justify="center"
                    class="borderLeft"
                    v-if="dataStone.length > 0"
                  >
                    <!-- <div
                      class="fontSizeData mx-n4"
                      v-if="
                        item.StoneStatus.trim() !== 'ครบแล้ว' ||
                          item.QtyStone - item.QtyFacReceive > 0
                      "
                    > -->
                    <div class="fontSizeData mx-n4">
                      <v-chip
                        dark
                        v-bind:class="{
                          'green lighten-2': item.LateDay >= 4,
                          'amber lighten-2':
                            item.LateDay >= 0 && item.LateDay <= 3,
                          'red lighten-3': item.LateDay < 0,
                        }"
                        small
                      >
                        <span class="fontSizeData text-xs-right">
                          {{ dataMaster.select === "stone" ? item.LateDay : 0 }}
                        </span>
                      </v-chip>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import apiMpp from "../../services/apiMpp";
export default {
  props: ["dataInput"],

  name: "invforordernew",
  data() {
    return {
      dataMaster: {
        orderNumber: "",
        orderItemNo: 0,
        NewPict: "",
        ProductCode: "",
        Qty: "",
        select: "",
      },
      dataDetail: [],
      dataStone: [],
    };
  },
  async mounted() {
    this.dataMaster.orderItemNo = this.dataInput.orderItemNo;
    this.dataMaster.orderNumber = this.dataInput.orderNumber;
    this.dataMaster.select = this.dataInput.select;
    await this.loadData();
  },
  methods: {
    async loadData() {
      const { result } = await apiMpp.mppMeshDataDetail({
        orderNumber: this.dataInput.orderNumber,
      });
      this.dataDetail = result;
      this.dataDetail = this.dataDetail.filter(
        ({ OrderItemNo }) => OrderItemNo === this.dataMaster.orderItemNo
      );
      this.dataMaster.NewPict = this.dataDetail[0].NewPict;
      this.dataMaster.ProductCode = this.dataDetail[0].ProductCode;
      this.dataMaster.Qty = this.dataDetail[0].Qty;
      this.dataStone =
        this.dataInput.select === "stone"
          ? this.dataDetail[0].stone
          : this.dataDetail[0].parts;
    },
  },
};
</script>

<style>
.borderLeft {
  border-top: 1px solid rgb(204, 200, 200);
  border-left: 1px solid rgb(214, 214, 214);
  border-bottom: 1px solid rgb(214, 214, 214);
}
.fontSizeHeader {
  font-size: 12px;
  color: rgb(59, 53, 53);
}

.fontSizeSubHeader {
  font-size: 11px;
  color: rgb(126, 121, 121);
}

.fontSizeData {
  font-size: 10px;
}

.tableDetail table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgba(233, 233, 233, 0.644);
  height: 50px !important;
}
</style>
