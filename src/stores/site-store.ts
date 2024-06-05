import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store';
import axios from 'axios';

type sitesState = {
    sites: ConstractionData.ConstractionSite[],
    site: ConstractionData.ConstractionSite,
    statuses: ConstractionData.Status[],
    defaultLang: string,
    searchQuery: string,
    siteId: number,
    statusUpdateObj: ConstractionData.statusUpdate

}
export const useSitesStore = defineStore('sites', {
    state: (): sitesState=> ({
        sites: [],
        site: {} as ConstractionData.ConstractionSite,
        defaultLang: 'en',
        searchQuery: '',
        siteId: 0,
        statuses: [],
        statusUpdateObj: {} as ConstractionData.statusUpdate
    }),

    actions : {
        async fetchSites() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.get(`${authStore.basicUrl}api/ConstractionSites`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log(result.data)
              this.sites = result.data
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
        async fetchSite() {
            const authStore = useAuthStore()
            try { 
                console.log('fetching')
                const result = await axios.get(`${authStore.basicUrl}api/ConstractionSites/${this.siteId}`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log('result', result.data)
              this.site = result.data
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
        async seedDatabase() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.post(`${authStore.basicUrl}api/seedDb`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log(result.data)
             
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
        async fetchStatuses() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.get(`${authStore.basicUrl}api/ConstractionSites/statusList`, {
                    headers: {
                        'accept': 'application/json',
                    }
                  })
                  console.log(result.data)
              this.statuses = result.data
                 return result.data 
                }
                
            catch(err : any) {
                if (err.response) {
                    console.log('message', err.message);
                  }
            }
        },
        async updateSiteStatus() {
            const authStore = useAuthStore()
            console.log(this.statusUpdateObj)
            try { 
                const result = await axios.put(`${authStore.basicUrl}api/ConstractionSites/updateSiteStatus`, this.statusUpdateObj, {
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
        async deleteSite() {
            const authStore = useAuthStore()
            try { 
                const result = await axios.delete(`${authStore.basicUrl}api/ConstractionSites/deleteSite/${this.siteId}`, {
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