<template>
  <div class="container">
    <router-link v-show="showAbsolute" to="/" class="header-absolute">
      <div class="iconfont iconback header-absolute__back-icon"></div>
    </router-link>
    <div v-show="!showAbsolute" class="header-fixed" :style="opacityStyle">
      <router-link to="/">
        <div class="iconfont iconback header-fixed__back-icon"></div>
      </router-link>
      <span>景点详情</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  data() {
    return {
      showAbsolute: true,
      opacityStyle: {
        opacity: 0,
      },
    };
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      const { scrollTop } = document.documentElement || document.body.scrollTop;
      this.showAbsolute = !(scrollTop > 60);
      this.opacityStyle.opacity = scrollTop / 140 > 1 ? 1 : scrollTop / 140;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .header-absolute {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: rgb(0 0 0 / 80%);
    border-radius: 40px;

    &__back-icon {
      color: #fff;
    }
  }

  .header-fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: @header-height;
    line-height: @header-height;
    color: #fff;
    text-align: center;
    background: @background-color;

    &__back-icon {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 64px;
      font-size: 40px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
