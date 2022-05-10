<template>
  <v-container grid-list-xs>
    <v-card>
      <v-data-table
      :search="search"
      :headers="headers"
      :items="dataTable"
      :items-per-page="15"
      class=""
      >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="ค้นหา Order"
            single-line
            hide-details
            outlined
            dense
            class="mr-1"
          >
          </v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            label="ค้นหาจากวันที่"
            outlined
            hide-details
            color="amber"
            readonly
            append-icon="mdi-calendar-month"
            dense
            class="mr-1"
          />
          <v-spacer></v-spacer>
          <v-select
            label="ค้นหาจากสถานะ"
            :items="valuesFilter.statusFilter.showStatus"
            v-model="valuesFilter.statusFilter.selecteds"
            color="amber"
            outlined
            dense
            hide-details
            append-icon="mdi-format-line-spacing"
            multiple
            clearable
            class="mr-1"
            @change="filterAll()"
          />
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="blue" dark><v-icon>mdi-printer</v-icon></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item="{ item }">
        <tr class="fontSarabun">
          <td align="start">{{ item.OrderNumber }}</td>
          <td align="center">{{ convertDate(item.OrderDate) }}</td>
          <td align="center">{{ item.JobQty.toLocaleString() }}</td>
          <td align="center">
            {{ item.TotalBillRepairCasting.toLocaleString() }}
          </td>
          <td align="center">{{ item.TotalCastingNormal.toLocaleString() }}</td>
          <td align="center">{{ item.TotalCastingSample.toLocaleString() }}</td>
          <td align="center">
            <v-chip
              v-bind:class="{
                white:
                  item.JobQty +
                    item.TotalBillRepairCasting -
                    (item.TotalCastingNormal + item.TotalCastingSample) ===
                  0,
                blue:
                  item.JobQty +
                    item.TotalBillRepairCasting -
                    (item.TotalCastingNormal + item.TotalCastingSample) >
                  0,
                'pink accent-3':
                  item.JobQty +
                    item.TotalBillRepairCasting -
                    (item.TotalCastingNormal + item.TotalCastingSample) <
                  0,
              }"
              dark
              >{{
                ((item.JobQty + item.TotalBillRepairCasting) -
                (item.TotalCastingNormal + item.TotalCastingSample)).toLocaleString()
              }}</v-chip
            >
          </td>
          <td align="center">
            <v-btn
              v-bind:class="{
                green: item.Status === 'ปกติ',
                blue: item.Status === 'หล่อยังไม่ครบ',
                'pink accent-3': item.Status === 'หล่อเกินจำนวน',
              }"
              dark
              width="90"
              small
            >
              <div class="fontSize12">
                {{ item.Status }}
              </div>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
          <!-- Popupปฎิทิน -->
      <v-dialog
        v-model="dataFilter.dateBetween.showPopup"
        max-height="300"
        max-width="300"
        class="fontSarabun"
      >
        <v-date-picker
          label="วันที่แจ้งซ่อม"
          v-model="dataFilter.dateBetween.values"
          range
          @change="filterAll()"
          color="amber"
        ></v-date-picker>
      </v-dialog>
    </v-card>

  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus.js";
import moment from "moment";

export default {
  name: "casting-repair-byorder",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "OrderNumber",
          value: "OrderNumber",
        },
        { text: "OrderDate", value: "OrderDate" },
        { text: "จำนวนสั่งผลิต", value: "JobQty" },
        { text: "จำนวนบิลหล่อซ่อม", value: "TotalBillRepairCasting" },
        { text: "จำนวนที่หล่อ", value: "TotalCastingNormal" },
        { text: "จำนวนหล่ออื่นๆ", value: "TotalCastingSample" },
        { text: "DIFF", sortable: false },
        { text: "สถานะ", value: "Status" },
      ],
      dataTable: [],
      dataTable2: [],
      valuesFilter: {
        statusFilter: {
          showStatus: ["ปกติ", "หล่อเกินจำนวน", "หล่อยังไม่ครบ"],
          selecteds: [],
        },
        betweenDate: {
          minDate: "",
          maxDate: "",
        },
      },
    };
  },
  async mounted() {
    this.valuesFilter.betweenDate.minDate = "2022-01-01";
    this.valuesFilter.betweenDate.maxDate = "2022-12-31";
    await this.loadData();
  },
  methods: {
    async loadData() {
      //to do
      const result = await apiOrder.castingRepairByOrder(
        this.valuesFilter.betweenDate
        //5555+
      );
      this.dataTable = result;
      this.dataTable2 = result;
      // console.log(result);
    },
    convertDate(date) {
      moment.locale("th");
      const dateParse = new Date(date);
      return `${moment(dateParse).add(543, "year").format("L")}`;
    },
    async filterAll() {
      this.dataTable = this.dataTable2;
      if(this.valuesFilter.statusFilter.selecteds.length > 0) {
        this.filterStatus();
      }
    },
    filterStatus() {
      this.dataTable = this.dataTable.filter((obj) =>
        this.valuesFilter.statusFilter.selecteds.includes(obj.Status)
      );
    },
  },
};
</script>

<style>
</style>