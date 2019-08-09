<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <a-tab-pane key="tab1" tab="Account Login">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="admin"
              v-decorator="[
                'username',
                {
                  rules: [
                  { required: true, message: 'User name or Email' },
                  { validator: handleUsernameOrEmail }],
                  validateTrigger: 'change'
                }
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="admin"
              v-decorator="[
                'password',
                {
                  rules: [
                  { required: true, message: 'Please type password' }],
                  validateTrigger: 'blur'
                }
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>

      </a-tabs>
<!--          :to='{ name: "RecoverAccount", params: { user: this.form.username } }'-->

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">Remember Me</a-checkbox>
        <router-link
          :to="{ name:'recover' }"
          class="forge-password" style="float: right;"
        >Forget Password
        </router-link>
      </a-form-item>

      <!--submit-->
      <a-form-item style="margin-top:24px">
        <a-button size="large" type="primary" htmlType="submit"
                  class="login-button"
                  :loading="state.loginBtn"
                  :disabled="state.loginBtn"
        >Confirm
        </a-button>
      </a-form-item>

      <div class="user-login-other">
        <span>Other Method to login</span>
        <a>
          <a-icon class="item-icon" type="alipay-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="taobao-circle"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="weibo-circle"></a-icon>
        </a>
        <router-link class="register" :to="{ name: 'register' }">Register User</router-link>
      </div>
    </a-form>

  </div>
</template>

<script>
// import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  components: {
    TwoStepCaptcha
  },
  data() {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      loginType: 0, // 0 email, 1 username, 2 telephone
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0, // 0 email, 1 username, 2 telephone
        smsSendBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick(key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit(e) {
      e.preventDefault()

      const {
        form: { validateFields },
        state,
        // customActiveKey,
        Login
      } = this
      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']
      // validate
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('Login.vue values: ', values)

          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          // todo: md5()
          loginParams.password = values.password
          // login
          Login(loginParams)
            .then((res) => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess(res) {
      console.log(res)
      this.$router.push({ name: 'dashboard' })
      // delay 1s for welcome message
      setTimeout(() => {
        this.$notification.success({
          message: 'Welcome',
          description: `${timeFix()}，welcome back !`
        })
      }, 1000)
    },
    requestFailed(err) {
      console.log('requestFailed: ', err)
      this.$notification['error']({
        message: 'error',
        description: ((err.response || {}).data || {}).message || 'request error, retry again',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
