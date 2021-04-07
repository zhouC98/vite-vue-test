<template>
  <div>about</div>
  <button @click="handlerClick">go router</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
      const { go, push } = useRouter()
      return {
        handlerClick() {
          go(-1)
          push({path: '/home'})
        }
      }
  }
});
</script>

