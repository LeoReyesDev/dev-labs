<template>
  <section class="stack" style="display: grid; gap: 1rem;">
    <h1>Welcome to Vue 3 • Cyberpunk Starter</h1>
    <p class="card">
      This project demonstrates a clean Vue 3 setup with the Composition API, Vue Router,
      and Pinia. It also showcases lifecycle hooks via <code>onMounted</code> and a simple API call.
    </p>

    <CounterCard />

    <div class="card">
      <h2>Lifecycle & Fetch Demo</h2>
      <p>Status: <strong>{{ status }}</strong></p>
      <pre v-if="post" style="white-space: pre-wrap;">{{ post }}</pre>
      <button class="btn" @click="load()">Reload</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CounterCard from '../components/CounterCard.vue'

const status = ref('idle')
const post = ref('')

async function load() {
  try {
    status.value = 'loading…'
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    post.value = await res.text()
    status.value = 'done'
  } catch (e) {
    status.value = 'error'
  }
}

onMounted(() => {
  load()
})
</script>
