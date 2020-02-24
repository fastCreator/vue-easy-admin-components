<script>
export default {
  name: 'elpand-form',
  props: {
    createElement: {
      type: Function
    },
    on: {
      type: Object,
      default: () => ({})
    },
    bind: {
      type: Object,
      default: () => ({})
    },
    dialogBind: {
      type: Object,
      default: () => ({})
    },
    list: {
      type: Function,
      required: true
    },
    submit: {
      type: Function,
      required: true
    }
  },
  beforeCreate () {},
  data () {
    let defaultValue = {}
    for (let item of this.getlist()) {
      let pdValue = null
      if (item.bind && item.bind.multiple) {
        pdValue = []
      } else if (item.tag === 'elpand-mostSelect') {
        pdValue = []
      } else if (item.tag === 'elpand-ueditor') {
        pdValue = ''
      }
      if (item.prop) {
        defaultValue[item.prop] = item.defaultValue || pdValue
      }
    }
    this.defaultValue = defaultValue
    return {
      visible: false,
      data: JSON.parse(JSON.stringify(this.defaultValue))
    }
  },
  created () {},
  methods: {
    getlist () {
      return this.list(this.data || {}, this.title || '').filter(
        it => it.hide !== true
      )
    },
    close () {
      this.visible = false
      this.data = JSON.parse(JSON.stringify(this.defaultValue))
      setTimeout(() => {
        this.$refs.elForm.clearValidate()
      }, 100)
    },
    open (title, data) {
      this.title = title
      if (data) {
        this.data = JSON.parse(JSON.stringify({ ...this.data, ...data }))
      }
      this.visible = true
    },
    async cancel () {
      let confirm = this.dialogBind.confirm
      if (confirm) {
        let text =
          typeof confirm === 'string'
            ? confirm
            : '取消将不保存数据，你确认关闭吗'
        await this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      }
      this.close()
    },
    validate () {
      return this.$refs.elForm.validate().then(async () => {
        await this.submit(this.data)
        this.close()
      })
    },
    getFormItem (h) {
      return this.getlist().map(it => {
        return h(
          'el-form-item',
          {
            props: {
              ...it.itemBind,
              label: it.label,
              prop: it.prop
            },
            on: {
              ...it.itemOn
            }
          },
          [
            it.render
              ? it.render(h)
              : h(it.tag, {
                  attrs: {
                    placeholder: it.bind && it.bind.placeholder
                  },
                  props: {
                    ...it.bind,
                    value: this.data[it.prop]
                  },
                  on: {
                    ...it.on,
                    input: v => {
                      this.data[it.prop] = v
                      if (this.$refs.elForm) {
                        this.$refs.elForm.validateField(it.prop)
                      }
                    }
                  }
                })
          ]
        )
      })
    },
    getForm (h) {
      const { bind, on, data } = this
      return h(
        'el-form',
        {
          props: {
            'label-width': '140px',
            ...bind,
            model: data
          },
          on: {
            ...on
          },
          class: 'elpand-form',
          ref: 'elForm'
        },
        this.getFormItem(h)
      )
    }
  },
  render (h) {
    h = this.createElement || h
    return (
      <el-dialog
        width={this.dialogBind.width || '800px'}
        title={this.title}
        close-on-click-modal={false}
        close-on-press-escape={false}
        before-close={this.cancel}
        append-to-body={true}
        visible={this.visible}
        {...this.dialogBind}
      >
        {this.getForm(h)}
        <span slot='footer' class='dialog-footer'>
          <el-button on-click={this.cancel}>取 消</el-button>
          <el-button type='primary' on-click={this.validate}>
            确 定
          </el-button>
        </span>
      </el-dialog>
    )
  }
}
</script>
<style lang="less">
.elpand-form {
  .el-input {
    max-width: 350px;
  }
}
</style>
