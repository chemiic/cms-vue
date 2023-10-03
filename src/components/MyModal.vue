<template>
  <div class="modal-wrapper" @click.self.="emitOnClose">
    <div class="modal">
      <div class="modal-head">
        {{props.edit ? 'Именить товар:' : 'Добавить Товар'  }}
        <button class="modal-close" @click.prevent="emitOnClose">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L22 22" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
            <path d="M2 22L22 2" stroke="#6E6893" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </button>

      </div>
      <form class="form">
        <div class="form-content">
          <div class="form-side">
            <div class="input-wrapper">
              <label for="name">Наименование</label>
              <input
                  type="text"
                  name="nameInput"
                  v-model="nameInput"
                  id="name"
                  :required="true"
              >
            </div>
            <div class="input-wrapper">
              <label for="category">Категория</label>
              <input
                  type="text"
                  name="categoryInput"
                  id="categorye"
                  v-model="categoryInput"
                  :required="true"
              >
            </div>
            <div class="input-wrapper">
              <label for="dimension">Единицы Измерения</label>
              <input
                  type="text"
                  name="dimensionInput"
                  id="dimension"
                  v-model="dimensionInput"
                  :required="true"
              >
            </div>
            <div class="input-wrapper">
              <label for="discount">Дисконт</label>
              <div class="discount-wrapper">
                <input type="checkbox"
                       v-model="checkInput"
                       class="discount-check css-checkbox"
                       id="checkbox1"
                >
                <input
                    type="number"
                    name="discountInput"
                    id="discount"
                    v-model="discountInput"
                    :disabled='!checkInput'
                    :max="99"
                    :required="true"
                >
              </div>
            </div>
          </div>
          <div class="form-side">
            <div class="input-wrapper">
              <label for="description">Описание</label>
              <textarea
                  type="text"
                  name="descriptionInput"
                  id="description"
                  v-model="descriptionInput"
                  :required="true"
              ></textarea>
            </div>
            <div class="input-wrapper">
              <label for="quantity">Количество</label>
              <input
                  type="number"
                  name="quantityInput"
                  id="quantity"
                  v-model="quantityInput"
                  :required="true"
              >
            </div>
            <div class="input-wrapper">
              <label for="price">Цена</label>
              <input
                  type="number"
                  name="priceInput"
                  id="price"
                  v-model="priceInput"
                  :required="true"
              >
            </div>
            <MyButton
              class="add-img"
            >
              Добавить Изображение
            </MyButton>
          </div>
        </div>
        <div class="form-footer">
          <p>Итоговая стоисость <span>$ {{
              discountInput=='' ? priceInput * quantityInput : priceInput * quantityInput - ((priceInput*quantityInput) *discountInput / 100)   }}
          </span></p>

          <MyButton
              @click.prevent="formValid"
          >Добавить Товар
          </MyButton>

        </div>
      </form>
    </div>
    <ErrorPopup
      v-show="IsErrorActive"
      @OnError="IsErrorActive = false"
    />
  </div>
</template>

<script setup>
import MyButton from "./MyButton.vue";
import {onMounted, ref} from "vue";
import {UseProductStore} from "../store/store.js";
import ErrorPopup from "./errorPopup.vue";

const productStore = UseProductStore()
const props = defineProps({
  itemForEdit: Number,
  edit: Boolean,
  itemForEditData: {
    id: Number,
    title: String,
    category: String,
    units: String,
    count: Number,
    price: Number,
    total: Number,
    discount: Number,
    image: String
  }
})

const emit = defineEmits(['OnClose'])
const emitOnClose = () =>{
  emit('OnClose')
}
const IsErrorActive = ref(false)

const checkInput = ref(false)
const nameInput = ref('')
const categoryInput = ref('')
const dimensionInput = ref(0)
const quantityInput = ref(0)
const priceInput = ref(0)
const discountInput = ref(0)
const descriptionInput = ref('')


const formValid = () => {
  const total = discountInput.value == '' ? priceInput.value * quantityInput.value : priceInput.value * quantityInput.value - ((priceInput.value*quantityInput.value) *discountInput.value / 100)

  if (nameInput.value == '' || categoryInput.value == '' || quantityInput.value == '' || priceInput.value =='' ){
    IsErrorActive.value = true
  } else {
    if (props.edit){
      productStore.editProduct(
          props.itemForEdit,
          nameInput.value,
          categoryInput.value,
          dimensionInput.value,
          quantityInput.value,
          priceInput.value,
          descriptionInput.value,
          discountInput.value
      )
      emitOnClose()
    } else {
          productStore.addProduct(
          nameInput.value,
          categoryInput.value,
          dimensionInput.value,
          quantityInput.value,
          priceInput.value,
          descriptionInput.value,
          discountInput.value
      )
      emitOnClose()
    }
  }
}


onMounted(()=> {
  if (props.edit == true){
    nameInput.value = props.itemForEditData.title
    categoryInput.value = props.itemForEditData.category
    discountInput.value = props.itemForEditData.discount
    quantityInput.value = props.itemForEditData.count
    priceInput.value = props.itemForEditData.price
    dimensionInput.value = props.itemForEditData.units
    descriptionInput.value = props.itemForEditData.description
  } else {
    checkInput.value = false;
    nameInput.value = ''
    categoryInput.value = ''
    discountInput.value = 0
    quantityInput.value = 0
    priceInput.value = 0
    discountInput.value = 0
    descriptionInput.value = ''
  }
})
</script>

<style scoped lang="scss">
  .modal-wrapper{
    z-index: 50;
    position: fixed;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background:#F2F0F9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal{
    width: 100%;
    max-width: 580px;
    &-head{
      font-size: 24px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #6E6893;
      text-transform: uppercase;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #6E6893;
    }
  }
  .form {
    &-side{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      margin-top: 10px;
    }

    &-content {
      background: #fff;
      border-radius: 10px;
      padding: 30px;
      display: flex;
      justify-content: space-between;
    }
  }
  .input-wrapper{
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 250px;
    & label{
      padding-left: 10px;
      font-weight: 500;
      color:#6E6893;
      text-transform: uppercase;
    }
  }
  input{
    width: 230px;
    color: #6E6893;
    border: none;
    border-radius: 5px;
    background: #F4F2FF;
    height: 40px;
    outline: none;
    padding: 0 10px;
    &::-webkit-input-placeholder{
      color: #6E6893;
    }
  }
  .discount-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    .discount-check{
      width: 40px;
      position: relative;
    }
    input[type=checkbox]{


    }
    #discount{
      width: 200px;
    }
  }
  #description{
    height: 100px;
    resize: none;
    width: 230px;
    color: #6E6893;
    border: none;
    border-radius: 5px;
    background: #F4F2FF;
    outline: none;
    padding: 10px;
    &::-webkit-input-placeholder{
      color: #6E6893;
    }
  }
  .add-img{
    margin-top: 20px;
  }
</style>