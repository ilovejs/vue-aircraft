<template>
    <a-card :bordered="false" v-model="project">
      <detail-list title="Info">
        <detail-list-item term="id">{{project.id}}</detail-list-item>
        <detail-list-item term="serial no">{{project.serial_no}}</detail-list-item>
        <detail-list-item term="name">{{project.name}}</detail-list-item>
        <detail-list-item term="address">{{project.address}}</detail-list-item>
        <detail-list-item term="total_contract_value">
          {{project.total_contract_value}}
        </detail-list-item>
        <detail-list-item term="notes">{{project.notes}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>

      <detail-list title="Related Person">
        <detail-list-item term="manager">{{project.manager_id}}</detail-list-item>
        <detail-list-item term="creator">{{project.creator_id}}</detail-list-item>
        <detail-list-item term="qs">{{project.quantity_surveyor}}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
    </a-card>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
import { apiLoadSingleProject } from '@/api/project'

export default {
  name: 'ProjectDetailView',
  components: {
    DetailList,
    DetailListItem,
  },
  methods: {
    loadProject(pid) {
      const token = Vue.ls.get(ACCESS_TOKEN)

      apiLoadSingleProject(token, pid).
        then(res => {
          console.log('apiLoadSingleProject !', res.project)
          // load into v-model immediately, rather than
          // either warp in Promise again OR resolve
          this.project = res.project
        }).catch(e => {
          console.log(e)
        })
    }
  },
  data () {
    return {
      project: {
        // id: 0,
        // name: '',
        // manager_id: 0,
        // creator_id: 0,
        // serial_no: ''
      }
    }
  },
  beforeMount() {
    this.loadProject(
      this.$route.params.projectId
    )
  }
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
