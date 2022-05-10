<template>
  <v-container grid-list-xs>
    <v-row v-if="spinner" class="mt-16">
      <v-spacer></v-spacer>
      <PulseLoader
        justify="center"
        align="center"
        :loading="spinner"
        class="mt-16"
      />
      <v-spacer></v-spacer>
    </v-row>

    <v-card justify="center" align="center" v-if="showPage" class="fontSarabun">
      <h1 class="pa-3 fontPrompt">รายการของ Order : {{ orderNumber }}</h1>

      <v-data-table
        :search="search"
        :value="selected"
        :headers="headers"
        show-select
        @toggle-select-all="selectAll"
        :items="dataStatus"
        :items-per-page="15"
        class="tableMPP"
      >
        <template v-slot:top>
          <!-- หัวตาราง -->

          <v-row class="mr-1 mb-n10">
            <v-col cols="2.5" justify="center">
              <v-row class="ml-n1 mt-n7">
                <v-col align="start">
                  <v-checkbox
                    v-model="dataFilter.valueNonStone"
                    color="success"
                    small
                    @change="filterAll()"
                    label="เฉพาะไม่มีพลอย"
                  />
                </v-col>

                <v-col align="start">
                  <v-checkbox
                    label="เฉพาะฝังในเทียน"
                    v-model="dataFilter.valueWaxStone"
                    color="red"
                    small
                    @change="filterAll()"
                    :disabled="dataFilter.valueNonStone"
                  />
                </v-col>
              </v-row>
            </v-col>

            <!-- ค้นหาจากวันที่ส่งพลอยฝังในเทียน -->
            <v-col cols="2.5" class="">
              <v-text-field
                label="ค้นหาจากวันที่ส่งพลอยฝังในเทียน"
                v-model="dataFilter.datePickerWaxSet.valueShowDate"
                outlined
                color="red"
                readonly
                append-icon="mdi-calendar-month"
                @click="showDatePickerWaxSet()"
                dense
                :disabled="dataFilter.valueNonStone"
              ></v-text-field>
            </v-col>

            <!-- ค้นหาจากวันที่ส่งพลอยธรรมดา -->
            <v-col cols="2.5" class="">
              <v-text-field
                label="ค้นหาจากวันที่ส่งพลอยธรรมดา"
                v-model="dataFilter.datePickerStoneNormal.valueShowDate"
                outlined
                color="blue"
                readonly
                append-icon="mdi-calendar-month"
                dense
                :disabled="dataFilter.valueNonStone"
                @click="showDatePickerNonWaxSet()"
              ></v-text-field>
            </v-col>

            <!-- ค้นหาจากวันที่ส่งไข่มุก -->
            <v-col cols="2.5" class="">
              <v-text-field
                label="ค้นหาจากวันที่ส่ง Pearl"
                v-model="dataFilter.datePickerPearl.valueShowDate"
                outlined
                color="amber"
                readonly
                append-icon="mdi-calendar-month"
                dense
                :disabled="dataFilter.valueNonStone"
                @click="showDatePickerPearl()"
              ></v-text-field>
            </v-col>

            <!-- ค้นหาจากคิว -->
            <v-col cols="2" class="">
              <v-select
                label="ค้นหาจากการจัดคิว"
                outlined
                color="amber"
                append-icon="mdi-format-list-numbered-rtl"
                :items="dataFilter.filterQue.dataSelectChoice"
                v-model="dataFilter.filterQue.dataSelected"
                item-value="Piority"
                item-text="title"
                clearable
                small-chips
                deletable-chips
                multiple
                dense
                @change="filterAll()"
              />
            </v-col>
          </v-row>

          <v-row class="mb-n7">
            <v-col cols="1" class="ml-n1">
              <v-btn
                color="success"
                small
                width="45"
                height="35"
                outlined
                @click="openModalReserveQue()"
                >จัดคิว</v-btn
              >
            </v-col>

            <!-- ค้นหาจากรหัสสินค้า -->
            <v-col cols="2.5" class="ml-n5">
              <v-text-field
                v-model="search"
                append-icon="search"
                label="ค้นหาจากรหัสสินค้า"
                outlined
                clearable
                color="grey"
                dense
                @change="test()"
              ></v-text-field>
            </v-col>

            <v-col cols="2.5" class="ml-n2">
              <!-- Filter สถานะแม่พิมพ์ -->
              <v-select
                label="สถานะแม่พิมพ์"
                :items="dataFilter.dataMoldStatus"
                v-model="dataFilter.valuesFilterMold"
                item-value="StatusCode"
                item-text="StatusName"
                outlined
                clearable
                small-chips
                deletable-chips
                multiple
                @change="filterAll()"
                color="red"
                dense
                append-icon="mdi-cursor-default-gesture"
              >
              </v-select>
            </v-col>

            <!-- Filter สถานะพลอย -->
            <v-col cols="2.5" class="ml-n2">
              <v-select
                label="สถานะพลอย"
                :items="dataFilter.dataStoneStatus"
                v-model="dataFilter.valuesFilterStone"
                item-value="statusName"
                item-text="statusName"
                outlined
                clearable
                small-chips
                deletable-chips
                multiple
                append-icon="mdi-diamond-stone"
                color="green"
                dense
                @change="filterAll()"
                :disabled="dataFilter.valueNonStone"
              >
              </v-select>
            </v-col>

            <!-- Filter วันได้รับพลอย -->
            <v-col cols="2.5" class="ml-n2">
              <v-text-field
                label="วันที่จะได้รับพลอย"
                v-model="dataFilter.valuesShowDateStone"
                outlined
                color="green"
                readonly
                append-icon="mdi-calendar-month"
                @click="showDatePickerAllStone()"
                dense
                :disabled="dataFilter.valueNonStone"
              ></v-text-field>
            </v-col>

            <!-- Filter ล้างคำค้นหา -->
            <v-col cols="1" class="mr-5 ml-n2">
              <v-btn
                color="red"
                width="85"
                height="35"
                outlined
                @click="clearFilter()"
              >
                <div class="fontSize12">ล้างการค้นหา</div>
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Data Recode -->
        <template v-slot:item="{ item }">
          <tr
            class="fontSarabun"
            v-bind:class="{ 'color: green lighten-5': item.boxSelect === true }"
          >
            <!-- รายการที่่ -->
            <td width="10" align="start">
              <div>
                <v-checkbox
                  v-model="item.boxSelect"
                  :value="true"
                  color="green"
                  small
                  hide-details
                  hint
                />
              </div>
            </td>

            <!-- รหัสสินค้า -->
            <td align="center" justify="center" width="100">
              <v-img :src="item.NewPict" width="120" class="mt-1" >
                <div align="start" class="fontSize12">{{ item.OrderItemNo }}</div>
              </v-img>

              <div class="fontSize13">{{ item.ProductCode }}</div>
            </td>

            <!-- จำนวนสินค้า -->
            <td align="center" justify="center" width="80">
              <span class="fontSize14">{{ item.Qty.toLocaleString() }}</span>
            </td>

            <!-- สถานะแม่พิมพ์ -->
            <td align="center" justify="center" width="100">
              <v-btn
                small
                dark
                @click="changeStatus(item)"
                v-if="item.MoldStatus.trim() !== 'M000'"
                v-bind:class="{
                  'green lighten-2': item.MoldStatus.trim() === 'M001',
                  'amber lighten-2': item.MoldStatus.trim() === 'M002',
                  'light-blue lighten-2': item.MoldStatus.trim() === 'M003',
                  'red lighten-4': item.MoldStatus.trim() === 'M004',
                }"
                width="70"
                height="50"
              >
                <span class="fontSize12"> {{ item.MoldStatusName }} </span>
              </v-btn>
            </td>

            <!-- สถานะงานพลอย -->
            <td class="verticalTop" width="600">
              <table class="verticalTop" v-if="item.stone.length > 0">
                <tr>
                  <th width="150" class="background: green lighten-5">
                    <div class="fontSize13" align="start">รหัสพลอย</div>
                  </th>
                  <th width="50" class="background: green lighten-5">
                    <div class="fontSize13" align="center">ฝังในเทียน</div>
                  </th>
                  <th width="100" class="background: green lighten-5">
                    <div class="fontSize13" align="center">กำหนดส่งผลิตแรก</div>
                  </th>
                  <th width="100" class="background: green lighten-5">
                    <div class="fontSize13" align="center">
                      กำหนดส่งผลิตล่าสุด
                    </div>
                  </th>
                  <th width="80" class="background: green lighten-5">
                    <div class="fontSize13" align="center">สถานะ</div>
                  </th>
                  <th width="80" class="background: green lighten-5">
                    <div class="fontSize13" align="center">
                      จำนวนพลอยทั้งหมด
                    </div>
                  </th>
                  <th width="80" class="background: green lighten-5">
                    <div class="fontSize13" align="center">ผลิตรับแล้ว</div>
                  </th>
                  <th width="80" class="background: green lighten-5">
                    <div class="fontSize13" align="center">ค้างรับ</div>
                  </th>
                  <th width="80" class="background: green lighten-5">
                    <div class="fontSize13" align="center">
                      เหลือวันกำหนดเสร็จ
                    </div>
                  </th>
                </tr>

                <!-- รหัสพลอย -->
                <tr v-for="(Inv, index2) in item.stone" :key="index2">
                  <td width="150" align="start" justify="center">
                    <div class="fontSize12">{{ Inv.InvCode }}</div>
                  </td>

                  <!-- ฝังในเทียน -->
                  <td width="10" align="center" justify="center">
                    <div class="fontSize12">
                      <v-icon color="grey" small v-if="Inv.IsWaxSet === '1'"
                        >mdi-check</v-icon
                      >
                    </div>
                  </td>

                  <!-- กำหนดผลิตครั้งแรก -->
                  <td width="110" align="start" justify="center">
                    <div class="fontSize12">
                      <span class="grey--text">({{ Inv.DowDueFacMin }})</span>
                      {{ Inv.FactDueDateMin | moment("L") }}
                    </div>
                  </td>

                  <!-- กำหนดล่าสุด -->
                  <td width="110" align="start" justify="center">
                    <v-tooltip bottom v-if="Inv.IsDefer === 1" color="warning">
                      <template v-slot:activator="{ on, attrs }">
                        <div
                          class="fontSize12"
                          v-bind:class="{ yellow: Inv.IsDefer === 1 }"
                          v-bind="attrs"
                          v-on="on"
                          @click="showDueDateDefer(Inv)"
                        >
                          <span class="grey--text"
                            >({{ Inv.DowDueFacMax }})</span
                          >
                          {{ Inv.FactDueDateMax | moment("L") }}
                        </div>
                      </template>
                      <span>มีเลื่อนกำหนด คลิ๊กเพื่อดูประวัติ</span>
                    </v-tooltip>

                    <div class="fontSize12" v-if="Inv.IsDefer === 0">
                      <span class="grey--text">({{ Inv.DowDueFacMax }})</span>
                      {{ Inv.FactDueDateMax | moment("L") }}
                    </div>
                  </td>

                  <!-- สถานะพลอย -->
                  <td width="90" align="center" justify="center">
                    <div class="fontSize12">
                      <v-tooltip top color="pink">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind:class="{
                              'green lighten-2': Inv.StoneStatus === 'ปกติ',
                              'red lighten-3': Inv.StoneStatus === 'ล่าช้า',
                              'light-blue lighten-2':
                                Inv.StoneStatus === 'สั่งซื้อแล้ว',
                              'amber lighten-2':
                                Inv.StoneStatus === 'ยังไม่ได้สั่งซื้อ',
                              'teal lighten-1': Inv.StoneStatus === 'ครบแล้ว',
                            }"
                            small
                            max-height="20"
                            max-width="70"
                            dark
                            @click="openPopupPurchaseDetail(Inv)"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <span class="fontSize10">
                              {{ Inv.StoneStatus }}
                            </span>
                          </v-btn>
                        </template>
                        <span>คลิ๊กเพื่อดูรายละเอียด</span>
                      </v-tooltip>
                    </div>
                  </td>

                  <!-- จำนวนพลอย -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">
                      {{ Inv.QtyStone.toLocaleString() }}
                    </div>
                  </td>

                  <!-- รับแล้ว -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">
                      {{ Inv.QtyFacReceive.toLocaleString() }}
                      <span class="grey--text"
                        >({{
                          ((Inv.QtyFacReceive / Inv.QtyStone) * 100).toFixed()
                        }})%</span
                      >
                    </div>
                  </td>

                  <!-- ค้างรับ -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">
                      {{ (Inv.QtyStone - Inv.QtyFacReceive).toLocaleString() }}
                    </div>
                  </td>

                  <!-- เหลือวัน -->
                  <td width="80" align="center" justify="center">
                    <div
                      class="fontSize12"
                      v-if="
                        Inv.StoneStatus.trim() !== 'ครบแล้ว' ||
                        Inv.QtyStone - Inv.QtyFacReceive > 0
                      "
                    >
                      <v-chip
                        dark
                        v-bind:class="{
                          'green lighten-2': Inv.LateDay >= 4,
                          'amber lighten-2':
                            Inv.LateDay >= 0 && Inv.LateDay <= 3,
                          'red lighten-3': Inv.LateDay < 0,
                        }"
                        small
                      >
                        <span class="fontSize12 text-xs-right">{{
                          Inv.LateDay
                        }}</span>
                      </v-chip>
                    </div>
                  </td>
                </tr>
              </table>
              <div
                v-if="item.stone.length <= 0"
                align="center"
                class="grey--text"
              >
                ไม่มีพลอย
              </div>
            </td>

            <!-- สถานะงานอะไหล่ -->
            <td class="verticalTop" width="200">
              <table class="verticalTop">
                <tr>
                  <th width="150" class="background: blue lighten-5">
                    <div class="fontSize13" align="start">รหัสอะไหล่</div>
                  </th>
                  <th width="100" class="background: blue lighten-5">
                    <div class="fontSize13" align="center">
                      จำนวนอะไหล่ทั้งหมด
                    </div>
                  </th>
                  <th width="80" class="background: blue lighten-5">
                    <div class="fontSize13" align="center">หน่วย</div>
                  </th>
                </tr>

                <!-- รหัสอะไหล่ -->
                <tr v-for="(part, index2) in item.parts" :key="index2">
                  <td width="150" align="start">
                    <div class="fontSize12">{{ part.InvCode }}</div>
                  </td>

                  <!-- จำนวนอะไหล่ -->
                  <td width="80" align="center">
                    <div class="fontSize12">
                      {{ part.TotalQty }}
                    </div>
                  </td>

                  <!-- หน่วยนับ -->
                  <td width="80" align="center" justify="center">
                    <div class="fontSize12">{{ part.Unit }}</div>
                  </td>
                </tr>
              </table>
            </td>

            <!-- ลำดับคิว -->
            <td align="center" justify="center" width="90">
              <div v-if="item.Piority === 99">
                <v-chip small color="grey lighten-3">
                  <v-icon small color="grey" @click="openModalReviseQue(item)"
                    >mdi-plus-thick</v-icon
                  >
                </v-chip>
              </div>

              <div v-if="item.Piority > 0 && item.Piority != 99">
                <v-row align="center" justify="center" class="ml-1">
                  <v-chip @click="openModalReviseQue(item)">
                    <span class="fontSize18"
                      ><b>{{ item.Piority }}</b>
                    </span>
                  </v-chip>
                  <!-- <v-icon  class="ml-1" @click="openModalReviseQue(item)"
                    >mdi-lead-pencil</v-icon> -->
                </v-row>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-row>
        <v-col align="end" class="mr-2">
          <v-btn color="red" dark @click="$router.back()">กลับ</v-btn>
          <v-btn
            color="success"
            dark
            @click="printMaterial"
            class="ml-1"
            :loading="loadPDF1"
            >พิมพ์วัตถุดิบ</v-btn
          >
          <v-btn color="light-blue" dark @click="printOrder" class="ml-1" :loading="loadPDF2"
            >พิมพ์ตามลำดับคิว</v-btn
          >
        </v-col>
      </v-row>
    </v-card>

    <!-- PopUpUpdateคิว -->
    <v-dialog
      v-model="showPopupReviseQue"
      max-height="150"
      max-width="350"
      class="fontSarabun"
    >
      <v-form class="fontSarabun">
        <v-card class="pa-3">
          <v-row class="mb-n7 mt-1">
            <v-col cols="1">
              <v-icon
                class="pt-4 mr-2"
                @click="
                  DataPopupReviseQue.QueDefault =
                    DataPopupReviseQue.QueDefault - 1
                "
                v-if="DataPopupReviseQue.QueDefault > 0"
                >mdi-minus</v-icon
              >
            </v-col>
            <!-- prepend-icon="mdi-minus"
                  append-outer-icon="mdi-plus" -->
            <v-col cols="10">
              <v-text-field
                v-model="DataPopupReviseQue.QueDefault"
                type="number"
                label="ลำดับคิวที่"
                outlined
                color="green"
              />
            </v-col>
            <v-col cols="1">
              <v-icon
                class="pt-4 ml-n5"
                @click="
                  DataPopupReviseQue.QueDefault =
                    DataPopupReviseQue.QueDefault + 1
                "
                >mdi-plus</v-icon
              >
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeModalReviseQue()">Cancel</v-btn>
            <v-btn text color="green" @click="confirmQue()">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- PopUp คิว แบบหลายรายการ -->
    <v-dialog
      v-model="dataPopUpReserveQue.showPopupReserveQue"
      max-height="150"
      max-width="350"
      class="fontSarabun"
    >
      <v-form class="fontSarabun">
        <v-card class="pa-3">
          <v-row class="mb-n7 mt-1">
            <v-col cols="1">
              <v-icon
                class="pt-4 mr-2"
                @click="
                  dataPopUpReserveQue.QueDefault =
                    dataPopUpReserveQue.QueDefault - 1
                "
                v-if="dataPopUpReserveQue.QueDefault > 0"
                >mdi-minus</v-icon
              >
            </v-col>
            <!-- prepend-icon="mdi-minus"
                  append-outer-icon="mdi-plus" -->
            <v-col cols="10">
              <v-text-field
                v-model="dataPopUpReserveQue.QueDefault"
                type="number"
                label="ลำดับคิวที่"
                outlined
                color="green"
              />
            </v-col>
            <v-col cols="1">
              <v-icon
                class="pt-4 ml-n5"
                @click="
                  dataPopUpReserveQue.QueDefault =
                    dataPopUpReserveQue.QueDefault + 1
                "
                >mdi-plus</v-icon
              >
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="closeModalReseveQue()">Cancel</v-btn>
            <v-btn text color="green" @click="confirmReserveQue()"
              >Confirm</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- Popupปฎิทิน All -->
    <v-dialog
      v-model="dataFilter.showDatePickerAllStone"
      max-height="350"
      max-width="350"
      class="fontSarabun"
    >
      <v-date-picker
        v-if="dataFilter.showDatePickerAllStone"
        label="วันที่กำหนดส่งพลอย"
        v-model="dataFilter.valuesBetweenDateAllStone"
        range
        @change="filterAll()"
        color="green"
      ></v-date-picker>
    </v-dialog>

    <!-- Popupปฎิทิน ฝังในเทียน -->
    <v-dialog
      v-model="dataFilter.datePickerWaxSet.showPopup"
      max-height="350"
      max-width="350"
      class="fontSarabun"
    >
      <v-date-picker
        v-if="dataFilter.datePickerWaxSet.showPopup"
        label="วันที่กำหนดส่งพลอย"
        v-model="dataFilter.datePickerWaxSet.valuesBetween"
        range
        @change="filterAll()"
        color="red"
      ></v-date-picker>
    </v-dialog>

    <!-- Popupปฎิทิน พลอยธรรมดา -->
    <v-dialog
      v-model="dataFilter.datePickerStoneNormal.showPopup"
      max-height="350"
      max-width="350"
      class="fontSarabun"
    >
      <v-date-picker
        v-if="dataFilter.datePickerStoneNormal.showPopup"
        label="วันที่กำหนดส่งพลอย"
        v-model="dataFilter.datePickerStoneNormal.valuesBetween"
        range
        @change="filterAll()"
        color="blue"
      ></v-date-picker>
    </v-dialog>

    <!-- Popupปฎิทิน ไข่มุก -->
    <v-dialog
      v-model="dataFilter.datePickerPearl.showPopup"
      max-height="350"
      max-width="350"
      class="fontSarabun"
    >
      <v-date-picker
        v-if="dataFilter.datePickerPearl.showPopup"
        label="วันที่กำหนดส่งพลอย"
        v-model="dataFilter.datePickerPearl.valuesBetween"
        range
        @change="filterAll()"
        color="amber"
      ></v-date-picker>
    </v-dialog>

    <!-- PopUp History การเลื่อน  Due -->
    <v-dialog
      v-model="historyDue.showHistoryDue"
      width="1100"
      class="fontSarabun"
    >
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="text-center fontSarabun yellow lighten-1">
                <th class="text-center" width="40">รายการที่</th>
                <th class="text-center" width="100">วันที่แก้ไข</th>
                <th class="text-center">ผู้แก้ไข</th>
                <th class="text-center" width="100">
                  กำหนดส่งผู้จำหน่าย(เดิม)
                </th>
                <th class="text-center" width="100">
                  กำหนดส่งผู้จำหน่าย(ใหม่)
                </th>
                <th class="text-center">เหตุผลแก้กำหนดผู้จำหน่าย</th>
                <th class="text-center" width="100">กำหนดส่งผลิต(เดิม)</th>
                <th class="text-center" width="100">กำหนดส่งผลิต(ใหม่)</th>
                <th class="text-center" width="160">เหตุผลแก้กำหนดผลิต</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="HIS in historyDue.dataHistory"
                :key="HIS.History_ID"
                class="text-center fontSarabun"
              >
                <td>
                  <div class="fontSize12">{{ HIS.MP_ItemNo }}</div>
                </td>
                <td>
                  <div class="fontSize12">
                    {{ convertDate(HIS.HistoryDate) }}
                  </div>
                  <span class="fontSize12 grey--text"
                    >( {{ HIS.HistoryTime }} )</span
                  >
                </td>
                <td>
                  <div class="fontSize12">{{ HIS.EmpName }}</div>
                </td>
                <td>
                  <div class="fontSize12">
                    {{ convertDate(HIS.SupFromDate) }}
                  </div>
                </td>
                <td>
                  <div
                    class="fontSize12"
                    v-bind:class="{
                      'red lighten-4': HIS.SupFromDate < HIS.SupToDate,
                      'green lighten-4': HIS.SupFromDate > HIS.SupToDate,
                    }"
                  >
                    {{ convertDate(HIS.SupToDate) }}
                  </div>
                </td>
                <td>
                  <div class="fontSize12">{{ HIS.ReasonSup }}</div>
                </td>
                <td>
                  <div class="fontSize12">
                    {{ convertDate(HIS.FacFromDate) }}
                  </div>
                </td>
                <td>
                  <div
                    class="fontSize12"
                    v-bind:class="{
                      'red lighten-4': HIS.FacFromDate < HIS.FacToDate,
                      'green lighten-4': HIS.SupFromDate > HIS.SupToDate,
                    }"
                  >
                    {{ convertDate(HIS.FacToDate) }}
                  </div>
                </td>
                <td>
                  <div class="fontSize12">{{ HIS.ReasonFact }}</div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <!-- GAME -->
    <!-- Popup เปลี่ยนสถานะ && ดูสถานะ -->
    <v-dialog
      v-model="changeStatusShowPop"
      max-height="600"
      max-width="600"
      class="fontPrompt"
    >
      <v-form class="fontPrompt">
        <v-card class="pa-5">
          <v-row>
            <v-col>
              <v-select
                v-model="getStatus_To"
                :items="dataFilter.dataMoldStatus"
                item-value="StatusCode"
                item-text="StatusName"
                label="เปลี่ยนสถานะ"
                outlined
                color="blue"
              />
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn @click="historyShowPop = !historyShowPop"
              >ประวัติการเปลี่ยน</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn @click="changeStatusShowPop = false">Cancle</v-btn>
            <v-btn color="error" @click="confirmChangeStatus()">Confirm</v-btn>
          </v-card-actions>

          <v-simple-table v-if="historyShowPop">
            <template v-slot:default>
              <thead>
                <tr
                  align="center"
                  justify="center"
                  class="light-green lighten-4"
                >
                  <th class="text-center">เวลา</th>
                  <th class="text-center">เปลี่ยนจาก</th>
                  <th class="text-center">เป็น</th>
                  <th class="text-center">ผู้เปลี่ยน</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in historyStatusMold"
                  :key="item.SortBy"
                  align="center"
                  justify="center"
                >
                  <td>
                    {{ item.UpdateDate | moment("L") }}
                    <br />
                    <span class="grey--text"
                      >( {{ item.UpdateDate | moment("LT") }} น.)</span
                    >
                  </td>
                  <td>{{ item.StatusFrom }}</td>
                  <td>{{ item.StatusTo }}</td>
                  <td>{{ item.EmpFullName }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-form>
    </v-dialog>

    <!-- PopUpดูรายละเอียดการสั่งซื้อ -->
    <v-dialog
      v-model="dataPopupPurchaseDetail.showPopup"
      max-width="600"
      class="fontSarabun"
    >
      <v-card>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr align="center" class="light-blue lighten-4">
                <th class="text-center">ผู้จำหน่าย</th>
                <th class="text-center">วันที่สั่งซื้อ</th>
                <th class="text-center">กำหนดส่ง<br />ของผู้จำหน่าย</th>
                <th class="text-center">จำนวนที่สั่ง</th>
                <th class="text-center">คัดพลอยรับแล้ว</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="dataDetail in dataPopupPurchaseDetail.dataPurchase"
                :key="dataDetail.MP_ItemNo"
                align="center"
              >
                <td>
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="fontSize12" v-bind="attrs" v-on="on">
                        {{ dataDetail.SupplierName }}
                      </div>
                    </template>
                    <!-- <span v-if="dataDetail.PcDocNumber.trim() === ''"
                      >เลขที่ใบสั่งซื้อ : {{ dataDetail.PcID }}</span
                    > -->
                    <span v-if="dataDetail.PcDocNumber !== null"
                      >เลขที่ใบสั่งซื้อ : {{ dataDetail.PcDocNumber }}</span
                    >
                  </v-tooltip>
                </td>
                <td>{{ convertDate(dataDetail.DocDate) }}</td>
                <td>{{ convertDate(dataDetail.SupDueDate) }}</td>
                <td>{{ dataDetail.QtyPurchase.toLocaleString() }}</td>
                <td>{{ dataDetail.QtyPcReceive.toLocaleString() }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <!-- snackbarUpdate คิว -->
    <div class="text-center ma-2">
      <v-snackbar v-model="snackBarUpdateSuccess">
        <div class="fontSarabun fontSize16 text-center">
          อัพเดทข้อมูลสำเร็จแล้ว
          <v-icon small class="ml-1" color="green">mdi-shield-check</v-icon>
        </div>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import apiMpp from "../../services/apiMpp";
import PulseLoader from "../../components/Loadings/PulseLoader.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import apiCreatePDF from "../../services/apiCreatePDF";
import moment from "moment";
import api from "../../services/api";

export default {
  name: "MPP_Status",
  data() {
    return {
      orderNumber: "",
      showPage: false,
      spinner: null,
      selected: [],
      headers: [
        {
          text: "รหัสสินค้า",
          value: "ProductCode",
          align: "center",
          // width: 100
        },
        {
          text: "จำนวนทั้งOrder",
          value: "Qty",
          align: "center",
          // width: 80
        },
        {
          text: "สถานะแม่พิมพ์",
          value: "MoldStatus",
          align: "center",
          // width: 100
        },
        {
          text: "สถานะพลอย",
          value: "",
          align: "center",
          // width: 600
        },
        {
          text: "สถานะอะไหล่",
          value: "",
          align: "center",
          // width: 200
        },
        {
          text: "ลำดับคิว",
          value: "Piority",
          align: "center",
          // width: 90
        },
      ],
      search: "",
      dataStatus: [],
      dataStatus2: [],
      dataStone: [],
      showPopupReviseQue: false,
      DataPopupReviseQue: {
        QueDefault: null,
        OrderItemNo: null,
      },
      snackBarUpdateSuccess: false,
      dataFilter: {
        dataMoldStatus: [],
        valuesFilterMold: [],
        dataStoneStatus: [
          {
            statusCode: "S001",
            statusName: "ยังไม่ได้สั่งซื้อ",
          },
          {
            statusCode: "S002",
            statusName: "สั่งซื้อแล้ว",
          },
          {
            statusCode: "S003",
            statusName: "ปกติ",
          },
          {
            statusCode: "S004",
            statusName: "ล่าช้า",
          },
          {
            statusCode: "S005",
            statusName: "ครบแล้ว",
          },
        ],
        valuesFilterStone: [],
        valuesBetweenDateAllStone: [],
        valuesShowDateStone: "2018-01-01 ~ 2035-01-01",
        showDatePickerAllStone: false,
        valueNonStone: false,
        valueWaxStone: false,
        datePickerWaxSet: {
          showPopup: false,
          valuesBetween: [],
          valueShowDate: "",
        },
        datePickerStoneNormal: {
          showPopup: false,
          valuesBetween: [],
          valueShowDate: "",
        },
        datePickerPearl: {
          showPopup: false,
          valuesBetween: [],
          valueShowDate: "",
        },
        filterQue: {
          dataSelectChoice: [],
          dataSelected: [],
        },
      },
      dataPopUpReserveQue: {
        dataReserveQue: [],
        valueQue: 0,
        showPopupReserveQue: false,
        QueDefault: 0,
      },
      dataPopupPurchaseDetail: {
        dataPurchase: [],
        showPopup: false,
      },
      // GAME
      changeStatusShowPop: false,
      historyShowPop: false,
      loadData: [],
      dataItem: [],
      historyStatusMold: [],
      getStatus_To: "",
      historyDue: {
        showHistoryDue: false,
        dataHistory: [],
      },
      loadPDF1: false,
      loadPDF2: false,
    };
  },
  components: {
    PulseLoader,
    // eslint-disable-next-line vue/no-unused-components
    DatePicker,
  },
  async mounted() {
    // this.$emit("isCheckLogin", !(await api.isLoggedIn()));
    // console.log(this.$store.state.mppPage.mppSelectOrderToDetail);
    // await this.checkinRoute();
    this.orderNumber =
      this.$store.state.mppPage.mppSelectOrderToDetail.OrderNumber;
    // this.orderNumber = "CH-LK005/2022";
    // this.orderNumber = "CH-DGP002/2022";
    this.spinner = true;
    await this.loadDataDetail();
    await this.loadDataMoldStatus();
    setTimeout(async () => {
      this.spinner = false;
      this.showPage = true;
      if (
        this.orderNumber === "" ||
        this.orderNumber === undefined ||
        this.orderNumber === null
      ) {
        await this.$router.push("/mpp-orderStatus").catch(() => {});
      }
    }, 500);
  },
  methods: {
    async checkinRoute() {
      // console.log('params',this.$route.path);
      const result = await apiMpp.CheckinProgram(
        this.$store.state.username,
        this.$route.path
      );
    },
    async loadDataDetail() {
      const data = {
        orderNumber: this.orderNumber,
      };
      const response = await apiMpp.mppMeshDataDetail(data);
      this.dataStatus = response;
      this.dataStatus2 = response;
      await this.getDataQueForFilter();
      // console.log(response);
    },
    openModalReviseQue(data) {
      if (this.$store.getters.policyQueUpdate === "1") {
        this.DataPopupReviseQue.OrderItemNo = data.OrderItemNo;
        this.DataPopupReviseQue.QueDefault = data.Piority;
        this.showPopupReviseQue = true;
        // console.log(data);
      }
    },
    closeModalReviseQue() {
      this.DataPopupReviseQue.OrderItemNo = null;
      this.DataPopupReviseQue.QueDefault = null;
      this.showPopupReviseQue = false;
    },
    async confirmQue() {
      this.DataPopupReviseQue.QueDefault = +this.DataPopupReviseQue.QueDefault;
      if (this.DataPopupReviseQue.QueDefault > 0) {
        // console.log(this.DataPopupReviseQue.OrderItemNo);
        const dataPiority = [
          {
            OrderItemNo: this.DataPopupReviseQue.OrderItemNo,
            Piority: this.DataPopupReviseQue.QueDefault,
          },
        ];
        const response = await apiMpp.mppUpdatePiority(
          this.orderNumber,
          dataPiority
        );
        // console.log(response);
        if (response.result === "ok") {
          this.showPage = false;
          this.snackBarUpdateSuccess = true;
          await this.loadDataDetail();
          setTimeout(() => {
            this.showPage = true;
            this.showPopupReviseQue = false;
            this.snackBarUpdateSuccess = false;
            this.filterAll();
          }, 1000);
        }
      }
    },
    async loadDataMoldStatus() {
      this.dataFilter.dataMoldStatus = await apiMpp.mppGetMoldStatus();
      // console.log(this.dataFilter.dataMoldStatus);
    },
    changeFilterMoldStatus() {
      // console.log(this.dataFilter.valuesFilterMold);
      // this.dataStatus = this.dataStatus2;
      if (
        this.dataFilter.valuesFilterMold.length === 0 ||
        this.dataFilter.valuesFilterMold === null ||
        this.dataFilter.valuesFilterMold === undefined
      ) {
        //
      } else {
        // console.log(this.dataFilter.valuesFilterMold);
        this.dataStatus = this.dataStatus.filter((dataFilter) => {
          return this.dataFilter.valuesFilterMold.includes(
            dataFilter.MoldStatus.trim()
          );
        });
      }
    },
    showDatePickerAllStone() {
      this.dataFilter.showDatePickerAllStone = true;
      // console.log(this.dataFilter.showDatePickerAllStone)
    },
    async filterDateStoneAll() {
      if (this.dataFilter.valuesBetweenDateAllStone.length === 2) {
        this.dataFilter.valuesShowDateStone = `${this.dataFilter.valuesBetweenDateAllStone[0]} ~ ${this.dataFilter.valuesBetweenDateAllStone[1]}`;
        this.dataFilter.showDatePickerAllStone = false;
        let data = {
          orderNumber: this.orderNumber,
          maxDate: "",
          minDate: "",
        };
        //หาค่ามากกว่าตอนกดเลือกวันที่ เวลาพนักงานกดสลับ
        if (
          this.dataFilter.valuesBetweenDateAllStone[1] >
          this.dataFilter.valuesBetweenDateAllStone[0]
        ) {
          // console.log("มากกว่า");
          data.maxDate = this.dataFilter.valuesBetweenDateAllStone[1];
          data.minDate = this.dataFilter.valuesBetweenDateAllStone[0];
        } else {
          // console.log("น้อยกว่า");
          data.minDate = this.dataFilter.valuesBetweenDateAllStone[1];
          data.maxDate = this.dataFilter.valuesBetweenDateAllStone[0];
        }
        const response = await apiMpp.mppGetFilterDate(data);
        // console.log('Filter', response);
        this.dataStatus = this.dataStatus.filter((obj) =>
          response.includes(obj.OrderItemNo)
        );
      }
    },
    filterAll() {
      this.dataStatus = this.dataStatus2;
      //ถ้าไม่ได้ติ๊กที่ เฉพาะไม่มีพลอยให้ Filter พลอยได้
      if (!this.dataFilter.valueNonStone) {
        //Filter เฉพาะพลอยที่ฝังในเทียน
        if (this.dataFilter.valueWaxStone) {
          this.filterStoneWaxSet();
        } else {
          this.dataFilter.datePickerWaxSet.valuesBetween = [];
          this.dataFilter.datePickerWaxSet.valueShowDate = "";
        }
        // Filter วันที่ส่งพลอยทั้งหมด
        if (this.dataFilter.valuesBetweenDateAllStone.length === 2) {
          this.filterDateStoneAll();
        }
        // Filter สถานะของพลอย
        if (this.dataFilter.valuesFilterStone.length > 0) {
          this.filterStatusStone();
        }
        // Filter วันที่ส่งพลอยเฉพาะพลอยฝังในเทียน
        if (
          this.dataFilter.datePickerWaxSet.valuesBetween.length === 2 &&
          this.dataFilter.valueWaxStone === true
        ) {
          this.filterDateWaxSet();
        }
        // Filter วันที่ส่งพลอยเฉพาะพลอยธรรมดาไม่ได้ฝัง
        if (this.dataFilter.datePickerStoneNormal.valuesBetween.length === 2) {
          this.filterDateNonWaxSet();
        }
        // Filter วันที่ส่งไข่มุก
        if (this.dataFilter.datePickerPearl.valuesBetween.length === 2) {
          this.filterDatePearl();
        }
      }
      if (this.dataFilter.valueNonStone) {
        this.filterNonStone();
      }
      //filterMoldStatus
      if (this.dataFilter.valuesFilterMold.length > 0) {
        this.changeFilterMoldStatus();
      }
      //Filter Que
      if (this.dataFilter.filterQue.dataSelected.length > 0) {
        this.filterForQue();
      }
    },
    clearFilter() {
      this.dataFilter.valuesFilterMold = [];
      this.dataFilter.valuesBetweenDateAllStone = [];
      this.dataFilter.valuesFilterStone = [];
      this.dataFilter.valuesShowDateStone = "2018-01-01 ~ 2035-01-01";
      this.search = "";
      this.dataFilter.valueNonStone = false;
      this.dataFilter.valueWaxStone = false;
      this.dataFilter.datePickerWaxSet.valuesBetween = [];
      this.dataFilter.datePickerWaxSet.valueShowDate = "";
      this.dataFilter.datePickerStoneNormal.valuesBetween = [];
      this.dataFilter.datePickerStoneNormal.valueShowDate = "";
      this.dataFilter.datePickerPearl.valuesBetween = [];
      this.dataFilter.datePickerPearl.valueShowDate = "";
      this.dataFilter.filterQue.dataSelected = [];
      this.dataStatus = this.dataStatus2;
    },
    selectAll(event) {
      // console.log(event.value);
      if (event.value) {
        this.dataStatus.forEach((data, index) => {
          this.dataStatus[index].boxSelect = true;
        });
      } else {
        this.dataStatus.forEach((data, index) => {
          this.dataStatus[index].boxSelect = false;
        });
      }
    },
    openModalReserveQue() {
      if (this.$store.getters.policyQueUpdate === "1") {
        const checkSelected = this.dataStatus.filter(
          (item) => item.boxSelect === true
        );
        if (checkSelected.length > 0) {
          this.dataPopUpReserveQue.dataReserveQue = [];
          this.dataPopUpReserveQue.showPopupReserveQue = true;
        }
      }
    },
    closeModalReseveQue() {
      this.dataPopUpReserveQue.dataReserveQue = [];
      this.dataPopUpReserveQue.showPopupReserveQue = false;
    },
    async confirmReserveQue() {
      this.dataPopUpReserveQue.QueDefault =
        +this.dataPopUpReserveQue.QueDefault;
      this.dataStatus.forEach((data) => {
        if (data.boxSelect) {
          this.dataPopUpReserveQue.dataReserveQue.push({
            OrderItemNo: data.OrderItemNo,
            Piority: this.dataPopUpReserveQue.QueDefault,
          });
        }
      });
      // console.log(this.dataPopUpReserveQue.dataReserveQue);
      if (
        this.dataPopUpReserveQue.QueDefault > 0 &&
        this.dataPopUpReserveQue.dataReserveQue.length > 0
      ) {
        const response = await apiMpp.mppUpdatePiority(
          this.orderNumber,
          this.dataPopUpReserveQue.dataReserveQue
        );
        // console.log(response);
        if (response.result === "ok") {
          this.showPage = false;
          this.snackBarUpdateSuccess = true;
          await this.loadDataDetail();
          setTimeout(() => {
            this.showPage = true;
            this.dataPopUpReserveQue.showPopupReserveQue = false;
            this.snackBarUpdateSuccess = false;
            this.filterAll();
          }, 1000);
        }
      }
    },
    test() {
      // console.log(this.dataStatus);
    },
    async filterStatusStone() {
      // console.log(this.dataFilter.valuesFilterStone);
      const response = await apiMpp.mppGetFilterStatusStone(
        this.orderNumber,
        this.dataFilter.valuesFilterStone
      );
      // console.log(response);
      this.dataStatus = this.dataStatus.filter((obj) =>
        response.includes(obj.OrderItemNo)
      );
    },

    filterNonStone() {
      if (this.dataFilter.valueNonStone) {
        this.dataStatus = this.dataStatus.filter(
          (obj) => obj.stone.length === 0
        );
      }
    },

    async filterStoneWaxSet() {
      if (this.dataFilter.valueWaxStone) {
        const res = await apiMpp.mppGetStoneWaxSet(this.orderNumber);
        // console.log(res);
        this.dataStatus = this.dataStatus.filter((obj) =>
          res.includes(obj.OrderItemNo)
        );
      }
    },

    showDatePickerWaxSet() {
      this.dataFilter.datePickerWaxSet.showPopup = true;
      this.dataFilter.valueWaxStone = true;
    },
    async filterDateWaxSet() {
      if (
        this.dataFilter.datePickerWaxSet.valuesBetween.length === 2 &&
        this.dataFilter.valueWaxStone === true
      ) {
        this.dataFilter.datePickerWaxSet.valueShowDate = `${this.dataFilter.datePickerWaxSet.valuesBetween[0]} ~ ${this.dataFilter.datePickerWaxSet.valuesBetween[1]}`;
        this.dataFilter.datePickerWaxSet.showPopup = false;
        let data = {
          orderNumber: this.orderNumber,
          maxDate: "",
          minDate: "",
        };
        //หาค่ามากกว่าตอนกดเลือกวันที่ เวลาพนักงานกดสลับ
        if (
          this.dataFilter.datePickerWaxSet.valuesBetween[1] >
          this.dataFilter.datePickerWaxSet.valuesBetween[0]
        ) {
          // console.log("มากกว่า");
          data.maxDate = this.dataFilter.datePickerWaxSet.valuesBetween[1];
          data.minDate = this.dataFilter.datePickerWaxSet.valuesBetween[0];
        } else {
          // console.log("น้อยกว่า");
          data.minDate = this.dataFilter.datePickerWaxSet.valuesBetween[1];
          data.maxDate = this.dataFilter.datePickerWaxSet.valuesBetween[0];
        }
        const response = await apiMpp.mppGetDateStoneWaxSet(data);
        // console.log('Filter', response);
        this.dataStatus = this.dataStatus.filter((obj) =>
          response.includes(obj.OrderItemNo)
        );
      }
    },

    showDatePickerNonWaxSet() {
      this.dataFilter.datePickerStoneNormal.showPopup = true;
    },
    async filterDateNonWaxSet() {
      if (this.dataFilter.datePickerStoneNormal.valuesBetween.length === 2) {
        this.dataFilter.datePickerStoneNormal.valueShowDate = `${this.dataFilter.datePickerStoneNormal.valuesBetween[0]} ~ ${this.dataFilter.datePickerStoneNormal.valuesBetween[1]}`;
        this.dataFilter.datePickerStoneNormal.showPopup = false;
        let data = {
          orderNumber: this.orderNumber,
          maxDate: "",
          minDate: "",
        };
        //หาค่ามากกว่าตอนกดเลือกวันที่ เวลาพนักงานกดสลับ
        if (
          this.dataFilter.datePickerStoneNormal.valuesBetween[1] >
          this.dataFilter.datePickerStoneNormal.valuesBetween[0]
        ) {
          // console.log("มากกว่า");
          data.maxDate = this.dataFilter.datePickerStoneNormal.valuesBetween[1];
          data.minDate = this.dataFilter.datePickerStoneNormal.valuesBetween[0];
        } else {
          // console.log("น้อยกว่า");
          data.minDate = this.dataFilter.datePickerStoneNormal.valuesBetween[1];
          data.maxDate = this.dataFilter.datePickerStoneNormal.valuesBetween[0];
        }
        const response = await apiMpp.mppGetDateStoneNonWaxSet(data);
        // console.log('Filter', response);
        this.dataStatus = this.dataStatus.filter((obj) =>
          response.includes(obj.OrderItemNo)
        );
      }
    },

    showDatePickerPearl() {
      this.dataFilter.datePickerPearl.showPopup = true;
    },
    async filterDatePearl() {
      if (this.dataFilter.datePickerPearl.valuesBetween.length === 2) {
        this.dataFilter.datePickerPearl.valueShowDate = `${this.dataFilter.datePickerPearl.valuesBetween[0]} ~ ${this.dataFilter.datePickerPearl.valuesBetween[1]}`;
        this.dataFilter.datePickerPearl.showPopup = false;
        let data = {
          orderNumber: this.orderNumber,
          maxDate: "",
          minDate: "",
        };
        //หาค่ามากกว่าตอนกดเลือกวันที่ เวลาพนักงานกดสลับ
        if (
          this.dataFilter.datePickerPearl.valuesBetween[1] >
          this.dataFilter.datePickerPearl.valuesBetween[0]
        ) {
          // console.log("มากกว่า");
          data.maxDate = this.dataFilter.datePickerPearl.valuesBetween[1];
          data.minDate = this.dataFilter.datePickerPearl.valuesBetween[0];
        } else {
          // console.log("น้อยกว่า");
          data.minDate = this.dataFilter.datePickerPearl.valuesBetween[1];
          data.maxDate = this.dataFilter.datePickerPearl.valuesBetween[0];
        }
        const response = await apiMpp.mppGetDatePearl(data);
        // console.log('Filter', response);
        this.dataStatus = this.dataStatus.filter((obj) =>
          response.includes(obj.OrderItemNo)
        );
      }
    },
    async getDataQueForFilter() {
      this.dataFilter.filterQue.dataSelectChoice = await apiMpp.getQueForFilter(
        this.orderNumber
      );
      // console.log(this.dataFilter.filterQue.dataSelectChoice);
    },
    filterForQue() {
      if (this.dataFilter.filterQue.dataSelected.length > 0) {
        // console.log(this.dataFilter.filterQue.dataSelected);
        this.dataStatus = this.dataStatus.filter((obj) =>
          this.dataFilter.filterQue.dataSelected.includes(obj.Piority)
        );
      }
    },
    async printMaterial() {
      this.loadPDF1 = true;
      //loadImg
      const logoHeader = await this.convertImg(
        "http://192.168.3.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
      );
      const check = await this.convertImg(
        "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MPPStatus/check.png"
      );
      const empty = await this.convertImg(
        "http://192.168.3.5:3000/picture/PICTURE2/WEB_AE/MPP/MPPStatus/empty.jpg"
      );
      const dataConvert = await apiCreatePDF.convertImgMppPrint(
        this.dataStatus
      );
      const borderColorHeader = ["#000000", "#000000", "#000000", "#000000"];
      let dataBody = [
        [
          {
            text: "รายการที่",
            alignment: "center",
            rowSpan: 2,
            style: "bgColorHeaderPrintTable",
            borderColor: borderColorHeader,
          },
          {
            text: "รหัสสินค้า",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            rowSpan: 2,
            borderColor: borderColorHeader,
          },
          {
            text: "จำนวน",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            rowSpan: 2,
            borderColor: borderColorHeader,
          },
          {
            text: "สถานะเเม่พิมพ์",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            rowSpan: 2,
            borderColor: borderColorHeader,
          },
          {
            text: "สถานะพลอย",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            colSpan: 9,
            borderColor: borderColorHeader,
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {
            text: "สถานะอะไหล่",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            colSpan: 3,
            borderColor: borderColorHeader,
          },
          {},
          {},
          {
            text: "ลำดับคิว",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            rowSpan: 2,
            borderColor: borderColorHeader,
          },
        ],
        [
          {},
          {},
          {},
          {},
          {
            text: "รหัสพลอย",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "ฝังในเทียน",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "กำหนดส่งผลิตครั้งเเรก",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "กำหนดส่งผลิตล่าสุด",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "สถานะ",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "จำนวนพลอย\nที่ใช้ทั้งหมด",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "ผลิตรับแล้ว",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "ค้างรับ",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "เหลือวัน\nกำหนดเสร็จ",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "รหัสอะไหล่",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "จำนวนอะไหล่ทั้งหมด",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "หน่วย",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {},
        ],
      ];
      dataConvert.forEach((obj, index) => {
        var vertical_center = 16;
        var vertical_center_pict = 0;
        obj.stone.length == 1
          ? (vertical_center = 16)
          : (vertical_center = (vertical_center * obj.stone.length) / 2),
          (vertical_center_pict = vertical_center - 15);

        if (obj.stone.length > 0) {
          obj.stone.forEach((dataStone, indexStone) => {
            dataBody.push([
              {
                text: obj.OrderItemNo,
                style: "rowRecode",
                rowSpan: obj.stone.length,
                margin: [0, vertical_center, 0, 0],
                headlineLevel: 1,
              }, // ItemNo
              {
                rowSpan: obj.stone.length,
                headlineLevel: 1,
                stack: [
                  {
                    image: obj.PDFPict,
                    alignment: "center",
                    width: 50,
                    margin: [0, vertical_center_pict, 0, 0],
                  },
                  {
                    text: obj.ProductCode,
                    alignment: "center",
                    style: "rowRecode",
                  },
                ],
              }, // ProductCode

              //{text: obj.ProductCode, style: 'rowRecode', rowSpan: obj.stone.length}, // ProductCode
              {
                text: obj.Qty,
                style: "rowRecode",
                alignment: "center",
                rowSpan: obj.stone.length,
                margin: [0, vertical_center, 0, 0],
                headlineLevel: 1,
              }, // จำนวนชิ้นงาน
              {
                text: obj.MoldStatusName,
                style: "rowRecode",
                rowSpan: obj.stone.length,
                margin: [0, vertical_center, 0, 0],
                headlineLevel: 1,
              }, // สถานะพิมพ์
              {
                text: dataStone.InvCode,
                style: "rowRecode",
                rowSpan: 1,
                headlineLevel: 1,
              }, // รหัสพลอย
              {
                image: dataStone.IsWaxSet == "1" ? check : empty,
                width: 10,
                style: "rowRecode",
                rowSpan: 1,
                headlineLevel: 1,
              }, // ฝังในเทียน
              {
                headlineLevel: 1,
                text: [
                  {
                    text: `(${dataStone.DowDueFacMin}) `,
                    style: "rowRecode",
                    color: "#FFAFAF",
                  },
                  {
                    text: this.convertDate(dataStone.FactDueDateMin),
                    style: "rowRecode",
                  },
                ],
              }, // กำหนดส่งผลิต
              {
                headlineLevel: 1,
                text: [
                  {
                    text: `(${dataStone.DowDueFacMin}) `,
                    style: "rowRecode",
                    color: "#FFAFAF",
                  },
                  {
                    text: this.convertDate(dataStone.FactDueDateMin),
                    style: "rowRecode",
                  },
                ],
              }, // กำหนดที่เลื่อน
              {
                text: dataStone.StoneStatus,
                style: "rowRecode",
                rowSpan: 1,
                headlineLevel: 1,
              }, // สถานะพลอย
              {
                text: dataStone.QtyStone,
                style: "rowRecode",
                rowSpan: 1,
                headlineLevel: 1,
              }, // จำนวนพลอยที่ใช้
              { text: 0, style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // ผลิตรับแล้ว
              { text: 0, style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // ค้างรับ
              {
                text: dataStone.LateDay,
                style: "rowRecode",
                rowSpan: 1,
                headlineLevel: 1,
              }, // วันเลทพลอย
              {
                text: "",
                style: "rowRecode",
                rowSpan: obj.stone.length,
                headlineLevel: 1,
              }, // รหัสอะไหล่
              {
                text: "",
                style: "rowRecode",
                rowSpan: obj.stone.length,
                headlineLevel: 1,
              }, // จำนวนอะไหล่
              {
                text: "",
                style: "rowRecode",
                rowSpan: obj.stone.length,
                headlineLevel: 1,
              }, // หน่วย
              {
                text: obj.Piority === 99 ? "ไม่ได้จัดคิว" : obj.Piority,
                style: "rowRecode",
                rowSpan: obj.stone.length,
                headlineLevel: 1,
              }, // ลำดับคิวที่
            ]);
          });
        } else {
          dataBody.push([
            {
              text: obj.OrderItemNo,
              style: "rowRecode",
              rowSpan: 1,
              margin: [0, 16, 0, 0],
              headlineLevel: 1,
            }, // ItemNo
            {
              rowSpan: obj.stone.length,
              headlineLevel: 1,
              stack: [
                {
                  image: obj.PDFPict,
                  alignment: "center",
                  width: 50,
                },
                {
                  text: obj.ProductCode,
                  alignment: "center",
                  style: "rowRecode",
                  margin: [0, 0, 0, 0],
                },
              ],
            },
            //{text: obj.ProductCode, style: 'rowRecode', rowSpan: 1}, // ProductCode
            {
              text: obj.Qty,
              style: "rowRecode",
              rowSpan: 1,
              margin: [0, 16, 0, 0],
              headlineLevel: 1,
            }, // จำนวนชิ้นงาน
            {
              text: obj.MoldStatusName,
              style: "rowRecode",
              rowSpan: 1,
              margin: [0, 16, 0, 0],
              headlineLevel: 1,
            }, // สถานะพิมพ์
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // รหัสพลอย
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // ฝังในเทียน
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // กำหนดส่งผลิต
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // กำหนดที่เลื่อน
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // สถานะพลอย
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // จำนวนพลอยที่ใช้
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // ผลิตรับแล้ว
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // ค้างรับ
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // วันเลทพลอย
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // รหัสอะไหล่
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // จำนวนอะไหล่
            { text: "", style: "rowRecode", rowSpan: 1, headlineLevel: 1 }, // หน่วย
            {
              text: obj.Piority === 99 ? "ไม่ได้จัดคิว" : obj.Piority,
              style: "rowRecode",
              rowSpan: 1,
              headlineLevel: 99,
            }, // ลำดับคิวที่
          ]);
        }
      });

      const docDefinition = {
        pageSize: "A4",
        pageOrientation: "landscape",
        pageMargins: [10, 10, 10, 10],

        content: [
          //Header Logo และ JobNumber
          {
            columns: [
              {
                image: logoHeader,
                width: 150,
                alignment: "center",
              },
            ],
          },
          " ",
          {
            text: `รายการของ Order : ${this.dataStatus[0].OrderNumber}`,
            alignment: "center",
            fontSize: 23,
            bold: true,
          },
          " ",
          {
            table: {
              // dontBreakRows:true,
              // keepWithHeaderRows: true,
              // pageBreak: 'before',
              // pageBreak: 'after',
              headerRows: 2,
              heights: 17,
              body: dataBody,
            },
            layout: {
              hLineWidth: (i, node) => {
                return i === 0 || i === node.table.body.length ? 2 : 1; // ความหนาเส้นเเนวนอน
              },
              vLineWidth: (i, node) => {
                return i === 0 || i === node.table.widths.length ? 2 : 1; // ความหนาเส้นเเนวตั้ง
              },
              hLineColor: (i, node) => {
                return i < 3 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: (i, node) => {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
        ],

        pageBreakBefore: function (
          currentNode,
          followingNodesOnPage,
          nodesOnNextPage,
          previousNodesOnPage
        ) {
          return (
            currentNode.startPosition.top >= 469 &&
            currentNode.headlineLevel === 1
          );
        },

        defaultStyle: {
          font: "Sarabun",
        },
        styles: {
          header: {
            fontSize: 10,
            bold: true,
            alignment: "center",
          },
          rowRecode: {
            fontSize: 6,
            alignment: "center",
          },
          title: {
            fontSize: 14,
            bold: true,
            alignment: "left",
            margin: [0, 20, 0, 0],
          },
          textAlign: {
            fontSize: 12,
            alignment: "left",
            margin: [20, 0, 0, 0],
          },
          marginLeft: {
            margin: [20, 0, 0, 0],
          },
          fonSize10: {
            fontSize: 10,
          },
          fonSize8: {
            fontSize: 8,
          },
          bgColorHeaderPrintTable: {
            fillColor: "#FFFDE7",
            fontSize: 7,
            bold: true,
            alignment: "center",
          },
        },
      };
      await apiCreatePDF.testNewprint(docDefinition);
      setTimeout(() => {
        this.loadPDF1 = false;
      }, 1500);
    },

    async printOrder() {
      this.loadPDF2 = true;
      //loadImg
      const logoHeader = await this.convertImg(
        "http://192.168.3.5:3000/picture/PICTURE2/Art%20Event%20Logo2.jpg"
      );

      const dataConvert = await apiCreatePDF.convertImgMppPrint(this.dataStatus);

      dataConvert.sort((a, b) =>a.Piority > b.Piority ? 1 : b.Piority > a.Piority ? -1 : 0);

      const borderColorHeader = ["#000000", "#000000", "#000000", "#000000"];

      let dataBody = [
        [
          {
            text: "รายการที่",
            alignment: "center",
            style: "bgColorHeaderPrintTable",
            borderColor: borderColorHeader,
          },
          {
            text: "รหัสสินค้า",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "จำนวน",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "สถานะเเม่พิมพ์",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
          {
            text: "ลำดับคิว",
            style: "bgColorHeaderPrintTable",
            alignment: "center",
            borderColor: borderColorHeader,
          },
        ],
      ];
      // style: "bgColorHeaderPrintTable" ,
      dataConvert.forEach((obj, index) => {
        dataBody.push([
          {
            text: obj.OrderItemNo,
            style: "rowRecode",
          }, // ItemNo
          {
            stack: [
              {
                image: obj.PDFPict,
                alignment: "center",
                width: 50,
              },
              {
                text: obj.ProductCode,
                alignment: "center",
                margin: [0, 0, 0, 0],
              },
            ],
          },
          //{text: obj.ProductCode, style: 'rowRecode', rowSpan: 1}, // ProductCode
          {
            text: obj.Qty,
            style: "rowRecode",
          }, // จำนวนชิ้นงาน
          {
            text: obj.MoldStatusName,
            style: "rowRecode",
          }, // สถานะพิมพ์
          {
            text: obj.Piority === 99 ? " " : obj.Piority,
            style: "header",
          }, // ลำดับคิวที่
        ]);
      });

      const docDefinition = {
        pageSize: "A4",
        // pageOrientation: "landscape",
        pageMargins: [10, 10, 10, 10],

        content: [
          //Header Logo และ JobNumber
          {
            columns: [
              {
                image: logoHeader,
                width: 150,
                alignment: "center",
              },
            ],
          },
          " ",
          {
            text: `รายการของ Order : ${this.dataStatus[0].OrderNumber}`,
            alignment: "center",
            fontSize: 23,
            bold: true,
          },
          " ",
          {
            table: {
              dontBreakRows: true,
              // keepWithHeaderRows: true,
              // pageBreak: 'before',
              // pageBreak: 'after',
              widths: [60, 200, 50, 100, 70],
              body: dataBody,
            },
            layout: {
              hLineWidth: (i, node) => {
                return i === 0 || i === node.table.body.length ? 2 : 1; // ความหนาเส้นเเนวนอน
              },
              vLineWidth: (i, node) => {
                return i === 0 || i === node.table.widths.length ? 2 : 1; // ความหนาเส้นเเนวตั้ง
              },
              hLineColor: (i, node) => {
                return i < 3 || i === node.table.body.length ? "black" : "gray";
              },
              vLineColor: (i, node) => {
                return i === 0 || i === node.table.widths.length
                  ? "black"
                  : "gray";
              },
            },
          },
        ],

        defaultStyle: {
          font: "Sarabun",
        },
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            alignment: "center",
            margin: [0, 10, 0, 0],
          },
          rowRecode: {
            fontSize: 12,
            alignment: "center",
            margin: [0, 15, 0, 0],
          },
          title: {
            fontSize: 14,
            bold: true,
            alignment: "left",
            margin: [0, 20, 0, 0],
          },
          textAlign: {
            fontSize: 12,
            alignment: "left",
            margin: [20, 0, 0, 0],
          },
          marginLeft: {
            margin: [20, 0, 0, 0],
          },
          fonSize10: {
            fontSize: 10,
          },
          fonSize8: {
            fontSize: 8,
          },
          bgColorHeaderPrintTable: {
            fillColor: "#FFFDE7",
            fontSize: 15,
            bold: true,
            alignment: "center",
          },
        },
      };

      await apiCreatePDF.createPDF(docDefinition);
      setTimeout(() => {
        this.loadPDF2 = false;
      }, 1500);
    },

    async convertImg(Url) {
      const result = await apiCreatePDF.convertImg(Url);
      return result;
    },

    convertDate(date) {
      moment.locale("th");
      const dateParse = new Date(date);
      return `${moment(dateParse).add(543, "year").format("L")}`;
    },

    async showDueDateDefer(Inv) {
      if (Inv.IsDefer === 1) {
        // console.log(this.orderNumber, Inv.InvCode);
        const response = await apiMpp.getHistoryDue(
          this.orderNumber,
          Inv.InvCode
        );
        this.historyDue.dataHistory = response;
        // console.log(response);
        this.historyDue.showHistoryDue = true;
      }
    },

    async openPopupPurchaseDetail(Inv) {
      this.dataPopupPurchaseDetail.dataPurchase =
        await apiMpp.getDataPurchaseDetail(this.orderNumber, Inv.InvCode);
      this.dataPopupPurchaseDetail.showPopup = true;
      console.log(this.dataPopupPurchaseDetail.dataPurchase);
    },

    // GAME
    async changeStatus(item) {
      if (this.$store.getters.policyStatusUpdate === "1") {
        this.historyShowPop = false;
        this.historyStatusMold = await apiMpp.getHistoryStatusMold(
          item.OrderNumber,
          item.OrderItemNo
        );
        this.dataItem = item;
        this.changeStatusShowPop = true;
      }
    },
    async confirmChangeStatus() {
      const getStatus_From = this.dataItem.MoldStatus.trim();
      if (getStatus_From != this.getStatus_To) {
        const result = await apiMpp.createStatusHistory(
          this.dataItem.OrderNumber,
          this.dataItem.OrderItemNo,
          this.$store.state.username,
          getStatus_From,
          this.getStatus_To
        );
        if (result.statusText == "OK") {
          this.showPage = false;
          this.snackBarUpdateSuccess = true;
          await this.loadDataDetail();
          setTimeout(() => {
            this.showPage = true;
            this.changeStatusShowPop = false;
            this.snackBarUpdateSuccess = false;
            this.filterAll();
          }, 1000);
        } else {
          await this.$swal({
            title: "Error",
            icon: "error",
            text: "Cannot be saved",
            showConfirmButton: false,
            timer: 1500,
          });
          this.showConfirmButton = false;
        }
      } else {
        await this.$swal({
          title: "คุณเลือกสถานะซ้ำเดิม",
          icon: "error",
          text: "กรุณาเลือกใหม่ !!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.changeStatusShowPop = false;
        // console.log('อิอิ')
      }
    },
  },
};
</script>

<style lang="scss" scope>
.tableMPP table th {
  font-size: 14px !important;
  font-weight: bold;
  text-align: center;
  text-justify: center;
  vertical-align: center;
  background-color: rgb(190, 353, 213);
}

.verticalTop {
  vertical-align: text-top;
}

.verticalCenter {
  vertical-align: middle;
}

.bgColorTestSlot {
  background-color: rgb(355, 0, 0);
}

.bgColorStoneTable {
  background-color: #ffcdd2;
}
</style>
