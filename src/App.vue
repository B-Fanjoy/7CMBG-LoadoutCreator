<template>
  <header>
    <div class="wrapper">
      <nav class="flex justify-center gap-4 py-8 uppercase border border-b border-zinc-900 bg-[#000000] font-medium">
        <RouterLink to="/creator" class="hover:text-orange-500 transition-all ease-in-out">
          Loadout Creator
        </RouterLink>
        <div class="vl"></div>
        <RouterLink to="/saved-loadouts" class="hover:text-orange-500 transition-all ease-in-out">
          Saved Loadouts
        </RouterLink>
        <div class="vl"></div>
        <RouterLink to="/presets" class="hover:text-orange-500 transition-all ease-in-out">
          Presets
        </RouterLink>
      </nav>
    </div>
  </header>

  <div class="container justify-self-center pt-10">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: {
    RouterLink,
    RouterView,
  },
  name: 'App',
}
</script>
