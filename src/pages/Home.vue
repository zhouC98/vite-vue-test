
<template>
  <div class="flex items-center justify-center align-middle">
    <div class="flex h-screen">
      <div class="m-auto">
        <div class="md:flex">
          <div class="md:flex-shrink-0">
            <img
              class="rounded-lg md:w-56"
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80"
              alt="Woman paying for a purchase"
            />
            
          </div>
          <div class="mt-4 md:mt-0 md:ml-6">
            <div  class="uppercase tracking-wide text-base text-indigo-600 font-bold">Marketing</div>
            <a
              href="#"
              class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline hover:text-red-200 transition-all"
              
            >Finding customers for your new business</a>
            <p
              class="mt-2 text-gray-600"
              
            >Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
          </div>
        </div>
      </div>
    </div>
    <button class="bg-red-500 px-2" @click="increment">+</button>
    {{count}}
    <button class="bg-red-500 px-2" @click="decrement">-</button>
    <input type="file" class="file">
  </div>
  
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore, Store } from 'vuex'
import { VuexStoreN } from '../store'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const store: Store<VuexStoreN> = useStore()
    // const route = useRoute()
    const router = useRouter()
    const count = computed(() => store.state.count)
    const increment = () => store.commit('increment')
    const decrement = () => store.commit('decrement')
    const handlerClick = () => {
      router.push('/about')
    }
    return {
      handlerClick,
      count,
      increment,
      decrement
    }
  },
})


// function numSum(nums: number[], n: number, m: number) {
//   if (!nums.length || nums.length < n) return [];
//   nums = nums.sort((a, b) => a - b);
//   const result: number[][] = [];
//   const stack: number[] = [];

//   const backtrace = (start) => {
//     if (stack.length === n - 1) {
//       let end = nums.length - 1;
//       console.log(stack);
//       while (start <= end) {
//         const temp = stack.reduce((acc, cur) => acc + cur);
        
//         if (temp + nums[start] === m) {
//           result.push([...stack, nums[start]]);
//         }
//         if (start !== end && temp + nums[end] === m) {
//           result.push([...stack, nums[end]]);
//         }
//         start++;
//         end--;
//       }
//       return;
//     }

//     for (let i = start; i < nums.length; i++) {
//       stack.push(nums[i]);
//       backtrace(i + 1);
//       stack.pop();
//     }
//   };
//   backtrace(0);
//   return result;
// }
// console.log(numSum([1, 4, 7, 11, 9, 8, 10, 6], 3, 27))

</script>
