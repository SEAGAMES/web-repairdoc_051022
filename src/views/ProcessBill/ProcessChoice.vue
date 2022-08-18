<template>
  <v-container grid-list-xs v-if="!$store.state.loadingPage">
    <v-simple-table class="border" width="1500">
      <template v-slot:default>
        <thead>
          <tr align="center" justify="center" class="yellow">
            <th class="text-center" width="100">
              <div class="fontSize14">รหัสแผนก</div>
            </th>
            <th class="text-center" width="120">
              <div class="fontSize14">ขั้นตอนการผลิต/แผนก</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            align="center"
            v-for="pc in dataTable"
            :key="pc.PDProcessCode"
            :class="
              pc.PDProcessCode === selectedProcess ? 'yellow lighten-3' : ''
            "
          >
            <td class="text-center" @click="gotoSelectItem(pc)">
              <div>{{ pc.PDProcessCode }}</div>
            </td>
            <td class="text-center" @click="gotoSelectItem(pc)">
              <div>{{ pc.PDProcessName }}</div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import apiProcess from "../../services/apiProcess";
export default {
  name: "processchoice",
  data() {
    return {
      dataTable: [],
      selectedProcess: "",
      snackBar: {
        showSnackBar: false,
        titleSnackBar: "",
        colorSnackBar: "",
        iconSnackBar: "",
      },
    };
  },
  async mounted() {
    this.$store.state.loadingPage = true;
    this.selectedProcess =
      this.$store.state.processBill.processBillCreate.step1.selectedProcess;
    setTimeout(async () => {
      await this.loadData();
      this.$store.state.loadingPage = false;
    }, 500);
  },
  methods: {
    alertShow(show, title, color, icon) {
      this.snackBar = {
        showSnackBar: show,
        titleSnackBar: title,
        colorSnackBar: color,
        iconSnackBar: icon,
      };
    },
    async loadData() {
      const { data } = await apiProcess.getProcess({
        EmpCode: this.$store.state.username,
      });
      this.dataTable = data;
      //   console.log(res);
    },
    async gotoSelectItem(PDProcess) {
      this.selectedProcess = PDProcess.PDProcessCode;
      this.$emit("selectedProcess", {
        selectedProcessCode: PDProcess.PDProcessCode,
        selectedProcessName: PDProcess.PDProcessName,
      });
      // await this.$router.push(`/process-selectitem/${PDProcess}`);
    },
  },
};
</script>

<style>
</style>