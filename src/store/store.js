import {defineStore} from "pinia";
import {ref, watch} from "vue";
import axios from "axios";


export const UseProductStore = defineStore('productStore', () => {

    const products = ref([])

    async function getGoods() {
        try {
            const response = await axios.get('https://marshy-foamy-fenugreek.glitch.me/api/goods');
            products.value = response.data
        } catch (error) {
            console.error(error);
        }
    }

    getGoods()


    const addProduct = (newName, newCategory, newDimension, newQuantity, newPrice, newTotal, newDesc = '', newDiscount = 0, newImg = '') => {
        const product = {
            title: newName,
            description: String(newDesc),
            category: newCategory,
            price: newPrice,
            discount: newDiscount,
            count: newQuantity,
            units: newDimension,
        };
        axios.post("https://marshy-foamy-fenugreek.glitch.me/api/goods", product)
            .then(response => {
                console.log(response.status)
                getGoods()
            })
            .catch(error => {
                console.error("There was an error!", error);
                alert(`Ошибка: ${error}`)
            });
    }

        const editProduct = (id, newName, newCategory, newDimension, newQuantity, newPrice, newTotal, newDesc = '', newDiscount = 0, newImg = '') => {
            const product = {
                title: newName,
                description: String(newDesc),
                price: newPrice,
                discount: newDiscount,
                count: newQuantity,
                units: newDimension,
            };
            axios.patch(`https://marshy-foamy-fenugreek.glitch.me/api/goods/${id}`, product)
                .then(response => {
                    console.log(response.status)
                    getGoods()
                })
                .catch(error => {
                    console.error("There was an error!", error);
                    alert(`Ошибка: ${error.id}`)
                });

        }
    const removeProduct = (id) => {
        axios.delete(`https://marshy-foamy-fenugreek.glitch.me/api/goods/${id}`)
            .then(response => {
                console.log(response.status)
                getGoods()
            })
            .catch(error => {
                console.error("There was an error!", error);
                alert(`Ошибка: ${error.id}`)
            });
    }
    const IsErrorActive = ref(false)
    const Error = () => {
        return IsErrorActive.value = true
    }

    return {
        removeProduct,
        addProduct,
        editProduct,
        products
    };
})