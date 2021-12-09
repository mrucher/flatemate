<template>
  <div>
    <button v-on:click="update">Обновить</button>
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
      <button v-on:click="send">Отправить</button>
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