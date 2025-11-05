<template>
  <div class="card">
    <h2>Counter (Pinia)</h2>
    <p>Count: <strong>{{ store.count }}</strong> | 2x: {{ store.doubled }}</p>
    <div style="display:flex; gap:.5rem; margin-top:.5rem;">
      <button class="btn" @click="store.decrement()">−</button>
      <button class="btn" @click="store.increment()">＋</button>
      <button class="btn" @click="store.reset()">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'
const store = useCounterStore()
</script>
