<template>
  <v-container>
    <v-col>
      <v-card>
        <v-data-table
          :search="search"
          :headers="headers"
          class="elevation-1 tablePurchase mt-5"
          :items="inventory"
          :items-per-page="15"
        >
          <template v-slot:top>
            <v-row>
              <v-col cols="5">
                <v-toolbar flat color="white">
                  <v-toolbar-title>เเก้ไขราคา</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-text-field
                    append-icon="search"
                    v-model="search"
                    label="ค้นหาด้วยชื่อ"
                    class="mt-6"
                    outlined
                  ></v-text-field>
                </v-toolbar>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="statusShow.id"
                  :items="statusShow"
                  item-value="id"
                  item-text="Status"
                  label="ประเภท"
                  @change="filterByType(statusShow.id)"
                  outlined
                  required
                />
              </v-col>

              <v-col cols="3" class="mt-3">
                <button class="red--text" @click="cancelSort()">ยกเลิก</button>
              </v-col>
            </v-row>
          </template>
          <template v-slot:item="{ item, index }">
            <tr>
              <!-- <tr height="60"> -->
              <td  align="center">
                {{ index + 1 }}
              </td>
              <td  align="center">
                {{ item.INV_TYPE_NAME }}
              </td>
              <td  align="center">
                {{ item.ITEM_ID }} 
              </td>
              <td  align="center" width="280">
                {{ item.ITEM_NAME }}
              </td>
              <td  align="center">
                {{ item.UNIT_NAME }} 
              </td>
              <td  align="center">
                {{ item.PRICE }} 
              </td>
              <td width="100">
                <v-icon class="ml-2" @click="gotoDetail(item, index)"
                  >edit</v-icon
                >
              </td>
            </tr>
          </template>
        </v-data-table>

        <!-- Popup เเก้ไขราคา -->
        <v-dialog
          v-model="editPopup"
          max-height="600"
          max-width="600"
          class="fontPrompt"
        >
          <v-form class="fontPrompt" @submit="confirmEditPrice()">
            <v-card class="pa-5">
              <v-row>
                <v-col cols="6" class="mt-9 ml-7"> 
                    <p>{{ `${selectData.ITEM_NAME} :` }}</p>
                </v-col>
                <v-col cols="1">

                </v-col>
                <v-col cols="5" class="mt-4 ml-n16">
                  <v-text-field autofocus label="ราคาใหม่" outlined v-model="newPrice"></v-text-field>
                </v-col>
               
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="editPopup = false">Cancle</v-btn>
                <v-btn color="error" type="submit"
                  >Confirm</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import apiPurchaseRequest from "../../services/apiPurchaseRequest";

export default {
  data() {
    return {
      search: "",
      editPopup: false,
      confirmDeleteDlg: false,
      selectData: [],
      DataStatuschange: [],
      newPrice: null,
      inventory: [],
      inventoryBackup: [],
      headers: [
        {
          text: "ลำดับที่",
          value: "INV_TYPE_ID",
          sortable: false,
          align: "center",
          justify: "center",
          class: "#",
        },
        {
          text: "ประเภท",
          value: "INV_TYPE_NAME",
          align: "center",
          justify: "center",
        },
        {
          text: "รหัส",
          value: "ITEM_ID",
          align: "center",
          justify: "center",
        },
        {
          text: "รายการ",
          value: "ITEM_NAME",
          align: "center",
          justify: "center",
        },
        {
          text: "หน่วย",
          value: "UNIT_NAME",
          align: "center",
          justify: "center",
        },
        {
          text: "ราคา",
          value: "PRICE",
          align: "center",
          justify: "center",
        },
        {
          text: "Action",
          value: "Delete_Order",
          sortable: false,
          align: "center",
          justify: "center",
        },
      ],
      statusShow: [
        {
          id: "1",
          Status: "วัสดุสำนักงาน",
        },
        {
          id: "2",
          Status: "อุปกรณ์ช่างสิ้นเปลือง",
        },
        {
          id: "3",
          Status: "วัสดุสิ้นเปลือง",
        },
        {
          id: "4",
          Status: "บรรจุภัณฑ์",
        },
        {
          id: "5",
          Status: "น้ำยาชุบ",
        },
      ],
    };
  },
  async mounted() {
    await this.getInventory()
  },
  methods: {
    async getInventory() {
      this.inventory = await apiPurchaseRequest.getInvetoryFull();
      this.inventoryBackup = this.inventory
      // console.log("inventory : " , this.inventory)
    },

    async gotoDetail(item , index) {
        this.selectData = item
        this.newPrice = item.PRICE;
        this.editPopup = true
    },

    async confirmEditPrice() {
        const result = await apiPurchaseRequest.updatePrice(this.selectData.ITEM_ID , this.newPrice);
        this.editPopup = false
        // console.log('result : ' , result.data.result)
        if (result.data.result == "ok") {
          await this.$swal({
            title: "Update Success",
            icon: "success",
            text: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          await this.getInventory()
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
    },

    //filterBySection
    filterByType(type_id) {
      this.inventory = this.inventoryBackup.filter((S) => {
        return S.INV_TYPE_ID == type_id;
      });
    },
    cancelSort() {
      this.inventory = this.inventoryBackup;
      this.headers.id = null;
      this.statusShow.id = null;
    },
  },
};
</script>

<style>
.myImg {
  filter: brightness(50%);
}

.tablePurchase table th {
  font-size: 14px !important;
  text-align: center;
  background-color: rgba(208, 134, 243, 0.753);
}
.tableFinish {
  background-color: rgba(241, 222, 247, 0.753);
}
</style>
