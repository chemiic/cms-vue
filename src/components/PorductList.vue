<template>
  <div class="main-content">
    <div class="menu">
      <div class="left-menu">
        <button class="filter-btn">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_62)">
              <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#8B83BA"/>
            </g>
            <defs>
              <clipPath id="clip0_1_62">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Фильтр
        </button>
        <form class="search-wrapper">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z" fill="#8B83BA"/>
          </svg>
          <input class="search"
                 v-bind:value="searchInput"
                 @input="searchInput = $event.target.value"
                 id="searchInput"
                 type="text"
                 placeholder="Поиск по наименованию и категории"
          >
        </form>
      </div>
      <div class="right-menu">

        <MyButton @click="IsEdit=false, IsModalActive = true">
          Добавить товар
        </MyButton>

      </div>
    </div>
    <div v-if="productStore.products.length > 0">
      <table>
        <thead class="table-header">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Наименование</th>
          <th scope="col">Категория</th>
          <th scope="col">ЕД/ИЗМ</th>
          <th scope="col">Количество</th>
          <th scope="col">Цена</th>
          <th scope="col">Итог</th>
          <th> </th>
        </tr>
        </thead>

        <tbody>
        <product-item
            v-for="item in productStore.products"
            :key="item.id"
            :item="item"
            @onRemove = "productStore.removeProduct(item.id)"
            @OnEdit = "IsEdit = true, editedItem = item.id, IsModalActive = true, editedItemData=item"
        />
        </tbody>
      </table>

    </div>
    <h2 v-else style="color: red">
      Список товаров пуст
    </h2>
    <div class="footer">
      <div class="page-select">Показывать на странице:
        <input
          v-bind:value="pageCountInput"
          @input="pageCountInput = $event.target.value"
          id="pageCountInput"
          type="number"
        >
      </div>
      <div class="page-counter"></div>
      <div class="page-scroll"></div>
    </div>
  </div>

  <MyModal
    v-if="IsModalActive"
    :edit='IsEdit'
    :itemForEdit="editedItem"
    :itemForEditData="editedItemData"
    @onClose="IsModalActive = false"

  />
</template>

<script setup>
  import {UseProductStore} from "../store/store.js";
  import {ref} from "vue";
  import ProductItem from "./ProductItem.vue";
  import MyButton from "./MyButton.vue";
  import MyModal from "./MyModal.vue";

  const productStore = UseProductStore();
  const IsEdit = ref (false);
  const editedItem = ref (0);
  const editedItemData = ref ({
    id: Number,
    name: String,
    category: String,
    dimension: String,
    quantity: Number,
    price: Number,
    total: Number,
    discount: Number,
    img: String,
  })

  const IsModalActive = ref(false);
  let searchInput = '';
  let pageCountInput = 10;
</script>

<style lang="scss">
  .menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-top: 20px;
  }
  .left-menu{
    display: flex;
    gap: 20px;
  }
  .search-wrapper{
    max-width: 400px;
    display: flex;
    align-items: center;
    background: #F4F2FF;
    border-radius: 6px;
    padding: 0 10px;
    gap: 10px;
  }
  .search{
    width: 25vw;
    color: #6E6893;
    border: none;
    background: transparent;
    height: 40px;
    outline: none;
    &::-webkit-input-placeholder{
      color: #6E6893;
    }
  }

  .filter-btn{
    background: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #C6C2DE;
    border-radius: 6px;
    padding: 10px;
    font-size: 16px;
    transition: all .2s;
    &:hover{
      border: 1px solid #6D5BD0;
    }
    &:focus{
      border: 1px solid #6D5BD0;
    }
  }
  table{
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  thead{
    background-color: #F4F2FF;
    height: 60px;
    color: #6E6893;
  }
  tr{
    border-bottom: 1px solid #D9D5EC;
    border-collapse: collapse;
  }
  th{
    border-top: 1px solid #D9D5EC;
    border-collapse: collapse;
  }
  td:first-child, th:first-child{
    padding-left: 15px;
  }
  td:first-child, th:first-child{
    padding-right: 15px;
  }
  .main-content{
    background: #FFFFFF;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }
  .footer{
    padding: 15px;
    background: #F4F2FF;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    & input{
      width: 35px;
    }
  }
</style>