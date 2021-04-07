<template>
  <div class="relative overflow-y-scroll w-48 my-28 mx-auto box-border border border-gray-900" ref="listWrap" @scroll="scrollListener">
      <div class="scroll-bar1" ref="scrollBar"></div>
      <ul class="absolute top-0 left-0" ref="list">
          <li class="bg-red-600" v-for="(val, index) in showList" :key="index">{{ val }}</li>
      </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import type { Ref } from 'vue'
export default defineComponent({
  setup() {
    const lists = reactive<string[]>([])
    const itemHeight = ref(30)
    const showNum = ref(10)
    const start = ref(0)
    const end = ref(10)
    const listWrap: Ref<any> = ref(null)
    const scrollBar: Ref<any> = ref(null)
    const list: Ref<any> = ref(null)
    onMounted(() => {
      for (let i = 0; i < 1000; i++) {
        lists.push('列表' + i)
      }
      (listWrap.value as HTMLElement).style.height = itemHeight.value * showNum.value + 'px';
      (scrollBar.value as HTMLElement).style.height = itemHeight.value * lists.length + 'px';
    })

    const showList = computed(() => lists.slice(start.value, end.value))
    const scrollListener = () => {
      let scrollTop = listWrap.value.scrollTop
      start.value = Math.floor(scrollTop / itemHeight.value)
      end.value = start.value + showNum.value
      list.value.style.top = start.value * itemHeight.value + 'px'
    }
    return {
      scrollListener,
      showList,
      itemHeight,
      listWrap,
      scrollBar,
      list,
    }
  }
})
</script>

<style>

</style>