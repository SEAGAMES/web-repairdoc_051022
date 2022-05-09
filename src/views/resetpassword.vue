<template>
  <v-container grid-list-xs>
    <v-row class="justify-center mt-1">
      <v-card style="width: 600px" class="cardColor">
        <v-card-title primary-title color="grey">
          เปลี่ยนรหัสผ่านโปรแกรม
        </v-card-title>

        <v-card-text>
          <v-form>
            <!-- username -->
            <v-row align="center">
              <v-col cols="4" class="mt-n8 ml-10">
                <div>กรุณาใส่รหัสพนักงาน</div>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="รหัสพนักงาน"
                  outlined
                  v-model="dataForm.username"
                  :disabled="!showStep1"
                  dense
                  class="ml-n10"
                  type="number"
                  color="blue"
                  :rules="usernameRules"
                  autofocus
                />
              </v-col>
            </v-row>

            <!-- password -->
            <v-row align="center">
              <v-col cols="4" class="mt-n8 ml-10">
                <div>กรุณาใส่รหัสผ่านเก่า</div>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="รหัสผ่านเก่า"
                  type="password"
                  outlined
                  v-model="dataForm.passwordOld"
                  :disabled="!showStep1"
                  dense
                  class="ml-n10"
                  color="blue"
                  :rules="passwordRules"
                />
              </v-col>
              <v-col>
                <v-btn
                  color="red"
                  plain
                  :disabled="!showStep1"
                  class="mt-n6 ml-n10"
                  @click="popupForgotpassword.showPop = true"
                  >ลืมรหัสผ่าน</v-btn
                >
              </v-col>
            </v-row>

            <!-- button step1 -->
            <v-row
              class="justify-space-between px-5 mb-1 mt-1"
              v-if="showStep1"
            >
              <v-btn color="grey" plain @click="returnClose"> กลับ </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="blue"
                dark
                @click="confirmCheckPassword()"
                :loading="waitCheckPassword"
              >
                ยืนยัน
              </v-btn>
            </v-row>

            <!-- เส้น -->
            <v-divider class="ma-2" v-if="showStep2"></v-divider>

            <v-row>
              <v-col
                cols="12"
                v-if="waitCheckPassword"
                width="300"
                height="300"
              >
                <PulseLoader
                  justify="center"
                  align="center"
                  :loading="waitCheckPassword"
                  class="mt-5"
                />
              </v-col>
            </v-row>

            <!-- new password -->
            <v-row class="mt-5" v-if="showStep2" align="center">
              <v-col cols="4" class="mt-n8 ml-10">
                <div>กรุณาใส่รหัสผ่านใหม่</div>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  name="password_new"
                  label="รหัสผ่านใหม่"
                  id="password_new"
                  outlined
                  v-model="dataForm.passwordNew"
                  dense
                  class="ml-n10"
                  type="password"
                  color="green"
                  counter
                  :rules="passwordRules2"
                />
              </v-col>
            </v-row>

            <!-- password_verify -->
            <v-row v-if="showStep2" align="center">
              <v-col cols="4" class="mt-n8 ml-10">
                <div>ยืนยันรหัสผ่าน</div>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  name="password_verify"
                  label="ยืนยันรหัสผ่าน"
                  id="password_verify"
                  outlined
                  v-model="dataForm.passwordVerify"
                  dense
                  class="ml-n10"
                  color="green"
                  type="password"
                  :disabled="dataForm.passwordNew.length < 4"
                  counter
                  :rules="passwordRules2"
                />
              </v-col>
            </v-row>

            <v-row
              class="justify-space-between px-5 mb-1 mt-1"
              v-if="showStep2"
            >
              <v-btn color="grey" plain @click="returnClose"> กลับ </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                @click="submitPassword"
                :loading="loadingBtn"
              >
                ยืนยัน
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>

        <!-- POPUP FORGETAPASSWORD -->
        <v-dialog v-model="popupForgotpassword.showPop" max-height="400" max-width="500" class="fontPrompt">
          <v-form class="fontPrompt">
            <v-card class="pa-5">
              <v-row>
                <v-col>
                  <div class="fontSarabun fontSize20"> <b>สร้างใบแจ้งแผนกไอทีเพื่อรีเซ็ทรหัสผ่าน</b>  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="รหัสพนักงาน"
                    outlined
                    required
                    type="number"
                    dense
                    v-model="popupForgotpassword.valuesForm.username"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="โทรติดต่อ"
                    type="number"
                    dense
                    outlined
                    required
                    v-model="popupForgotpassword.valuesForm.tel"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row v-if="error.length" class="ml-5 mr-5 mt-n5">
                <p >
                <b class="red--text fontSiz16">Please correct the following error</b>
                <ul>
                  <li v-for="error in error" :key="error.index" class="red--text"> <span class="fontSize14">{{ error }}</span> </li>
                </ul>
              </p>
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn plain  @click="popupForgotpassword.showPop = false">Cancel</v-btn>
                <v-btn plain color="red" @click="forgotPassword()" :loading="popupForgotpassword.waitSubmit">Confirm</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-card>
    </v-row>

    <!-- snackbar -->
    <div align="center">
      <v-snackbar
        v-model="showDeniedStep1"
        width="1000"
        align="center"
        timeout="2000"
      >
        <div class="fontPrompt fontSize18 text-center">
          <v-icon color="red">mdi-close-circle</v-icon>
          รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง
        </div>
      </v-snackbar>

      <v-snackbar
        v-model="verifyPasswordFailed"
        width="1000"
        align="center"
        timeout="5000"
        class="fontSarabun"
      >
        <div class="fontPrompt fontSize18 text-center">
          <v-icon color="red">mdi-close-circle</v-icon>
          รหัสผ่านไม่ตรงกัน
        </div>
      </v-snackbar>

      <v-snackbar
        v-model="snackBarUpdateSuccess"
        width="1000"
        align="center"
        timeout="5000"
        class="fontSarabun"
        color="green"
      >
        <div class="fontPrompt fontSize18 text-center">
          <v-icon color="white">mdi-shield-check</v-icon>
          อัพเดทสำเร็จแล้ว
        </div>
      </v-snackbar>

      <v-snackbar
        v-model="popupForgotpassword.success"
        width="1000"
        align="center"
        timeout="4000"
        class="fontSarabun"
        color="green"
      >
        <div class="fontPrompt fontSize18 text-center">
          <v-icon color="white">mdi-shield-check</v-icon>
          แจ้งขอรีเซ็ทรหัสแล้วโปรดรอ IT ติดต่อกลับ
        </div>
      </v-snackbar>

      <v-snackbar
        v-model="verifyPasswordFailed"
        width="1000"
        align="center"
        timeout="5000"
        class="fontSarabun"
      >
        <div class="fontPrompt fontSize18 text-center">
          <v-icon color="red">mdi-close-circle</v-icon>
          โปรดระบุรหัสพนักงานก่อน
        </div>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
