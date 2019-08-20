<template>
  <a-modal
    title="Action"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          label="Parent ID"
        >
          <a-input v-decorator="['parentId', {}]" disabled />
        </a-form-item>

        <a-form-item
          label="Org name"
        >
          <a-input v-decorator="['orgName', {}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  export default {
    name: 'OrgModal',
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        visible: false,
        confirmLoading: false,
        mdl: {},
      }
    },
    beforeCreate() {
      this.form = this.$form.createForm(this)
      console.log('form::', this.form)
    },
    created() {

    },
    methods: {
      add(id) {
        this.edit({ parentId: id })
      },
      edit(record) {
        this.mdl = { ...record }
        this.visible = true
        this.$nextTick(() => {
          this.form.setFieldsValue({ ...record })
        })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const _this = this

        this.form.validateFields((err, values) => {

          if (!err) {
            console.log('form values', values)

            _this.confirmLoading = true

            new Promise((resolve) => {
              setTimeout(() => resolve(), 2000)
            }).then(() => {
              // Do something
              _this.$message.success('Saved')
              _this.$emit('ok')
            }).catch(() => {
            // Do something
            }).finally(() => {
              _this.confirmLoading = false
              _this.close()
            })
          }
        })
      },
      handleCancel() {
        this.close()
      },

    },
  }
</script>
