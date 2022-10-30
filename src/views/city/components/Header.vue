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
  overflow: hidden;
  height: @header-height;
  text-align: center;
  color: #fff;
  background: @background-color;
  line-height: @header-height;

  &__back-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    font-size: 40px;
    text-align: center;
    color: #fff;
  }
}
</style>
