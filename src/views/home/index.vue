<template>
  <div>
    <home-header></home-header>
    <home-swiper :banners="banners"></home-swiper>
    <home-category-grid :categories="categories"></home-category-grid>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-weekend :weekends="weekends"></home-weekend>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HomeHeader from './components/Header.vue';
import HomeSwiper from './components/Swiper.vue';
import HomeCategoryGrid from './components/CategoryGrid.vue';
import HomeRecommend from './components/Recommend.vue';
import HomeWeekend from './components/Weekend.vue';
import { get } from '@/utils/request';

const banners = ref([]);
const categories = ref([]);
const recommends = ref([]);
const weekends = ref([]);

onMounted(() => {
  initSwiperData();
  initGridData();
  initRecommendData();
  initWeekendData();
});

const initSwiperData = async () => {
  const res = await get('/banner/list');
  if (res.code === 200) {
    banners.value = res.data;
  }
};

const initGridData = async () => {
  const res = await get('/category/list');
  if (res.code === 200) {
    categories.value = res.data;
  }
};

const initRecommendData = async () => {
  const res = await get('/recommend/list');
  if (res.code === 200) {
    recommends.value = res.data;
  }
};

const initWeekendData = async () => {
  const res = await get('/weekend/list');
  if (res.code === 200) {
    weekends.value = res.data;
  }
};
</script>

<style lang="less" scoped></style>
