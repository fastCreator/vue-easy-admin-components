<template>
  <div class="elpand-table-demo">
    <elpand-table v-bind="bind"></elpand-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bind: {
        filters: [
          {
            label: '输入框',
            prop: 'input',
            tag: 'el-input'
          },
          {
            label: '选择框',
            prop: 'select',
            tag: 'elpand-select',
            default: 'zhangsan',
            bind: {
              options: [{ label: '张三', value: 'zhangsan' }]
            }
          }
        ],
        table: {
          data: 'list',
          bind: {
            height: '50vh'
          },
          on: {
            'row-dblclick'(row, column, event) {
              console.log(row, column, event)
            }
          },
          columns: [
            { type: 'selection', bind: { width: '55' } },
            { label: '姓名', prop: 'name' },
            { label: '年龄', prop: 'age' },
            { label: '性别', prop: 'sex', render(props) { return props.row.sex ? '男' : '女' } },
            {              label: '家属',
              child: [
                { prop: 'mother', label: '母亲' },
                { prop: 'father', label: '父亲' }
              ]
            },
          ]
        },
        operations: [
          {
            label: '操作1',
            call(selection) {
              console.log(selection)
              alert(1)
            },
            bind: {
              type: "info",
              icon: "el-icon-share"
            }
          },
          {
            label: '操作2',
            call() {
              alert(2)
            }
          }
        ],
        pagination: {
          total: 'pages.allSize',
          currentPage: 1,
          pageSize: 10,
          bind: {
            layout: "sizes,total, prev, pager, next",
            pageSizes: [10, 20, 30, 40]
          }
        },
        search(filters, pagination) {
          console.log(filters, pagination)
          return Promise.resolve({
            list: [
              {
                name: '张三',
                age: Math.random(),
                sex: 0,
                mother: '吴**',
                father: '张**',
              },
              {
                name: '李四',
                age: '21',
                sex: 1,
                mother: '吴**',
                father: '张**',
              }
            ],
            pages: {
              allSize: 110
            }
          })
        }
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less">
.elpand-table-demo {
}
</style>
