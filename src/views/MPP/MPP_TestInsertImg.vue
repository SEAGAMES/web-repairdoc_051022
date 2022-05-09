<template>
  <v-container grid-list-xs>
    <v-form>
      <!-- <input @change="onFileSelected" type="file" name="" id="" /> -->
      <!-- <v-file-input
        v-model="values"
        show-size
        truncate-length="15"
        ></v-file-input> -->
        <image-uploader
          :debug="1"
          :maxWidth="360"
          :quality="0.7"
          :autoRotate=true
          outputFormat="verbose"
          :preview=false
          :className="['fileinput', { 'fileinput--loaded' : hasImg }]"
          :capture="false"
          accept="video/*,image/*"
          doNotResize="['gif', 'svg']"
          @input="setImage"
        ></image-uploader>

        
      <br />
      <v-img v-if="imageURL" :src="imageURL" width="300" class="mt-3"></v-img>
      <v-btn color="success" @click="testPic()">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import apiCreatePDF from '../../services/apiCreatePDF';
import ImageUploader from 'vue-image-upload-resize'

export default {
  name: "mpp-testinsertimg",
  data() {
    return {
      imageURL: null,
      values: null,
      hasImg: false,
    };
  },
  components: {
    ImageUploader
  },
  methods: {
    async onFileSelected(event) {
        console.log(event)
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        // สำหรับแสดงผลหน้าจอ ค่าที่ได้เป็น BASE64
        this.imageURL = event.target.result;
      };
    //   // สำหรับบันทึก
    //     const picture = event.target.files[0];
    //     console.log('type', picture);

    //   setTimeout(() => {
    //     console.log('Base64 ?', this.imageURL);
    //   }, 500);
    },
    async submit() {
        // console.log(this.imageURL);
        // if(this.imageURL) {
        //     const res = await apiCreatePDF.testInsertImg(this.imageURL);
        //     console.log(res);
        // }
    },
    async testPic() {
      const reader = new FileReader();
      reader.readAsDataURL(this.values);
      reader.onload = (event) => {
        // สำหรับแสดงผลหน้าจอ ค่าที่ได้เป็น BASE64
        this.imageURL = event.target.result;
      };
      // สำหรับบันทึก
        // const picture = event.target.files[0];
        // console.log('type', picture);

      setTimeout(() => {
        console.log('Base64 ?', this.imageURL);
      }, 500);
    },

      setImage(output) {
      this.hasImg = true;
      this.imageURL = output.dataUrl;
      console.log('Info', output.info)
      console.log('Exif', output.exif)
      console.log('Img', this.imageURL);
    }


  },
};
</script>

<style>
</style>