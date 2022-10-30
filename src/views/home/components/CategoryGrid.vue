<template>
  <div class="container">
    <swiper :loop="false" :autoplay="false">
      <swiper-slide v-for="(page, index) in pages" :key="index">
        <van-grid :column-num="4" :border="false" icon-size="40px" clickable>
          <van-grid-item v-for="category in page" :key="category.id" :icon="category.url" :text="category.title" />
        </van-grid>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/less';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const pages = computed(() => {
  const pages = [];
  props.categories.forEach((category, index) => {
    const page = Math.floor(index / 8);
    if (!pages[page]) {
      pages[page] = [];
    }
    pages[page].push(category);
  });
  return pages;
});
</script>

<style lang="less" scoped>
@import '@/style/mixins.less';

.container {
  margin-top: 10px;
}

:deep(.van-grid-item__text) {
  font-size: 28px;
  .multi-ellipsis(1);
}
</style>
