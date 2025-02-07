<template>
  <header>
    <div class="wrapper">
      <nav class="flex justify-center py-8 uppercase border-b border-zinc-900 bg-[#000000] font-medium">
        <div class="absolute left-8 align-middle">
          <RouterLink to="/" class="hover:text-orange-500 transition-all ease-in-out">
            <img src="/src/assets/home.png" alt="Home" class=""/>
          </RouterLink>
        </div>

        <div class="flex gap-4">
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
        </div>
      </nav>
    </div>
  </header>

  <div class="justify-self-center p-5 w-full">
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
