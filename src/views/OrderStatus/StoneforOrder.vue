<template>
  <v-container grid-list-xs>
    <v-row>
      <v-spacer></v-spacer>
      <h1>
        รายการพลอยของ Order :
        {{ $store.getters.statusDetailHeader.OrderNumber }}
      </h1>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <!-- Stone -->
      <v-col lg="7" md="7" sm="12">
        <v-card>
          <v-simple-table class="border">
            <template v-slot:default>
              <thead>
                <tr align="center" justify="center" class="bgColorPink">
                  <th width="10">
                    <v-checkbox
                      v-model="checkboxHeader"
                      color="pink"
                      @click="filterStoneHeader()"
                    />
                  </th>
                  <th class="text-left fontSize14"><h3>รหัสพลอย</h3></th>
                  <th class="text-center" width="30">จำนวนที่สั่ง</th>
                  <th class="text-center" width="800">ขั้นตอน</th>
                  <th class="text-center" width="100">คงค้าง</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(stone, index) in dataStoneByOrder"
                  :key="index"
                  align="center"
                  justify="center"
                >
                  <td width="10">
                    <v-checkbox
                      v-model="stone.checkbox"
                      :value="true"
                      color="pink"
                      @change="filterStone()"
                    />
                  </td>

                  <td align="left" justify="center" class="ml-16" width="200">
                    <div class="fontSize13"><b>{{ stone.InvCode }}</b></div>
                    <div class="fontSize10 grey--text">
                      {{ stone.InvDescE }}
                    </div>
                  </td>
                  <!-- จำนวน -->
                  <td>
                    <div class="fontSize14">
                      <b>{{ stone.QtyReq.toLocaleString() }}</b> pcs.
                    </div>
                  </td>

                  <!-- STEP -->
                  <td width="600">
                    <v-stepper
                      v-model="stone.timeLine"
                      alt-labels
                      tile
                      class="mt-5 mb-5"
                    >
                      <v-stepper-header align="center" class="ml-n7 mr-n7 mt-n4 mb-n4">
                        <v-stepper-step
                          :complete="stone.timeLine >= 1"
                          step="1"
                          complete-icon="done"
                          color="green"
                        >
                          <small align="center">สั่งซื้อแล้ว</small>
                          <small align="center">{{ stone.SupplierName }}</small>
                          <small align="center">{{
                            stone.DueDataSup | moment("DD/MM/YYYY")
                          }}</small>
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="stone.timeLine >= 2"
                          step="2"
                          complete-icon="done"
                          color="red"
                        >
                          <small align="center">รับจากซับแล้ว</small>
                          <small align="center">{{ stone.person }}</small>
                          <small align="center">{{
                            stone.ReciveDateSup | moment("DD/MM/YYYY")
                          }}</small>
                        </v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step
                          :complete="stone.timeLine >= 3"
                          step="4"
                          complete-icon="done"
                          color="green"
                        >
                          <small>ส่ง FAC แล้ว</small>
                          <small>{{ stone.facDate | moment("DD/MM/YYYY") }}</small>
                        </v-stepper-step>
                      </v-stepper-header>
                    </v-stepper>
                  
                  
                  </td>
                      
                  <td width="100">
                    <div class="fontSize14">
                      <b>100</b> pcs.
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>

      <!-- Product -->
      <v-col lg="5" md="5" sm="12">
        <v-card>
          <v-simple-table class="border">
            <template v-slot:default>
              <thead>
                <tr align="center" justify="center" class="bgColorYellow">
                  <th class="text-center" width="100">Product</th>
                  <th class="text-center">จำนวนชิ้นงาน</th>
                  <th class="text-left" width="200">พลอยที่ใช้</th>
                  <th class="text-left" width="80">จำนวนที่ใช้</th>
                  <th class="text-left" width="80">พลอยคงค้าง</th>
                  <th class="text-center" width="80">สถานะ</th>

                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, index) in dataProduct"
                  :key="index"
                  align="center"
                  justify="center"
                  max-height="500"
                >
                <!-- Product  -->
                  <td align="center" justify="center" width="100">
                    <v-img :src="product.NewPict" width="100" />
                    <h3 class="mt-5">{{ product.ProductCode }}</h3>
                  </td>

                  <!-- จำนวนชิ้นงาน -->
                  <td align="center" justify="center"  width="80">
                    {{ product.Qty.toLocaleString() }}
                  </td>

                  <!-- ชื่อพลอย -->
                  <td align="left" justify="center"  width="200">
                    <v-row
                      v-for="(i, index2) in product.stone"
                      :key="index2"  
                    >
                       <div class="mt-2 mb-3">{{ i.InvCode }}</div>
                    </v-row>
                  </td>
                  
                  <!-- จำนวนที่สั่ง -->
                   <td align="left" justify="center"  width="80">
                    <v-row
                      v-for="(i, index2) in product.stone"
                      :key="index2"
                    >
                      <div class="mt-2 mb-3">
                        {{ i.TotalStone.toLocaleString() }}
                      </div>
                    </v-row>
                  </td>

                  <!-- จำนวนคงค้าง -->
                   <td align="left" justify="center"  width="80">
                    <v-row
                      v-for="(i, index2) in product.stone"
                      :key="index2"
                    >
                      <div class="mt-2 mb-3 red--text " v-if="i.Random === 1">0</div>
                      <div class="mt-2 mb-3 red--text " v-if="i.Random === 0">5</div>
                    </v-row>
                  </td>

                   <td align="left" justify="center"  width="80" >
                    <v-row
                      v-for="(i, index2) in product.stone"
                      :key="index2"
                    >
                      <v-btn color="success" small v-if="i.Random === 1" class="mb-2 mt-1" width="70">ครบแล้ว</v-btn>
                      <v-btn color="red" small v-if="i.Random === 0" dark class="mb-2 mt-1" width="70">ยังไม่ครบ</v-btn>
                    </v-row>
                  </td>




                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>.
      <v-btn color="error" dark @click="$router.back()">กลับ</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import apiOrder from "../../services/apiOrderStatus.js";

