import { createApp } from "vue";
import Root from "./Root.vue";
import router from "./router";
import store from "./store";
import BootstrapVueNext from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "./main.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(Root);

app.use(vuetify);

app.use(BootstrapVueNext);

app.use(store);

app.use(router);

app.use(VueSweetalert2);

app.mount("#app");
