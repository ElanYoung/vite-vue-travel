<template>
  <div>
    <city-header></city-header>
    <city-search ref="search" :cities="cities"></city-search>
    <city-index-bar ref="index-bar" :cities="cities" :hot-cities="hotCities" :alpha="currentAlpha"></city-index-bar>
    <city-alphabet :cities="cities" @change="onAlphaChange"></city-alphabet>
  </div>
</template>

<script>
import CityHeader from './components/Header.vue';
import CitySearch from './components/Search.vue';
import CityIndexBar from './components/IndexBar.vue';
import CityAlphabet from './components/Alphabet.vue';
import { get } from '@/utils/request';

export default {
  components: {
    CityHeader,
    CitySearch,
    CityIndexBar,
    CityAlphabet,
  },
  data() {
    return {
      hotCities: [],
      cities: {},
      currentAlpha: '',
    };
  },
  created() {
    this.initCityData();
  },
  methods: {
    async initCityData() {
      const res = await get('/city/list');
      if (res.code === 0) {
        this.hotCities = res.data.hot_cities;
        this.cities = res.data.cities;
        if (this.$refs['index-bar'].scroll) return;
        this.$refs['index-bar'].initBetterScroll();
      }
    },
    onAlphaChange(alpha) {
      this.currentAlpha = alpha;
    },
  },
};
</script>

<style lang="less" scoped></style>
