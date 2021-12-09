<template>
  <div id='Apartment'>
    <div v-if="isShow">
      <span>Введите данные</span>
      <br>
      <input v-model="maxPrice" placeholder="Максимальная цена">
      <br>
      <input v-model="rooms" placeholder="Количество комнат">
      <br>
      <input v-model="lodgers" placeholder="Количество жильцов">
      <br>
      <button v-on:click="loadAparts">Отправить</button>
    </div>
    <div v-else>
      <div v-if="isId">
        <h4>Квартира:</h4>
      </div>
      <div v-else>
        <h4>Квартиры:</h4>
      </div>
      <div>
        <div v-for="apartment in apartments" v-bind:key="apartment.id">
          <ul>
            <li>ID {{ apartment.id }}</li>
            <li>Количество комнат: {{ apartment.roomsCount }}</li>
            <li>Количество жильцов: {{ apartment.lodgerCount }}</li>
            <li>Адрес: {{ apartment.address }}</li>
            <li>Геопозиция: {{ apartment.location }}</li>
            <li>Цена: {{ apartment.price }}</li>
            <router-link :to="{path: '/apartment/' + apartment.id }">Обзор</router-link>
          </ul>

        </div>
      </div>
      <div v-if="isId">
        <ApartmentFeedback :id=id>

        </ApartmentFeedback>
        <router-link :to="{path: '/landlord/' + login}">Назад</router-link>
      </div>
    </div>


  </div>
</template>

<script>
import * as Utils from '../js/utils.js'
import ApartmentFeedback from "@/components/ApartmentFeedback";

export default {
  name: "Apartment",
  components: {ApartmentFeedback},
  props: {
    message: String,
  },
  data() {
    return {
      isNotFullData: false,
      isShow: true,
      roomsCount: undefined,
      lodgerCount: undefined,
      address: undefined,
      price: undefined,
      location: undefined,
      maxPrice: undefined,
      rooms: undefined,
      lodgers: undefined,
      isId: Boolean,
      apartments: [],
      login: undefined,
      id: undefined,
      feedbacks: []
    }
  },
  methods: {
    getApartments: function () {
      // console.log(this.$route.params.id)
      Utils.getApartments(this, this.$route.params.id)
    },
    getFeedbacks: function () {
      Utils.getFeedbacks(this, this.id)
    },
    update: function () {
      this.isShow = !this.isShow;
    },
    loadAparts: function () {
      if (this.maxPrice !== undefined && this.lodgers !== undefined && this.rooms != undefined) {
        Utils.getApartmentsFilter(this, this.rooms, this.lodgers, this.maxPrice)
        this.isShow = false
      } else {
        alert("Введены не все данные")
      }
    }

  },
  mounted() {
    this.isId = this.$route.params.id !== undefined
    // this.getApartments()
    this.login = sessionStorage.getItem("login")
    if (this.isId) {

      // this.getFeedbacks()
      this.getApartments()
      this.id = this.$route.params.id
      this.isShow = false
    }
  },
  beforeRouteLeave(to, from, next) {
    this.apartments = []
    next()
  },
  beforeRouteUpdate(to, from, next) {
    this.getApartments()
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.apartments = [];
      vm.isId = vm.$route.params.id !== undefined
      console.log(vm.isId)
    })
  }

}
</script>

<style scoped>

</style>