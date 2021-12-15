<template>
  <div>
    <b-button v-on:click="update">Обновить</b-button>
    <div v-if="isShow">
      {{ message }}
    </div>
    <div v-else>
      <span>Введите данные</span>
      <br>
      <input v-model="value" placeholder="Оценка">
      <br>
      <input v-model="feedback" placeholder="Отзыв">
      <br>
      <b-button v-on:click="send">Отправить</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RenterFeedback",
  props: {
    message: String
  },
  data() {
    return {
      isShow: true,
    }
  },
  methods: {
    update: function () {
      this.isShow = !this.isShow;
    },
    send: function () {
      console.log(this.value);
    }
  },
}
</script>

<style scoped>

</style>