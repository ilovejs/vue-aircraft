<template>
  <div class="main user-layout-register">
    <h3><span>Registration</span></h3>
    <a-form id="formRegister" ref="formRegister" :form="form">
      <!--item 1-->
      <a-form-item>
        <a-input
          v-decorator="['email', {rules: [{ required: true, type: 'email', message: 'Please input Email' }], validateTrigger: ['change', 'blur']}]"
          size="large"
          type="text"
          placeholder="Email"
        ></a-input>
      </a-form-item>
      <!--right of input-->
      <a-popover
        v-model="state.passwordLevelChecked"
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement">
        <template slot="content">
          <div :style="{ width: '240px' }" >
            <div :class="['user-register', passwordLevelClass]">Strength: <span>{{ passwordLevelName }}</span></div>
            <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
            <div style="margin-top: 10px;">
              <span>Please input >= 6 character.</span>
            </div>
          </div>
        </template>
        <!--item 2-->
        <a-form-item>
          <a-input
            v-decorator="['password', {rules: [{ required: true, message: 'At least 6 character (case sensitive)'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
            size="large"
            type="password"
            autocomplete="false"
            placeholder="At lease 6 case-sensitive letter or number"
            @click="handlePasswordInputClick"
          ></a-input>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input
          v-decorator="['password2', {rules: [{ required: true, message: 'At least 6 character (case sensitive)' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
          size="large"
          type="password"
          autocomplete="false"
          placeholder="Confirm Password"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          v-decorator="['mobile', {rules: [{ required: true, message: 'Please input right mobile format', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"
          placeholder="Mobile has 9 digits including 0"
          size="large">
          <a-select slot="addonBefore" size="large" defaultValue="+61">
            <a-select-option value="+61">+61</a-select-option>
            <!--            <a-select-option value="+61">+61</a-select-option>-->
          </a-select>
        </a-input>
      </a-form-item>

      <!--      <a-row :gutter="16">-->
      <!--        <a-col class="gutter-row" :span="16">-->
      <!--          <a-form-item>-->
      <!--            <a-input size="large" type="text" placeholder="SMS token" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">-->
      <!--              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>-->
      <!--            </a-input>-->
      <!--          </a-form-item>-->
      <!--        </a-col>-->
      <!--        <a-col class="gutter-row" :span="8">-->
      <!--          <a-button-->
      <!--            class="getCaptcha"-->
      <!--            size="large"-->
      <!--            :disabled="state.smsSendBtn"-->
      <!--            @click.stop.prevent="getCaptcha"-->
      <!--            v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>-->
      <!--        </a-col>-->
      <!--      </a-row>-->

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          :disabled="registerBtn"
          @click.stop.prevent="handleSubmit">Register
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">Login</router-link>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
  import { mixinDevice } from '@/utils/mixin.js'
  import { getSmsCaptcha } from '@/api/login'

  const levelNames = {
    0: 'Low',
    1: 'Low',
    2: 'Medium',
    3: 'Strong',
  }
  const levelClass = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'success',
  }
  const levelColor = {
    0: '#ff0000',
    1: '#ff0000',
    2: '#ff7e05',
    3: '#52c41a',
  }
  export default {
    name: 'Register',
    components: {
    },
    mixins: [mixinDevice],
    data() {
      return {
        form: this.$form.createForm(this),

        state: {
          time: 60,
          smsSendBtn: false,
          passwordLevel: 0,
          passwordLevelChecked: false,
          percent: 10,
          progressColor: '#FF0000',
        },
        registerBtn: false,
      }
    },
    computed: {
      passwordLevelClass() {
        return levelClass[this.state.passwordLevel]
      },
      passwordLevelName() {
        return levelNames[this.state.passwordLevel]
      },
      passwordLevelColor() {
        return levelColor[this.state.passwordLevel]
      },
    },
    watch: {
      'state.passwordLevel': function (val) {
        console.log(val)
      },
    },
    methods: {
      handlePasswordLevel(rule, value, callback) {
        let level = 0

        // number in string ?
        if (/[0-9]/.test(value)) {
          level += 1
        }
        if (/[a-zA-Z]/.test(value)) {
          level += 1
        }
        // special char
        if (/[^0-9a-zA-Z_]/.test(value)) {
          level += 1
        }
        this.state.passwordLevel = level
        this.state.percent = level * 30
        if (level >= 2) {
          if (level >= 3) {
            this.state.percent = 100
          }
          callback()
        } else {
          if (level === 0) {
            this.state.percent = 10
          }
          callback(new Error('Lack of password strength'))
        }
      },

      handlePasswordCheck(rule, value, callback) {
        const password = this.form.getFieldValue('password')
        console.log('value', value)
        if (value === undefined) {
          callback(new Error('Please type password'))
        }
        if (value && password && value.trim() !== password.trim()) {
          callback(new Error('Not same password as above'))
        }
        callback()
      },

      handlePhoneCheck(rule, value, callback) {
        console.log('handlePhoneCheck, rule:', rule)
        console.log('handlePhoneCheck, value', value)
        console.log('handlePhoneCheck, callback', callback)

        callback()
      },

      handlePasswordInputClick() {
        if (!this.isMobile()) {
          this.state.passwordLevelChecked = true
          return
        }
        this.state.passwordLevelChecked = false
      },

      handleSubmit() {
        const { form: { validateFields }, state, $router } = this
        validateFields({ force: true }, (err, values) => {
          if (!err) {
            state.passwordLevelChecked = false
            $router.push({ name: 'registerResult', params: { ...values } })
          }
        })
      },

      getCaptcha(e) {
        e.preventDefault()
        const {
          form: { validateFields }, state, $message, $notification,
        } = this

        validateFields(['mobile'], { force: true },
                       (err, values) => {
                         if (!err) {
                           state.smsSendBtn = true

                           const interval = window.setInterval(() => {
                             state.time -= 1
                             if (state.time <= 0) {
                               state.time = 60
                               state.smsSendBtn = false
                               window.clearInterval(interval)
                             }
                           }, 1000)

                           const hide = $message.loading('Sending token ...', 0)

                           getSmsCaptcha({ mobile: values.mobile }).then((res) => {
                             setTimeout(hide, 2500)
                             $notification.success({
                               message: 'Hint',
                               description: `Your token is: ${res.result.captcha}`,
                               duration: 8,
                             })
                           }).catch((smsErr) => {
                             setTimeout(hide, 1)
                             clearInterval(interval)
                             state.time = 60
                             state.smsSendBtn = false
                             this.requestFailed(smsErr)
                           })
                         }
                       })
      },
      requestFailed(err) {
        this.$notification.error({
          message: 'Error',
          description: ((err.response || {}).data || {}).message || 'Request failed. Please retry',
          duration: 4,
        })
        this.registerBtn = false
      },
    },
  }
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
