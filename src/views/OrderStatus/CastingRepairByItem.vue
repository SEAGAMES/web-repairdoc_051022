<template>
  <v-container grid-list-xs v-if="!$store.state.loadingPage">
    <v-card width="1500" class="fontSarabun">
      <div align="center" class="fontSize20 pt-5 pb-5">
        <b>จำนวนหล่อรวมทั้ง Order : {{ orderNumber }}</b>
      </div>
      <v-row>
        <v-col cols="12">
          <v-simple-table class="border" width="1500">
            <template v-slot:default>
              <thead>
                <tr align="center" justify="center" class="blue lighten-4">
                  <th class="text-center" width="200">
                    <div class="fontSize14">OrderNumber</div>
                  </th>
                  <th class="text-center" width="120">
                    <div class="fontSize14">วันที่เปิด Order</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">จำนวนที่ผลิต</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">จำนวนที่ขอหล่อซ่อม</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">จำนวนที่รับคืนจากบิลหล่อซ่อม</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">จำนวนที่หล่อ</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">จำนวนหล่ออื่นๆ</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">DIFF</div>
                  </th>
                  <th class="text-center" width="100">
                    <div class="fontSize14">สถานะ</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr align="center">
                  <!-- OrderNumber -->
                  <td class="text-left">
                    <div>{{ orderNumber }}</div>
                    <span class="grey--text fontSize12"
                      >Factory : {{ ProductionTeam }}</span
                    >
                  </td>
                  <!-- OrderDate -->
                  <td>
                    <span class="grey--text fontSize12"
                      >({{
                        $store.state.castingPage.values_gotoDetail.thaiDate
                      }})
                    </span>
                    <span>{{
                      convertDate(
                        $store.state.castingPage.values_gotoDetail.OrderDate
                      )
                    }}</span>
                  </td>
                  <!-- จำนวนสั่งผลิต -->
                  <td>
                    <div>{{ sumData.JobQty.toLocaleString() }}</div>
                  </td>
                  <!-- จำนวนที่ขอหล่อซ่อม -->
                  <td>
                    <v-chip
                      v-bind:class="{
                        'amber lighten-2': sumData.TotalRepairCasting > 0,
                        'white grey--text': sumData.TotalRepairCasting <= 0,
                      }"
                      ><div>
                        {{ sumData.TotalRepairCasting.toLocaleString() }}
                      </div></v-chip
                    >
                  </td>
                  <!-- จำนวนที่รับคืนจากบิลหล่อซ่อม -->
                  <td>
                    <v-chip
                      dark
                      v-bind:class="{
                        'red lighten-2':
                          sumData.TotalReturnRepairCasting <
                            sumData.TotalRepairCasting &&
                          sumData.TotalRepairCasting !== 0,
                        'blue lighten-2':
                          sumData.TotalReturnRepairCasting >=
                            sumData.TotalRepairCasting &&
                          sumData.TotalReturnRepairCasting !== 0,
                        'white white--text ':
                          sumData.TotalReturnRepairCasting <= 0 &&
                          sumData.TotalRepairCasting !== 0,
                        'white grey--text':
                          sumData.TotalReturnRepairCasting === 0 &&
                          sumData.TotalRepairCasting === 0,
                      }"
                    >
                      <div>
                        {{ sumData.TotalReturnRepairCasting.toLocaleString() }}
                      </div>
                    </v-chip>
                  </td>
                  <!-- จำนวนหล่อปกติ -->
                  <td>
                    <div
                      :class="sumData.TotalCastingNormal <= 0 ? 'grey--text' : ''"
                    >
                      {{ sumData.TotalCastingNormal.toLocaleString() }}
                    </div>
                  </td>
                  <!-- จำนวนหล่ออื่นๆ -->
                  <td>
                    <div
                      :class="
                        sumData.TotalCastingSample <= 0 ? 'grey--text' : ''
                      "
                    >
                      {{ sumData.TotalCastingSample.toLocaleString() }}
                    </div>
                  </td>
                  <!-- DIFF -->
                  <td>
                    <v-chip
                      v-bind:class="{
                        white:
                          sumData.TotalRepairCasting -
                            sumData.TotalReturnRepairCasting <=
                          0,
                        'red lighten-2':
                          sumData.TotalRepairCasting -
                            sumData.TotalReturnRepairCasting >
                          0,
                      }"
                      dark
                      >{{
                        (
                          sumData.TotalRepairCasting -
                          sumData.TotalReturnRepairCasting
                        ).toLocaleString()
                      }}</v-chip
                    >
                  </td>
                  <!-- Status -->
                  <td>
                    <v-btn
                      v-bind:class="{
                        'white black--text': sumData.TotalRepairCasting === 0,
                        'red lighten-2':
                          sumData.TotalRepairCasting > 0 &&
                          sumData.TotalReturnRepairCasting <
                            sumData.TotalRepairCasting,
                        'blue lighten-2':
                          sumData.TotalRepairCasting > 0 &&
                          sumData.TotalReturnRepairCasting >=
                            sumData.TotalRepairCasting,
                      }"
                      dark
                      width="100"
                      small
                    >
                      <div class="fontSize12">
                        {{
                          sumData.TotalRepairCasting === 0
                            ? "ไม่มีหล่อซ่อม"
                            : sumData.TotalRepairCasting > 0 &&
                              sumData.TotalRepairCasting >
                                sumData.TotalReturnRepairCasting
                            ? "ยังรับกลับไม่ครบ"
                            : "รับกลับครบแล้ว"
                        }}
                      </div>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>

      <v-divider class="ma-10"></v-divider>
      <v-row>
        <v-col cols="11" align="center" class="pl-16">
          <span class="fontSize20 pb-5">
            <b>จำนวนหล่อแบบเป็นรายการ</b>
          </span>
        </v-col>
        <v-col cols="1" align="end" class="pr-16">
          <v-btn color="blue" dark @click="printCastingByItem(dataTable)"
            ><v-icon>mdi-printer</v-icon></v-btn
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-simple-table class="border" width="1500">
            <template v-slot:default>
              <thead>
                <tr
                  align="center"
                  justify="center"
                  class="border teal lighten-4"
                >
                  <th class="text-center" width="80">
                    <div class="fontSize14">รายการที่</div>
                  </th>
                  <th class="text-center" width="80">
                    <div class="fontSize14">สินค้า</div>
                  </th>
                  <th class="text-center" width="80">
                    <div class="fontSize14">JobNumber</div>
                  </th>
                  <th class="text-center" width="200">
                    <div class="fontSize14">จำนวนที่ผลิต</div>
                  </th>
                  <th class="text-center" width="300">
                    <div class="fontSize14">จำนวนที่ขอหล่อซ่อม</div>
                  </th>
                  <th class="text-center" width="300">
                    <div class="fontSize14">จำนวนที่รับคืนจากบิลหล่อซ่อม</div>
                  </th>
                  <th class="text-center" width="300">
                    <div class="fontSize14">จำนวนที่หล่อ</div>
                  </th>
                  <th class="text-center" width="80">
                    <div class="fontSize14">จำนวนหล่ออื่นๆ</div>
                  </th>
                  <th class="text-center" width="80">
                    <div class="fontSize14">DIFF</div>
                  </th>
                  <th class="text-center" width="200">
                    <div class="fontSize14">สถานะ</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in dataTable"
                  :key="item.OrderItemNo"
                  align="center"
                >
                <!-- OrderItemNo -->
                  <td>
                    <div>{{ item.OrderItemNo }}</div>
                  </td>
                   <!-- ProductCode -->
                  <td>
                    <v-img :src="item.NewPict" width="120" class="mt-2 mb-2" />
                    <div>{{ item.ProductCode }}</div>
                  </td>
                  <!-- JobNumber -->
                  <td>
                    <div>{{ item.JobNumber }}</div>
                  </td>
                  <!-- จำนวนที่ผลิต -->
                  <td>
                    <div>{{ item.JobQty.toLocaleString() }}</div>
                  </td>
                  <!-- จำนวนที่ขอหล่อซ่อม -->
                  <td>
                    <v-chip
                      v-bind:class="{
                        'amber lighten-2': item.TotalRepairCasting > 0,
                        'white grey--text': item.TotalRepairCasting <= 0,
                      }"
                      ><div>
                        {{ item.TotalRepairCasting.toLocaleString() }}
                      </div></v-chip
                    >
                  </td>
                  <!-- จำนวนที่รับคืนจากบิลหล่อซ่อม -->
                  <td>
                    <v-chip
                      dark
                      v-bind:class="{
                        'red lighten-2':
                          item.TotalReturnRepairCasting <
                            item.TotalRepairCasting &&
                          item.TotalRepairCasting !== 0,
                        'blue lighten-2':
                          item.TotalReturnRepairCasting >= item.TotalRepairCasting &&
                          item.TotalReturnRepairCasting !== 0,
                        'white grey--text ':
                          item.TotalReturnRepairCasting === 0 && item.TotalRepairCasting === 0,
                      }"
                      ><div>
                        {{ item.TotalReturnRepairCasting.toLocaleString() }}
                      </div></v-chip
                    >
                  </td>
                  <!-- จำนวนหล่อปกติ -->
                  <td>
                    <div
                      :class="
                        sumData.TotalCastingNormal <= 0 ? 'grey--text' : ''
                      "
                    >
                      {{ item.TotalCastingNormal.toLocaleString() }}
                    </div>
                  </td>
                  <!-- จำนวนหล่ออื่นๆ -->
                  <td>
                    <div
                      :class="
                        sumData.TotalCastingSample <= 0 ? 'grey--text' : ''
                      "
                    >
                      {{ item.TotalCastingSample.toLocaleString() }}
                    </div>
                  </td>
                  <!-- DIFF -->
                  <td>
                    <v-chip
                      v-bind:class="{
                        'white white--text': item.TotalRepairCasting - item.TotalReturnRepairCasting === 0,
                        'red lighten-2' : item.TotalRepairCasting - item.TotalReturnRepairCasting > 0,
                      }"
                      dark
                      >{{
                        (
                          item.TotalRepairCasting - item.TotalReturnRepairCasting
                        ).toLocaleString()
                      }}</v-chip
                    >
                  </td>
                  <td>
                    <v-btn
                      v-bind:class="{
                        'white black--text': item.TotalRepairCasting === 0,
                        'red lighten-2':
                          item.TotalRepairCasting > 0 &&
                          item.TotalReturnRepairCasting <
                          item.TotalRepairCasting,
                        'blue lighten-2':
                          item.TotalRepairCasting > 0 &&
                          item.TotalReturnRepairCasting >=
                          item.TotalRepairCasting,
                      }"
                      dark
                      width="100"
                      small
                    >
                      <div class="fontSize12">
                        {{
                            item.TotalRepairCasting === 0 ? 'ไม่มีหล่อซ่อม' : item.TotalRepairCasting > item.TotalReturnRepairCasting ? 'ยังรับกลับไม่ครบ': 'รับกลับครบแล้ว'
                        }}
                      </div>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <div class="fontSize16 mr-5">
          * จำนวนหล่ออื่นๆ คือ จำนวนหล่อประเภท หล่องานอะไหล่, หล่อตัวอย่าง, หล่อ
          Wax *
        </div>
      </v-row>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          color="red lighten-3"
          dark
          @click="$router.go(-1)"
          class="mt-5 mb-5 mr-10"
          >back</v-btn
        >
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus.js";
import apiCreatePDF from "../../services/apiCreatePDF";

