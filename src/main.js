import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./css/main.css";
library.add(fas);
window.axios = require("axios");

window.html2canvas = require("html2canvas");

//import axios from "axios";

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

createApp(App)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
//Vue.use(BootstrapVue)
