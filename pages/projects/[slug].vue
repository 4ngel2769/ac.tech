<template>
    <div>
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  const route = useRoute();
  const post = ref({ title: 'A post', content: 'some stuff' });
  
  const posts = [
    { slug: 'first-post', title: 'First Post', content: 'Content of the first post' },
    { slug: 'second-post', title: 'Second Post', content: 'Content of the second post' },
  ];
  
  onMounted(() => {
    const slug = route.params.slug;
    const foundPost = posts.find((p) => p.slug === slug);
    if (foundPost) {
      post.value = foundPost;
    }
  });
  </script>
  