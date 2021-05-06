<template>
  <div class="number-box">
    <p class="box-item" v-for="(item, index) in computeNumber" :key="index">
      <span :ref="numberList">0123456789</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, onMounted, onBeforeUpdate, watch } from 'vue'

export default defineComponent({
  setup() {
      const numberNow = ref(0)
      const maxLen = ref(6)
      const computeNumber = ref<string[]>([])
      const numberDom = ref<any>([])
      
      const prefixZero = (num: number | string, n: number) => (Array(n).join('0') + num).slice(-n).split('')

      const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min) 

      const setNumberTransform = () => {
        let numberItems = numberDom.value
        for (let index = 0; index < numberItems.length; index++) {
          let elem = numberItems[index];
          if (elem.style) {
             elem.style.transform = `translate(-50%, -${Number(computeNumber.value[index]) * 10}%)`
          }
        }
      }
      const numberList = el => {
        numberDom.value.push(el)
      }
      const refresh = () => {
        computeNumber.value = prefixZero(numberNow.value, maxLen.value)
        
        nextTick(() => setNumberTransform())
      }

      watch(numberNow, () => {
        refresh()
      })

      onMounted(() => {
        refresh()
        setTimeout(() => numberNow.value = getRandomNumber(100000, 999999), 2000)
      })

      
      onBeforeUpdate(() => {
        numberDom.value = []
      })
      return {
        computeNumber,
        numberList
      }
  }
});
</script>

<style>
  .number-box {
    width: 56.8%;
    display: flex;
    justify-content: center;
    margin: 26px auto 0;
  }
  .number-box p{
    flex: 1;
    height: 163px;
    background: #2a3242;
    margin: 0 26px 0 0;
    color: #fffffe;
    text-align: center;
    border-radius: 12px;
    padding: 0 19px;
    display: inline-block;
    font-size: 62px;
    position: relative;
    writing-mode: vertical-lr;
    text-orientation: upright;
    overflow: hidden;
  }
  .number-box p:last-child {
    margin-right: 0;
  }
  .number-box p span {
    color: #9185e0;
    font-size: 118px;
    font-weight: bolder;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 2s;
    letter-spacing: 10px;
  }
</style>