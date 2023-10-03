<template>
  <div class="container">
    <MyHeader/>
    <PorductList/>
  </div>
</template>

<script setup>
  import PorductList from "./components/PorductList.vue";
  import MyHeader from "./components/MyHeader.vue";



</script>

<style lang="scss">
  .container{
    margin: 0 auto;
    width: 1100px;
  }
  button:hover{
    cursor: pointer;
  }
  button{
    border: none;
    background: transparent;
    &:hover{
      cursor: pointer;
    }
    &:focus{
      border: none;
      outline: none;
    };
  }
  input{
    background: transparent;
    outline: none;
    border: none;
  }
</style>
