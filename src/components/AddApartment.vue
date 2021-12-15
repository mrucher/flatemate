<template>
  <div id='AddApartment'>
    <div class="content">
      <h4>Введите данные</h4>
      <b-form-input v-model="roomsCount" placeholder="Количество комнат"></b-form-input>
      <b-form-input v-model="lodgerCount" placeholder="Количество жильцов"></b-form-input>
      <b-form-input v-model="address" placeholder="Адрес"></b-form-input>
      <b-form-input v-model="price" placeholder="Цена"></b-form-input>
      <b-form-file class="mt-3" plain

          @change="encodeImageFileAsURL"> </b-form-file>
      <br>
      <br>

      <!--    <GoogleMap @updateParent="onUpdateAddress"/>-->
      <GoogleMap/>
      <br>
      <b-button v-on:click="send">Отправить</b-button>
      <br>
      <b-link :to="{path: '/user/'}">Назад</b-link>
    </div>
  </div>
</template>


<script>
import * as Utils from "@/js/utils";
import GoogleMap from './GoogleMap.vue'

export default {
  name: "AddApartment",
  data() {
    return {
      roomsCount: undefined,
      lodgerCount: undefined,
      address: undefined,
      price: undefined,
      users: [],
      coords: {},
      img: undefined,
      imgType: undefined,
      locat: undefined
    }
  },
  components: {
    GoogleMap
  },
  methods: {

    send: function () {
      if (this.roomsCount !== undefined && this.lodgerCount !== undefined
          && this.address !== undefined && this.price !== undefined) {
        alert(this.img)
        let apart = {
          roomsCount: Number(this.roomsCount),
          lodgerCount: Number(this.lodgerCount),
          address: this.address,
          price: Number(this.price),
          active: true,
          location: {
            x: this.locat.lat,
            y: this.locat.lng
          },
          photos: [
            {
              photo: this.img
            }
          ]
          // location: this.location
        }
        let json = JSON.stringify(apart);
        // console.log(json)
        // Utils.getUserByLogin(this, sessionStorage.getItem("login"))


        Utils.postApartment(this, json)

      } else {
        alert("Введены не все данные")
      }
    },
    encodeImageFileAsURL: function () {
      let element = event.target
      var file = element.files[0];
      var reader = new FileReader();
      let that = this
      reader.onloadend = function () {
        // console.log('RESULT', reader.result)
        let res = reader.result.replace(/^data:image\/(png|jpg|gif);base64,/, "")
        let regexp = /(png|jpg|gif)/;
        let tmp = regexp.exec(reader.result)
        that.img = res
        that.imgType = tmp
        console.log(tmp[0])
        console.log(this.img)
        // console.log(res.replace(/^data:image\/(png|jpg|gif);base64,/, "") )
        // var image = new Image();
        // image.src = 'data:image/gif;base64,'+res;
        // document.body.appendChild(image);
      }
      reader.readAsDataURL(file);
    }
  },
  onUpdateAddress: function () {
    // this.address = localStorage.getItem("adress")
    // this.coords = {
    //   x: localStorage.getItem("adress"),
    //   y: localStorage.getItem("adress")
    // }
  },
  mounted() {

  }
}
</script>


<style scoped>

</style>