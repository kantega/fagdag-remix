import React from 'react';
import {Form, useLoaderData} from "@remix-run/react";
import * as Url from "url";
import {bergen, getCiyById, oslo, trondheim} from "~/constants";

function getAuthHeaders() : { "Authorization" : string } {
  var credentials = btoa("1ec8911f-669b-43d3-b2d8-27da8428b3d3");
  return {"Authorization": `Basic ${credentials}`};
}

interface Response {
  data: StationWithObservations[]
}

interface Observation {
  elementId: string,
  value: number,
}

interface StationWithObservations {
  sourceId: string,
  observations: Observation[]
}

export async function getWeatherOnDate(date : string) {
  return fetch(`https://frost.met.no/observations/v0.jsonld?sources=${oslo.id},${bergen.id},${trondheim.id}&referencetime=${date}&elements=max(air_temperature%20P1D)`, {headers: getAuthHeaders()})
}

export const loader = async ({request}: {request: Request}) => {
  const url = new URL(request.url);
  const dato = url.searchParams.get('dato') || '2022-05-20'
  return getWeatherOnDate(dato);
};

function Bykampen() {
  const response = useLoaderData() as Response;
  return (
    <div>
      <h1>
        Bykampen
      </h1>
      <Form>
        <input type="date" name="dato"/>
        <input type="submit" value="Vis"/>
      </Form>
      {response && response.data.map(station => <p>{getCiyById(station.sourceId)?.name}: {station.observations[0].value}</p>)}
    </div>
  );
}

export default Bykampen;