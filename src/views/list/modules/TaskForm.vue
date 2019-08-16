<template>
<<<<<<< HEAD
  <a-modal title="Add Project"
           :width="640" :visible="visible"
           :confirmLoading="confirmLoading"
           @ok="handleSubmit"
           @cancel="visible = false">
    <a-form :form="form" @submit="handleSubmit">
=======
  <a-modal
    title="Add Project"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="visible = false">
    <a-form
      :form="form"
      @submit="handleSubmit">
>>>>>>> master
      <a-form-item label="Name" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['name', {rules:[{required: true, message: 'Please type in project name'}]}]" />
      </a-form-item>

<<<<<<< HEAD
      <a-form-item label="SerialNo" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['sn', {rules:[{required: true, message: 'Please type in serial number'}]}]" />
      </a-form-item>

      <a-form-item label="Address" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['address', {rules:[{required: true, message: 'Please type in address'}]}]" />
      </a-form-item>

      <a-form-item label="TotalContractValue" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['tcv', {rules:[{required: true, message: 'Total contract value missing'}]}]" />
      </a-form-item>

      <a-form-item label="Qs" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input v-decorator="['qs', {rules:[{required: true, message: 'Qs Person'}]}]" />
      </a-form-item>

      <!--multiple chose, don't misuse v-model-->
      <a-form-item label="Manager" :labelCol="labelCol" :wrapperCol="wrapperCol" v-model="managers">
        <a-select mode="multiple" labelInValue
                  placeholder="Type Manager First name to chose" style="width: 100%" :filterOption="false"
                  @search="fetchUser"
                  @change="handleChange"
                  :notFoundContent="fetching ? undefined : null"
                  v-decorator="['manager_id', {rules:[{required: true, message:'Please put manager id'}]}]">
=======
      <!--      <a-form-item label="Start" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
      <!--        <a-date-picker style="width: 100%"-->
      <!--                       v-decorator="['startTime', {rules:[{required: true, message: 'Please pick a start time'}]}]">-->
      <!--        </a-date-picker>-->
      <!--      </a-form-item>-->

      <!--todo: multiple chose, don't misuse v-model-->
      <a-form-item v-model="managers" label="Manager" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-select
          v-decorator="['manager_id', {rules:[{required: true, message:'Please put manager id'}]}]"
          mode="multiple"
          labelInValue
          placeholder="Select users"
          style="width: 100%"
          :filterOption="false"
          :notFoundContent="fetching ? undefined : null"
          @search="fetchUser"
          @change="handleChange"
        >
>>>>>>> master
          <a-spin v-if="fetching" slot="notFoundContent" size="small"/>
          <a-select-option v-for="d in data" :key="d.value">
            {{ d.text }}
          </a-select-option>
        </a-select>
      </a-form-item>

<<<<<<< HEAD
      <a-form-item label="Notes" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-textarea v-decorator="['notes']"></a-textarea>
      </a-form-item>

      <a-alert v-if="submitError"
        message="Error"
        :description="submitError"
        type="error"
        showIcon
      />
=======
      <!--      <a-form-item label="Description" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
      <!--        <a-textarea v-decorator="['desc']"></a-textarea>-->
      <!--      </a-form-item>-->
>>>>>>> master
    </a-form>
  </a-modal>
</template>

<script>
  import debounce from 'lodash/debounce'
  import Vue from 'vue'
  import { mapActions } from 'vuex'
  import { ACCESS_TOKEN, USER_ID } from '@/store/mutation-types'
  import { apiCreateProject } from '@/api/project'
  import { getUserList } from '@/api/manage' // default import used, not named import

<<<<<<< HEAD
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
      submitError: '',
    }
  },
  methods: {
    ...mapActions(['CreateProject']),
    add () {
      this.visible = true
=======
  export default {
    name: 'TaskForm',
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 },
        },
        visible: false,
        confirmLoading: false,
        form: this.$form.createForm(this),
        data: [],
        managers: [],
        fetching: false,
      }
