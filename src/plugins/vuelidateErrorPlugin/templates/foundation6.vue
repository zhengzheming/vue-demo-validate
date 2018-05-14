<template>
  <div class="form-group"
       :class="{error: hasErrors}" v-inject$v>
    <slot name="label">
      <label :class="{'is-invalid-label': hasErrors}"
             v-if="label">{{ label }} {{ errors ? '*' : '' }}</label>
    </slot>
    <slot :errors="activeErrors"
          :has-errors="hasErrors"
          :first-error-message="firstErrorMessage"
    ></slot>
    <slot name="errors"
          :errors="activeErrors"
          :has-errors="hasErrors"
          :first-error-message="firstErrorMessage">
      <div class="form-error is-visible" v-if="hasErrors">
        <span v-if="showSingleError"
              :data-validation-attr="firstError.validationKey">
          {{ firstErrorMessage }}
        </span>
        <template v-if="!showSingleError">
          <span v-for="error in activeErrors"
                :key="error.validationKey"
                :data-validation-attr="error.validationKey">
            {{ getErrorMessage(error.validationKey, error.params) }}
          </span>
        </template>
      </div>
    </slot>
  </div>
</template>
<script>
import messageExtractorMixin from "../message-extractor-mixin";

export default {
  mixins: [messageExtractorMixin],
  data() {
    return {
      validator: {
        $dirty: false,
        $error: false,
        $invalid: true,
        $pending: false,
        $params: []
      },
      messages: {}
    };
  },
  directives: {
    inject$v: {
      bind(el, binding, vnode) {
        //指令所处上下文（组件实例）
        let context = vnode.context;
        let children = vnode.children;
        let target = children.find(child => {
          return child.elm.nodeType === Node.ELEMENT_NODE;
        });
        let isComponent = target.componentInstance;
        let expression;
        if (isComponent) {
          expression = target.data.model.expression;
        } else {
          expression = target.data.directives.find(
            directive => directive.name === "model"
          )["expression"];
        }
        context.expression = expression;
        let parentContext = context.$parent;
        let validator = parentContext.$v[expression];
        // 注入$v.oneField.validator
        context.validator = validator;
        console.log(`${expression}'s validator is : `, validator);
        // 添加@input
        target.elm.addEventListener("input", () => {
          validator.$touch();
        });
        // 注入组件内的局部错误option
        context.messages = parentContext.$options.localErrMsg || {};
      },
      update(el, binding, vnode) {
        // 指令所处上下文（组件实例）
        let context = vnode.context;
        let expression = context.expression;
        let parentContext = context.$parent;
        // update时， 更新validator...
        context.validator = parentContext.$v[expression];
      }
    }
  }
};
</script>
