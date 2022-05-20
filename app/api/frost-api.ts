import {bergen, oslo, trondheim} from "~/constants";

function getAuthHeaders() : { "Authorization" : string } {
    var credentials = btoa("1ec8911f-669b-43d3-b2d8-27da8428b3d3");
    return {"Authorization": `Basic ${credentials}`};
}
  
export interface FrostObservationsResponse {
    data: StationWithObservations[]
}
  
export interface Observation {
    elementId: string,
    value: number,
}
  
export interface StationWithObservations {
    sourceId: string,
    observations: Observation[]
}
  
export async function getWeatherOnDate(date : string) {
    return fetch(`https://frost.met.no/observations/v0.jsonld?sources=${oslo.id},${bergen.id},${trondheim.id}&referencetime=${date}&elements=max(air_temperature%20P1D)`, {headers: getAuthHeaders()})
}