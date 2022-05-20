import React from 'react';
import {Form, useLoaderData} from "@remix-run/react";
import {getCityById } from "~/constants";
import { getWeatherOnDate } from '~/api/frost-api';


export const loader = async ({request}: {request: Request}) => {
  const url = new URL(request.url);
  const dato = url.searchParams.get('dato') || '2022-05-20'
  return getWeatherOnDate(dato);
};


function Bykampen() {
  const response = useLoaderData() as FrostObservationsResponse;
  console.log(response);
  return (
    <div>
      <h1>
        Bykampen
      </h1>
      <Form>
        <input type="date" name="dato"/>
        <input type="submit" value="Vis"/>
      </Form>
      {response && response.data.map(station => <p>{getCityById(station.sourceId)?.name}: {station.observations[0].value}</p>)}
    </div>
  );
}

export default Bykampen;