export default {
  name: "stonefororder",
  data() {
    return {
      dataStoneByOrder: [],
      dataStoneByOrder2: [],
      dataProduct: [],
      dataProduct2: [],
      dataStoneProduct: [],
      checkboxStone: null,
      checkboxHeader: true,
    };
  },
  async mounted() {
    await this.loadDataStone();
    await this.loadDataProduct();
  },
  methods: {
    async loadDataStone() {
      const result = await apiOrder.getStoneByOrder(
        this.$store.getters.statusDetailHeader.OrderNumber
      );
      //   console.log('page', result)
      this.dataStoneByOrder = result;
      this.dataStoneByOrder2 = result;
      this.dataStoneByOrder2.forEach((data, index) => {
        this.dataStoneByOrder[index].checkbox = true;
        this.dataStoneByOrder[index].timeLine = Math.random() * 5;
        this.dataStoneByOrder[index].DueDataSup = this.randomDate(0);
        this.dataStoneByOrder[index].ReciveDateSup = this.randomDate(2);
        this.dataStoneByOrder[index].person = "กันต์กมล แก้วประเสริฐ";
        this.dataStoneByOrder[index].personDate = this.randomDate(1);
        this.dataStoneByOrder[index].facDate = this.randomDate(1);
        this.dataStoneByOrder[index].facPerson = "กันต์กมล แก้วประเสริฐ";
      });
      // console.log(this.dataStoneByOrder);
    },
    async loadDataProduct() {
      const result = await apiOrder.getProduct(
        this.$store.getters.statusDetailHeader.OrderNumber
      );
      await this.loadDataStoneProduct();
      this.dataProduct = result;
      this.dataProduct2 = result;
      this.dataProduct2.forEach((Product, Index) => {
        //    console.log('Loop', this.dataProduct[Index]);
        this.dataProduct[Index].stone = this.dataStoneProduct.filter((s) => {
          return s.ProductID === Product.ProductID;
        });
      });
      // console.log(this.dataProduct)
    },
    async loadDataStoneProduct() {
      const result = await apiOrder.getStoneProduct(
        this.$store.getters.statusDetailHeader.OrderNumber
      );
      this.dataStoneProduct = result;
      // console.log(result);
    },
    filterStone() {
      this.checkboxHeader = false;
      this.dataProduct = [];
      let checkSelect = 0;
      this.dataStoneByOrder.forEach((data, index) => {
        // ดึงข้อมูล Product มาใหม่
        if (data.checkbox) {
          checkSelect = checkSelect + 1;
          this.dataProduct2.forEach((Product, Index) => {
            let result = Product.stone.filter((PS) => {
              return PS.InvCode === data.InvCode;
            });
            if (result.length > 0) {
              this.dataProduct.push(Product);
            }
          });
          if (checkSelect === this.dataStoneByOrder.length) {
            this.checkboxHeader = true;
          }
        }
      });
    },
    filterStoneHeader() {
      // console.log(this.checkboxHeader);
      this.dataProduct = [];
      if (this.checkboxHeader) {
        this.dataStoneByOrder.forEach((data, index) => {
          this.dataStoneByOrder[index].checkbox = true;
        });
        this.dataProduct = this.dataProduct2;
      } else if (!this.checkboxHeader) {
        this.dataStoneByOrder.forEach((data, index) => {
          this.dataStoneByOrder[index].checkbox = false;
        });
        this.dataProduct = [];
      }
    },
    randomDate(i) {
      let start = new Date(2021, 7, 18);
      let end = new Date(2021, 7, 22);
      if (i === 1) {
        start = new Date(2021, 7, 27);
        end = new Date(2021, 7, 30);
      } else if (2) {
        start = new Date(2021, 7, 23);
        end = new Date(2021, 7, 26);
      } else if (3) {
        start = new Date(2021, 7, 28);
        end = new Date(2021, 7, 30);
      }
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    },
  },
};
</script>

<style>
.bgColorPink {
  background-color: pink;
}

.bgColorYellow {
  background-color: rgb(243, 247, 206);
}
</style>