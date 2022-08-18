<template>
  <v-container grid-list-xs>
    <v-row v-if="showOrderList">
      <v-col>
        <div>
          <v-autocomplete
            v-model="orderNumber"
            label="Order"
            outlined
            :items="orderList"
            @change="loadData()"
          />
        </div>
      </v-col>
    </v-row>

    <v-row
      v-if="
        this.$store.state.processBill.processBillCreate.step2.dataItem.length >
        0
      "
    >
      <v-col
        cols="12"
        sm="4"
        md="3"
        lg="3"
        v-for="(item, index) in $store.state.processBill.processBillCreate.step2
          .dataItem"
        :key="item.OrderItemNo"
        class="fontSarabun"
      >
        <v-card
          height="420"
          align="center"
          :disabled="
            item.In_Q +
              item.Send_Q +
              item.QtySend -
              (item.Send_Q + item.QtySend) <=
            0
          "
          :style="
            item.In_Q +
              item.Send_Q +
              item.QtySend -
              (item.Send_Q + item.QtySend) <=
            0
              ? 'filter: brightness(90%)'
              : ''
          "
          :class="item.QtySend > 0 ? 'borderSelected' : ''"
        >
          <div class="pl-2" align="start">
            <span class="text-left">{{ item.OrderItemNo }}</span>
          </div>
          <div align="end" class="mt-n6" v-if="item.QtySend > 0">
            <v-icon
              class="text-right"
              color="red"
              @click="deleteItem(item, index)"
              >mdi-close</v-icon
            >
          </div>
          <v-img
            :src="item.NewPict"
            width="180"
            class="text-left"
            @click="modalInsertQtySend(item, index)"
          />
          <v-card-title
            class="ml-n3"
            primary-title
            @click="modalInsertQtySend(item, index)"
          >
            <div>
              <div class="fontSize16 text-left">{{ item.ProductCode }}</div>
              <div class="fontSize14 text-left">
                JobNumber: {{ item.JobNumber }}
              </div>
              <div class="fontSize14 text-left">
                จำนวนทั้งหมด : {{ item.JobQty.toLocaleString() }}
              </div>
              <div class="fontSize14 text-left">
                จำนวนงานในแผนกทั้งหมด :
                {{ (item.In_Q + item.Send_Q + item.Out_Q).toLocaleString() }}
              </div>
              <div class="fontSize14 text-left">
                จำนวนงานอยู่ที่ช่าง : {{ item.Send_Q.toLocaleString() }}
              </div>
              <div class="fontSize14 text-left">
                จำนวนงานโอนออกจากแผนก : {{ item.Out_Q.toLocaleString() }}
              </div>
              <div class="fontSize14 text-left">
                จำนวนงานที่สามารถโอนได้ :
                {{
                  item.In_Q +
                  item.Send_Q +
                  item.QtySend -
                  (item.Send_Q + item.QtySend)
                }}
              </div>
              <div class="fontSize16 text-left">
                <b
                  >จำนวนที่ต้องการจะโอน : {{ item.QtySend.toLocaleString() }}</b
                >
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" width="350" class="pb-n16">
      <v-card width="350" class="pr-5">
        <v-form @submit.prevent="submitDialog()">
          <v-row class="fontPrompt pt-2">
            <v-col>
              <v-row>
                <v-col align="center" cols="4">
                  <div class="mr-n5 mt-5"><b>ใส่จำนวน :</b></div>
                </v-col>
                <v-col align="center" cols="8" class="ml-n3">
                  <v-text-field
                    class="pa-3"
                    label="ใส่จำนวนที่ต้องการโอน"
                    type="number"
                    v-model="valuesDialogQty"
                    :rules="[
                      rulesQty.required,
                      rulesQty.min(valuesDialogQty, valuesCheckLimitQty),
                    ]"
                    dense
                    outlined
                    autofocus
                  />
                </v-col>
              </v-row>
              <v-row class="mt-n5">
                <v-col align="center" cols="4">
                  <div class="mr-n5 mt-5"><b>ใส่ นน. :</b></div>
                </v-col>
                <v-col align="center" cols="8" class="ml-n3">
                  <v-text-field
                    class="pa-3"
                    label="ใส่ นน. ที่ต้องการโอน"
                    type="number"
                    v-model="valuesDialogWeight"
                    :rules="[
                      rulesWeight.required,
                      rulesWeight.min(
                        valuesDialogWeight,
                        valuesCheckLimitWeight
                      ),
                    ]"
                    dense
                    outlined
                    autofocus
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col
              cols="4"
              align="center"
              justify="center"
              class="mt-16 ml-n10"
            >
              <v-btn color="white" type="submit" light>ตกลง</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import apiProcess from "../../services/apiProcess";

