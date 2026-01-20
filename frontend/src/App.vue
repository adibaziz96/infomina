<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <main class="max-w-10xl mx-auto p-4">
      <router-view />
      <Toastr ref="toastr" />
      <ConfirmDialog ref="confirmDialog" />
    </main>
  </div>
</template>


<script setup>
import { ref, provide } from 'vue'
import Toastr from './components/Toastr.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'

const toastr = ref(null)
const confirmDialog = ref(null)

provide('toastr', {
  success: (msg, title = 'Success') =>
    toastr.value.add({ title, message: msg, type: 'success' }),
  error: (msg, title = 'Error') =>
    toastr.value.add({ title, message: msg, type: 'error' }),
  info: (msg, title = 'Info') =>
    toastr.value.add({ title, message: msg, type: 'info' }),
  warning: (msg, title = 'Warning') =>
    toastr.value.add({ title, message: msg, type: 'warning' }),
})

provide('confirm', {
  open: (options) => confirmDialog.value.open(options),
})
</script>

<style>
/* optional: leave empty, Tailwind handles the reset */
</style>
