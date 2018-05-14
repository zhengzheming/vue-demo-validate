<template>
<div>
  <!-- multistep form -->
  <form class="msform">
    <!-- fieldsets -->
    <fieldset>
      <h2 class="fs-title">使用vuelidate插件校验</h2>
      <input type="checkbox" v-model="emailRequired"> 姓名为jyb时，email必填
      <br>
      <input type="checkbox" v-model="onlyJyb"> 姓名只能为jyb
      <form-group  attribute="姓名">
        <input type="text" v-model="name" placeholder="姓名">
      </form-group>
      <form-group  attribute="年龄">
        <input type="text" v-model="age" placeholder="年龄">
      </form-group>
      <form-group attribute="email">
        <input type="text" v-model="email" placeholder="email">
      </form-group>
      <form-group  attribute="密码">
        <input type="password" v-model="password" placeholder="密码">
      </form-group>
      <form-group  attribute="确认密码">
        <input type="password" v-model="cpassword" placeholder="确认密码">
      </form-group>
    </fieldset>
  </form>
  <form class="msform">
    <fieldset>
      <h2 class="fs-title">自动计算与反算</h2>
        <form-group  attribute="单价">
          <base-input v-model="price" placeholder="单价"></base-input>
        </form-group>
        <form-group  attribute="数量">
          <base-input-num v-model="num" placeholder="数量"></base-input-num>
        </form-group>
        <form-group  attribute="总额">
          <base-input v-model="amount" placeholder="总额"></base-input>
        </form-group>
      </fieldset>
  </form>
</div>
  
</template>

<script>
import validations from "../services/validate";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import customRule from "../services/validateRule";
import BaseInput from "./BaseInput";
import BaseInputNum from "./BaseInputNum";
import numeral from "numeral";
export default {
  data() {
    return {
      emailRequired: false,
      email: "",
      password: "",
      cpassword: "",
      name: "",
      age: "",
      price: "",
      num: "",
      amount: "",
      onlyJyb: false,
      base: "",
      obj: [
        {
          amount: 0,
          price: 0,
          num: 0,
          id: 1
        },
        {
          amount: 0,
          price: 0,
          num: 0,
          id: 2
        }
      ],
      errMsg: this.$options.localErrMsg
    };
  },
  watch: {
    price(newVal, oldVal) {
      if (+newVal === +oldVal) return;
      if (newVal && this.num) {
        console.log(`price change... trigger amount recaculate...`);
        this.amount =
          numeral(newVal)
            .multiply(this.num)
            .value() + "";
      }
    },
    num(newVal, oldVal) {
      if (+newVal === +oldVal) return;
      if (newVal && this.price) {
        console.log(`number change... trigger amount recaculate...`);
        this.amount =
          numeral(newVal)
            .multiply(this.price)
            .value() + "";
      }
    },
    amount(newVal, oldVal) {
      if (+newVal === +oldVal) return;
      if (newVal && this.num) {
        console.log(`amount change... trigger price recaculate...`);
        this.price =
          numeral(newVal)
            .divide(this.num)
            .value() + "";
      }
    }
  },
  components: {
    BaseInput,
    BaseInputNum
  },
  localErrMsg: {
    onlySpec: "{attribute}只能是{val}"
  },
  validations() {
    return Object.assign(validations, {
      email: {
        required: this.emailRequired && this.name === "jyb" ? required : false,
        email
      },
      password: {
        required
      },
      cpassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      name: {
        required,
        minLength: minLength(2),
        onlySpec: this.onlyJyb ? customRule.equal("jyb") : false
      },
      price: {
        required
      },
      num: {
        required
      },
      amount: {
        required
      },
      validationGroup: ["email", "password", "cpassword"]
    });
  },
  created() {
    window.$v = this.$v;
  },
  methods: {
    notify(message) {
      console.log(message);
    }
  }
};
</script>

<style>
.form-error {
  color: red;
}
.form-error > span {
  display: block;
}
</style>

<style scoped>
/*custom font*/
@import url(https://fonts.googleapis.com/css?family=Montserrat);

/*basic reset*/
.msform input[type="checkbox"] {
  width: auto;
}
/*form styles*/
.msform {
  width: 400px;
  margin: 50px auto;
  text-align: left;
  position: relative;
}
.msform fieldset {
  background: white;
  border: 0 none;
  border-radius: 3px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
  padding: 20px 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;

  /*stacking fieldsets above each other*/
  position: relative;
}
/*Hide all except first fieldset*/
.msform fieldset:not(:first-of-type) {
  display: none;
}
/*inputs*/
.msform input,
.msform textarea {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  color: #2c3e50;
  font-size: 13px;
}
.msform input.error {
  border-color: red;
}
/*buttons*/
.msform .action-button {
  width: 100px;
  background: #27ae60;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
}
.msform .action-button:hover,
.msform .action-button:focus {
  box-shadow: 0 0 0 2px white, 0 0 0 3px #27ae60;
}
/*headings*/
.fs-title {
  font-size: 15px;
  text-transform: uppercase;
  color: #2c3e50;
  margin-bottom: 10px;
}
.fs-subtitle {
  font-weight: normal;
  font-size: 13px;
  color: #666;
  margin-bottom: 20px;
}
/*progressbar*/
#progressbar {
  margin-bottom: 30px;
  overflow: hidden;
  /*CSS counters to number the steps*/
  counter-reset: step;
}
#progressbar li {
  list-style-type: none;
  color: white;
  text-transform: uppercase;
  font-size: 9px;
  width: 33.33%;
  float: left;
  position: relative;
}
#progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 20px;
  line-height: 20px;
  display: block;
  font-size: 10px;
  color: #333;
  background: white;
  border-radius: 3px;
  margin: 0 auto 5px auto;
}
/*progressbar connectors*/
#progressbar li:after {
  content: "";
  width: 100%;
  height: 2px;
  background: white;
  position: absolute;
  left: -50%;
  top: 9px;
  z-index: -1; /*put it behind the numbers*/
}
#progressbar li:first-child:after {
  /*connector not needed before the first step*/
  content: none;
}
/*marking active/completed steps green*/
/*The number of the step and the connector before it = green*/
#progressbar li.active:before,
#progressbar li.active:after {
  background: #27ae60;
  color: white;
}
.error-msg {
  color: red;
}
.error.form-group input {
  border-color: red;
}
</style>
