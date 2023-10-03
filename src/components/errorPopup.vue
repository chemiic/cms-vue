<template>
  <div class="error-wrapper" @click.self.prevent="emitOnError">
    <div class="error-content">
      <button class="modal-close" @click.prevent="emitOnError">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
          <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </button>

      <svg width="94" height="94" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2L92 92" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
        <path d="M2 92L92 2" stroke="#D80101" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <p>Что-то пошло не так</p>
    </div>
  </div>

</template>

<script setup>
  const emit = defineEmits(['OnError'])
  const emitOnError = () =>{
    emit('OnError')
  }

</script>

<style scoped lang="scss">

  .error-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255, .7);
    z-index: 99;
  }
  .error-content{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 350px;
    height: 350px;
    background: #F2F0F9;
    margin: auto;
    padding: 25px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    & p {
      text-transform: uppercase;
      font-size: 18px;
      font-weight: 600;
      color: #6E6893;
      }
  }

  .modal-close{
    position: absolute;
    right: 25px;
    top: 25px;
  }
</style>