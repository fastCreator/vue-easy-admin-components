<template>
  <div class="elpand-form-demo">
    <elpand-form
      v-bind="bind"
      v-if="visible"
      @close="close"
    ></elpand-form>
  </div>
</template>
<script>
import { Promise } from 'q';
export default {
  data() {
    return {
      visible: true,
      bind: {
        dialog: {
          bind: {
            title: '新增',
            width: '500px'
          },
          on: {}
        },
        form: {
          data: {
            name: '张珊珊'
          },
          on: {},
          bind: {
            labelWidth: '180px'
          },
          list: [
            {
              tag: 'el-input',
              prop: 'name',
              label: '姓名',
              itemBind: {
                rules: [{ required: true, message: '姓名不能为空' }]
              }
            },
            {
              tag: 'el-input',
              prop: 'hide',
              label: '隐藏项name=1',
              visible(data) {
                return data.name !== '1'
              }
            }
          ],
          submit(o) {
            console.log(o)
            return new Promise(r => {
              setTimeout(() => {
                r()
              }, 1000);
            })
          }
        }
      }
    }
  },
  created() {
  },
  methods: {
    close() {
      this.visible = false
    }
  }
}
</script>
<style lang="less">
.elpand-form-demo {
}
</style>
