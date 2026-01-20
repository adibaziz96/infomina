<template>
  <div class="fixed top-4 right-4 z-50 space-y-3 w-80">
    <TransitionGroup
      name="toast"
      tag="div"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-start gap-3 rounded-lg shadow-lg p-4 text-white"
        :class="toastClass(toast.type)"
      >
        <div class="flex-1">
          <p class="font-semibold">{{ toast.title }}</p>
          <p class="text-sm opacity-90">{{ toast.message }}</p>
        </div>

        <button
          class="text-white/80 hover:text-white"
          @click="remove(toast.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const toasts = reactive([])

const toastClass = (type) => {
  return {
    success: 'bg-green-400',
    error: 'bg-red-400',
    info: 'bg-blue-400',
    warning: 'bg-yellow-400 text-black',
  }[type || 'info']
}

const add = ({ title, message, type = 'info', duration = 3000 }) => {
  const id = Date.now()
  toasts.push({ id, title, message, type })

  setTimeout(() => remove(id), duration)
}

const remove = (id) => {
  const index = toasts.findIndex(t => t.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

defineExpose({ add })
</script>
