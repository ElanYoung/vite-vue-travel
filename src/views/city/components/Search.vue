<template>
  <div class="container">
    <!-- <div class="search">
      <input class="search__input" type="text" placeholder="输入城市名或拼音" />
    </div> -->
    <van-search
      v-model="keyword"
      shape="square"
      clearable
      background="#00bcd4"
      input-align="center"
      left-icon=""
      placeholder="输入城市名或拼音"
    />
    <div v-show="keyword" ref="searchContent" class="search-content">
      <ul>
        <li
          v-for="result in results"
          :key="result.id"
          class="search-content__content-item border-bottom"
          @click="onChangeCity(result.name)"
        >
          {{ result.name }}
        </li>
      </ul>
      <div v-show="showEmpty" class="empty-container">
        <!-- 搜索提示 -->
        <van-empty image="search" description="暂无搜索结果" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BetterScroll from 'better-scroll';
import { ref, onMounted, onUpdated, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const props = defineProps({
  cities: {
    type: Object,
    default: () => {},
  },
});

const keyword = ref('');
const results = ref([]);
const showEmpty = ref(false);
const scroll = ref(null);
const searchContent = ref(null);
const store = useStore();
const router = useRouter();
let timer = null;

onMounted(() => {
  initBetterScroll();
});

onUpdated(() => {
  if (scroll.value && results.value.length) {
    scroll.value.refresh();
  }
});

watch(keyword, (newKeyword) => {
  // TODO 使用 lodash 进行优化
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!newKeyword) {
    results.value = [];
    return;
  }
  timer = setTimeout(() => {
    const data = [];
    Object.keys(props.cities).forEach((key) => {
      props.cities[key].forEach((city) => {
        if (city.spell.indexOf(newKeyword) !== -1 || city.name.indexOf(newKeyword) !== -1) {
          data.push(city);
        }
      });
    });
    showEmpty.value = data.length === 0;
    results.value = data;
  }, 100);
});

const initBetterScroll = () => {
  nextTick(() => {
    scroll.value = new BetterScroll(searchContent.value, {
      click: true,
    });
  });
};

const onChangeCity = (city) => {
  store.commit('city/change', { city });
  keyword.value = '';
  showEmpty.value = false;
  router.push({
    path: '/',
  });
};
</script>

<style lang="less" scoped>
.container {
  :deep(.van-search) {
    padding: 0 10px 10px;

    .van-search__content {
      background-color: #fff;
    }
  }

  :deep(.van-search input::-webkit-input-placeholder) {
    color: #666;
  }

  .search {
    height: 72px;
    padding: 0 10px;
    background-color: @background-color;

    &__input {
      box-sizing: border-box;
      width: 100%;
      height: 62px;
      padding: 0 10px;
      font-size: 30px;
      line-height: 62px;
      color: #666;
      text-align: center;
      border: 1px solid #fff;
      border-radius: 6px;
    }
  }

  .search-content {
    position: absolute;
    top: 164px;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    background-color: #eee;

    &__content-item {
      line-height: 60px;
      color: #666;
      // padding: 10px 20px;
      text-indent: 10px;
      background-color: #fff;
    }
  }

  .empty-container {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
