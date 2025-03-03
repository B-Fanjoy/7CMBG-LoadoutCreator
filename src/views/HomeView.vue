<template>
  <div>
    <section class="relative h-screen bg-center text-white" style="background-image: url('/src/assets/hero-bg.webp');">
      <div class="bg-[#303030b5] mx-auto flex flex-col justify-center text-center items-center h-full space-y-2">
        <header class="bg-yellow-500 text-black text-center text-8xl font-bold p-6 rounded-md shadow-md">7CMBG Loadout Creator</header>
        <h1 class="text-4xl font-bold bg-black bg-opacity-50 rounded-md px-4 py-2">Build Your Perfect Loadout</h1>
        <p class="text-4x1 bg-black bg-opacity-50 rounded-md px-4 py-2">Create your ideal loadout following the approved kit-list and be mission-ready.</p>
        <router-link to="/creator" class="bg-[#F4C356] text-black text-6xl font-bold px-4 py-2 rounded-md mt-30 shadow-2xl hover:bg-amber-500">Get Started</router-link>
      </div>

      <!-- Floating Arrows -->
      <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div class="flex flex-row items-center space-x-20">
          <div class="animate-bounce text-8xl text-[#F4C356]">
            ⬇
          </div>
          <div class="animate-bounce text-8xl text-[#F4C356]" style="animation-delay: 0.2s;">
            ⬇
          </div>
          <div class="animate-bounce text-8xl text-[#F4C356]" style="animation-delay: 0.4s;">
            ⬇
          </div>
        </div>
      </div>
    </section>

    <section class="text-center p-8">
      <h2 class="text-4xl text-yellow-500 mb-4 font-bold">Why Use The Loadout Creator?</h2>
      <p class="mb-6">This tool simplifies loadout customization, ensuring compliance with unit regulations and operational readiness.</p>

      <div class="flex flex-wrap justify-center gap-6">
        <div v-for="(feature, index) in features" :key="index" class="bg-gray-800 text-white p-6 rounded-lg max-w-sm shadow-lg">
          <h3 class="text-4xl text-yellow-500 font-semibold">{{ feature.title }}</h3>
          <p class="mt-2">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <footer class="mt-10 py-4 bg-[#393939] text-center text-[#bababa] text-sm">
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
