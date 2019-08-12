<template>
  <div class="card-list" ref="content">
    <!--responsive column number-->
    <a-list
      :grid="{gutter: 24, xxl:6, xl:4, lg: 4, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
          <a-card :hoverable="true" style="">
            <img alt="project image" :src="item.coverImage" slot="cover"/>
            <a-card-meta>
              <div slot="title">{{ item.name }} {{ item.address }}</div>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="small"/>
              <div class="meta-content" slot="description">
                ${{ item.total_contract_value }}<br>
                Qs: {{ item.quantity_surveyor }}<br>
                Notes: {{ item.notes }}
              </div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a-icon type="setting" />
              <a-icon type="edit" />
            </template>
          </a-card>
      </a-list-item>

    </a-list>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Vue from 'vue'
import store from '../../store'

export default {
  name: 'ProjectCardList',
  data () {
    return {
      description: 'A recent view of ongoing projects',
      linkList: [
        { icon: 'plus', href: '#', title: 'Add project' },
        { icon: 'rocket', href: '#', title: 'Quick start' },
        { icon: 'info-circle-o', href: '#', title: 'Intro' },
        { icon: 'file-text', href: '#', title: 'Documents' }
      ],
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource: []
    }
  },
  methods: {
    ...mapActions(['ListProjects'])
  },
  beforeMount(){
    let token = Vue.ls.get(ACCESS_TOKEN)
    let projects = []
    let that = this

    store.dispatch('ListProjects', {token:token}).
      then(res => {
        const result = res.projects

        projects = result.map(p => {
            p.project.coverImage = '/project/airport.png'
            return p.project
        })

        console.log('dispatch list project:', projects)
        that.dataSource = projects
      })
  }
}
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;
    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /*height: 64px;*/
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
