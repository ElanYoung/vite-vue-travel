<template>
  <div class="header">
    <div class="header__left">
      <div class="iconfont iconhome header__left__home-icon"></div>
    </div>
    <div class="header__input">
      <span class="iconfont iconsearch"></span>
      <span class="header__input__placeholder">输入城市/景点/游玩主题</span>
    </div>
    <router-link to="/city">
      <div class="header__right">
        <span>{{ city.currentCity }}</span>
        <span class="iconfont icontriangledownfill header__right__arrow-icon"></span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { getCityName } from '@/utils/map';

const store = useStore();
const { city } = store.state;

onMounted(() => {
  if (!city.currentCity) {
    initCurrentCity();
  }
});

const initCurrentCity = async () => {
  const city = await getCityName();
  store.commit('city/change', { city });
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: @header-height;
  color: #ffffff;
  background: @background-color;
  flex-direction: row;
  line-height: @header-height;

  &__left {
    width: 68px;

    &__home-icon {
      font-size: 40px;
      text-align: center;
    }
  }

  &__input {
    padding-left: 20px;
    height: 64px;
    line-height: 64px;
    border-radius: 10px;
    color: #cccccc;
    background: #ffffff;
    flex: 1;

    &__placeholder {
      margin-left: 20px;
      font-size: 28px;
    }
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    min-width: 120px;
    text-align: center;
    color: #fff;
    flex-direction: row;

    &__arrow-icon {
      margin-left: 4px;
      font-size: 30px;
    }
  }
}
</style>
