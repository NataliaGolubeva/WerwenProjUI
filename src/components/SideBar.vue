<template>
    <nav
      id="sidenav-5"
      class="fixed border-r-[0.05rem] border-background-700 left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0 bg-background-900"
      data-te-sidenav-init
      data-te-sidenav-hidden="false"
      data-te-sidenav-mode="side"
      data-te-sidenav-content="#content"
    >
      <ul
        class="relative m-0 list-none px-[0.2rem] pt-2 h-full flex flex-col"
        data-te-sidenav-menu-ref
      >
        <li>
          <router-link
            :to="{ name: 'site' }"
            class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          >
            <fa icon="fa-solid fa-magnifying-glass" class="pr-4" />
            <span>Sites</span>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'employees' }"
            class="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
          >
            <fa icon="fa-solid fa-magnifying-glass" class="pr-4" />
            <span>Employees</span>
          </router-link>
        </li>
        
       
      </ul>
    </nav>
    <!-- Sidenav -->
  
    <!-- Toggler -->
    <div class="languages flex justify-around absolute top-4 right-0 z-50">
      <div class="nav-btn" @click="switchLang('en')">EN</div>
      <div class="nav-btn" @click="switchLang('nl')">NL</div>
      <button
        class="nav-btn"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav-5"
        aria-controls="#sidenav-5"
        aria-haspopup="true"
      >
        <span class="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
    </div>
  
    <!-- Toggler -->
  </template>
  <script lang="ts" setup>
  import { Sidenav, initTE } from 'tw-elements'
  import { useRouter, useRoute } from 'vue-router'
  // @ts-ignore
  import { useI18n } from 'vue-i18n'
  import {onMounted, nextTick, computed} from 'vue'
  import {useSitesStore} from '../stores/site-store'
  
  const router = useRouter()
  const route = useRoute()
  const siteStore = useSitesStore()
  
  const { locale } = useI18n({ useScope: 'global' })
  const defaultLang = computed(() => siteStore.defaultLang as any)
  
  const switchLang = (lang: string) => {
    locale.value = lang
    localStorage.setItem('az-settings-lang', lang)
  }

  
  onMounted( () => {
    nextTick(() => {
      initTE({ Sidenav })
    })
  })
  


  </script>
  <style></style>
  