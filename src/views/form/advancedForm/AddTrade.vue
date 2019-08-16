<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline"
              ref="AddTradeForm"
              :form="form"
              @submit="submitTopForm"
      >
        <!--row 1-->
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="Project" name="project">
              <a-select placeholder="Project"
                        v-decorator="['project_id', { rules: [{ required: true, message: 'Please pick project'}] }]">
                <a-select-option value="15">Green Doom Center</a-select-option>
                <a-select-option value="24">Monash Square</a-select-option>
                <a-select-option value="26">Capochino</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--todo: should use type: 'number'-->
          <a-col :md="8" :sm="24">
            <a-form-item label="CreatorID">
              <a-input-number placeholder="Qs" :min="0"
                       v-decorator="['creator_id', { rules: [{ required: true, message: 'Please type creatorId as integer'}] }]"/>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="Category">
              <a-select placeholder="Trade Category"
                        v-decorator="['category_id', { rules: [{ required: true, message: 'Please pick category'}] }]"
                        name="category">
                <a-select-option value="13">Concrete</a-select-option>
                <a-select-option value="14">Formwork</a-select-option>
                <a-select-option value="15">Reinforcement</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <!--row 2-->
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="Subtitle">
              <a-input placeholder="Breakdown subtitle"
                       v-decorator="['subtitle', { rules: [{ required: false, message: 'Please type subtitle'}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="Level">
              <a-input placeholder="Level"
                       v-decorator="['level', { rules: [{ required: false, message: 'Please type level'}] }]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="Value">
              <a-input-number placeholder="Breakdown item value" :min="0"
                       v-decorator="['value', { rules: [{ required: false, message: 'Please type value'}] }]"/>
            </a-form-item>
          </a-col>
        </a-row>

        <!--row 3-->
        <a-row :gutter="48">
          <!--advanced-->
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="Times">
                <a-input-number style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="Dates">
                <a-date-picker style="width: 100%" placeholder="Updated dates"></a-date-picker>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="Status">
                <a-select placeholder="Chose">
                  <a-select-option value="0">1</a-select-option>
                  <a-select-option value="1">2</a-select-option>
                  <a-select-option value="2">3</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="Usage">
                <a-select placeholder="Pick">
                  <a-select-option value="0">1</a-select-option>
                  <a-select-option value="1">2</a-select-option>
                  <a-select-option value="2">3</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>

          <!--add and clean button-->
          <a-col :md="!advanced && 3 || 24" :sm="24">
            <span class="table-page-search-submitButtons"
                  :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <!--add-->
              <a-button type="primary" icon="plus" htmlType="submit"></a-button>
              <!--delete-->
              <a-button style="margin-left: 3px" icon="delete"></a-button>
              <!--batch-->
              <span class="table-operator">
                <a-dropdown v-if="selectedRowKeys.length > 0">
                  <a-menu slot="overlay">
                    <a-menu-item key="1"><a-icon type="delete"/>Del</a-menu-item>
                    <!-- lock | unlock -->
                    <a-menu-item key="2"><a-icon type="lock"/>Lock</a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px">Batch<a-icon type="down"/></a-button>
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
    </div><!--end search wrapper-->

    <!--Display s-table which is enhanced a-table from Ant design Vue
        Check doc in @component/Table/README.md-->
    <s-table
      ref="table"
      size="default"
      :columns="columns"
      :data="loadData"
      :alert="{ show: true, clear: true }"
      :loading="memberLoading"
      :rowSelection="{ selectedRowKeys: this.selectedRowKeys, onChange: this.onSelectChange}"
    >
      <!--data part-->
      <template v-for="(col, index) in columns" v-if="col.scopedSlots"
                :slot="col.dataIndex" slot-scope="text, record">
        <div :key="index">
          <!--edit-->
          <a-input v-if="record.editable"
                   :value="text"
                   @change="e => handleRowChange(e.target.value, record.key, col, record)"
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
            <a-divider type="vertical"/>
            <a-popconfirm title="Discard editing ?" @confirm="() => cancel(record)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <!--show-->
          <span v-else>
            <a class="edit" @click="() => edit(record)">Edit</a>
            <a-divider type="vertical"/>
            <a class="delete" @click="() => del(record)">Del</a>
          </span>
        </div>
      </template>
    </s-table>
  </a-card>
