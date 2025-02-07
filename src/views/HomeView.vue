<template>
  <div>
    <header class="bg-yellow-500 text-black text-center text-6xl font-bold py-8 shadow-md">7CMBG Loadout Creator</header>

    <section class="flex flex-col justify-center items-center text-center h-screen bg-cover bg-center text-white" style="background-image: url('/src/assets/hero-bg.webp');">
      <h1 class="text-4xl font-bold bg-black bg-opacity-50 rounded-md px-4 py-2">Build Your Perfect Loadout</h1>
      <p class="text-xl max-w-3xl mt-4 bg-black bg-opacity-50 rounded-md px-4 py-2">Create your ideal loadout following the approved kit-list and be mission-ready.</p>
    </section>

    <section class="text-center p-8">
      <h2 class="text-3xl text-yellow-500 mb-4">Why Use The Loadout Creator?</h2>
      <p class="text-lg max-w-2xl mx-auto mb-6">This tool simplifies loadout customization, ensuring compliance with unit regulations and operational readiness.</p>

      <div class="flex flex-wrap justify-center gap-6">
        <div v-for="(feature, index) in features" :key="index" class="bg-gray-800 text-white p-6 rounded-lg max-w-sm shadow-lg">
          <h3 class="text-xl text-yellow-500 font-semibold">{{ feature.title }}</h3>
          <p class="mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <footer class="mt-10 py-4 bg-gray-200 text-center text-gray-800 text-sm">
      <p>Created with ❤️ by <a href="https://github.com/B-Fanjoy" target="_blank" class="text-green-600 hover:underline">B. Fanjoy</a>. Hosted on <a href="https://pages.github.com" target="_blank" class="text-green-600 hover:underline">GitHub Pages</a>.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      features: [
        { title: 'Easy to Use', description: 'Intuitive design to help you create your loadout in just a few clicks.' },
        { title: 'Kit Compliance', description: 'Ensure all selections match the standard kit-list to stay within regulations.' },
        { title: 'Importing', description: 'Copy the generated import string to import your loadout directly into the ACE Arsenal.' }
      ]
    };
  }
};
</script>
