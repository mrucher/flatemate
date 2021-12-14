<template>
  <div id='AddApartment'>
    <span>Введите данные</span>
    <br>
    <input v-model="roomsCount" placeholder="Количество комнат">
    <br>
    <input v-model="lodgerCount" placeholder="Количество жильцов">
    <br>
    <input v-model="address" placeholder="Адрес">
    <br>
    <input v-model="price" placeholder="Цена">
    <br>
    <input type="file" @change="encodeImageFileAsURL" />
    <br>
<!--    <GoogleMap @updateParent="onUpdateAddress"/>-->
    <GoogleMap />
    <button v-on:click="send">Отправить</button>
    <br>
    <router-link :to="{path: '/user/'}">Назад</router-link>
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
      imgType:undefined,
      locat: undefined
    }
  },
  components: {
    GoogleMap
  },
  methods: {

    send: function (){
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
      reader.onloadend = function() {
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