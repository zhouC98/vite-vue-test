import { onMounted, ref } from 'vue'

export default function (count: number = 10) {
  const displayPriority = ref(0)

  onMounted(() => {
    runDisplayPriority()
  })

  const runDisplayPriority = () => {
    const step = () => {
      requestAnimationFrame(() => {
        displayPriority.value++
        if (displayPriority.value < count) {
          step()
        }
      })
    }
    step()
  }

  const defer = (priority: number) => {
    return displayPriority.value >= priority
  }

  return {
    defer,
  }
}
