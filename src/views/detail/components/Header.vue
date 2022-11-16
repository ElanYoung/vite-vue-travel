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

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const showAbsolute = ref(true);
const opacityStyle = reactive({
  opacity: 0,
});

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});

const onScroll = () => {
  const { scrollTop } = document.documentElement || document.body.scrollTop;
  showAbsolute.value = !(scrollTop > 60);
  opacityStyle.opacity = scrollTop / 140 > 1 ? 1 : scrollTop / 140;
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
