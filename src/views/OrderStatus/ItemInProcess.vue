<template>
  <v-container grid-list-xs class="fontSarabun">
    <div class="fontSize24 fontPrompt">
      งานที่อยู่ในแผนก : <b>{{ dataInput.PDProcessName }}</b>
    </div>

    <v-simple-table class="mt-5">
      <template v-slot:default>
        <thead>
          <tr class="headerColor">
            <th>
              <div align="center" class="fontSize14"><b>ลำดับที่</b></div>
            </th>
            <th>
              <div align="center" class="fontSize14"><b>Product</b></div>
            </th>
            <th>
              <div align="center" class="fontSize14">
                <b>จำนวนที่สั่งผลิต</b>
              </div>
            </th>
            <th>
              <div align="center" class="fontSize14"><b>งานในแผนก</b></div>
            </th>
            <th>
              <div align="center" class="fontSize14"><b>งานที่จ่ายช่าง</b></div>
            </th>
            <th>
              <div align="center" class="fontSize14">
                <b>งานที่โอนออกจากแผนก</b>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, index) in dataTable" :key="index">
            <td>{{ product.OrderItemNo }}</td>
            <td>
              <div align="center">
                <v-img
                  :src="product.NewPict"
                  width="120"
                  :lazy-src="$store.state.no_picture"
                  class="mt-1"
                />
                <div class="fontSize13">{{ product.ProductCode }}</div>
                <div class="fontSize13 grey--text">{{ product.JobNumber }}</div>
              </div>
            </td>
            <td>
              <div align="center">{{ product.JobQty.toLocaleString() }}</div>
            </td>
            <td>
              <div
                align="center"
                :class="
                  product.In_Q > 0
                    ? 'black--text font-weight-bold'
                    : 'grey--text'
                "
              >
                {{ product.In_Q.toLocaleString() }}
              </div>
            </td>
            <td>
              <div
                align="center"
                :class="
                  product.Send_Q > 0
                    ? 'black--text font-weight-bold'
                    : 'grey--text'
                "
              >
                {{ product.Send_Q.toLocaleString() }}
              </div>
            </td>
            <td>
              <div
                align="center"
                :class="
                  product.Out_Q > 0
                    ? 'black--text font-weight-bold'
                    : 'grey--text'
                "
              >
                {{ product.Out_Q.toLocaleString() }}
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import apiOrderStatus from "../../services/apiOrderStatus";

export default {
  name: "iteminprocess",
  props: ["dataInput"],
  data() {
    return {
      dataTable: [],
    };
  },
  async mounted() {
    console.log(this.dataInput);
    await this.loadDataItem();
    console.log(this.dataTable);
  },
  methods: {
    async loadDataItem() {
      const res = await apiOrderStatus.getItemInProcess({
        orderNumber: this.dataInput.orderNumber,
        PDProcessCode: this.dataInput.PDProcessCode,
      });
      this.dataTable = res.data;
    },
  },
};
</script>

<style>
.headerColor {
  background-color: rgb(233, 232, 232);
}
</style>