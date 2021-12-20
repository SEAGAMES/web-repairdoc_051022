<template  >
  <v-navigation-drawer app color="#b0beD5" v-model="$store.state.menuShow">
    <router-link to="/about" exact>
      <v-img
        :src="$store.getters.EmpPict"
        alt
        width="80%"
        class="ml-5"
      />
    </router-link>

    <v-list shaped>
      <v-list-item-group v-model="selectedMenu" mandatory color="black">
        <v-list-item
          class="tile"
          v-for="([icon, title, route], i) in menus"
          :key="i"
          link
          @click="onclickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="fontPrompt">
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
export default {
  data() {
    return {
      selectedMenu: 0,
      menus: [],
      // menus: [
      //   ["mdi-bullhorn", "ประกาศ", "/home"],
      //   ["mdi-wrench", "อุปกรณ์", "/device-master"],
      //   ["mdi-human-edit", "แจ้งซ่อม", "/repairdoc-master"],
      //   ["mdi-chart-areaspline", "รายงาน", "/report"],
      //   ["mdi-account", "ติดต่อเบอร์ภายใน", "/about"],
      // ],
    };
  },
  mounted() {
    // พนักงานทั่วไป
    this.insertMenu();
    this.checkMenu();
  },
  methods: {
    insertMenu() {
      if (this.$store.getters.policyCode === "01" || this.$store.getters.policyCode === "04" || this.$store.getters.policyCode === "06") {
      this.menus = [
        ["record_voice_over", "ประกาศ", "/home"],
        ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        ["storage", "บันทึกประวัติแม่พิมพ์", "/mould-master"],
        ["build", "แจ้งซ่อม", "/repairdoc-master"],
      ];
      //ฝ่ายบุคคล
    } else if (this.$store.getters.policyCode === "05") {
      this.menus = [
       ["record_voice_over", "ประกาศ", "/home"],
       ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
       ["audiotrack", "ควบคุมเสียง", "/sound-control"],
      ];
      
    } else if (this.$store.getters.policyCode === "02") {
      this.menus = [
        ["record_voice_over", "ประกาศ", "/home"],
        ["devices", "อุปกรณ์", "/device-master"],
        ["build", "แจ้งซ่อม", "/repairdoc-master"],
        ["insert_chart_outlined", "รายงาน", "/report"],
        ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
      ];
      // Super User
    } else if (this.$store.getters.policyCode === "03" || this.$store.getters.policyCode === "07") {
      this.menus = [
        ["record_voice_over", "ประกาศ", "/home"],
        ["devices", "อุปกรณ์", "/device-master"],
        ["build", "แจ้งซ่อม", "/repairdoc-master"],
        ["insert_chart_outlined", "รายงาน", "/report"],
        ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        ["audiotrack", "ควบคุมเสียง", "/sound-control"],
        ["storage", "บันทึกประวัติแม่พิมพ์", "/mould-master"],
        ["mdi-firebase", "OrderStatus", "/orderstatus"],
        ["mdi-diamond-stone", "สถานะพลอย", "/statusstone"],
        // ["mdi-weight-gram", "Diff นน. งานทอง", "/weightdiifgold"],
        // ["mdi-human-greeting", "พนักงาน", "/weightdiifgold"],
      ];
    }
    },
    onclickMenu(route) {
      this.$router.push(route).catch((err) => {});
    },

    checkMenu() {
      // console.log('menu', this.menus)
      // console.log('ค่า menu', this.selectedMenu)
      // console.log('router', this.$route.path)
      const path = this.$route.path;
      // this.selectedMenu = this.menus.findIndex((menu) => menu[2] == this.$route.path);

      if (path === "/device-create" || path === "/device-detail") {
        this.selectedMenu = this.menus.findIndex((menu) => menu[2] === "/device-master");

      } else if (path === "/repairdoc-create" || path === "/repairdoc-detail" || path === "/repairdoc-modify" ) {
        this.selectedMenu = this.menus.findIndex((menu) => menu[2] === "/repairdoc-master");

      } else if (path === "/mould-create" || path =="/mould-multicreate" || path === "/mould-detail") {
        this.selectedMenu = this.menus.findIndex((menu) => menu[2] === "/mould-master");
        
      } else if (path === "/product-late" || path ==="/orderstatus-detail" || path === "/stonefororder") {
        this.selectedMenu = this.menus.findIndex((menu) => menu[2] === "/orderstatus");
        
      } else {
        this.selectedMenu = this.menus.findIndex((menu) => menu[2] === path);
      }
    },
  },
  watch: {
    $route(to, from) {
      if (to.path == "/device-create" || to.path == "/device-detail") {
        this.selectedMenu = this.menus.findIndex(
          (menu) => menu[2] == "/device-master"
        );
        // console.log("เข้าเงื่อนไข menu", this.selectedMenu);
      } else if (to.path === "/repairdoc-create" || to.path === "/repairdoc-detail" || to.path === "/repairdoc-modify") {
        this.selectedMenu = this.menus.findIndex(
          (menu) => menu[2] === "/repairdoc-master"
        );
      } else if (
        to.path === "/mould-create" ||
        to.path === "/mould-multicreate" ||
        to.path === "/mould-detail"
      ) {
        this.selectedMenu = this.menus.findIndex(
          (menu) => menu[2] === "/mould-master"
        );
      } else if (
        to.path === "/product-late" ||
        to.path === "/orderstatus-detail" ||
        to.path === "/stonefororder"
      ) {
        this.selectedMenu = this.menus.findIndex(
          (menu) => menu[2] === "/orderstatus"
        );
      } else if (
        to.path === "/statusstone" ) {
        this.selectedMenu = this.menus.findIndex(
          (menu) => menu[2] === "/statusstone"
        );
      } else {
        this.selectedMenu = this.menus.findIndex((menu) => menu[2] == to.path);
      }
    },
  },
};
</script>

<style>
.tile {
  color: white;
}
.tile:hover {
  background: rgb(123, 153, 182);
}
.tile:active {
  background: #5689b9;
}
</style>