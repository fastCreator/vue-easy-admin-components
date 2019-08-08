<script>
import merge from 'deepmerge'
export default {
  name: 'ElpandMultiple',
  props: {
    component: {
      type: String,
      required: true
    },
    bind: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    props: {
      type: Array,
      default() {
        return {
          value: 'value',
          id: 'id'
        }
      }
    }
  },
  data() {
    return {
      radio: '1'
    };
  },
  render(h) {
    const { component, bind, value, props } = this
    return <div class="elpand-multiple">
      {
        value.map((it, i) => h(component, merge(bind, {
          props: {
            value: it[props.value]
          },
          on: {
            input(v) {
              value[i][props.value] = v
              this.$emit('input', value)
            }
          }
        }))
        )
      }

    </div>
  }
}
</script>