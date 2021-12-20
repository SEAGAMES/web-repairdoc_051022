<template>
  <v-container grid-list-xs>
    <v-card>
               <v-select
                    v-model="dataShow"
                    label="แผนก"
                    :items="dataDepart"
                    item-value="departCode"
                    item-text="departName"
                    outlined
                />

                <v-select
                    v-model="positionShow"
                    label="ตำแหน่ง"
                    :items="position"
                    item-value="positionCode"
                    item-text="positionName"
                    outlined
                />


                <v-text-field
                    label="ชื่อ"
                    v-model="empname"
                    outlined
                />


                <v-btn color="success" @click="deleteTT()" >text</v-btn>
    </v-card>

    <!-- <v-row>
          <v-col lg="6" md="6" sm="6">
            <v-card>
                <v-simple-table class="border">
                <template v-slot:default>

                <thead>
                    <tr align="center" justify="center" class="bgColorPink">

                    <th width="10">
                        CH
                    </th>
                    <th class="text-left fontSize14"><h3>รหัสพนักงาน</h3></th>
                    <th class="text-center" >ชื่อ / สกุล</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                    v-for="(emp, index) in dataEmp"
                    :key="index"
                    align="center"
                    justify="center"
                    >
                    <td width="10">
                         <v-checkbox color="pink"/>
                    </td>
                    <td >
                         {{ emp.EmpCode }}
                    </td>
                    <td >
                         {{ emp.EmpFullName }}
                    </td>

                    </tr>
                </tbody>
                </template>
            </v-simple-table>
            </v-card>


          </v-col>
          <v-col lg="6" md="6" sm="6">
            <v-card>
                6666+
            </v-card>
          </v-col>
      </v-row> -->
  </v-container>
</template>

<script>
import apiEmp from '../../services/apiEmp.js'

export default {
  name: "emp-master",
  data() {
    return {
      dataEmp: [
        {
          EmpCode: "1372",
          EmpFullName: "กันต์กมล แก้วประเสริฐ",
        },
      ],
      dataDepart: [
        {
          departCode: "AC01",
          departName: "บัญชี",
        },
        {
          departCode: "MKT",
          departName: "การตลาด",
        },
        {
          departCode: "FAC",
          departName: "ฝ่ายผลิต",
        },
      ],
      position: [
        {
          departCode: "AC01",
          positionCode: "1",
          positionName: "ผจก",
        },
        {
          departCode: "MKT",
          positionCode: "2",
          positionName: "Sales",
        },
                {
          departCode: "MKT",
          positionCode: "3",
          positionName: "MGRSales",
        },
      ],
      position2: [
        {
          departCode: "AC01",
          positionCode: "1",
          positionName: "ผจก",
        },
        {
          departCode: "MKT",
          positionCode: "2",
          positionName: "Sales",
        },
                {
          departCode: "MKT",
          positionCode: "3",
          positionName: "MGRSales",
        },
      ],
      dataShow: '',
      positionShow: '',
      empname: '',
    };
  },
  async mounted() {
    // const RRRR = await apiEmp.getMouldBill();
    // console.log(RRRR);
  },

  methods: {
      // testData() {
      //     console.log('แผนก' ,this.dataShow);
      //   //   console.log('ชื่อ', this.empname);
      //   //   console.log('ตำแหน่ง', this.positionShow);
      // },
      // filterposition() {
      //    this.position = this.position2
      //    this.position = this.position.filter((data, index)=> {
      //        return data.departCode === this.dataShow
      //    })
      // },
      deleteTT() {
         const isConfirm = window.confirm("แน่ใจว่าต้องการลบข้อมูลนี้");
         console.log(isConfirm)
      }

  },
};
</script>

<style>
</style>