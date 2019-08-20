<template>
  <div class="elpand-table">
    <div class="filters">
      <div
        class="filters-item"
        v-for="it in filters"
        :key="it.prop"
      >
        <div class="filters-label">{{it.label}}</div>
        <div class="filters-value">
          <component
            v-bind:is="it.tag"
            v-bind="it.bind"
            :value="filtersValue[it.prop]"
            @input="setFiltersValue($event,it.prop)"
          ></component>
        </div>
      </div>
      <div class="btns">
        <el-button
          type="primary"
          @click="handlerSearch"
        >搜索</el-button>
        <el-button
          type="warning"
          @click="clearFilters"
        >重置</el-button>
      </div>
    </div>
    <div class="operations">
      <el-button
        v-for="(it,i) in operations"
        :key="i"
        v-bind="it.bind"
        @click="operationCall(it)"
      >
        {{it.label}}
      </el-button>
    </div>
    <my-table
      v-bind="table"
      :data="tableData"
    ></my-table>
    <div
      class="pagination"
      v-if="pagination"
    >
      <el-pagination
        v-bind="pagination.bind"
        v-on="pagination.on"
        :pageSize.sync="pageSize"
        :currentPage.sync="currentPage"
        :total="total"
        @size-change="changePage"
        @current-change="changePage"
        @prev-click="changePage"
        @next-click="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import MyTable from './table'
export default {
  name: 'elpand-table',
  components: {
    MyTable
  },
  props: {
    filters: {
      type: Array,
      default() { return [] }
    },
    operations: {
      type: Array,
      default() { return [] }
    },
    table: {
      type: Object,
      require: true
    },
    pagination: {
      type: Object
    },
    search: {
      type: Function,
      require: true
    }
  },
  data() {
    return {
      filtersValue: this.initFiltersValue(),
      tableData: [],
      total: 0,
      currentPage: this.pagination ? this.pagination.currentPage : 1,
      pageSize: this.pagination ? this.pagination.pageSize : 10
    }
  },
  created() {
    this.handlerSearch()
  },
  methods: {
    operationCall(opt) {
      if (opt.call) {
        opt.call()
      }
    },
    setFiltersValue(v, prop) {
      this.$set(this.filtersValue, prop, v)
    },
    initFiltersValue() {
      let values = {}
      this.filters.forEach(it => {
        values[it.prop] = it.default || null
      })
      return values
    },
    clearFilters() {
      this.filtersValue = this.initFiltersValue()
      this.currentPage = this.pagination ? this.pagination.currentPage : 1
      this.pageSize = this.pagination ? this.pagination.pageSize : 10
      this.handlerSearch()
    },
    clearSearch() {
      this.clearFilters()
      this.handlerSearch()
    },
    async handlerSearch() {
      let d = await this.search(this.filtersValue, {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = d[this.table.data]
      if (this.pagination) {
        this.total = d
        this.pagination.total.split('.').forEach(key => {
          this.total = this.total[key]
        })
      }
    },
    changePage() {
      this.handlerSearch()
    }
  }
}
</script>
<style lang="less">
.elpand-table {
  .filters {
    display: flex;
    .filters-item {
      display: flex;
      align-items: center;
      margin-left: 12px;
    }
    .btns {
      margin-left: 12px;
    }
  }
  .operations {
    margin-top: 12px;
  }
  .my-table {
    margin-top: 12px;
  }
  .pagination {
    margin-top: 12px;
  }
}
</style>
