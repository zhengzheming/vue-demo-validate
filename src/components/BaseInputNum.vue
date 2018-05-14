
<script>
import BaseInput from "./BaseInput";
import numeral from "numeral";
export default {
  name: "BaseInputNum",
  mixins: [BaseInput],
  computed: {
    viewVal: {
      get() {
        return this.value && numeral(this.value).format("0");
      },
      set(value) {
        let newValue = value && numeral(value).format("0");
        this.$emit("input", newValue);
        this.$el.value = newValue;
      }
    }
  },
  methods: {
    emitValIfHave(value) {
      if (value) {
        this.viewVal = value;
      }
    }
  }
};
</script>

<style>

</style>
