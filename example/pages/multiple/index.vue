<template>
  <div>
    <elpand-multiple
      v-model="v-model="
      value""
      component="el-date-picker"
      :bind="bind"
    >
    </elpand-multiple>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.bind = {
      props: {
        type: 'week',
        format: 'yyyy 第 WW 周'
      }
    }
  },
  data() {
    return {
      value: []
    };
  }
}
</script>