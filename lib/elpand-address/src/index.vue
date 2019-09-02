<template>
  <el-cascader
    class="elpand-address"
    :value="value"
    :options="myOptions"
    v-bind="bind"
    v-on="on"
    @input="input"
  ></el-cascader>
</template>
<script>
import emitter from '../../utils/emitter';
import address from './address'
export default {
  name: 'elpand-address',
  mixins: [emitter],
  props: {
    options: {
      type: [Function, Array],
      default: () => address
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    on: {
      type: Object,
      default: () => ({})
    },
    value: {
      required: true
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      myOptions: []
    }
  },
  created() {
    this.setOptions()
  },
  methods: {
    async setOptions() {
      const options = this.options
      if (Array.isArray(options)) {
        this.myOptions = options
      } else {
        this.myOptions = await this.options()
      }
    },
    input(v) {
      this.$emit('input', v)
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      }
    }
  }
}
</script>
<style lang="less">
.elpand-address {
}
</style>
