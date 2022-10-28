<template>
  <div>
    <detail-banner :name="sightName" :banner="bannerImage" :images="galleryImages"></detail-banner>
    <detail-header></detail-header>
  </div>
</template>

<script>
import DetailBanner from './components/Banner.vue';
import DetailHeader from './components/Header.vue';
import { get } from '@/utils/request';

export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
  },
  data() {
    return {
      sightName: '',
      bannerImage: '',
      galleryImages: [],
    };
  },
  mounted() {
    this.getDetailData();
  },
  methods: {
    getDetailData() {
      get(`/detail`, {
        id: this.$route.params.id,
      }).then((res) => {
        if (res.code === 200) {
          const { sight_name, banner_image, gallery_images } = res.data;
          this.sightName = sight_name;
          this.bannerImage = banner_image;
          this.galleryImages = gallery_images;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
