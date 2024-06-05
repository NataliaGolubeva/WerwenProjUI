<template>

<div >
  <div class="navbar bg-base-100">
  <div class="flex-1">
    <router-link :to="({name: 'sites'})" class="btn btn-ghost text-xl">Constraction Sites</router-link>
  </div>
  <div class="flex-1">
    <router-link :to="({name: 'employees'})" class="btn btn-ghost text-xl">Employees</router-link>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input v-model="siteStore.searchQuery" type="text" placeholder="Search Site" class="input input-bordered w-24 md:w-auto" />
    </div>

  </div>
  <button class="btn btn-accent ml-2" @click="seedDb()">Seed db</button>

</div>
<div class="overflow-x-auto">
  <table class="table ">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(site, index) in filteredSites" :key="site.id" class="hover:bg-slate-800 hover:cursor-pointer" @click="goToDetails(site.id)">
        <th>{{ index + 1 }}</th>
        <td>{{ site.name }}</td>
        <td>{{ site.status }}</td>
      </tr>
     
    </tbody>
  </table>
</div>
</div>

  
</template>
<script setup lang="ts">
import { useRouter } from "vue-router"
import {onMounted, computed} from 'vue'
import {useSitesStore} from '../stores/site-store'
const router = useRouter()
const siteStore  = useSitesStore()
const searchQuery = computed(()=> siteStore.searchQuery)
const sites = computed(()=> siteStore.sites )
const filteredSites = computed(()=> {
  if (sites.value) {
    if (searchQuery.value.length) {
      return sites.value.filter(s => s.name.toLowerCase().match(searchQuery.value.toLocaleLowerCase()))
    }
    else {return sites.value}
  }
})
onMounted(async()=> {
await siteStore.fetchSites()
console.log('sites', sites)
})
const goHome = () => {
  router.push({
    name: 'employees',
    
  })}
  const goToDetails = (id: number) => {
    siteStore.siteId = id
    router.push({
    name: 'site-details',
    params: {
      siteId: id
    }
    
  })
  }
  const seedDb = async() => {
    await siteStore.seedDatabase()
    await siteStore.fetchSites()
  }
</script>




