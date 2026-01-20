<script setup>
import { ref } from 'vue';
import api from '../api/axios';

const email = ref('');
const password = ref('');

const login = async () => {
  const { data } = await api.post('/auth/login', {
    email: email.value,
    password: password.value
  });
  localStorage.setItem('token', data.token);
  location.href = '/members';
};
</script>

<template>
  <div>
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" />
    <button @click="login">Login</button>
  </div>
</template>
