// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App";
import vuelidateErrorExtractor, {
  templates
} from "./plugins/vuelidateErrorPlugin";
Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.prototype.vMessage = function(message) {
  console.log(message);
};
//  向error message传参
const validationKeys = {
  minLength: {
    //校验规则名
    // Validation rule name in vuelidate
    validationKey: "minLength", // messages的访问路径
    params: [
      //vuelidate参数与 vuelidate-error-extrator 参数的映射
      {
        vue: "min", // Vuelidate param name
        ext: "mymin" // Messages param name
      }
    ]
  }
};

Vue.use(vuelidateErrorExtractor, {
  template: templates.foundation6,
  messages: {
    required: "{attribute}必填",
    minLength: "{attribute}最小长度{mymin}位",
    between: "{attribute}应在{min}与{max}之间",
    email: "{attribute}格式不正确",
    sameAsPassword: "两次密码应该一致"
  },
  validationKeys
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
