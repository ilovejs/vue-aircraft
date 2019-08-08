<template>
  <a-modal :width="640" :visible="visible" title="Add Project" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form">

      <a-form-item label="Name" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['taskName', {rules:[{required: true, message: 'Please type in project name'}]}]" />
      </a-form-item>

      <a-form-item label="Start" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-date-picker style="width: 100%"
                       v-decorator="['startTime', {rules:[{required: true, message: 'Please pick a start time'}]}]">
        </a-date-picker>
      </a-form-item>

      <a-form-item label="Owner" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select v-decorator="['owner', {rules:[{required: true, message: 'Pick start time'}]}]">
          <a-select-option :value="0">付晓晓</a-select-option>
          <a-select-option :value="1">周毛毛</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Description" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea v-decorator="['desc']"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'TaskForm',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },

      visible: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    edit (record) {
      const { form: { setFieldsValue } } = this
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({ taskName: 'test' })
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    }
  }
}
</script>
