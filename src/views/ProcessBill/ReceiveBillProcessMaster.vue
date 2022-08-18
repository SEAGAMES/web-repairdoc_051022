<template>
  <v-container grid-list-xs v-if="!$store.state.loadingPage" class="mt-10">
    <v-card class="fontSarabun">
      <v-data-table
        :search="dataFilter.search"
        :headers="headers"
        :items="dataTable"
        :items-per-page="15"
        class="tableProcess"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-text-field
              v-model="dataFilter.search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
              outlined
              dense
            >
            </v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-select
              :items="dataFilter.fromProcess.showFilter"
              v-model="dataFilter.fromProcess.value"
              label="เลือกแผนกต้นทาง"
              outlined
              single-line
              hide-details
              dense
              @change="filterAll()"
            ></v-select>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-select
              :items="dataFilter.toProcess.showFilter"
              v-model="dataFilter.toProcess.value"
              label="เลือกแผนกปลายทาง"
              outlined
              single-line
              hide-details
              dense
              @change="filterAll()"
            ></v-select>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn color="red" dark @click="clearFilter()">ล้าง</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item, index }">
          <tr>
            <td @click="gotoDetail(index)" width="50">
              <div class="fontSize12">{{ item.billDocNumber }}</div>
            </td>
            <td @click="gotoDetail(index)" width="50">
              <div class="fontSize12">{{ item.billDate | moment("L") }}</div>
            </td>
            <td @click="gotoDetail(index)" width="200">
              <div class="fontSize12">
                {{ item.orderNumber }}
              </div>
            </td>
            <td @click="gotoDetail(index)" width="50">
              <div class="fontSize12">
                {{ item.FromPDProcess.PDProcessName }}
              </div>
            </td>
            <td @click="gotoDetail(index)" width="50">
              <div class="fontSize12">
                {{ item.ToPDProcess.PDProcessName }}
              </div>
            </td>

            <td @click="gotoDetail(index)" width="150">
              <div class="fontSize12">
                {{ item.EmpDocMaker.EmpFName }} (
                {{ item.EmpDocMaker.NickName }} )
              </div>
            </td>
            <td>
              <v-btn color="blue" dark width="80" small>
                <span class="fontSize12">
                  {{ item.statusBill === null ? "ยังไม่ได้รับบิล" : "รับแล้ว" }}
                </span>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import apiProcess from "../../services/apiProcess";
export default {
  name: "receivebill-process-master",
  data() {
    return {
      dataTable: [],
      dataTable2: [],
      dataFilter: {
        search: "",
        fromProcess: {
          value: "",
          showFilter: [],
        },
        toProcess: {
          value: "",
          showFilter: [],
        },
      },
      headers: [
        {
          text: "เลขที่บิล",
          align: "left",
          sortable: false,
          value: "billDocNumber",
        },
        { text: "วันที่โอนงาน", value: "billDate" },
        { text: "OrderNumber", value: "orderNumber" },
        { text: "จากแผนก", value: "fromProcess" },
        { text: "ไปแผนก", value: "toProcess" },
        { text: "ผู้โอน", value: "EmpDocMaker.EmpFullName", sortable: false },
        { text: "สถานะ", value: "statusBill" },
      ],
    };
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    await this.loadDataBill();
    setTimeout(() => {
      this.$store.state.loadingPage = false;
    }, 500);
    console.log(this.$route.params);
    if (this.$route.params.createDoc) {
      console.log(this.$route.params.createDoc);
      this.dataFilter.search = this.$route.params.createDoc;
    }
  },
  methods: {
    async loadDataBill() {
      const { data } = await apiProcess.getProcessBill();
      this.dataTable = data;
      this.dataTable2 = data;
      this.dataFilter.fromProcess.showFilter = [
        ...new Set(data.map((obj) => obj.FromPDProcess.PDProcessName)),
      ];
      this.dataFilter.toProcess.showFilter = [
        ...new Set(data.map((obj) => obj.ToPDProcess.PDProcessName)),
      ];
      //   this.dataFilter.fromProcess.showFilter = data.map(
      //     ({ fromProcess, FromPDProcess }) => {
      //       return {
      //         fromProcess: fromProcess,
      //         FromPDProcess: FromPDProcess.PDProcessName,
      //       };
      //     }
      //   );
    },
    gotoDetail(index) {
      this.$router.push({
        name: "receivebill-process-detail",
        params: this.dataTable[index],
      });
    },
    async filterAll() {
      this.dataTable = this.dataTable2;
      if (this.dataFilter.fromProcess.value !== "") {
        this.filterFromProcess();
      }
      if (this.dataFilter.toProcess.value !== "") {
        this.filterToProcess();
      }
    },
    filterFromProcess() {
      this.dataTable = this.dataTable.filter(
        (obj) =>
          obj.FromPDProcess.PDProcessName === this.dataFilter.fromProcess.value
      );
    },
    filterToProcess() {
      this.dataTable = this.dataTable.filter(
        (obj) =>
          obj.ToPDProcess.PDProcessName === this.dataFilter.toProcess.value
      );
    },
    clearFilter() {
      this.dataFilter.fromProcess.value = "";
      this.dataFilter.toProcess.value = "";
      this.filterAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.tableProcess table th {
  font-size: 14px !important;
  font-weight: bold;
  text-align: center;
  text-justify: center;
  vertical-align: center;
  background-color: rgb(245, 132, 132);
}
</style>