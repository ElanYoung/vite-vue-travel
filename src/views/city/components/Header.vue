<template>
  <div>
    <div class="header">
      <router-link to="/">
        <div class="iconfont iconback header__back-icon"></div>
      </router-link>
      <span class="header__title">城市选择</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityHeader',
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: @header-height;
  overflow: hidden;
  line-height: @header-height;
  color: #fff;
  text-align: center;
  background: @background-color;

  &__title {
    font-size: 32px;
  }

  &__back-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    font-size: 40px;
    color: #fff;
    text-align: center;
  }
}
</style>
