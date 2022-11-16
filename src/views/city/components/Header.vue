<template>
  <div>
    <div class="header">
      <router-link to="/">
        <div class="iconfont iconback header__back-icon"></div>
      </router-link>
      <span>城市选择</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.header {
  position: relative;
  height: @header-height;
  overflow: hidden;
  line-height: @header-height;
  color: #fff;
  text-align: center;
  background: @background-color;

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
