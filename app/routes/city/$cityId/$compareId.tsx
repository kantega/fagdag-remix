import { json } from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import { getWeatherByCityId } from "~/api/frost-api";
import {bergen, getCityById, City, oslo, trondheim} from "~/constants";
import CityTemperatureTable from "../components/city-temperature-table";


export const loader = async ({params} : {params:any}) => {
    const compareCity = getCityById(params.compareId);
    const observationsCompare = await getWeatherByCityId(params.compareId);
    const data = { city: compareCity, observations: await observationsCompare.json()};
    return json(data);
  };
  

export default function CompareCity() {
    const data = useLoaderData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{data.city.name}</h1>

      <CityTemperatureTable data={data.observations.data}/>
    </div>
  );
}
