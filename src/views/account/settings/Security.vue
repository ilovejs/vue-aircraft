<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data">
    <a-list-item slot="renderItem" :key="index" slot-scope="item, index">

      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>

      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
  </a-list>
</template>

<script>
  export default {
    data() {
      return {
        data: [
          {
            title: 'Account password',
            description: 'Current strength',
            value: 'strong',
            actions: {
              title: 'Change',
              callback: () => { this.$message.info('This is a normal message') },
            },
          },
          {
            title: 'Email',
            description: 'bind with email',
            value: '',
            actions: {
              title: 'bind',
              callback: () => { this.$message.info('This is a normal message') },
            },
          },
        ],
      }
    },
  }
</script>

<style scoped>

</style>
