declare namespace ConstractionData {

    type ConstractionSite = {
        id: number
        name: string
        description: string
        statusId: number
        status: string
        employees: Employee[]
    }
    type Employee = {
        id: number
        name: string
        roleId: number
        role: string
    }
    type Status = {
        id: number
        statusNr: number
        statusName: string
    }
    type statusUpdate = {
        siteId: number
        statusId: number
    }
}