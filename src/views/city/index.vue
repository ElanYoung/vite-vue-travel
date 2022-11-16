<template>
  <div>
    <city-header></city-header>
    <city-search ref="search" :cities="cities"></city-search>
    <city-index-bar ref="indexBar" :cities="cities" :hot-cities="hotCities" :alpha="currentAlpha"></city-index-bar>
    <city-alphabet :cities="cities" @change="onAlphaChange"></city-alphabet>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CityHeader from './components/Header.vue';
import CitySearch from './components/Search.vue';
import CityIndexBar from './components/IndexBar.vue';
import CityAlphabet from './components/Alphabet.vue';
import { get } from '@/utils/request';

const hotCities = ref([]);
const cities = ref({});
const currentAlpha = ref('');
const indexBar = ref(null);

onMounted(() => {
  initCityData();
});

const initCityData = async () => {
  const res = await get('/city/list');
  if (res.code === 0) {
    hotCities.value = res.data.hot_cities;
    cities.value = res.data.cities;
    if (indexBar.value.scroll) return;
    indexBar.value.initBetterScroll();
  }
};

const onAlphaChange = (alpha) => {
  currentAlpha.value = alpha;
};
</script>

<style lang="less" scoped></style>
