<script>
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
            label: it.label,
            type: it.type,
            prop: it.prop,
            ...it.bind
          },
          on: it.on,
          scopedSlots: {
            default: it.render && function (props) { return it.render(props) }
          }
        }, it.child && this.getColumns(it.child))
      })
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
  }
}
</style>