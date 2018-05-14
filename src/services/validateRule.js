import { withParams } from "vuelidate";
import { req } from "vuelidate/lib/validators/common";
export default {
  equal(val) {
    return withParams(
      {
        type: "equal",
        val
      },
      value => !req(value) || val === value
    );
  }
};
