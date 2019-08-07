<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="TODO" content="8 tasks" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="Avg Process Time this week" content="32mins" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="Task done this week" content="24 items"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="Standard List">
      <div slot="extra">
        <a-radio-group>
          <a-radio-button>All</a-radio-button>
          <a-radio-button>Ongoing</a-radio-button>
          <a-radio-button>Pending</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="$refs.taskForm.add()">Add</a-button>
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>Edit</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>Edit</a></a-menu-item>
                <a-menu-item><a>Del</a></a-menu-item>
              </a-menu>
              <a>More<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>Start</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>

      <task-form ref="taskForm" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from './modules/TaskForm'

const data = []
data.push({
  title: 'Master pay',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  description: 'asdfasdfasdfasdfasdf',
  owner: 'xxxx',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 90
  }
})
data.push({
  title: 'Angular',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  description: 'asdfasdfasdfasfasdfasdfas 241234',
  owner: 'asdfasf',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 54
  }
})
data.push({
  title: 'Ant Design',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  description: '23r423423423',
  owner: 'xxx',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 66
  }
})

export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    TaskForm
  },
  data () {
    return {
      data
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