</template>

<script>
import Vue from 'vue'
import { STable } from '@/components'
import { apiLoadTrades } from '@/api/trade'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { addTrade } from '@/api/project'

/* Component Derived from TableInnerEditList */
export default {
  name: 'AddTrade',
  components: {
    STable
  },
  data() {
    return {
      form: this.$form.createForm(this),
      advanced: false,
      queryParam: {},
      loading: false, // for submit
      memberLoading: false, // for row save
      tableData: [],
      errors: [],
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
          width: 50,
          sorter: true,
          scopedSlots: { customRender: 'cat' }
        },
        {
          title: 'CategoryID',
          dataIndex: 'cat_id',
          width: 50,
          sorter: true,
          scopedSlots: { customRender: 'cat_id' }
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
      loadData: (parameter) => {
        const token =  Vue.ls.get(ACCESS_TOKEN)
        // This is the only way for query parameter, also check List.vue
        const param = Object.assign(parameter, this.queryParam)
        console.log('loadData: ', param)

        // Must be a Promise not just return
        return apiLoadTrades(token, param).
          then(res => {
            console.log('res', res)
            return res
          }).catch(e => {
            console.error(e)
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  methods: {
    handleRowChange(value, key, column, record) {
      console.log('handleRowChange', value, key, column)
      record[column.dataIndex] = value
    },
    submitTopForm(e) {
      const that = this
      console.log('submitTopForm', e)
      e.preventDefault()

      // todo: not validating ....
      this.form.validateFields((err, values) => {

        if (err) {
          this.$notification['error']({
            message: 'Ops',
            description: 'Validation Error, Please give more info'
          })
          return
        }

        // casting
        values.project_id = parseInt(values.project_id) || 0
        values.category_id = parseInt(values.category_id) || 0
        console.log('err and values after cast', err, values)

        const token = Vue.ls.get(ACCESS_TOKEN)

        addTrade(token, values).then(res => {
          console.debug('add trades resp:', res)
          // refresh on success
          that.$refs.table.refresh()
          return res.data
        }).catch(e => {
          console.warn(e)

          this.$notification['error']({
            message: 'Server Error: ',
            description: JSON.stringify(e)
          })

        }).finally(()=>{
          this.memberLoading = false
        })

      })
    },
    edit(row) {
      row.editable = true
      console.log('edit row', row)
    },
    del(row) {
      const that = this
      console.log('del')
      // FORMAT
      this.$confirm({
        title: 'Warn',
        content: [
          'Delete: ' + row.id,
          ' Category: ' + row.cat,
          ' Subtitle: ' + row.subtitle + ' ?'
        ],
        okText: 'Delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk() {
          console.log('OK del')
          // calling deleting api
          return new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            setTimeout(() => {
              that.$refs.table.refresh()
              resolve()
            }, 1000)
          }).catch((e) =>
            console.log('Oops errors!', e)
          )
        },
        onCancel() {
          console.log('Cancel del')
        }
      })
    },
    save(row) {
      const that = this
      console.log('save', row)
      // This could talk to BackEnd or FrontEnd only !!
      this.memberLoading = true
      // FORMAT
      const { pid, cid, cat, subtitle } = row
      if (!pid || !cid || !cat || !subtitle) {
        this.memberLoading = false
        this.$message.error('Please fill in data completely')
        return
      }

      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 300)
      }).then(() => {
        this.memberLoading = false
        that.$refs.table.refresh()
      })
    },
    cancel(row) {
      row.editable = false
      this.$refs.table.refresh()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log('onSelectChange', selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
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
