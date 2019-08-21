<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <!--serial number-->
          <a-col :md="6" :sm="24">
            <a-form-item label="Serial">
              <a-input v-model="queryParam.id" placeholder="Serial Number"></a-input>
            </a-form-item>
          </a-col>
          <!--name-->
          <a-col :md="6" :sm="24">
            <a-form-item label="Number of use">
              <a-input-number v-model="queryParam.callNo" style="width: 100%"></a-input-number>
            </a-form-item>
          </a-col>
          <!--status-->
          <a-col :md="6" :sm="24">
            <a-form-item label="Status">
              <a-select v-model="queryParam.status" placeholder="Pick one" default-value="0">
                <a-select-option value="0">All</a-select-option>
                <a-select-option value="1">Closed</a-select-option>
                <a-select-option value="2">Opened</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--advance tools-->
          <template v-if="advanced">

            <a-col :md="8" :sm="24">
              <a-form-item label="Updated">
                <a-date-picker v-model="queryParam.date" style="width: 100%"
                               placeholder="Chose Update Time"></a-date-picker>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="Use Status">
                <a-select v-model="queryParam.useStatus" placeholder="Pick one" default-value="0">
                  <a-select-option value="0">All</a-select-option>
                  <a-select-option value="1">Closed</a-select-option>
                  <a-select-option value="2">Running</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <!--Search and Reset-->
          <a-col :md="!advanced && 6 || 24" :sm="24">
            <span class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">Search</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">Reset</a-button>
              <a style="margin-left: 8px" @click="toggleAdvanced">
                {{ advanced ? 'Fold' : 'Expand' }}
                <a-icon :type="advanced ? 'up' : 'down'"></a-icon>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">Add</a-button>
      <a-button type="dashed" @click="tableOption">{{ optionAlertShow && 'Close' || 'Open' }}</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0" v-action:edit>
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-icon type="delete"/>
            Delete
          </a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2">
            <a-icon type="lock"/>
            Lock
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          Batch
          <a-icon type="down"/>
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">Edit</a>
          <a-divider type="vertical"/>
          <a @click="handleSub(record)">Subscribe</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk"/>
    <step-by-step-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateForm'
import { getRoleList, getServiceList } from '@/api/manage'

const statusMap = {
  0: {
    status: 'default',
    text: 'Closed'
  },
  1: {
    status: 'processing', // todo: naming problem
    text: 'pending'
  },
  2: {
    status: 'success',
    text: 'Success'
  },
  3: {
    status: 'error',
    text: 'Error'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal
  },
  data() {
    return {
      mdl: {},
      // advanced search
      advanced: false,
      queryParam: {},
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: 'Serial',
          dataIndex: 'no'
        },
        {
          title: 'Desc',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: 'Called',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' time(s)'
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: 'Updated',
          dataIndex: 'updatedAt',
          sorter: true
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            console.debug(res)
            return res.result
          }).catch(e => {
            console.log(e)
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: {
            show: true, clear: () => {
              this.selectedRowKeys = []
            }
          },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: (record) => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    handleEdit(record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    handleSub(record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} Subscribe success`)
      } else {
        this.$message.error(`${record.no} Subscribe fail，trade is closed`)
      }
    },
    handleOk() {
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
