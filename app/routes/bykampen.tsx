import React from 'react';
import {Form, Link, Outlet, useLoaderData} from "@remix-run/react";
import {getCityById } from "~/constants";
import {FrostObservationsResponse, getWeatherOnDate} from '~/api/frost-api';


export const loader = async ({request}: {request: Request}) => {
  const url = new URL(request.url);
  const dato = url.searchParams.get('dato') || '2022-05-20'
  const elements = url.searchParams.get('elements') || 'max(air_temperature P1D)'
  return getWeatherOnDate(dato, elements);
};


function Bykampen() {
  const response = useLoaderData() as FrostObservationsResponse;
  return (
    <div>
      <h1>
        Bykampen
      </h1>
      <Form>
        <input type="date" name="dato"/>
        <select name="elements">
          <option value="max(air_temperature P1D)">Max temperatur</option>
          <option value="min(air_temperature P1D)">Min temperatur</option>
            <option value="sum(precipitation_amount P1D)">Nedbør</option>
        </select>
        <input type="submit" value="Vis"/>
      </Form>
      {response && response.data.map(station => <Link to={getCityById(station.sourceId)?.id || ''}>{getCityById(station.sourceId)?.name}: {station.observations[0].value ?? "ingen måling"}</Link>)}
      <Outlet/>
    </div>
  );
}

export default Bykampen;