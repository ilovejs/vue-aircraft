<template>
  <a-modal title="Add Project"
           :width="640" :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           @cancel="visible = false">
    <a-form
      :form="form"
      @submit="handleSubmit">
      <a-form-item label="Name" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', {rules:[{required: true, message: 'Please type in project name'}]}]" />
      </a-form-item>

<!--      <a-form-item label="Start" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--        <a-date-picker style="width: 100%"-->
<!--                       v-decorator="['startTime', {rules:[{required: true, message: 'Please pick a start time'}]}]">-->
<!--        </a-date-picker>-->
<!--      </a-form-item>-->

      <!--todo: multiple chose, don't misuse v-model-->
      <a-form-item label="Manager" :labelCol="labelCol" :wrapperCol="wrapperCol" v-model="managers">
        <a-select mode="multiple" labelInValue
                  placeholder="Select users" style="width: 100%" :filterOption="false"
                  @search="fetchUser"
                  @change="handleChange"
                  :notFoundContent="fetching ? undefined : null"
                  v-decorator="['manager_id', {rules:[{required: true, message:'Please put manager id'}]}]"
        >
          <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
          <a-select-option v-for="d in data" :key="d.value">
            {{d.text}}
          </a-select-option>
        </a-select>
      </a-form-item>

<!--      <a-form-item label="Description" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--        <a-textarea v-decorator="['desc']"></a-textarea>-->
<!--      </a-form-item>-->
    </a-form>
  </a-modal>
</template>

<script>
import debounce from 'lodash/debounce'
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ACCESS_TOKEN, USER_ID } from '@/store/mutation-types'
import { apiCreateProject } from '@/api/project'
import { getUserList } from '@/api/manage'  // default import used, not named import

export default {
  name: 'TaskForm',
  mounted () {
    this.fetchUser = debounce(this.fetchUser, 800)
    this.lastFetchId = 0
  },
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
      confirmLoading: false,
      form: this.$form.createForm(this),
      data: [],
      managers: [],
      fetching: false,
    }
  },
  methods: {
    ...mapActions(['CreateProject']),
    add () {
      this.visible = true
    },
    edit (record) {
      // destruct form.setFieldValue to local, I bet u can't do const { setFieldsValue } = this
      const { form: { setFieldsValue } } = this
      this.visible = true
      this.$nextTick(() => {
        setFieldsValue({ taskName: 'test' })
      })
      console.log(record)
    },
    fetchUser(value){
      console.log('fetching user:', value)
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.data = [] // multiple user in select
      this.fetching = true //spinning

      const token = Vue.ls.get(ACCESS_TOKEN)
      getUserList(token)
        .then(body => {
          console.log(body)
          // for fetch callback order
          if (fetchId !== this.lastFetchId) {
            return;
          }
          // note: change model
          this.data = body.users.map(u => ({
            text: u.result.email,
            value: ''+ u.result.id
          }))

          console.log('this.data:', this.data)
          this.fetching = false
        })
    },
    handleChange (managers) {
      console.log('handleChange: ', managers)
      Object.assign(this, {
        value: managers,
        data: [],
        fetching: false, //mouse over, don't show spinning
      })
    },
    handleSubmit (e) {
      e.preventDefault()

      // offloading variables from this
      const {
        form: { validateFields },
      } = this

      this.visible = true

      validateFields((errors, values) => {
        if (!errors) {
          console.log('TaskForm.Vue, errors:', errors)
        }
        console.log('TaskFrom: submit values:', values)

        this.confirmLoading = true;

        const token = Vue.ls.get(ACCESS_TOKEN)
        const user_id = Vue.ls.get(USER_ID)

        // note: api format
        let params = {
          project: {
            name: values.name,
            creator_id : user_id,
            manager_id : parseInt(values.manager_id[0].key)
          }
        } // only pick the first one as manager, cuz db
        apiCreateProject(token, params).then(res => {
          console.log('project created !', res)
          // close dialog
          this.visible = false;
          this.confirmLoading = false;
        }).catch(e => {
          console.log('Taskform: submit error: ', e)
          this.confirmLoading = false
        })
      })

    }
  }
}
</script>
