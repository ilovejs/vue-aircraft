<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">

          <a-col :md="6" :sm="24">
            <a-form-item label="Project">
              <a-select placeholder="Project" default-value="15">
                <a-select-option value="15">Green Doom 21</a-select-option>
                <a-select-option value="24">asdfsadf</a-select-option>
                <a-select-option value="26">Capochino</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="4" :sm="24">
            <a-form-item label="Creator">
              <a-input placeholder="Qs who record this trade" default-value="13"/>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
            <a-form-item label="Category">
              <a-select placeholder="Trade Category" default-value="13">
                <a-select-option value="13">Concrete</a-select-option>
                <a-select-option value="14">Formwork</a-select-option>
                <a-select-option value="15">Reinforcement</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
            <a-form-item label="Subtitle">
              <a-input placeholder="Trade Breakdown"/>
            </a-form-item>
          </a-col>

          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期"></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>

          <!--add and clean button-->
          <a-col :md="!advanced && 3 || 24" :sm="24">
            <span class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <!--add-->
              <a-button type="primary" icon="plus"></a-button>
              <!--delete-->
              <a-button style="margin-left: 3px" icon="delete"></a-button>
              <!--batch-->
              <span class="table-operator">
                <a-dropdown v-if="selectedRowKeys.length > 0">
                  <a-menu slot="overlay">
                    <a-menu-item key="1"><a-icon type="delete" />Remove</a-menu-item>
                    <!-- lock | unlock -->
                    <a-menu-item key="2"><a-icon type="lock" />Lock</a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px">Batch<a-icon type="down" /></a-button>
                </a-dropdown>
              </span>
              <!--fold-->
              <a @click="toggleAdvanced" style="margin-left: 3px">
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!--display table-->
    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :alert="{ show: true, clear: true }"
      :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange}"
    >
      <!--data part-->
      <template v-for="(col, index) in columns" v-if="col.scopedSlots"
                :slot="col.dataIndex" slot-scope="text, record">
        <div :key="index">
          <!--edit-->
          <a-input v-if="record.editable"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col, record)"
            style="margin: -5px 0"
          />
          <!--show-->
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <!--action part-->
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <!--edit-->
          <span v-if="record.editable">
            <a @click="() => save(record)">Save</a>
            <a-divider type="vertical" />
            <a-popconfirm title="Discard editing ?" @confirm="() => cancel(record)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <!--show-->
          <span v-else>
            <a class="edit" @click="() => edit(record)">Edit</a>
            <a-divider type="vertical" />
            <a class="delete" @click="() => del(record)">Remove</a>
          </span>
        </div>
      </template>
    </s-table>

  </a-card>
</template>

<script>
import { STable } from '@/components'

export default {
  name: 'AddTrade',
  components: {
    STable
  },
  data () {
    return {
      advanced: false,
      queryParam: {},
      // very important to keep scopedSlots or Edit wont functioning
      columns: [
        {
          title: 'Id',
          dataIndex: 'id',
          width: 30,
          sorter: true
        },
        {
          title: 'ProjectId',
          dataIndex: 'pid',
          width: 90,
          sorter: true,
          scopedSlots: { customRender: 'pid' }
        },
        {
          title: 'CreatorId',
          dataIndex: 'cid',
          width: 100,
          sorter: true,
          scopedSlots: { customRender: 'cid' }
        },
        {
          title: 'Category',
          dataIndex: 'cat',
          width: 100,
          sorter: true,
          scopedSlots: { customRender: 'cat' }
        },
        {
          title: 'Subtitle',
          dataIndex: 'subtitle',
          width: 100,
          sorter: true,
          scopedSlots: { customRender: 'subtitle' }
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: 120,
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return this.$http.get('/newservice', {
          params: Object.assign(parameter, this.queryParam)
        }).then(res => {
          console.log(res)
          return res.result
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleChange (value, key, column, record) {
      console.log('handleChange', value, key, column)
      record[column.dataIndex] = value
    },
    edit (row) {
      row.editable = true
      console.log('edit row', row)
      // row = Object.assign({}, row)
    },
    del (row) {
      console.log('del')
      this.$confirm({
        title: 'Warn',
        content: `Delete ${row.no} ?`,
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk () {
          console.log('OK')
          // calling deleting api
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() =>
            console.log('Oops errors!'))
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    save (row) {
      console.log('save')
      row.editable = false
    },
    cancel (row) {
      row.editable = false
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>

<style lang="less" scoped>
  .search {
    margin-bottom: 54px;
  }

  .fold {
    width: calc(100% - 216px);
    display: inline-block
  }

  .operator {
    margin-bottom: 18px;
  }

  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
