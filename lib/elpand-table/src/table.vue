<script>
import { timeFormat } from '../../utils'
export default {
  props: {
    tableSort: {
      type: Function
    },
    hideTableLabel: {
      type: Array,
      default() { return [] }
    },
    bind: {
      type: Object,
      default() { return {} }
    },
    on: {
      type: Object,
      default() { return {} }
    },
    columns: {
      type: Array,
      default() { return [] }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  render() {
    const { data, bind, tableSort } = this
    const { getColumns, handlerSelect } = this
    return <el-table
      class='my-table'
      data={data}
      {...bind}
      on-select={handlerSelect}
      on-select-all={handlerSelect}
    >
      {getColumns(this.columns)}
      {tableSort && <el-table-column
        width="60"
        label="">
        <el-button plain circle icon="el-icon-sort" class="sortableHanlder"></el-button>
      </el-table-column>}
    </el-table>
  },
  mounted() {
    this.setTableSort()
  },
  methods: {
    setTableSort() {
      const { tableSort } = this
      if (tableSort) {
        let disabled = false
        import('sortablejs').then(({ Sortable }) => {
          const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
          Sortable.create(el, {
            animation: 150,
            dragClass: "expand-sortable-drag",
            handle: ".sortableHanlder",
            filter() {
              return disabled
            },
            onEnd: (evt) => {
              disabled = true
              this.$emit('sort', evt, () => {
                disabled = false
              })
            }
          })
        })
      }
    },
    handlerSelect(selection) {
      this.$emit('select', selection)
    },
    getColumns(arr) {
      const h = this.$createElement
      return arr.filter(it => !~this.hideTableLabel.indexOf(it.label)).map(it => {
        return h('el-table-column', {
          props: {
            align: this.getColumnsAlign(it),
            label: it.label,
            type: it.type,
            prop: it.prop,
            ...it.bind
          },
          on: it.on,
          scopedSlots: {
            default: this.getColumnsScopedSlots(it)
          }
        }, it.child && this.getColumns(it.child))
      })
    },
    getColumnsScopedSlots(it) {
      if (it.render) {
        return function (props) { return it.render(props) }
      }
      if (it.type === 'time') {
        return function (props) {
          console.log(it.prop, props.row, timeFormat, it.format)
          return timeFormat(props.row[it.prop], it.format)
        }
      }
      if (it.type === 'image') {
        return function (props) { return <img class="table-img" src={props.row[it.prop]} /> }
      }
    },
    getColumnsAlign(col) {
      if (['selection', 'image'].find(it => it === col.type)) {
        return 'center'
      }
    }
  }
}
</script>
<style lang="less">
.elpand-table {
  .my-table {
    margin-top: 12px;
    .expand-sortable-drag {
      opacity: 0;
    }
    .table-img {
      max-width: 120px;
      max-height: 120px;
      min-width: 38px;
      min-height: 38px;
    }
  }
}
</style>