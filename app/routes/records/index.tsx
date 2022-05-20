import React from 'react';
import {useLoaderData} from "@remix-run/react";

function getAuthHeaders() : { "Authorization" : string } {
  var credentials = btoa("1ec8911f-669b-43d3-b2d8-27da8428b3d3");
  return {"Authorization": `Basic ${credentials}`};
}

export async function getWeatherRecords(elements? : string | null) {
  let searchElements = !elements ? "max(air_temperature P1D)" : elements;
  return fetch(`https://frost.met.no/records/countyExtremes/v0.jsonld?elements=${searchElements}`, {headers: getAuthHeaders()})
}

export const loader = async () => {
  return getWeatherRecords();
};

function Records() {
  const {data} = useLoaderData();
  console.log(data);
  return (
    <div>
      <h1>
        Hello world
      </h1>
      {
  // @ts-ignore
        data.map(item => <p key={`${item.sourceId}${item.referenceTime}`}>{item.municipality}: {item.value}</p>)
      }
    </div>
  );
}

export default Records;