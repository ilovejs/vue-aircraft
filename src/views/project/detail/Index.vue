<template>
  <a-card v-model="project" :bordered="false">
    <!--select project todo: review projects, unused ?
    -->
    <detail-list title="" >
      <detail-list-item term="Project">
        <a-select placeholder="Pick a Project" style="width: 100%;" name="project"
          :value="chosenProject"
          v-decorator="['project_id', { rules: [{ required: true, message: 'Please pick project'}] }]"
          :loading="fetching"
          :notFoundContent="fetching ? undefined : null"
          @focus="fetchProject"
          @change="handleProjectChange"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
          <a-select-option v-for="p in projectList" :key="p.value">
            {{p.text}}
          </a-select-option>
        </a-select>
      </detail-list-item>
    </detail-list>
    <!--detail page-->
    <detail-list title="">
      <detail-list-item term="Id">{{ project.id }}</detail-list-item>
      <detail-list-item term="Project Number">{{ project.serial_no }}</detail-list-item>
      <detail-list-item term="Name">{{ project.name }}</detail-list-item>
      <detail-list-item term="Address">{{ project.address }}</detail-list-item>
      <detail-list-item term="Total Contract Value">
        {{ project.total_contract_value }}
      </detail-list-item>
      <detail-list-item term="Notes">{{ project.notes }}</detail-list-item>
    </detail-list>
<!--    <a-divider style="margin-bottom: 32px"/>-->

    <detail-list title="">
      <detail-list-item term="Manager">{{ project.manager_id }}</detail-list-item>
      <detail-list-item term="Creator">{{ project.creator_id }}</detail-list-item>
      <detail-list-item term="Qs">{{ project.quantity_surveyor }}</detail-list-item>
    </detail-list>
<!--    <a-divider style="margin-bottom: 32px"/>-->

    <!--table pagination https://blog.csdn.net/romeo12334/article/details/88710802-->
    <a-alert type="success" showIcon style="margin-bottom: 5px">
      <template slot="message">
        <span>Subtotal Contract Value:
          <a style="font-weight: 600; color: green">
            {{ this.subtotal }}
          </a>
        </span>
      </template>
    </a-alert>

    <!--check table/index.js-->
<!--      <template v-for="item in this.selectedRowKeys">-->
<!--        <span>-->
<!--          {{ item }}-->
<!--        </span>-->
<!--      </template>-->

    <s-table ref="table" size="default"
             :pageSize.sync="pageSize"
             :columns="columns"
             :data="loadData"
             :alert="{ show: true, clear: true }"
             :loading="memberLoading"
             :rowSelection="{ selectedRowKeys: this.selectedRowKeys,
                   onChange: this.onSelectChange}"
    >
      <template v-for="(col, index) in columns"
                :slot="col.dataIndex"
                slot-scope="text, record">
        <div :key="index">
          {{ text }}
        </div>
      </template>
    </s-table>
  </a-card>
</template>

<script>
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import { ACCESS_TOKEN } from '@/store/mutation-types'
  import { STable } from '@/components'
  import DetailList from '@/components/tools/DetailList'
  import { loadProjects, loadSingleProject } from '@/api/project'
  import { apiProjectTrades } from '@/api/trade'
  const DetailListItem = DetailList.Item

  export default {
    name: 'ProjectDetailView',
    components: {
      STable,
      DetailList,
      DetailListItem,
    },
    data() {
      return {
        token: Vue.ls.get(ACCESS_TOKEN),
        // select component
        fetching: false,
        projectList: [],
        chosenProject: [],
        // table component
        subtotal: 0,
        needTotalList: [],
        memberLoading: false,
        pageSize: 40, // doc: https://vue.ant.design/components/pagination/
        pagination: {
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '40'],
        },
        columns: [
          {
            title: 'Id',
            dataIndex: 'id',
            width: '25%',
            sorter: true
          },
          {
            title: 'Category',
            dataIndex: 'cat',
            width: '25%',
            sorter: true
          },
          {
            title: 'Level',
            dataIndex: 'level',
            width: '25%',
            sorter: true
          },
          {
            title: 'Contract Value',
            dataIndex: 'contract_value',
            width: '25%',
            sorter: true
          },
        ],
        trades: [],
        project: {},
        selectedRowKeys: [],
        selectedRows: [],
        queryParam: {},
        loadData: query_params => {
          console.warn('query_params', query_params)
          let pid = this.$route.params.projectId
          if (!pid) {
            return { data: []}
          }
          // for table pagination params
          return apiProjectTrades(this.token, pid,
            Object.assign(query_params, this.queryParam)
          ).then(r => {
            // this.trades = r['data']
            console.log('api projectTrades:', r.data)
            // NOTE: purely return r yield Promise type, access data to
            // convert as a function for loadData ?
            return r
          }).catch(e => {
            console.warn(e)
            return e
          })
        },
      }
    },
    beforeMount () {
      // Load project detail page
      let pid = this.$route.params.projectId
      if (pid) {
        this.initProjectDetail(pid)
      }
    },
    methods: {
      ...mapActions(['ListProjects']),
      initProjectDetail(pid) {
        console.warn('pid: ', pid)
        loadSingleProject(this.token, pid).then((res) => {
          console.log('loadSingleProject !', res['project'])
          // load into v-model immediately, rather than
          // either warp in Promise again OR resolve
          this.project = res['project']
          // Load the dropdown bar
          this.chosenProject = res['project'].name
        }).catch((e) => {
          console.log(e)
        })
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        console.log('onSelectChange', selectedRowKeys, selectedRows)
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
        this.subtotal = selectedRows.reduce( (sum, val) => {
          return sum + val['contract_value']
        }, 0)
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      fetchProject(){
        // Lazy
        console.log('fetchProject')
        this.fetching = true
        loadProjects(this.token).then((res) => {
          // Fill dropdown options
          this.projectList = res['projects'].map((item) => ({
            text: item.project.name,
            value: `${item.project.id}`
          }))
          console.debug('fetched projectList:', this.projectList)
        }).catch(e => {
          console.debug(e)
        }).finally(() => {
          this.fetching = false
        })
      },
      handleProjectChange(v) {
        let projectName = this.projectList.filter(p => p.value === v)[0].text
        console.warn(
          'handleProjectChange by pid ', v
          ,'projectName', projectName
        )

        Object.assign(this, {
          chosenProject: projectName,
          fetching: false
        })

        // new tab for chosen project
        this.$router.push({
          path: '/project/detail/' + v,
          query: {
            projectName: projectName
          }
        })
      },
    },
    // watch: {
    //   'selectedRows': function (selectedRows) {
    //     console.warn(this.needTotalList)
    //     this.needTotalList = this.needTotalList.map(item => {
    //       console.warn(item)
    //       return {
    //         ...item,
    //         total: selectedRows.reduce( (sum, val) => {
    //           // which row to do accounting
    //           return sum + val[item.dataIndex]
    //         }, 0)
    //       }
    //     })
    //   }
    // },
  }
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
