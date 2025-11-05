<template>
  <div class="app">
    <header class="nav">
      <RouterLink to="/" class="logo">VUE⚡LAB</RouterLink>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>

    <footer class="footer">
      <small>Vue Starter • Composition API • Pinia • Router</small>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
:root { color-scheme: dark; }
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji','Segoe UI Emoji', 'Segoe UI Symbol'; background: radial-gradient(1200px 800px at 50% 0%, #0b1020, #03060d); color: #d7f9ff; }
a { color: #7ef0ff; text-decoration: none; }
a.router-link-active { color: #00ffc8; }
.container { max-width: 960px; margin: 2rem auto; padding: 0 1rem; }
.nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: linear-gradient(180deg, #081220 0%, rgba(8,18,32,0.6) 100%); border-bottom: 1px solid #0a3a4b; position: sticky; top: 0; backdrop-filter: blur(6px); }
.logo { font-weight: 800; letter-spacing: .5px; background: linear-gradient(90deg,#00ffc8,#72f3ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.nav nav { display: flex; gap: 1rem; }
.footer { border-top: 1px solid #0a3a4b; text-align:center; padding: 1rem; opacity: .8; }
.card { background: rgba(2,18,24,0.7); border:1px solid #0a3a4b; border-radius: 14px; padding: 1rem 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,0.03); }
.btn { background: linear-gradient(180deg, #13e2a1, #06b18c); border: 0; color: #04181a; padding: .7rem 1rem; border-radius: 10px; font-weight: 700; cursor: pointer; }
h1,h2 { letter-spacing: .5px; }
</style>
