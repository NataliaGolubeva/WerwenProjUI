<template>
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
  <button class="btn btn-accent ml-2" @click="goBack()">Back</button>




</div>
<div class="m-12">
  <div class="flex justify-between">
    <div class="text-xl mb-6">Details </div>
<button class="btn btn-sm" onclick="update_site.showModal()">Update status</button>
  </div>
<div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>Name</th>
        <td>{{ site.name }}</td>
     
      </tr>
      <!-- row 2 -->
      <tr>
        <th>Description</th>
        <td>{{ site.description }}</td>
      
      </tr>
      <!-- row 3 -->
      <tr>
        <th>Status</th>
        <td>{{ site.status }}</td>
     
      </tr>
     
    </tbody>
  </table>
<div class="text-xl my-6">Employees </div>

  <div v-if="!employeelist">No employees enrolled for site</div>

<table v-else class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>RoleIndex</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(employee, index) in site.employees" :key="employee.id">
        <th>{{index + 1 }}</th>
        <th>{{employee.name }}</th>
        <td>{{employee.roleNr }}</td>
        <td>{{employee.role }}</td>
     
      </tr>
     
    </tbody>
  </table>
</div>
<div class="flex justify-end pb-10 ">
  <button class="btn btn-sm btn-error" :disabled="employeelist" @click="deleteSite()" >Delete site</button>
</div>
</div>

<dialog id="update_site" class="modal">
  <div class="modal-box">
    <div class="text-center text-xl font-bold">{{ site.status }}</div>
    <div class="border-t-[1px] border-slate-500 my-6"></div>
    <select
                        class="select select-sm select-ghost w-full select-bordered "
                        v-model="selectedStatus"
                      >
                        <option   v-for="status in statuses" :value="status.id" :key="status.id">
                         <p :class="getCurrentStatus(status.id)">{{ status.statusName }}</p> 
                          </option>
                      </select>
    <div class="modal-action flex justify-between">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary w-24">Close</button>
      </form>
    <button class="btn btn-accent w-24" @click="updateStatus">Update</button>

    </div>
  </div>
</dialog>
</template>
<script setup lang="ts">
// @ts-ignore
import { useRouter, useRoute } from "vue-router"
import {onMounted, computed, ref} from 'vue'
import {useSitesStore} from '../stores/site-store'

const router = useRouter()
const route = useRoute()
const siteStore  = useSitesStore()
const site = computed(()=> siteStore.site)
const statuses = computed(()=> siteStore.statuses)
const employeelist = ref(false)
const selectedStatus = ref(site.value.statusId)
const siteId = computed(()=>parseInt(route.params.siteId as string) )

onMounted(async()=> {
  siteStore.siteId = parseInt(route.params.siteId as string)
  await siteStore.fetchSite()
  await siteStore.fetchStatuses()
  console.log(statuses.value)
  if (site?.value?.employees.length) employeelist.value = true

})
const goBack = () => {
  router.push({
    name: 'sites',
    
  })}
  const updateStatus = async() => {
    var obj = {
      siteId: siteId.value,
        statusId: selectedStatus.value
    }
    siteStore.statusUpdateObj = obj
    await siteStore.updateSiteStatus()
    await siteStore.fetchSite()
    console.log('site.value', site.value)
    console.log(obj)

  }
  const getCurrentStatus = (id: number) => {
site.value.statusId == id? 'text-red-500' : ''
  }
  const deleteSite = async() => {
    await siteStore.deleteSite()
    router.push({name: "sites"})
  }
</script>