import api from "../services/api";
import apiRepairDoc from "../services/apiRepairDoc";
import PulseLoader from "../components/Loadings/PulseLoader.vue";

export default {
  name: "resetpassword",
  data() {
    return {
      showOldPassword: false,
      showNewPassword: false,
      loadingStep1: false,
      showStep1: true,
      showStep2: false,
      showDeniedStep1: false,
      verifyPasswordFailed: false,
      waitCheckPassword: false,
      loadingBtn: false,
      snackBarUpdateSuccess: false,
      dataForm: {
        username: "",
        passwordOld: "",
        passwordNew: "",
        passwordVerify: "",
      },
      usernameRules: [(v1) => !!v1 || "Username is required"],
      passwordRules: [(v1) => !!v1 || "Password is required"],
      passwordRules2: [
        (v1) => !!v1 || "Password is required",
        (v2) => v2.length >= 4 || "Minimum four characters",
      ],
      floor: [],
      room: [],
      error: [],
      popupForgotpassword: {
        showPop: false,
        valuesForm: {
          username: "",
          tel: "",
        },
        waitSubmit: false,
        success: false
      },
    };
  },
  components: {
    PulseLoader,
  },
  methods: {
    async loadDataFormForgetPassword() {
      // await this.$store.dispatch("loadFormDevice");
      // this.floor = this.$store.getters.formDeviceFloor;
      // this.room = this.$store.getters.formDeviceRoom;
      // console.log(this.floor, this.room);
    },
    returnClose() {
      this.$emit("returnClose", true);
    },
    async confirmCheckPassword() {
      if (
        this.dataForm.username.length > 3 &&
        this.dataForm.passwordOld !== ""
      ) {
        this.waitCheckPassword = true;
        const result = await api.checkPassword({
          username: this.dataForm.username,
          password: this.dataForm.passwordOld,
        });
        setTimeout(() => {
          this.waitCheckPassword = false;
          if (result === true) {
            this.showStep2 = true;
            this.showStep1 = false;
          } else {
            this.showDeniedStep1 = true;
          }
        }, 2500);
      }
    },
    async submitPassword() {
      //
      if (
        this.dataForm.passwordNew === this.dataForm.passwordVerify &&
        this.dataForm.passwordNew !== ""
      ) {
        this.loadingBtn = true;
        // console.log(true);
        const result = await api.confirmUpdatePassword(this.dataForm);
        // console.log(result);
        if (result === "ok") {
          this.snackBarUpdateSuccess = true;
        }
        setTimeout(() => {
          this.loadingBtn = false;
          this.$emit("returnClose", true);
          this.snackBarUpdateSuccess = false;
        }, 3000);
      } else {
        // console.log('รหัสผ่านไม่ตรงกัน');
        this.dataForm.passwordNew = "";
        this.dataForm.passwordVerify = "";
        this.verifyPasswordFailed = true;
      }
    },
    async forgotPassword() {
      if (this.checkError() === true) {
        // console.log('go');
        this.popupForgotpassword.waitSubmit = true;
        const createBillRepair = {
          JobTypeCode: "01",
          CategoryCode: "A5",
          FloorCode: "",
          RoomCode: "",
          DeviceNo: null,
          ContactPerson: this.popupForgotpassword.valuesForm.username,
          Tel: this.popupForgotpassword.valuesForm.tel,
          DueDate: new Date(),
          BrokenDes: `ลืมรหัสผ่านเข้าโปรแกรม รหัสพนักงาน: ${this.popupForgotpassword.valuesForm.username}`,
          RepairDes: null,
          RepairPrice: 0,
          PartPrice: 0,
          Status: "0",
          ApprovStatus: "0",
        };
        // console.log(createBillRepair)
        const result = await apiRepairDoc.createRepairDoc(createBillRepair);
        // console.log(result);
        if(result === 'ok') {
          setTimeout(async () => {
            this.popupForgotpassword.success = true;
            this.popupForgotpassword.waitSubmit = false;
            this.popupForgotpassword.showPop = false;
            setTimeout(() => {
              this.$emit("returnClose", true);
            }, 1000);
          }, 1500);
          
        }
      }

    },
    checkError() {
      this.error = [];
      if (
        this.popupForgotpassword.valuesForm.username.length === 4 &&
        this.popupForgotpassword.valuesForm.tel.length === 3
      ) {
        return true;
      } else {
        // console.log(
        //   this.popupForgotpassword.valuesForm.username.length,
        //   this.popupForgotpassword.valuesForm.tel.length
        // );
        if (this.popupForgotpassword.valuesForm.username.length !== 4) {
          this.error.push("กรุณากรอกรหัสพนักงานให้ถูกต้อง");
        }
        if (this.popupForgotpassword.valuesForm.tel.length !== 3) {
          this.error.push("กรุณากรอกเบอร์โทรติดต่อให้ถูกต้อง");
        }
        return false;
      }
    },
  },
};
</script>

<style scope>
.bgColorInput {
  background-color: rgb(253, 28, 28);
}
</style>