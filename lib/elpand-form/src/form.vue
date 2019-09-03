<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    on: {
      type: Object,
      default: () => ([])
    },
    bind: {
      type: Object,
      default: () => ([])
    },
    list: {
      type: Array,
      required: true
    },
    submit: {
      type: Function,
      required: true
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(async () => {
        return this.submit(this.data)
      })
    },
    getFormItem(h) {
      return this.list
        .filter(it => !it.visible || it.visible(this.data))
        .map(it => {
          return h('el-form-item', {
            props: {
              ...it.itemBind,
              label: it.label,
              prop: it.prop,
            },
            on: {
              ...it.itemOn
            }
          }, [
              h(it.tag, {
                props: {
                  ...it.bind,
                  value: this.data[it.prop]
                },
                on: {
                  ...it.on,
                  input: (v) => {
                    this.data[it.prop] = v
                  }
                }
              })
            ])
        })
    }
  },
  render(h) {
    h = this.createElement || h
    const { bind, on, data } = this
    const { getFormItem } = this
    return h('el-form', {
      props: {
        ...bind,
        model: data
      },
      on: {
        ...on
      },
      class: 'elpand-form',
      ref: 'form'
    }, getFormItem(h))
  }
}
</script>