<script>
export default {
  props: {
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
    const { data, bind } = this
    const { getColumns } = this
    return <el-table
      class='my-table'
      data={data}
      {...bind}
    >
      {getColumns(this.columns)}
    </el-table>
  },
  methods: {
    getColumns(arr) {
      const h = this.$createElement
      return arr.map(it => {
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