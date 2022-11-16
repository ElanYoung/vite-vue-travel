<template>
  <div>
    <home-header></home-header>
    <home-swiper ref="banner-swiper" :banners="banners"></home-swiper>
    <home-category-grid ref="grid-swiper" :categories="categories"></home-category-grid>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-weekend :weekends="weekends"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from './components/Header.vue';
import HomeSwiper from './components/Swiper.vue';
import HomeCategoryGrid from './components/CategoryGrid.vue';
import HomeRecommend from './components/Recommend.vue';
import HomeWeekend from './components/Weekend.vue';
import { get } from '@/utils/request';

export default {
  components: {
    HomeHeader,
    HomeSwiper,
    HomeCategoryGrid,
    HomeRecommend,
    HomeWeekend,
  },
  data() {
    return {
      banners: [],
      categories: [],
      recommends: [],
      weekends: [],
    };
  },
  created() {
    this.initHomeData();
  },
  activated() {
    // 解决 keep-alive 缓存问题
  },
  methods: {
    initHomeData() {
      this.initSwiperData();
      this.initGridData();
      this.initRecommendData();
      this.initWeekendData();
    },
    initSwiperData() {
      get('/banner/list').then((res) => {
        if (res.code === 0) {
          this.banners = res.data;
          this.$nextTick(() => {
            this.$refs['banner-swiper'].initSwiper();
          });
        }
      });
    },
    initGridData() {
      get('/category/list').then((res) => {
        if (res.code === 0) {
          this.categories = res.data;
          this.$nextTick(() => {
            this.$refs['grid-swiper'].initSwiper();
          });
        }
      });
    },
    initRecommendData() {
      get('/recommend/list').then((res) => {
        if (res.code === 0) {
          this.recommends = res.data;
        }
      });
    },
    initWeekendData() {
      get('/weekend/list').then((res) => {
        if (res.code === 0) {
          this.weekends = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
