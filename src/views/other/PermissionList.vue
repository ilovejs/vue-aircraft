<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="Role ID">
              <a-input placeholder="Please input"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="Status">
              <a-select placeholder="Please chose" default-value="0">
                <a-select-option value="0">All</a-select-option>
                <a-select-option value="1">Close</a-select-option>
                <a-select-option value="2">Running</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">Query</a-button>
              <a-button style="margin-left: 8px">Reset</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table :columns="columns" :data="loadData">

      <span slot="actions" slot-scope="text, record">
        <a-tag v-for="(action, index) in record.actionList" :key="index">{{ action.describe }}</a-tag>
      </span>

      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">Edit</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            More <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">Detail</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">Disable</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">Delete</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      title="Actions"
      :width="800"
      v-model="visible"
      @ok="handleOk">
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Role Identifier"
          hasFeedback
          validateStatus="success">
          <a-input placeholder="Unique identifier" v-model="mdl.id" id="no" disabled="disabled" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Role Name"
          hasFeedback
          validateStatus="success">
          <a-input placeholder="Pick a name" v-model="mdl.name" id="permission_name" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Status"
          hasFeedback
          validateStatus="warning">
          <a-select v-model="mdl.status">
            <a-select-option value="1">Ok</a-select-option>
            <a-select-option value="2">Disabled</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Description"
          hasFeedback>
          <a-textarea :rows="5" v-model="mdl.describe" placeholder="..." id="describe"></a-textarea>
        </a-form-item>

        <a-divider />

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="Assign Permission"
          hasFeedback>
          <a-select
            style="width: 100%"
            mode="multiple"
            v-model="mdl.actions"
            :allowClear="true">
            <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.value">{{ action.label }}</a-select-option>
          </a-select>
        </a-form-item>

      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
import { STable } from '@/components'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data () {
    return {
      description: 'Permission and Role management，based on RBAC design，Granularity in each action level',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {},
      // advanced search: on / off
      advanced: false,
      queryParam: {},
      columns: [
        {
          title: 'Id',
          dataIndex: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Actions',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' }
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: 'Ops',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // Pull actionList from Backend
      permissionList: null,
      // for the control
      loadData: parameter => {
        return this.$http.get('/permission', {
          params: Object.assign(parameter, this.queryParam)
        }).then(res => {
          const result = res.result
          result.data.map(permission => {
            // todo: ??
            permission.actionList = JSON.parse(permission.actionData)
            return permission
          })
          return result
        })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: 'ok',
        2: 'disabled'
      }
      return statusMap[status]
    }
  },
  created () {
    this.loadPermissionList()
  },
  methods: {
    // todo: is this like initial values ?
    loadPermissionList () {
      // permissionList
      new Promise(resolve => {
        const data = [
          { label: 'Add', value: 'add', defaultChecked: false },
          { label: 'Get', value: 'get', defaultChecked: false },
          { label: 'Update', value: 'update', defaultChecked: false },
          { label: 'Query', value: 'query', defaultChecked: false },
          { label: 'Delete', value: 'delete', defaultChecked: false },
          { label: 'Import', value: 'import', defaultChecked: false },
          { label: 'Export', value: 'export', defaultChecked: false }
        ]
        setTimeout(resolve(data), 1500)
      }).then(res => {
        this.permissionList = res
      })
    },
    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      console.log(this.mdl)
      this.visible = true
    },
    handleOk () {
    },
    onChange (selectedRowKeys, selectedRows) {
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
