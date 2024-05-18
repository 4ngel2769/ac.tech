<template>
    <div>
      <h1>Projects</h1>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <NuxtLink :to="'/projects/' + post.slug">{{ post.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const posts = ref([
    { id: 1, title: 'First Post', slug: 'first-post' },
    { id: 2, title: 'Second Post', slug: 'second-post' },
  ]);
  </script>
  