<template>
  <input type="text" v-model="viewVal"
  @focus="onFocus" @blur="onBlur">
</template>

<script>
// @focus、@blur 事件触发时， 更改控件状态， 并触发input事件， 向父组件传值（value不为空时）；
// value为空时传值，  blur时则会让父组件认为控件被touch，focus时会让输入域自动填充值0.00

// 自动计算， 精度: 保留小数两位；
import numeral from "numeral";
export default {
  name: "BaseInput",
  props: {
    value: [String, Number]
  },
  computed: {
    realVal() {
      return this.value && numeral(this.value).format("0.00");
    },
    viewVal: {
      get() {
        if (this.isInputActive) {
          return this.value;
        } else {
          return this.value && numeral(this.value).format("0,0.00");
        }
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    emitValIfHave(value) {
      if (value) {
        this.$emit("input", this.realVal);
      }
    },
    onFocus($event) {
      this.emitValIfHave($event.target.value);
      this.isInputActive = true;
    },
    onBlur($event) {
      this.emitValIfHave($event.target.value);
      this.isInputActive = false;
    }
  },
  watch: {
    value(newVal) {
      // 自动校正精度保证 a * b === c
      console.log(`watch value changed... and it is : ${newVal}`);
      if (!this.isInputActive) {
        this.$emit("input", this.realVal);
      }
    }
  },
  data() {
    return {
      isInputActive: false
    };
  }
};
</script>

<style>

</style>
