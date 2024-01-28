import "./bootstrap";
// import 'bootstrap/dist/js/bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/vendors/bootstrap-icons/bootstrap-icons.css";
import "@/assets/vendors/boxicons/css/boxicons.min.css";
import "sweetalert2/src/sweetalert2.scss";
import 'flatpickr/dist/flatpickr.css';

import router from '@/routes';
import { createPinia } from "pinia";
import App from '@/App.vue';

import { createApp } from 'vue';

import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App);
app
    .use(createPinia())
    // .use(VueSweetalert2)
    .use(router)
    .mount('#app')