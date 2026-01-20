<template>
  <div class="p-6 bg-white rounded-md shadow space-y-3">
    <h3 class="text-sm font-semibold text-gray-900">{{ title }}</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <input v-model="model.fullName" placeholder="Full Name" class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
      <input v-model="model.email" placeholder="Email" class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
      <input v-model="model.phone" placeholder="Phone" class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />

      <select v-model="model.gender" class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        <option disabled value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select v-model="model.membershipType" class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
        <option disabled value="">Select Membership</option>
        <option>Gold</option>
        <option>Silver</option>
        <option>Bronze</option>
      </select>
    </div>

    <div class="flex gap-2 justify-end">
      <button @click="$emit('submit')" class="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-500">{{ submitText }}</button>
      <button @click="$emit('cancel')" class="rounded-md bg-gray-100 px-4 py-2 text-gray-700 font-semibold hover:bg-gray-200">Cancel</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  model: Object,
  title: String,
  submitText: String,
})
</script>
