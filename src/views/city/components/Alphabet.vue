<template>
  <div class="container">
    <ul class="alpha-list">
      <li
        v-for="letter in letters"
        :ref="(letterRef) => (letterRefs[letter] = letterRef)"
        :key="letter"
        class="alpha-list__item"
        @click="onAlphaClick"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        {{ letter }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onUpdated, computed } from 'vue';

const props = defineProps({
  cities: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits(['change']);

const letters = computed(() => {
  return Object.keys(props.cities);
});
const touchStatus = ref(false);
const startY = ref(0);
const letterRefs = ref([]);
let timer = null;

onUpdated(() => {
  // 提升性能
  startY.value = letterRefs.value.A.offsetTop;
});

const onAlphaClick = (event) => {
  emit('change', event.target.innerText);
};

const onTouchStart = () => {
  touchStatus.value = true;
};

const onTouchMove = (event) => {
  if (touchStatus.value) {
    // TODO 使用 lodash 进行优化
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      const touchY = event.touches[0].clientY - 82;
      const index = Math.floor((touchY - startY.value) / 20);
      if (index >= 0 && index < letters.value.length) {
        emit('change', letters.value[index]);
      }
    }, 8);
  }
};

const onTouchEnd = () => {
  touchStatus.value = false;
};
</script>

<style lang="less" scoped>
.container {
  .alpha-list {
    position: absolute;
    top: 164px;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40px;

    &__item {
      line-height: 40px;
      color: @background-color;
      text-align: center;
    }
  }
}
</style>
