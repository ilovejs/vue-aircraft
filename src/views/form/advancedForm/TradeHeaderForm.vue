<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">

      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="Owner">
          <a-input placeholder="Please type Owner id"
                   v-decorator="[ 'name2', {rules: [{ required: true, message: 'Owner id', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>

      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="Description">
          <a-input placeholder="Please give a description for breakdown"
                   v-decorator="[ 'url2', {rules: [{ required: true, message: 'Description for breakdown', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>

      <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="Category">
          <a-select
            placeholder="Pick category"
            v-decorator="[
              'category',
              {rules: [{ required: true, message: 'Please pick a trade category'}]}
            ]" >
            <a-select-option value="Contrete">C</a-select-option>
            <a-select-option value="Wood">W</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>

  </a-form>
</template>

<script>
export default {
  name: 'TradeHeaderForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