export default {
  name: "casting-repair-byitem",
  data() {
    return {
      orderNumber: "",
      ProductionTeam: "",
      orderDate: null,
      sumData: {
        JobQty: 0,
        TotalRepairCasting: 0,
        TotalCastingNormal: 0,
        TotalCastingSample: 0,
        TotalReturnRepairCasting: 0,
      },
      dataTable: [],
    };
  },
  async mounted() {
    // console.log(this.$store.state.castingPage.values_gotoDetail);
    this.$store.state.loadingPage = true;
    this.ProductionTeam = this.$route.params.ProductionTeam; //ทำไว้เผื่อกันลืมว่าส่ง Params ยังไง
    this.orderNumber =
      this.$store.state.castingPage.values_gotoDetail.OrderNumber;
    this.orderDate = this.$store.state.castingPage.values_gotoDetail.orderDate;
    await this.loadData();
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 500);
  },
  methods: {
    async loadData() {
      //
      const result = await apiOrder.castingRepairByItem(this.orderNumber);
      //ทำไว้เผื่อกันลืมว่าวิธีหาผล Sum ที่จริงสามารถดึงจาก Store State มาใช้ได้
      this.sumData.JobQty = result.reduce((pv, cv) => pv + cv.JobQty, 0);
      this.sumData.TotalRepairCasting = result.reduce(
        (pv, cv) => pv + cv.TotalRepairCasting,
        0
      );
      this.sumData.TotalCastingNormal = result.reduce(
        (pv, cv) => pv + cv.TotalCastingNormal,
        0
      );
      this.sumData.TotalCastingSample = result.reduce(
        (pv, cv) => pv + cv.TotalCastingSample,
        0
      );
      this.sumData.TotalReturnRepairCasting = result.reduce(
        (pv, cv) => pv + cv.TotalReturnRepairCasting,
        0
      );
      // console.log(' 55',this.sumData.TotalReturnRepairCasting)
      this.dataTable = result;
      // console.log(result);
    },
    convertDate(date) {
      this.$moment.locale("th");
      const dateParse = new Date(date);
      return `${this.$moment(dateParse).add(543, "year").format("L")}`;
    },
    async printCastingByItem(data) {
      await apiCreatePDF.printCastingByItem(data);
    },
  },
};
</script>

<style></style>