>>>>>>> master
    },
    mounted() {
      this.fetchUser = debounce(this.fetchUser, 800)
      this.lastFetchId = 0
    },
    methods: {
      ...mapActions(['CreateProject']),
      add() {
        this.visible = true
      },
      edit(record) {
        // destruct form.setFieldValue to local, I bet u can't do const { setFieldsValue } = this
        const { form: { setFieldsValue } } = this
        this.visible = true
        this.$nextTick(() => {
          setFieldsValue({ taskName: 'test' })
        })
        console.log(record)
      },
      fetchUser(value) {
        console.log('fetching user:', value)
        this.lastFetchId += 1
        const fetchId = this.lastFetchId
        this.data = [] // multiple user in select
        this.fetching = true // spinning

        const token = Vue.ls.get(ACCESS_TOKEN)
        getUserList(token)
          .then((body) => {
            console.log(body)
            // for fetch callback order
            if (fetchId !== this.lastFetchId) {
              return
            }
            // note: change model
            this.data = body.users.map((u) => ({
              text: u.result.email,
              value: `${u.result.id}`,
            }))

            console.log('this.data:', this.data)
            this.fetching = false
          })
      },
      handleChange(managers) {
        console.log('handleChange: ', managers)
        Object.assign(this, {
          value: managers,
          data: [],
          fetching: false, // mouse over, don't show spinning
        })
      },
      handleSubmit(e) {
        e.preventDefault()

<<<<<<< HEAD
      // offloading variables from this
      const {
        form: { validateFields },
        // $message
      } = this
=======
        // offloading variables from this
        const {
          form: { validateFields },
        } = this
>>>>>>> master

        this.visible = true

<<<<<<< HEAD
      validateFields((errors, values) => {
        if (errors) {
          console.log('TaskForm.Vue validation errors:', errors)
          return
        } else {
          console.log('TaskFrom: submit values:', values)
        }
=======
        validateFields((errors, values) => {
          if (!errors) {
            console.log('TaskForm.Vue, errors:', errors)
          }
          console.log('TaskFrom: submit values:', values)
>>>>>>> master

          this.confirmLoading = true

          const token = Vue.ls.get(ACCESS_TOKEN)
          const user_id = Vue.ls.get(USER_ID)

<<<<<<< HEAD
        // note: api format
        let params = {
          project: {
            manager_id : parseInt(values.manager_id[0].key),
            creator_id : user_id,
            name: values.name,
            serial_no: values.sn,
            address: values.address,
            total_contract_value: parseFloat(values.tcv),
            quantity_surveyor: values.qs,
            notes: values.notes,
          }
        }

        // only pick the first one as manager, cuz db
        apiCreateProject(token, params)
          .then((res) => {
            console.log('project created !', res)
            // close dialog
            this.visible = false;
            this.confirmLoading = false;
            // todo: improve to have component reload, send signal to parent
            window.location.reload()
          }).catch((e) => {
            console.log(e)
            console.log(e.response)

            const status = e.response.status
            if (e.data !== 'undefined') {
              const data = e.response.data.errors.body
              this.submitError = `Code:${status} ${data}`
            } else {
              const data = e.response
              this.submitError = `Code:${status} ${data}`
            }
            this.confirmLoading = false
          })
      })

    }
=======
          // note: api format
          const params = {
            project: {
              name: values.name,
              creator_id: user_id,
              manager_id: parseInt(values.manager_id[0].key),
            },
          } // only pick the first one as manager, cuz db
          apiCreateProject(token, params).then((res) => {
            console.log('project created !', res)
            // close dialog
            this.visible = false
            this.confirmLoading = false
          }).catch((e) => {
            console.log('Taskform: submit error: ', e)
            this.confirmLoading = false
          })
        })
      },
    },
>>>>>>> master
  }
</script>
