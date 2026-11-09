import mockActivities from '../data/mockActivities.json'

/* TODO: implement proper service layer to communicate with AFA platform soon*/ 
export async function getActivities() {
    return mockActivities
}