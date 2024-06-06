import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store';
import axios from 'axios';

type employeeState = {
    employees: ConstractionData.Employee[],
    employee: ConstractionData.Employee,
    roles: ConstractionData.Role[],
    searchQuery: string,
    employeeId: number,

}
export const useEmployeeStore = defineStore('employee', {
    state: (): employeeState=> ({
        employees: [],
        employee: {} as ConstractionData.Employee,
        searchQuery: '',
        employeeId: 0,
        roles: []
     }),

    actions : {
        async fetchEmployees() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.get(`${authStore.basicUrl}api/employees`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log(result.data)
              this.employees = result.data
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
        async fetchEmployee() {
            const authStore = useAuthStore()
            try { 
                console.log('fetching')
                const result = await axios.get(`${authStore.basicUrl}api/employees/${this.employeeId}`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log('result', result.data)
              this.employee = result.data
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
  
        async fetchRoles() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.get(`${authStore.basicUrl}api/employees/roles`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log(result.data)
              this.roles = result.data
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
  
        async deleteEmployee() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.delete(`${authStore.basicUrl}api/employees/deleteEmployee/${this.employeeId}`, {
                    headers: {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json'
                    }
                  })
                  console.log(result, result.status)
             
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
        
       
        
    }
})