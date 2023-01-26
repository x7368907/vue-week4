import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js';
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "lee-ren";
let productModal = null;

const app = createApp({
    data(){
        return{
            products:[],
            tempProduct:{
                imageUrl:[],
            },
            pagination: {},
            isNew: false,//確認是編輯或新增所使用
        }
    },
    methods: {
        checkLogin(){
            axios.post(`${url}/api/user/check`)
            .then((res) => {
                this.getData();
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                window.location = 'login.html';
            })
        },
        getProduct(page = 1){//預設參數
            axios.get(`${url}/api/${path}/admin/products/?page=${page}`)
            .then((res) => {
                this.products = res.data.products;
                this.pagination =res.data.pagination;
                console.log(this.products);
            })
            .catch((err) => {
                alert(err.res.data.message);
            })
        },
        openModal(status,item){
           if(status === "new"){
            productModal.show();
            this.isNew = true;
            //會帶入初始化資料
            this.tempProduct = {
                imageUrl: [],
            }
           }else if(status === "edit"){
            productModal.show();
            this.isNew = false;
            //會帶入當前要編輯的資料
            this.tempProduct = { ...item};
           }else if(status === "delete"){
            this.tempProduct = { ...item};
            delProductModal.show();
           }
            console.log(status);
        },
    //    delProduct(){
    //     const webSite = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
    //         axios.delete(webSite)
    //         .then((res) => {
    //             delProductModal.hide();
    //             this.getData();
    //           })
    //         .catch((err) => {
    //           })
    //     },
        
    },
    components: {
        pagination,
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common["Authorization"] = token;
        this.getProduct();

        //bootstrap 方法
        // productModal.show();//確保他會動
        // delProductModal = new bootstrap.Modal('#delProductModal');
        
    },
})
 // 產品新增/編輯元件
app.component('productModal', {
    template: '#productModal',
    props: ['product', 'isNew'],
    data() {
      return {
        url: 'https://vue3-course-api.hexschool.io/v2',
        path: 'lee-ren',
      };
    },
    mounted() {
        productModal = new bootstrap.Modal('#productModal');
    },
    methods: {
        updateProduct(){
            let site = `${this.url}/api/${this.path}/admin/product`;
            //用this.isNew判斷API如何運行
            let http = 'post';

            if(!this.isNew) {
                site = `${url}/api/${path}/admin/product/${this.product.id}`;
                http = 'put'
            }

            axios[http](site,{ data: this.product})
            .then((res) => {
                console.log(res);
                this.hideModal();
                this.$emit('update');

            })
            .catch((err) => {
                console.log(err);
            })
        },
      createImages() {
        this.product.imagesUrl = [];
        this.product.imagesUrl.push('');
      },
      openModal() {
        productModal.show();
      },
      hideModal() {
        productModal.hide();
      },
    },
  })
// // 產品刪除元件
// app.component('delProductModal', {
//     template: '#delProductModal',
//     props: ['item'],
//     data() {
//       return {
//         apiUrl: 'https://vue3-course-api.hexschool.io/v2',
//         apiPath: 'lee-ren',
//       };
//     },
//     mounted() {
//         delProductModal = new bootstrap.Modal('#delProductModal');
//     },
//     methods: {
//         delProduct(){
//             const webSite = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`;
//                 axios.delete(webSite)
//                 .then((res) => {
//                     this.hideModal();
//                     this.$emit('update');
                    
//                   })
//                 .catch((err) => {
//                   })
//             },
//       openModal() {
//         delProductModal.show();
//       },
//       hideModal() {
//         delProductModal.hide();
//       },
//     },
//   });
app.mount('#app')