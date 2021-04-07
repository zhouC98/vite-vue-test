<template>
  <teleport to="head">
    <title>{{ $route.meta.title }}</title>
  </teleport>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    
    return {
    }
  }
});
</script>
