declare namespace ConstractionData {

    type ConstractionSite = {
        id: number
        name: string
        description: string
        statusId: number
        status: string
        statusNr: number
        employees: Employee[]
    }
    type Employee = {
        id: number
        name: string
        role: string
        roleNr: number
    }
    type Status = {
        id: number
        statusNr: number
        statusName: string
    }
    type Role = {
        id: number
        roleId: number
        roleName: string
    }
    type statusUpdate = {
        siteId: number
        statusId: number
    }
}