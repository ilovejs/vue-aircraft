<template>
  <div class="card-list" ref="content">
    <div class="operate" style="padding-bottom: 1%;">
      <a-button type="dashed" style="width: 100%;"
                icon="plus" @click="$refs.NewProjectForm.add()">Add</a-button>
    </div>
    <!--modal for add project-->
    <task-form ref="NewProjectForm"></task-form>

    <!--responsive column number-->
    <a-list
      :grid="{gutter: 24, xxl:6, xl:4, lg: 4, md: 2, sm: 1, xs: 1}"
      :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :hoverable="true" style="">
          <img slot="cover" alt="project image" :src="item.coverImage"/>
          <a-card-meta>
            <div slot="title">{{ item.name }} {{ item.address }}</div>
            <a-avatar slot="avatar" class="card-avatar" :src="item.avatar" size="small"/>
            <div slot="description" class="meta-content">
              ${{ item.total_contract_value }}<br>
              Qs: {{ item.quantity_surveyor }}<br>
              Notes: {{ item.notes }}
            </div>
          </a-card-meta>

          <template slot="actions" class="ant-card-actions">
            <router-link
              :to="{ name: 'profile' }">
              <a-icon type="setting" />
            </router-link>

            <router-link
              :to="{ name: 'ProjectDetail', params: { projectId: item.id } }">
              <a-icon type="edit" />
            </router-link>
          </template>
        </a-card>
      </a-list-item>

    </a-list>
  </div>

</template>

<script>

import Vue from 'vue'
import { mapActions } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import store from '../../store'
import TaskForm from './modules/TaskForm'

export default {
  name: 'ProjectCardList',
  components: {
    TaskForm
  },
  data () {
    // Belongs to PageView, see in dev tools
    return {
      description: 'A recent view of ongoing projects',
      linkList: [
        // { icon: 'plus', href: '#', title: 'Add project' },
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
  beforeMount() {
    const token = Vue.ls.get(ACCESS_TOKEN)
    const that = this
    let projects = []

    store.dispatch('ListProjects', { token: token })
      .then(res => {
        const result = res.projects

          projects = result.map((p) => {
            // todo: fix the back
            p.project.coverImage = '/project/construction-1.png'
            p.project.avatar = '/avatar/44.jpg'
            return p.project
          })

          console.log('dispatch list project:', projects)
          that.dataSource = projects
        })
    },
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
