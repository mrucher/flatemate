<template>
  <div id='apart'>
    <div>
      <div v-for="apartment in apartments" v-bind:key="apartment.id">
        <ul>
          <li>ID {{ apartment.id }}</li>
          <li>Количество комнат: {{ apartment.roomsCount }}</li>
          <li>Количество жильцов: {{ apartment.lodgerCount }}</li>
          <li>Адрес: {{ apartment.address }}</li>
          <li>Геопозиция: {{ apartment.location }}</li>
          <li>Цена: {{ apartment.price }}</li>
        </ul>
        <router-link :to="{path: '/apartment/' + apartment.id }">Обзор</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Apart",
  props: {
    apartments: []
  }
}
</script>

<style scoped>

</style>