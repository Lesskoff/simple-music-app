import Vue from "vue";
import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";

const opts = {
  theme: { disable: true },
  icons: {
    iconfont: "mdiSvg", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
};

Vue.use(Vuetify);

export default new Vuetify(opts);
