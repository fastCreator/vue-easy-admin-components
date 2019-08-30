<template>
  <div class="elpand-mostSelect">
    <div>
      <el-input
        :value="searchText"
        @input="changeSearchText"
      />
    </div>
    <div>
      <el-checkbox
        :indeterminate="isIndeterminate"
        :value="ischeckAll"
        @input="checkAll"
      >
        全选
      </el-checkbox>
    </div>
    <div>
      <el-checkbox-group
        :value="value"
        @input="input"
      >
        <el-checkbox
          v-for="it in options"
          :key="it[optionsProps.value]"
          :label="it[optionsProps.value]"
        >
          {{it[optionsProps.label]}}
        </el-checkbox>
      </el-checkbox-group>
      <el-pagination
        v-bind="pagination"
        :pageSize.sync="pageSize"
        :currentPage.sync="currentPage"
        :total="total"
        @size-change="handlerSizeChange"
        @current-change="handlerSearch"
        @prev-click="handlerSearch"
        @next-click="handlerSearch"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { debounce } from '../../utils/commom';
export default {
  name: 'elpand-mostSelect',
  props: {
    searchProps: {
      type: Object,
      required: true
    },
    search: {
      type: Function,
      required: true
    },
    optionsProps: {
      type: Object,
      required: true
    },
    value: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          pageSize: 20
        }
      }
    }
  },
  data() {
    return {
      searchText: '',
      options: [],
      currentPage: this.pagination.currentPage,
      pageSize: this.pagination.pageSize,
      total: 0
    }
  },
  mounted() {
    this.handlerSearch()
  },
  methods: {
    handlerSizeChange(v) {
      this.pageSize = v
      debounce(this.handlerSearch, 200)
    },
    checkAll(v) {
      let checkList = this.value
      this.options.forEach(it => {
        let value = it[this.optionsProps.value]
        if (v) {
          checkList.push(value)
        } else {
          let index = checkList.indexOf(value)
          checkList.splice(index, 1)
        }
      })
      this.input(checkList)
    },
    input(v) {
      this.$emit('input', v)
    },
    changeSearchText(v) {
      this.searchText = v
      if (this.t) {
        clearTimeout(this.t)
      }
      this.t = setTimeout(() => {
        this.handlerSearch()
      }, 200)
    },
    handlerSearch() {
      this.search(this.searchText, {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(d => {
        if (d && d[this.searchProps.list]) {
          this.options = d[this.searchProps.list]
          let path = this.searchProps.total.split('.')
          this.total = d
          path.forEach(it => {
            this.total = this.total[it]
          })
        }
      })
    }
  },
  computed: {
    ischeckAll() {
      let ischeckAll = true
      for (let i = 0; i < this.options.length; i++) {
        if (!~this.value.indexOf(this.options[i][this.optionsProps.value])) {
          ischeckAll = false
          break
        }
      }
      return ischeckAll
    },
    isIndeterminate() {
      let hasTrue, hasFalse
      for (let i = 0; i < this.options.length; i++) {
        if (~this.value.indexOf(this.options[i][this.optionsProps.value])) {
          hasTrue = true
        } else {
          hasFalse = true
        }
        if (hasTrue && hasFalse) {
          return true
        }
      }
      return false
    }
  }
}
</script>
<style lang="less">
.elpand-mostSelect {
  .el-checkbox-group {
    .el-checkbox {
      margin-left: 30px;
    }
  }
}
</style>