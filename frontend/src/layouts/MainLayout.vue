<template>
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <div class="mx-auto max-w-10xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img src="https://infomina.co/wp-content/uploads/2025/10/Infomina-Logo-CL.svg" alt="Infomina"/>
            </div>
          </div>

          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <Menu as="div" class="relative ml-3">
                <MenuButton class="relative flex max-w-xs items-center rounded-full focus:outline-none">
                  <img class="size-8 rounded-full" src="https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png" alt="" />
                </MenuButton>

                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg">
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="logout"
                        :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <div class="-mr-2 flex md:hidden">
            <DisclosureButton
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Bars3Icon v-if="!open" class="size-6" />
              <XMarkIcon v-else class="size-6" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden bg-white border-t">
        <div class="space-y-1 px-4 py-3">
          <button
            @click="logout"
            class="block w-full text-left rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <main class="mx-auto max-w-7xl px-4 py-6">
      <router-view />
    </main>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Disclosure, DisclosurePanel, DisclosureButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const toastr = inject('toastr')

const pageTitle = computed(() => {
  return route.name || 'Home'
})

const logout = () => {
  localStorage.removeItem('token')
  toastr?.success('Logged out successfully')
  router.replace('/login')
}
</script>
