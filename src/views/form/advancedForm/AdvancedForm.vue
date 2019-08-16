<template>
  <div>
    <!--
    <a-card class="card" title="repository" :bordered="false">
      <repository-form ref="repository" :showSubmit="false" />
    </a-card>
    -->

    <!--top commands -->
    <a-card class="card" title="Trade Management" :bordered="false">
      <trade-header-form ref="tradeHeaderForm" :showSubmit="false"/>
    </a-card>
    <!-- Ant Design native data table not s-table-->
    <a-card>
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading">

        <template v-for="(col, i) in ['name', 'workId', 'department']"
                  :slot="col"
                  slot-scope="text, record">
          <a-input
            v-if="record.editable"
            :key="col"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.key, col)"></a-input>
          <template v-else>{{ text }}</template>
        </template>

        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">Add</a>
              <a-divider type="vertical"></a-divider>
              <a-popconfirm title="Remove row ?" @confirm="remove(record.key)">
                <a>Remove</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">Save</a>
              <a-divider type="vertical"></a-divider>
              <a @click="cancel(record.key)">Cancel</a>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.key)">Edit</a>
            <a-divider type="vertical"></a-divider>
            <a-popconfirm title="Delete ?" @confirm="remove(record.key)">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </template>

      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">
        Add New Record
      </a-button>
    </a-card>

    <!-- fixed footer toolbar -->
    <footer-tool-bar
      :style="{ width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">
      <span class="popover-wrapper">
        <a-popover title="form check info" overlayClassName="antd-pro-pages-forms-style-errorPopover" trigger="click"
                   :getPopupContainer="trigger => trigger.parentNode">
          <template slot="content">
            <li v-for="item in errors"
                :key="item.key"
                @click="scrollToField(item.key)"
                class="antd-pro-pages-forms-style-errorListItem">
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon"></a-icon>
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span v-if="errors.length > 0" class="antd-pro-pages-forms-style-errorIcon">
            <a-icon type="exclamation-circle"></a-icon>{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <!--submit btn-->
      <a-button type="primary" @click="validate" :loading="loading">Submit</a-button>
    </footer-tool-bar>
  </div>
</template>

<script>

import TradeHeaderForm from './TradeHeaderForm'
import FooterToolBar from '@/components/FooterToolbar'
import { mixin, mixinDevice } from '@/utils/mixin'

// used by sub-components
const fieldLabels = {
  name2: 'Name',
  url2: 'Description',
  owner2: 'Owner'
}

export default {
  name: 'AdvancedForm',
  mixins: [mixin, mixinDevice],
  components: {
    TradeHeaderForm,
    FooterToolBar
  },
  data() {
    return {
      description: 'Batch trade submission form',
      loading: false,
      memberLoading: false,
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '20%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'WorkId',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: 'Dep',
          dataIndex: 'department',
          key: 'department',
          width: '40%',
          scopedSlots: { customRender: 'department' }
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        {
          key: '1',
          name: 'Hinton',
          workId: '001',
          editable: false,
          department: 'Executive'
        },
        {
          key: '2',
          name: 'Lily',
          workId: '002',
          editable: false,
          department: 'IT'
        },
        {
          key: '3',
          name: 'John',
          workId: '003',
          editable: false,
          department: 'Finance'
        }
      ],
      errors: []
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
    },
    newMember() {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    remove(key) {
      this.data = this.data.filter(item => item.key !== key)
    },
    saveRow(record) {
      // This could talk to BackEnd or FrontEnd only !!
      this.memberLoading = true
      // FORMAT
      const { key, name, workId, department } = record
      if (!name || !workId || !department) {
        this.memberLoading = false
        this.$message.error('Please fill in complete data')
        return
      }

      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        // turn off row states
        const target = this.data.filter(item => item.key === key)[0]
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    toggle(key) {
      const target = this.data.filter(item => item.key === key)[0]
      target.editable = !target.editable
    },
    getRowByKey(key, newData) {
      const { data } = this
      return (newData || data).filter((item) => item.key === key)[0]
    },
    cancel(key) {
      const target = this.data.filter((item) => item.key === key)[0]
      target.editable = false
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    validate() {
      // ref property was used at the top of this file.
      const { $refs: { tradeHeaderForm }, $notification } = this

      const tHForm = new Promise((resolve, reject) => {
        tradeHeaderForm.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })

      // clean this.errors
      this.errors = []

      Promise.all([tHForm]).then(values => {
        $notification['error']({
          message: 'Received values of form:',
          description: JSON.stringify(values)
        })
      }).catch(() => {
        // const errors = { ...repository.form.getFieldsError(), ...task.form.getFieldsError() }
        const errors = Object.assign({}, tradeHeaderForm.form.getFieldsError())
        const tmp = { ...errors }
        // call below fn
        this.errorList(tmp)
        console.log(tmp)
      })
    },
    errorList(errors) {
      if (!errors || errors.length === 0) {
        return
      }
      this.errors = Object.keys(errors)
        .filter(key => errors[key])
        .map(key => ({
          key: key,
          message: errors[key][0],
          fieldLabel: fieldLabels[key]
        }))
    },
    scrollToField(fieldKey) {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .card {
    margin-bottom: 24px;
  }

  .popover-wrapper {
    /deep/ .antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }

  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;

    i {
      margin-right: 4px;
    }
  }

  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }

    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }

    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0, 0, 0, .45);
      font-size: 12px;
    }
  }
</style>
