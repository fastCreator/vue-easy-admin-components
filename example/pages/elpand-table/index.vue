<template>
  <div class="elpand-table-demo">
    <elpand-table v-bind="bind"></elpand-table>
  </div>
</template>
<script>
import { Promise } from 'q';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      bind: {
        tableSort(evt, cb) {
          console.log(evt)
          //接口调用成功后执行cb()
          cb()
        },
        tableExport: {
          filter(row, prop) {
            if (prop === 'sex') {
              return row.sex ? '男' : '女'
            }
            return row[prop]
          },
          filename: 'excel-list',
          autoWidth: true,
          bookTypes: ['xlsx', 'xlsm', 'csv', 'txt']
        },
        tableFilter: true,
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
            height: '50vh',
            rowKey: 'id'
          },
          on: {
            'row-dblclick'(row, column, event) {
              console.log(row, column, event)
            }
          },
          columns: [
            { type: 'selection', bind: { width: '55' } },
            { type: 'time', format: 'yyyy-MM-dd hh:mm:ss', label: '出生时间', prop: 'birth' },
            { type: 'image', label: '头像', prop: 'header' },
            { label: '姓名', prop: 'name' },
            { label: '年龄', prop: 'age' },
            { type: 'color', label: '喜欢颜色', prop: 'color', bind: { width: '80' } },
            { type: 'audio', label: '喜欢音乐', prop: 'audio', bind: { width: '320' } },
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
            label: '删除',
            confirm: '你确定删除吗？',
            call(selection, search) {
              console.log(selection)
              search()
            },
            bind: {
              type: "danger",
              icon: "el-icon-delete"
            }
          },
          {
            label: '其他操作',
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
          return new Promise(resolve => {
            setTimeout(() => {
              resolve({
                list: [
                  {
                    id: Math.random(),
                    name: '张三',
                    age: Math.random(),
                    sex: 0,
                    mother: '吴**',
                    father: '张**',
                    birth: '2000-01-02',
                    color: 'red',
                    audio: 'http://m4a.inke.cn/sktv/ori/m4a_64/12/20/1000382_9605.m4a',
                    header: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg'
                  },
                  {
                    id: Math.random(),
                    name: '李四',
                    age: '21',
                    sex: 1,
                    mother: '吴**',
                    father: '张**',
                    color: '#cccccc',
                    birth: new Date('1900-01-02'),
                    audio: 'http://m4a.inke.cn/sktv/ori/m4a_64/12/20/1000382_9605.m4a',
                    header: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3139953554,3011511497&fm=26&gp=0.jpg'
                  }
                ],
                pages: {
                  allSize: 110
                }
              })
            }, 1000)
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
