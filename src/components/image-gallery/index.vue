<template>
  <div class="container" @click="onClickGallery">
    <div class="image-gallery-wrapper">
      <swiper
        :modules="modules"
        :loop="false"
        :autoplay="false"
        :observer="true"
        :observe-parents="true"
        :pagination="{ clickable: true, type: 'fraction' }"
      >
        <swiper-slide v-for="image in images" :key="image">
          <img class="swiper-image" :src="image" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';

import 'swiper/less';
import 'swiper/less/pagination';

const modules = [Pagination];

defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['close']);

const onClickGallery = () => {
  emit('close');
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000;

  .image-gallery-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 100%;

    :deep(.swiper) {
      overflow: inherit;

      .swiper-image {
        width: 100%;
        height: 100%;
      }

      .swiper-pagination-fraction {
        bottom: -40px !important;
        color: #fff;
      }
    }
  }
}
</style>
