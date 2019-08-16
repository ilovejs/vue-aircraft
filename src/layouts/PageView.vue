<template>
  <div :style="!$route.meta.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : null">
    <!-- pageHeader , route meta :true on hide -->
    <page-header v-if="!$route.meta.hiddenHeaderContent" :title="pageTitle" :logo="logo" :avatar="avatar">
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div v-if="!this.$slots.headerContent && description" slot="content">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ description }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon" />&nbsp;<span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra">
        <div class="extra-img">
          <img v-if="typeof extraImage !== 'undefined'" :src="extraImage"/>
        </div>
      </slot>
      <div slot="pageMenu">
        <div v-if="search" class="page-menu-search">
          <a-input-search
            style="width: 80%; max-width: 522px;"
            placeholder="Please type..."
            size="large"
            enterButton="Search"></a-input-search>
        </div>
        <div v-if="tabs && tabs.items" class="page-menu-tabs">
          <!-- @change="callback" :activeKey="activeKey" -->
          <a-tabs :tabBarStyle="{margin: 0}" :activeKey="tabs.active()" @change="tabs.callback">
            <a-tab-pane v-for="item in tabs.items" :key="item.key" :tab="item.title"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </page-header>
    <div class="content">
      <div class="page-header-index-wide">
        <slot>
          <!-- keep-alive originally use v-if="multiTab" -->
          <!--          <keep-alive v-if="$route.meta.keepAlive" exclude="ProjectDetailView">-->
          <!--            <router-view ref="content" class="keepAlive"/>-->
          <!--          </keep-alive>-->
          <!--          <router-view v-if="!$route.meta.keepAlive" exclude="ProjectDetailView"-->
          <!--                       ref="content" class="noKeepALive" />-->
          <keep-alive :include="cachedViews">
            <router-view :key="key" ref="content"/>
          </keep-alive>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import PageHeader from '@/components/PageHeader'

  export default {
    name: 'PageView',
    components: {
      PageHeader,
    },
    props: {
      avatar: {
        type: String,
        default: null,
      },
      title: {
        type: [String, Boolean],
        default: true,
      },
      logo: {
        type: String,
        default: null,
      },
      directTabs: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        pageTitle: null,
        description: null,
        linkList: [],
        extraImage: '',
        search: false,
        tabs: {},
      }
    },
    computed: {
      ...mapState({
        multiTab: (state) => state.app.multiTab,
      }),
      /* patch */
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.fullPath
      },
    },
    mounted() {
      this.tabs = this.directTabs
      this.getPageMeta()
    },
    updated() {
      this.getPageMeta()
    },
    methods: {
      getPageMeta() {
        // eslint-disable-next-line
      this.pageTitle = (typeof(this.title) === 'string' || !this.title) ? this.title : this.$route.meta.title

        const { content } = this.$refs
        if (content) {
          if (content.pageMeta) {
            Object.assign(this, content.pageMeta)
          } else {
            this.description = content.description
            this.linkList = content.linkList
            this.extraImage = content.extraImage
            this.search = content.search === true
            this.tabs = content.tabs
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .content {
    margin: 24px 24px 0;
    .link {
      margin-top: 16px;
      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }
  .page-menu-tabs {
    margin-top: 48px;
  }

  .extra-img {
    margin-top: -60px;
    text-align: center;
    width: 195px;

    img {
      width: 100%;
    }
  }

  .mobile {
    .extra-img{
      margin-top: 0;
      text-align: center;
      width: 96px;

      img{
        width: 100%;
      }
    }
  }
</style>
