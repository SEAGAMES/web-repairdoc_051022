<template>
    <v-container grid-list-xs>
    <v-card >
      <v-data-table :search="search" :headers="headers" :items="dataWeightDiff" :items-per-page="15" multi-sort class="tableDevice">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ค้นหา</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
          <tr>
            <td align="center" justify="center" width="150">
                <v-img :src="item.NewPict" width="150" /> 
                <br>
                {{ item.ProductCode }}
            </td>
            <td align="center" justify="center">{{ item.BillNumber }}</td>
            <td align="center" justify="center">{{ item.EmpFullName }}</td>
            <td align="center" justify="center">{{ item.OrderNumber }} </td>
            <td align="center" justify="center">{{ item.InvCode }}</td>
            <td align="center" justify="center">{{ item.MatTotalWeight.toFixed(2) }} g</td>
            <td align="center" justify="center">{{ item.SendQty }} ชิ้น</td>
            <td align="center" justify="center">
                <div>
                    {{ item.SendTotalWeight.toFixed(2) }} g <br>
                    <span class="grey--text"> ( {{ item.SendWeightPerItem.toFixed(2) }} g / ชิ้น ) </span> 
                </div>
            </td>
            <td align="center" justify="center">{{ item.ReturnWeight.toFixed(2) }} g</td>
            <td align="center" justify="center">
                <div>
                    {{ item.DiffWeight.toFixed(2) }} g<br>
                    <span class="grey--text">( {{ item.perDiff.toFixed(2) }} % )</span>
                </div>
            </td>
          </tr>
        </template>
      </v-data-table>

    </v-card>
    </v-container>

</template>

<script>
import apiOrder from '../../services/apiOrderStatus'

export default {
    name: 'weightdiifgold',
    data() {
        return {
            dataWeightDiff: [],
            search: '',
            headers: [
                { text: "รูป", value: "ProductCode" , align:"center", justify:"center"},
                { text: "เลขที่บิล", value: "BillNumber", align:"center", justify:"center"},
                { text: "ชื่อช่าง", value: "EmpFullName", align:"center", justify:"center" },
                { text: "Order", value: "OrderNumber", align:"center", justify:"center"},
                { text: "อะไหล่", value: "InvCode", align:"center", justify:"center"},
                { text: "นน. อะไหล่", value: "MatTotalWeight", align:"center", justify:"center"},
                { text: "จำนวนจ่าย", value: "SendQty", align:"center", justify:"center"},
                { text: "นน. จ่าย", value: "SendTotalWeight", align:"center", justify:"center"},
                { text: "นน. รับ", value: "ReturnWeight", align:"center", justify:"center"},
                { text: "DIFF", value: "perDiff", align:"center", justify:"center"},
            ],
        }
    },
    async mounted() {
        if (this.$store.getters.policyCode === '03' || this.$store.getters.policyCode === '07') {
            await this.loadData();
        }
        
    },
    methods: {
        async loadData() {
            const result = await apiOrder.getWeightDiffGold();
            this.dataWeightDiff = result;
            this.dataWeightDiff.forEach((data, index) => {
                this.dataWeightDiff[index].DiffWeight = data.SendTotalWeight - data.ReturnWeight;
            })
            // console.log(result)
        }
    }
}
</script>

<style>
.BgColorBlue {
    background-color: plum;
}
</style>