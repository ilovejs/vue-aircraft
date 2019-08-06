<template>
  <div class="footer">
    <div class="links">
      <a href="http://wtpartnership.com.au/" target="_blank">
        <a-icon type="thunderbolt" /> Australia
      </a>
      <a href="http://wtpartnership.com/"target="_blank">
        <a-icon type="shop" /> Global
      </a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2019 WT Partnership<span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
