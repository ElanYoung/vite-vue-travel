<template>
  <div class="container">
    <swiper
      :modules="modules"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
    >
      <swiper-slide v-for="banner in banners" :key="banner.id">
        <img class="swiper-image" :src="banner.url" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper';

import 'swiper/less';
import 'swiper/less/pagination';

defineProps({
  banners: {
    type: Array,
    default: () => [],
  },
});

const modules = [Autoplay, Pagination];
</script>

<style lang="less" scoped>
.container {
  overflow: hidden;
  padding-bottom: 31.25%;
  width: 100%;
  height: 0;
  background-color: #eeeeee;

  .swiper-image {
    width: 100%;
    height: 100%;
  }

  .swiper {
    /* 设置分页 */
    --swiper-pagination-color: #fff;
  }
}
</style>
