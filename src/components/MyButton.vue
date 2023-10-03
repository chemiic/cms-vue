<template>
  <button class="btn">
    <slot/>
  </button>
</template>


<style scoped lang="scss">
  .btn{
    background: #6D5BD0;
    border-radius: 6px;
    border: 1px solid #6D5BD0;
    font-size: 16px;
    padding: 10px 15px;
    color: #fff;
    transition: all 0.2s;
    text-transform: uppercase;
  &:hover{
     background: transparent;
     color: #6D5BD0;
   }
  }
</style>