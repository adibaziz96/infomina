<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="cancel"></div>

    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ title }}
      </h3>

      <p class="mt-2 text-sm text-gray-600">
        {{ message }}
      </p>

      <div class="mt-6 flex justify-end gap-3">
        <button
          @click="cancel"
          class="rounded-md px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          @click="confirm"
          :class="color"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const type = ref('info')
const color = ref('');
const title = ref('Confirm action')
const message = ref('Are you sure?')

let resolvePromise = null

const open = ({ type, titleText, messageText }) => {
  color.value = type == 'success' ? 'rounded-md px-4 py-2 text-sm font-medium bg-green-600 text-white hover:bg-green-500': 
               type == 'error' ? 'rounded-md px-4 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-500':
               type == 'warning' ? 'rounded-md px-4 py-2 text-sm font-medium bg-yellow-600 text-white hover:bg-yellow-500':
               'rounded-md px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-500'
  title.value = titleText || 'Confirm action'
  message.value = messageText || 'Are you sure?'
  show.value = true

  return new Promise((resolve) => {
    resolvePromise = resolve
  })
}

const confirm = () => {
  show.value = false
  resolvePromise(true)
}

const cancel = () => {
  show.value = false
  resolvePromise(false)
}

defineExpose({ open })
</script>
