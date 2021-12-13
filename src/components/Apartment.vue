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
            <li>Цена: {{ apartment.price }}</li>
            <button v-on:click="viewApart(apartment.id)">Обзор</button>
<!--            <router-link :to="{path: '/apartment/' + apartment.id }">Обзор</router-link>-->
          </ul>

        </div>
      </div>
<!--      <div v-if="isId">-->

<!--        <GoogleMap :locationProp=locat />-->
<!--        <ApartmentFeedback :id=id>-->

<!--        </ApartmentFeedback>-->
<!--        <router-link :to="{path: '/landlord/' + login}">Назад</router-link>-->
<!--      </div>-->
    </div>
    <div v-if="isView">
      <ul>
        <li>ID {{ viewApartment.id }}</li>
        <li>Количество комнат: {{ viewApartment.roomsCount }}</li>
        <li>Количество жильцов: {{ viewApartment.lodgerCount }}</li>
        <li>Адрес: {{ viewApartment.address }}</li>
        <li>Цена: {{ viewApartment.price }}</li>
        <div v-if="login==='admin'">
          <button v-on:click="deleteAparts(viewApartment.id)">Удалить</button>
        </div>
      </ul>
      <ApartmentFeedback :id=id>

      </ApartmentFeedback>
      <button v-on:click="closeApart">Назад</button>
      <GoogleMap :locationProp=viewApartment.location />

    </div>


  </div>
</template>

<script>
import * as Utils from '../js/utils.js'
import ApartmentFeedback from "@/components/ApartmentFeedback";
import GoogleMap from './GoogleMap.vue'

export default {
  name: "Apartment",
  components: {
    ApartmentFeedback,
    GoogleMap
  },
  props: {
    message: String,
  },
  data() {
    return {
      isNotFullData: false,
      isShow: true,
      isView: false,
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
      apartmentsTmp: [],
      users: [],
      viewApartment: undefined,
      login: undefined,
      id: undefined,
      feedbacks: [],
      locat: undefined //для передачи в карту
    }
  },
  methods: {
    viewApart: function (id) {
      this.isView = true
      this.apartmentsTmp = this.apartments
      // this.viewApart = this.apartments.filter(this.apartments.id === id)
      this.viewApartment = this.apartments.find(function(item) {
        return item.id === id
      });
      this.apartments = []
    },
    closeApart: function () {
      this.isView = false
      this.apartments = this.apartmentsTmp
      this.viewApartment = undefined
      this.apartmentsTmp = []
    },
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
    deleteAparts: function (id){
      Utils.deleteAparts(id)
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
    // this.isId = this.$route.params.id !== undefined
    // this.getApartments()
    this.login = this.$route.params.login
    // console.log(this.login)
    if (this.login !== undefined) {

      // this.getFeedbacks()
      Utils.getUserByLogin(this, this.login, true )
      this.isShow = false
    }
  },
}
</script>

<style scoped>

</style>