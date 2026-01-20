<script setup>
import { onMounted, ref } from 'vue';
import api from '../api/axios';

const members = ref([]);

onMounted(async () => {
  const { data } = await api.get('/members');
  members.value = data;
});
</script>

<template>
  <div>
    <h1>Members</h1>
    <ul>
      <li v-for="m in members" :key="m.id">
        {{ m.fullName }} ({{ m.membershipType }})
      </li>
    </ul>
  </div>
</template>
