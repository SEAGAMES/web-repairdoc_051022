<template>
  <v-container grid-list-xs v-if="!loadingPage">
    <v-card>
      <div align="right" class="pt-2 mr-2">
        <v-btn @click="$emit('goback')">กลับ</v-btn>
      </div>

      <v-data-table
        :search="search"
        :headers="headers"
        :items="dataTable"
        :items-per-page="15"
      >
        <!-- Data Recode -->
        <template v-slot:item="{ item }">
          <tr class="fontSarabun">
            <!-- รหัสสินค้า -->
            <td align="center" justify="center" width="100">
              <v-img
                :src="item.NewPict"
                width="120"
                :lazy-src="$store.state.no_picture"
                class="mt-1"
              >
                <div align="start" class="fontSize12">
                  {{ item.OrderItemNo }}
                </div>
              </v-img>

              <div class="fontSize13">{{ item.ProductCode }}</div>
            </td>

            <!-- จำนวนสินค้า -->
            <td align="center" justify="center" width="80">
              <span class="fontSize14">{{ item.Qty.toLocaleString() }}</span>
            </td>

            <!-- สถานะงานพลอย -->
            <td class="verticalTop" width="600">
              <table class="verticalTop" v-if="item.stone.length > 0">
                <tr>
                  <th width="150" class="background: grey lighten-3">
                    <div class="fontSize13" align="start">รหัสพลอย</div>
                  </th>
                  <th width="50" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">ฝังในเทียน</div>
                  </th>
                  <th width="100" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">กำหนดส่งผลิตแรก</div>
                  </th>
                  <th width="100" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">
                      กำหนดส่งผลิตล่าสุด
                    </div>
                  </th>
                  <th width="80" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">สถานะ</div>
                  </th>
                  <th width="80" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">
                      จำนวนพลอยทั้งหมด
                    </div>
                  </th>
                  <th width="80" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">ผลิตรับแล้ว</div>
                  </th>
                  <th width="80" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">ค้างรับ</div>
                  </th>
                  <th width="80" class="background: grey lighten-3">
                    <div class="fontSize13" align="center">
                      เหลือวันกำหนดเสร็จ
                    </div>
                  </th>
                </tr>

                <!-- รหัสพลอย -->
                <tr v-for="(Inv, index2) in item.stone" :key="index2">
                  <td width="150" align="start" justify="center">
                    <div class="fontSize12">{{ Inv.InvCode }}</div>
                  </td>

                  <!-- ฝังในเทียน -->
                  <td width="10" align="center" justify="center">
                    <div class="fontSize12">
                      <v-icon color="grey" small v-if="Inv.IsWaxSet === '1'"
                        >mdi-check</v-icon
                      >
                    </div>
                  </td>

                  <!-- กำหนดผลิตครั้งแรก -->
                  <td width="110" align="start" justify="center">
                    <div class="fontSize12">
                      <span class="grey--text">({{ Inv.DowDueFacMin }})</span>
                      {{ Inv.FactDueDateMin | moment("L") }}
                    </div>
                  </td>

                  <!-- กำหนดล่าสุด -->
                  <td width="110" align="start" justify="center">
                    <div
                      class="fontSize12"
                      v-bind:class="{ 'yellow lighten-2': Inv.IsDefer === 1 }"
                    >
                      <span class="grey--text">({{ Inv.DowDueFacMax }})</span>
                      {{ Inv.FactDueDateMax | moment("L") }}
                    </div>

                    <!-- <div class="fontSize12" v-if="Inv.IsDefer === 0">
                      <span class="grey--text">({{ Inv.DowDueFacMax }})</span>
                      {{ Inv.FactDueDateMax | moment("L") }}
                    </div> -->
                  </td>

                  <!-- สถานะพลอย -->
                  <td width="90" align="center" justify="center">
                    <div class="fontSize12">
                      <v-btn
                        v-bind:class="{
                          'green lighten-2': Inv.StoneStatus === 'ปกติ',
                          'red lighten-3': Inv.StoneStatus === 'ล่าช้า',
                          'light-blue lighten-2':
                            Inv.StoneStatus === 'สั่งซื้อแล้ว',
                          'amber lighten-2':
                            Inv.StoneStatus === 'ยังไม่ได้สั่งซื้อ',
                          'teal lighten-1': Inv.StoneStatus === 'ครบแล้ว',
                        }"
                        small
                        max-height="20"
                        max-width="70"
                        dark
                      >
                        <span class="fontSize10">
                          {{ Inv.StoneStatus }}
                        </span>
                      </v-btn>
                    </div>
                  </td>

                  <!-- จำนวนพลอย -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">
                      {{ Inv.QtyStone.toLocaleString() }}
                    </div>
                  </td>

                  <!-- รับแล้ว -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">
                      {{ Inv.QtyFacReceive.toLocaleString() }}
                      <span class="grey--text"
                        >({{
                          ((Inv.QtyFacReceive / Inv.QtyStone) * 100).toFixed()
                        }})%</span
                      >
                    </div>
                  </td>

                  <!-- ค้างรับ -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">
                      {{ (Inv.QtyStone - Inv.QtyFacReceive).toLocaleString() }}
                    </div>
                  </td>

                  <!-- เหลือวัน -->
                  <td width="80" align="center" justify="center">
                    <div
                      class="fontSize12"
                      v-if="
                        Inv.StoneStatus.trim() !== 'ครบแล้ว' ||
                        Inv.QtyStone - Inv.QtyFacReceive > 0
                      "
                    >
                      <v-chip
                        dark
                        v-bind:class="{
                          'green lighten-2': Inv.LateDay >= 4,
                          'amber lighten-2':
                            Inv.LateDay >= 0 && Inv.LateDay <= 3,
                          'red lighten-3': Inv.LateDay < 0,
                        }"
                        small
                      >
                        <span class="fontSize12 text-xs-right">{{
                          Inv.LateDay
                        }}</span>
                      </v-chip>
                    </div>
                  </td>
                </tr>
              </table>
              <div
                v-if="item.stone.length <= 0"
                align="center"
                class="grey--text"
              >
                ไม่มีพลอย
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import apiMpp from "../../services/apiMpp";

export default {
  props: ["inputProp"],
  name: "invforproduct_new",
  data() {
    return {
      loadingPage: false,
      dataTable: [],
      orderNumber: "",
      dataHeader: [],
      invSelected: "",
      search: "",
      headers: [
        {
          text: "รหัสสินค้า",
          value: "ProductCode",
          align: "center",
          // width: 100
        },
        {
          text: "จำนวนทั้งOrder",
          value: "Qty",
          align: "center",
          // width: 80
        },
        {
          text: "สถานะพลอย",
          value: "",
          align: "center",
          // width: 600
        },
      ],
    };
  },
  async mounted() {
    this.loadingPage = true;
    // console.log("555", this.$route.params.orderNumber);
    this.orderNumber = this.inputProp.orderNumber;
    this.invSelected = this.inputProp.InvCode;
    // console.log(this.invSelected);
    await this.loadDataProduct();
    setTimeout(() => {
      this.loadingPage = false;
    }, 500);
  },
  methods: {
    async loadDataProduct() {
      const { result } = await apiMpp.mppMeshDataDetail({
        orderNumber: this.orderNumber,
      });
      // console.log(result);

      this.dataTable = result.filter((objMaster) =>
        [
          ...objMaster.stone
            .filter(({ InvCode }) => InvCode === this.invSelected)
            .map(({ OrderItemNo }) => OrderItemNo),
        ].includes(objMaster.OrderItemNo)
      );
    },
  },
};
</script>

<style>
</style>