export default {
  name: "process-selectitem",
  props: ["processCodeProps"],
  data() {
    return {
      orderNumber: "",
      showOrderList: false,
      dataItem: [],
      PDProcessCode: "",
      showDialog: false,
      valuesDialogQty: 0,
      valuesDialogWeight: 0,
      valuesCheckLimitQty: 0,
      valuesCheckLimitWeight: 0,
      orderList: [],
      rulesQty: {
        required: (value) => !!value || "กรุณาใส่จำนวน",
        min: (value, qty) => +value <= qty || "เกินจำนวนในแผนก",
      },
      rulesWeight: {
        required: (value) =>
          (+value >= 0 &&
            value !== "" &&
            value !== null &&
            value !== undefined) ||
          "กรุณาใส่ นน.",
        min: (value, qty) => +value <= qty || "นน.เกินที่มีในแผนก",
      },
      IndexForUpdate: 0,
    };
  },
  async mounted() {
    // console.log("ส่งแผนกมา", this.processCodeProps);
    // this.PDProcessCode = this.$route.params.PDProcess;
    this.PDProcessCode = this.processCodeProps;

    // this.orderNumber = this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber;
    if (
      this.$store.state.processBill.processBillCreate.step2.dataItem.length <= 0
    ) {
      if (
        (this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber === "" ||
          this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber ===
            undefined) &&
        this.orderNumber === ""
      ) {
        this.showOrderList = true;
        await this.loadOrderforprocess();
      } else {
        await this.loadData();
      }
    } else {
      // to do
    }
  },
  methods: {
    async loadData() {
      if (this.showOrderList) {
        const res = await apiProcess.getItemForProcess(this.orderNumber);
        this.dataItem = res.filter(
          ({ PDProcessCode }) => PDProcessCode === this.PDProcessCode
        );
        this.$store.state.processBill.processBillCreate.step2.dataItem =
          this.dataItem;
        // this.$store.state.processBill.processBillCreate.step2.selectedItem = [];
        this.$store.state.processBill.processBillCreate.step2.orderNumber =
          this.orderNumber;
      } else {
        const res = await apiProcess.getItemForProcess(
          this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber
        );
        this.dataItem = res.filter(
          ({ PDProcessCode }) => PDProcessCode === this.PDProcessCode
        );
        this.$store.state.processBill.processBillCreate.step2.dataItem =
          this.dataItem;
        this.$store.state.processBill.processBillCreate.step2.orderNumber =
          this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber;
      }
    },
    modalInsertQtySend(item, index) {
      // ค้างไว้ก่อน 22/06/2565
      // const totalQtyInProcess =
      //   item.In_Q + item.Send_Q + item.Out_Q + item.QtySend;
      // const sumOtherNotIN = item.Send_Q + item.Out_Q + item.Send_Q;
      // const CurrentInQty =
      //   item.Out_Q < 0 || item.Send_Q < 0
      //     ? totalQtyInProcess
      //     : totalQtyInProcess - sumOtherNotIN;
      // console.log(totalQtyInProcess, sumOtherNotIN);
      // console.log("Current :", CurrentInQty);
      if (
        item.In_Q +
          item.Send_Q +
          item.Out_Q +
          item.QtySend -
          (item.Send_Q + item.QtySend + item.Out_Q) >
        0
      ) {
        //Set Default Qty
        this.valuesCheckLimitQty =
          item.In_Q +
          item.Send_Q +
          item.Out_Q +
          item.QtySend -
          (item.Send_Q + item.QtySend + item.Out_Q);
        this.valuesDialogQty = this.valuesCheckLimitQty;
        this.valuesDialogQty = this.valuesCheckLimitQty;

        //Set Default Weight
        this.valuesCheckLimitWeight =
          item.In_W +
          item.Send_W +
          item.Out_W +
          item.WeightSend -
          (item.Send_W + item.WeightSend + item.Out_W);
        this.valuesDialogWeight = this.valuesCheckLimitWeight;
        this.showDialog = true;
        this.IndexForUpdate = index;
        // console.log("Limit", this.valuesCheckLimitQty);
      }
    },
    submitDialog() {
      // console.log(this.valuesDialogWeight);
      if (
        this.valuesDialogQty <= this.valuesCheckLimitQty &&
        this.valuesDialogWeight <= this.valuesCheckLimitWeight
      ) {
        // console.log(this.IndexForUpdate);
        //config Qty
        this.$store.state.processBill.processBillCreate.step2.dataItem[
          this.IndexForUpdate
        ].QtySend = +this.valuesDialogQty;
        //config weight
        this.$store.state.processBill.processBillCreate.step2.dataItem[
          this.IndexForUpdate
        ].WeightSend = +this.valuesDialogWeight;

        this.showDialog = false;
        this.IndexForUpdate = null;
        const valuesCart =
          this.$store.state.processBill.processBillCreate.step2.dataItem.filter(
            ({ QtySend }) => QtySend > 0
          );
        this.$emit("ReturnupdateCart", valuesCart);
        // this.$store.state.processBill.processBillCreate.step2.dataItem =
        //   this.dataItem;
        this.$store.state.processBill.processBillCreate.step2.selectedItem =
          valuesCart;
      }

      // console.log(this.dataItem);
    },
    deleteItem(item, index) {
      this.$store.state.processBill.processBillCreate.step2.dataItem[
        index
      ].QtySend = 0;
      const valuesCart =
        this.$store.state.processBill.processBillCreate.step2.dataItem.filter(
          ({ QtySend }) => QtySend > 0
        );
      this.$emit("ReturnupdateCart", valuesCart);
    },
    async selectedOrder(orderNumber) {
      this.orderNumber = orderNumber;
      await this.loadData();
      // console.log('5555', orderNumber);
    },
    async loadOrderforprocess() {
      this.orderList = await (
        await apiProcess.getOrderforprocess()
      ).data.map(({ OrderNumber }) => OrderNumber);
      // console.log(this.orderList);
    },
  },
};
</script>

<style scoped>
.myImg {
  filter: brightness(50%);
}
.borderSelected {
  /* border-left: 5px solid red !important; */
  border-block: 5px solid rgb(94, 255, 0);
  border-inline: 5px solid rgb(94, 255, 0);
}
</style>