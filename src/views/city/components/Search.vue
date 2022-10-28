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
    <div v-show="keyword" ref="search-content" class="search-content">
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

<script>
import BetterScroll from 'better-scroll';
import { mapMutations } from 'vuex';

export default {
  name: 'CitySearch',
  props: {
    cities: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      keyword: '',
      timer: null,
      results: [],
      showEmpty: false,
    };
  },
  computed: {},
  watch: {
    keyword() {
      // TODO 使用 lodash 进行优化
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        this.results = [];
        return;
      }
      this.timer = setTimeout(() => {
        const results = [];
        Object.keys(this.cities).forEach((key) => {
          this.cities[key].forEach((city) => {
            if (city.spell.indexOf(this.keyword) !== -1 || city.name.indexOf(this.keyword) !== -1) {
              results.push(city);
            }
          });
        });
        this.showEmpty = results.length === 0;
        this.results = results;
      }, 100);
    },
  },
  mounted() {
    this.initBetterScroll();
  },
  created() {},
  updated() {
    if (this.scroll && this.results.length) {
      this.scroll.refresh();
    }
  },
  methods: {
    initBetterScroll() {
      this.$nextTick(() => {
        this.scroll = new BetterScroll(this.$refs['search-content'], {
          click: true,
        });
      });
    },
    onChangeCity(city) {
      this.changeCity({ city });
      this.keyword = '';
      this.showEmpty = false;
      this.$router.push({
        path: '/',
      });
    },
    ...mapMutations('city', {
      changeCity: 'change',
    }),
  },
};
</script>

<style lang="less" scoped>
.container {
  ::v-deep .van-search {
    padding: 0 10px 10px 10px;
  }

  ::v-deep .van-search__content {
    background-color: #fff;
  }

  ::v-deep .van-search input::-webkit-input-placeholder {
    color: #666;
  }

  .search {
    padding: 0 10px;
    height: 72px;
    background-color: @background-color;

    &__input {
      padding: 0 10px;
      width: 100%;
      height: 62px;
      font-size: 30px;
      border: 1px solid #fff;
      border-radius: 6px;
      text-align: center;
      color: #666;
      box-sizing: border-box;
      line-height: 62px;
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
      // padding: 10px 20px;
      text-indent: 10px;
      color: #666;
      background-color: #fff;
      line-height: 60px;
    }
  }

  .empty-container {
    width: 100%;
    height: 100vh;
    background-color: #fff;
  }
}
</style>
