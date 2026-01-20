<template>
  <li class="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-x-6 py-5">
    <div class="flex min-w-0 gap-x-4">
      <img :src="avatarUrl" class="size-12 rounded-full bg-gray-50" alt="" />

      <div class="flex-auto">
        <div v-if="isEditing">
          <MemberForm
            :model="edited"
            title="Edit Member"
            submitText="Save"
            @submit="$emit('update', edited)"
            @cancel="$emit('cancel')"
          />
        </div>

        <div v-else class="space-y-1">
          <p class="text-sm font-semibold">{{ member?.fullName || 'No Name' }}</p>
          <p class="text-xs text-gray-500">{{ member?.email || 'No Email' }}</p>
          <p class="text-xs text-gray-500">{{ member?.phone || '-' }}</p>
          <span class="badge">{{ member?.gender || '-' }}</span>
          <span :class="membershipClass">{{ member?.membershipType || '-' }}</span>
        </div>
      </div>
    </div>

    <div class="mt-1 flex items-center gap-x-2">
      <template v-if="!isEditing">
        <button @click="$emit('edit', member)" class="text-yellow-600 p-2 hover:bg-yellow-100">
          <PencilIcon class="size-5" />
        </button>
        <button @click="$emit('delete', member?.id)" class="text-red-600 p-2 hover:bg-red-100">
          <TrashIcon class="size-5" />
        </button>
      </template>
    </div>
  </li>
</template>

<script setup>
import MemberForm from './MemberForm.vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

defineProps({
  member: { type: Object, required: true },
  isEditing: { type: Boolean, default: false },
  edited: { type: Object, default: () => ({}) },
})

const avatarUrl = computed(() => {
  const gender = member?.gender?.toLowerCase()
  if (gender === 'male') return 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
  if (gender === 'female') return 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-5.png'
  return 'https://via.placeholder.com/48'
})

const membershipClass = computed(() => {
  const type = member?.membershipType?.toLowerCase()
  if (type === 'gold') return 'mr-1 inline-flex rounded-md bg-yellow-300 px-2 py-1 text-xs font-medium text-yellow-800'
  if (type === 'silver') return 'mr-1 inline-flex rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-800'
  if (type === 'bronze') return 'mr-1 inline-flex rounded-md bg-amber-900 px-2 py-1 text-xs font-medium text-amber-100'
  return 'mr-1 inline-flex rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600'
})
</script>
