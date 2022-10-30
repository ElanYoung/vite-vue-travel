<template>
  <div>
    <detail-banner :name="sightName" :banner="bannerImage" :images="galleryImages"></detail-banner>
    <detail-header></detail-header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import DetailBanner from './components/Banner.vue';
import DetailHeader from './components/Header.vue';
import { get } from '@/utils/request';

const sightName = ref('');
const bannerImage = ref('');
const galleryImages = ref([]);

const route = useRoute();

onMounted(() => {
  getDetailData();
});

const getDetailData = async () => {
  const res = await get(`/detail`, {
    id: route.params.id,
  });
  if (res.code === 200) {
    const { sight_name, banner_image, gallery_images } = res.data;
    sightName.value = sight_name;
    bannerImage.value = banner_image;
    galleryImages.value = gallery_images;
  }
};
</script>

<style lang="less" scoped></style>
