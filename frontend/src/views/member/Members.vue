<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-6">
        <button
          v-if="!showCreate"
          @click="showCreate = true"
          class="mt-6 inline-flex items-center rounded-md bg-blue-600 px-2 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          + Add Member
        </button>

        <div v-else class="p-10 space-y-3">
          <h3 class="text-sm font-semibold text-gray-900">Create New Member</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input v-model="newMember.fullName" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Full Name" />
            <input v-model="newMember.email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Email" />
            <input v-model="newMember.phone" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" placeholder="Phone" />

            <select v-model="newMember.gender" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <option disabled value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select v-model="newMember.membershipType" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              <option disabled value="">Select Membership</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>

          <div class="flex gap-2 justify-end">
            <button
              @click="handleCreateMember"
              class="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Create
            </button>

            <button
              @click="cancelCreate"
              class="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <input
          v-model="search"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          placeholder="Search member"
        />
      </div>

      <ul role="list" class="divide-y divide-gray-100">
        <li v-for="member in filteredMembers" :key="member.id" class="flex flex-col gap-y-4 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6 py-5">
          <div class="flex min-w-0 gap-x-4">
            <img v-if="!editingId" class="size-12 flex-none rounded-full bg-gray-50" :src="checkGender(member.gender)" alt="" />
            <div class="min-w-200 flex-auto">
              <div v-if="editingId === member.id" class="grid grid-cols-1 sm:grid-cols-2 xs:grid-cols-1 gap-2">
                <input
                  v-model="editedMember.fullName"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Full Name"
                />

                <input
                  v-model="editedMember.email"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Email"
                />

                <input
                  v-model="editedMember.phone"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Phone"
                />

                <select
                  v-model="editedMember.gender"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <select
                  v-model="editedMember.membershipType"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Bronze">Bronze</option>
                </select>
              </div>

              <div v-else class="space-y-1">
                <p class="text-sm/6 font-semibold text-gray-900">{{ member.fullName }}</p>
                <p class="mt-1 truncate text-xs/5 text-gray-500">{{ member.email }}</p>
                <p class="mt-1 truncate text-xs/5 text-gray-500">{{ member.phone }}</p>
                <span class="mr-1 inline-flex items-center rounded-md bg-black px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-black">{{ member.gender }}</span>
                <span :class="checkMember(member.membershipType)">{{ member.membershipType }}</span>
              </div>

            </div>
          </div>

          <div class="mt-1 flex items-center gap-x-2">
            <template v-if="editingId === member.id">
              <button
                @click="handleUpdateMember(member.id)"
                class="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
              >
                Save
              </button>
              <button
                @click="cancelEdit"
                class="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-500"
              >
                Cancel
              </button>
            </template>

            <template v-else>
              <button
                @click="editMember(member)"
                title="Edit member"
                class="rounded-md p-2 text-yellow-600 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <PencilIcon class="size-5" />
              </button>

              <button
                @click="handleDeleteMember(member.id)"
                title="Delete member"
                class="rounded-md p-2 text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <TrashIcon class="size-5" />
              </button>
            </template>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { getMembers, createMember, updateMember, deleteMember } from '../../api/members.js'

const confirm = inject('confirm')
const toastr = inject('toastr')
const search = ref('')
const members = ref([])
const showCreate = ref(false)
const editingId = ref(null)
const editedMember = ref({})

const newMember = ref({
  fullName: '',
  email: '',
  phone: '',
  gender: '',
  membershipType: '',
})

const fetchMembers = async () => {
  const res = await getMembers()
  members.value = res.data
};

const filteredMembers = computed(() => {
  if (!search.value) return members.value

  const keyword = search.value.toLowerCase()

  return members.value.filter(member =>
    member.fullName.toLowerCase().includes(keyword) ||
    member.email.toLowerCase().includes(keyword)
  )
})

const handleCreateMember = async () => {
  try {
    const confirmed = await confirm.open({
      type: 'success',
      titleText: 'Create Member',
      messageText: 'Do you want to create this member?',
    })

    if (!confirmed) return

    await createMember(newMember.value)
    toastr.success('Member created successfully')

    cancelCreate()
    fetchMembers()
  } catch (err) {
    toastr.error(err.response?.data?.message || 'Create failed')
  }
}

const cancelCreate = () => {
  showCreate.value = false
  newMember.value = {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    membershipType: '',
  }
}

const editMember = (member) => {
  editingId.value = member.id
  editedMember.value = { ...member }
}

const cancelEdit = () => {
  editingId.value = null
  editedMember.value = {}
}

const handleUpdateMember = async (id) => {
  try {
    const confirmed = await confirm.open({
      type: 'success',
      titleText: 'Update Member',
      messageText: 'Do you want to update this member?',
    })

    if (!confirmed) return
    
    await updateMember(id, editedMember.value)
    toastr.success('Member updated successfully')
    editingId.value = null
    fetchMembers()
  } catch (err) {
    console.log(err)
    toastr.error(err.response?.data?.message || 'Update failed')
  }
}

const handleDeleteMember = async (id) => {
  const confirmed = await confirm.open({
    type: 'error',
    titleText: 'Delete Member',
    messageText: 'Do you want to delete this member?',
  })

  if (!confirmed) return

  await deleteMember(id)
  toastr.success('Member deleted successfully')
  fetchMembers()
};

const checkGender = (type) => {
  return type.toLowerCase() == 'male' ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png' : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-female-5.png'
}

const checkMember = (type) => {
  return type.toLowerCase() == 'gold' ? 
      'mr-1 inline-flex items-center rounded-md bg-yellow-300 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20' 
    : type.toLowerCase() == 'silver' ? 
      'mr-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-800 inset-ring inset-ring-gray-600/20' 
    : 'mr-1 inline-flex items-center rounded-md bg-amber-900 px-2 py-1 text-xs font-medium text-amber-100 inset-ring inset-ring-amber-700/10'
};

onMounted(fetchMembers)
</script>
