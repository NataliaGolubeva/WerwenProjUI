<template>
<div>
  <div class="navbar bg-base-100">
  <div class="flex-1">
    <router-link :to="({name: 'sites'})" class="btn btn-ghost text-xl">Constraction Sites</router-link>
  </div>
  <div class="flex-1">
    <router-link :to="({name: 'employees'})" class="btn btn-ghost text-xl">Employees</router-link>
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input v-model="employeeStore.searchQuery" type="text" placeholder="Search Employee" class="input input-bordered w-24 md:w-auto" />
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
        <th>RoleIndex</th>
        <th>Role</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="(employee, index) in filteredEmployees" :key="employee.id" class="hover:bg-slate-800  ">
        <th>{{ index + 1 }}</th>
        <td>{{ employee.name }}</td>
        <td>{{ employee.roleNr}}</td>
        <td>{{ employee.role }}</td>
        <td><button class="btn btn-sm btn-promary">Enroll</button></td>
      </tr>
     
    </tbody>
  </table>
</div>
</div>
  </template>
  <script setup lang="ts">
import {onMounted, computed} from 'vue'
import {useSitesStore} from '../stores/site-store'
import {useEmployeeStore} from '../stores/employees-store'
const siteStore  = useSitesStore()
const employeeStore = useEmployeeStore()
const employees = computed(()=> employeeStore.employees)
const searchQuery = computed(()=> employeeStore.searchQuery)
const filteredEmployees = computed(()=>
{
  if (employees.value) {
    if (searchQuery.value.length) {
      return employees.value.filter(s => s.name.toLowerCase().match(searchQuery.value.toLocaleLowerCase()))
    }
    else {return employees.value}
  }
}
)
onMounted(async()=> {
  await employeeStore.fetchEmployees()

})
const seedDb = async() => {
await siteStore.seedDatabase()
await siteStore.fetchSites()
}
  </script>