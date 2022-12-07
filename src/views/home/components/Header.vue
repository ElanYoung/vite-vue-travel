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
        <span class="header__right__city">{{ city.currentCity }}</span>
        <span class="iconfont icontriangledownfill header__right__arrow-icon"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCityName } from '@/utils/map';

export default {
  name: 'HomeHeader',
  data() {
    return {};
  },
  computed: {
    ...mapState(['city']),
  },
  mounted() {
    this.initCurrentCity();
  },
  methods: {
    initCurrentCity() {
      getCityName().then((city) => {
        this.$store.commit('city/change', { city });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: @header-height;
  line-height: @header-height;
  color: #fff;
  background: @background-color;

  &__left {
    width: 68px;

    &__home-icon {
      font-size: 40px;
      text-align: center;
    }
  }

  &__input {
    flex: 1;
    height: 64px;
    padding-left: 20px;
    line-height: 64px;
    color: #ccc;
    background: #fff;
    border-radius: 10px;

    &__placeholder {
      margin-left: 20px;
      font-size: 28px;
    }
  }

  &__right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 120px;
    padding: 0 10px;
    color: #fff;
    text-align: center;

    &__city {
      font-size: 32px;
    }

    &__arrow-icon {
      margin-left: 4px;
      font-size: 30px;
    }
  }
}
</style>
