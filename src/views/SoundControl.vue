<template>
  <v-container grid-list-xs class="fontPrompt">
    <v-row>
      <v-spacer></v-spacer>
      <v-card width="600" class="pb-5">
        <v-card-title primary-title>
          <div>
            <h2 class="headline; mb-0; fontPrompt">เปิดและปิด AMP</h2>
            <h6 class="ml-1; fontPrompt">
              เปิด! เมื่อต้องการประกาศเสียงตามสาย และอย่าลืมปิดด้วยทุกครั้ง
            </h6>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" fab x-large   @click="powerOn" :disabled=" $store.getters.policyCode !== '03' && $store.getters.policyCode !== '05' ">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" fab x-large   @click="powerOff" :disabled=" $store.getters.policyCode !== '03' && $store.getters.policyCode !== '05'">
            <v-icon>power_off</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
      <v-spacer></v-spacer>
    </v-row>

    <v-row>
      <v-spacer></v-spacer>
      <v-card width="600" class="mt-10">
        <v-card-title primary-title>
          <div>
            <h2 class="headline; mb-0; fontPrompt">ปรับเสียงอัตโนมัติ</h2>
            <h6 class="ml-1">
              ปรับเฉพาะเสียงที่เปิดจากการเล่นอัตโนมัติเท่านั้น
            </h6>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-slider
            v-model="value"
            step="10"
            thumb-label
            ticks
            @change="changeVol"
            label="Volumn"
            color="red"
          ></v-slider>
        </v-card-actions>
      </v-card>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "sound-control",
  data() {
    return {
      checkOn: false,
      value: 0,
      getVolumn: 0
    };
  },
 async mounted() {
    this.getVol();
  },
  methods: {
    testvolumn() {
      console.log(this.value);
    },
    async turnOn() {
      // await this.$mqtt.publish('ae_iot/sound', '{"msg": "getVol"}');
    },
    async changeVol() {
      console.log('เก่า', getVolumn);
      // await this.$mqtt.publish('ae_iot/sound', `{"msg": "v${this.value}"}`);
      // await this.getVol();
      // await this.getVol();
      // console.log('ใหม่', getVolumn);
    },
    async getVol() {
      let value = {
        command: "getVolume"
      }
      // console.log(JSON.parse(JSON.stringify(value)))
      await this.$mqtt.publish('ae_iot/sound', JSON.stringify(value));
      await this.$mqtt.subscribe('ae_iot/sound/return');
    },
    async powerOn() {
      let value = {
        command: "on"
      }
      // console.log(JSON.parse(JSON.stringify(value)))
      await this.$mqtt.publish('ae_iot/sound', JSON.stringify(value));
    },
    async powerOff() {
      let value = {
        command: "off"
      }
      // console.log(JSON.parse(JSON.stringify(value)))
      await this.$mqtt.publish('ae_iot/sound', JSON.stringify(value));
    },
  },
  mqtt: {
    'ae_iot/sound/return' (data) {
      let Volumn = Number(String.fromCharCode.apply(null, data))
      // this.value = Volumn;
      // this.getVolumn = Volumn;
      console.log('นี้คือ DATA', Volumn)
    } 
  },
};
</script>

<style>
</style>