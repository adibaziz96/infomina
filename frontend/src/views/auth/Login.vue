<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://infomina.co/wp-content/uploads/2025/10/Infomina-Logo-CL.svg"
        alt="Infomina"
      />
      <h2 class="mt-10 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-900">Email address</label>
          <input
            v-model="email"
            type="email"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            @blur="validateEmail"
          />
          <p v-if="errors.email" class="text-sm text-red-600 mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900">Password</label>
          <input
            v-model="password"
            type="password"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            @blur="validatePassword"
          />
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-white font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import api from '../../api/axios'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()
const toastr = inject('toastr')

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)

const errors = reactive({
  email: '',
  password: '',
})

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validateEmail = () => {
  errors.email = ''
  if (!email.value) {
    errors.email = 'Email is required'
  } else if (!emailRegex.test(email.value)) {
    errors.email = 'Invalid email format'
  }
}

const validatePassword = () => {
  errors.password = ''
  if (!password.value) {
    errors.password = 'Password is required'
  }
}

const validateForm = () => {
  validateEmail()
  validatePassword()
  return !errors.email && !errors.password
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isSubmitting.value = true
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.data.token)
    toastr.success('Login successful')
    setTimeout(() => {
      router.push('/members')
    }, 3000)
  } catch (e) {
    toastr.error(e.response?.data?.message || 'Login failed')
  } finally {
    isSubmitting.value = false
  }
}
</script>
