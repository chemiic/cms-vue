<template>
  <header>
    <h1 class="title">CMS</h1>
    <p>Итоговая стоимость <span>${{productStore.products.reduce((acc, item) => acc + (item.price * item.count), 0)}}</span> </p>
  </header>
</template>
<script setup>

import {UseProductStore} from "../store/store.js";
const productStore = UseProductStore()
</script>

<style>
  header{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #C6C2DE;
  }
  .title{
    font-size: 24px;
    font-weight: bold;
    color: #6E6893;
  }
  span{
    color: #6D5BD0;
    font-size: 18px;
    font-weight: bold;
  }
</style>