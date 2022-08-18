<template >
  <v-navigation-drawer app color="#b0beD5" v-model="$store.state.menuShow">
    <router-link to="/about" exact>
      <v-img :src="$store.getters.EmpPict" alt width="80%" class="ml-5" />
    </router-link>

    <v-list class="fontPrompt">
      <v-list-item @click="onclickMenu('/home')">
        <v-list-item-icon>
          <v-icon color="red">record_voice_over</v-icon>
        </v-list-item-icon>

        <v-list-item-title>
          <div>ประกาศ</div>
        </v-list-item-title>
      </v-list-item>

      <v-list-group
        prepend-icon="mdi-hammer-screwdriver"
        prepend-icon-cb="Function"
        :value="showMenu"
      >
        <template v-slot:activator>
          <v-list-item-title>
            <div>IT / ซ่อมบำรุง</div>
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="([icon, title, route], index) in menuIT"
          :key="index"
          link
          @click="onclickMenu(route)"
          v-model="selectedMenuIT"
        >
          <v-list-item-icon>
            <v-icon class="ml-8">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-2">
            <div class="fontSize14">{{ title }}</div>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-ring" v-if="menuFactory.length > 0">
        <template v-slot:activator>
          <v-list-item-title>
            <div>ฝ่ายผลิต</div>
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="([icon, title, route], index) in menuFactory"
          :key="index"
          link
          @click="onclickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon class="ml-8">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-2">
            <div class="fontSize14">{{ title }}</div>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-human" v-if="menuHR.length > 0">
        <template v-slot:activator>
          <v-list-item-title>
            <div>ฝ่ายบุคคล</div>
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="([icon, title, route], index) in menuHR"
          :key="index"
          link
          @click="onclickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon class="ml-8">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="2">
            <div class="fontSize14">{{ title }}</div>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-water-pump"
        v-if="menuWaterLog.length > 0"
      >
        <template v-slot:activator>
          <v-list-item-title>
            <div>WaterMonitor</div>
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="([icon, title, route], index) in menuWaterLog"
          :key="index"
          link
          @click="onclickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon class="ml-8">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="2">
            <div class="fontSize14">{{ title }}</div>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-group prepend-icon="mdi-truck" v-if="menuPurchase.length > 0">
        <template v-slot:activator>
          <v-list-item-title>
            <div>เเผนกจัดซื้อ</div>
          </v-list-item-title>
        </template>
        <v-list-item
          v-for="([icon, title, route], index) in menuPurchase"
          :key="index"
          link
          @click="onclickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon class="ml-8">{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="ml-2">
            <div class="fontSize14">{{ title }}</div>
          </v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item
        v-for="([icon, title, route], index) in otherMenus"
        :key="index"
        link
        @click="onclickMenu(route)"
      >
        <v-list-item-icon>
          <v-icon color="red">{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-title>
          <div>{{ title }}</div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      selectedMenu: 0,
      selectedMenuIT: 0,
      showMenu: false,
      menuIT: [
        // ["devices", "อุปกรณ์", "/device-master"],
        // ["build", "แจ้งซ่อม", "/repairdoc-master"],
        // ["insert_chart_outlined", "รายงาน", "/report"],
      ],
      menuFactory: [
        // ["storage", "บันทึกประวัติแม่พิมพ์", "/mould-master"],
        // ["mdi-firebase", "OrderStatus", "/orderstatus"],
        // ["mdi-diamond-stone", "สถานะพลอย", "/statusstone"],
      ],
      menuHR: [
        // ["audiotrack", "ควบคุมเสียง", "/sound-control"],
        // ["mdi-human-greeting", "พนักงาน", "/emp-master"]
      ],
      menuPurchase: [],
      otherMenus: [
        // ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        // ["mdi-weight-gram", "Diff นน. งานทอง", "/weightdiifgold"],
      ],
      menuWaterLog: [],
    };
  },
  mounted() {
    this.insertMenu();
    this.checkMenu();
  },
  methods: {
    insertMenu() {
      // พนักงานทั่วไป
      if (
        this.$store.getters.policyCode === "01" ||
        this.$store.getters.policyCode === "04" ||
        this.$store.getters.policyCode === "06" ||
        this.$store.getters.policyCode === "09"
      ) {
        this.otherMenus = [
          ["mdi-truck", "เเผนกจัดซื้อ", "/purchase-master"],
          ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        ];
        this.menuIT = [["build", "แจ้งซ่อม", "/repairdoc-master", "red"]];
        this.menuFactory = [
          ["storage", "บันทึกประวัติแม่พิมพ์", "/mould-master"],
          ["mdi-atom-variant", "Order WIP", "/mpp-orderStatus"],
          ["mdi-diamond-stone", "รับวัตถุดิบ", "/mpp-receivebill"],
        ];

        // จัดซื้อ
      } else if (this.$store.getters.policyCode === "08") {
        this.menuPurchase = [
          ["mdi-cart-variant", "เบิกของ", "/purchase-master"],
          ["mdi-bitcoin", "กำหนดราคา", "/purchase-edit-price"],
        ];
        this.otherMenus = [
          // ["mdi-truck", "เเผนกจัดซื้อ", "/purchase-master"],
          // ["mdi-bitcoin", "กำหนดราคา", "/purchase-edit-price"],
          ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        ];
        this.menuIT = [["build", "แจ้งซ่อม", "/repairdoc-master"]];
        this.menuFactory = [
          ["storage", "บันทึกประวัติแม่พิมพ์", "/mould-master"],
          ["mdi-atom-variant", "Order WIP", "/mpp-orderStatus"],
          ["mdi-gold", "ตรวจจำนวนหล่อ", "/casting-repair-byorder"],
        ];

        //ฝ่ายบุคคล
      } else if (this.$store.getters.policyCode === "05") {
        this.otherMenus = [
          ["mdi-truck", "เเผนกจัดซื้อ", "/purchase-master"],
          ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        ];
        this.menuIT = [["build", "แจ้งซ่อม", "/repairdoc-master"]];
        this.menuHR = [
          ["audiotrack", "ควบคุมเสียง", "/sound-control"],
          ["mdi-human-greeting", "พนักงาน", "/emp-master"],
        ];

        //ซ่อมบำรุง
      } else if (this.$store.getters.policyCode === "02") {
        this.otherMenus = [
          ["mdi-truck", "เเผนกจัดซื้อ", "/purchase-master"],
          ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
        ];
        this.menuIT = [
          ["devices", "อุปกรณ์", "/device-master"],
          ["build", "แจ้งซ่อม", "/repairdoc-master"],
          ["insert_chart_outlined", "รายงาน", "/report"],
        ];
        this.menuWaterLog = [
          ["mdi-water", "รายงานการใช้น้ำ", "/waterlog"],
          ["mdi-water-pump", "อุปกรณ์มิเตอร์", "/water-device"],
        ];

        // Super User
      } else if (
        this.$store.getters.policyCode === "03" ||
        this.$store.getters.policyCode === "07"
      ) {
        (this.otherMenus = [
          ["contacts", "ติดต่อเบอร์ภายใน", "/about"],
          // ["mdi-weight-gram", "Diff นน. งานทอง", "/weightdiifgold"],
        ]),
          (this.menuIT = [
            ["devices", "อุปกรณ์", "/device-master"],
            ["build", "แจ้งซ่อม", "/repairdoc-master"],
            ["insert_chart_outlined", "รายงาน", "/report"],
          ]),
          (this.menuFactory = [
            ["storage", "บันทึกประวัติแม่พิมพ์", "/mould-master"],
            // ["mdi-firebase", "OrderStatus", "/orderstatus"],
            // ["mdi-diamond-stone", "สถานะพลอย", "/statusstone"],
            ["mdi-atom-variant", "Order WIP", "/mpp-orderStatus"],
            ["mdi-diamond-stone", "รับวัตถุดิบ", "/mpp-receivebill"],
            ["mdi-gold", "ตรวจจำนวนหล่อ", "/casting-repair-byorder"],
          ]),
          (this.menuHR = [
            ["audiotrack", "ควบคุมเสียง", "/sound-control"],
            ["mdi-human-greeting", "พนักงาน", "/emp-master"],
          ]),
          (this.menuWaterLog = [
            ["mdi-water", "ข้อมูลการใช้น้ำ", "/water-report"],
            ["mdi-water-pump", "อุปกรณ์มิเตอร์", "/water-meter"],
          ]),
          (this.menuPurchase = [
            ["mdi-cart-variant", "เบิกของ", "/purchase-master"],
            ["mdi-bitcoin", "กำหนดราคา", "/purchase-edit-price"],
          ]);
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
        this.showMenu = true;
        this.selectedMenu = this.selectedMenuIT.findIndex(
          (menu) => menu[2] === "/device-master"
        );
      }
    },

    // watch: {
    //   $route(to, from) {
    //     if (to.path == "/device-create" || to.path == "/device-detail") {
    //       this.selectedMenu = this.menus.findIndex(
    //         (menu) => menu[2] == "/device-master"
    //       );
    //       // console.log("เข้าเงื่อนไข menu", this.selectedMenu);
    //     } else if (to.path === "/repairdoc-create" || to.path === "/repairdoc-detail" || to.path === "/repairdoc-modify") {
    //       this.selectedMenu = this.menus.findIndex(
    //         (menu) => menu[2] === "/repairdoc-master"
    //       );
    //     } else if (
    //       to.path === "/mould-create" ||
    //       to.path === "/mould-multicreate" ||
    //       to.path === "/mould-detail"
    //     ) {
    //       this.selectedMenu = this.menus.findIndex(
    //         (menu) => menu[2] === "/mould-master"
    //       );
    //     } else if (
    //       to.path === "/product-late" ||
    //       to.path === "/orderstatus-detail" ||
    //       to.path === "/stonefororder"
    //     ) {
    //       this.selectedMenu = this.menus.findIndex(
    //         (menu) => menu[2] === "/orderstatus"
    //       );
    //     } else if (
    //       to.path === "/statusstone" ) {
    //       this.selectedMenu = this.menus.findIndex(
    //         (menu) => menu[2] === "/statusstone"
    //       );
    //     } else {
    //       this.selectedMenu = this.menus.findIndex((menu) => menu[2] == to.path);
    //     }
    //   },
    // },
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
