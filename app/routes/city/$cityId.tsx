import { json } from "@remix-run/node";
import {Form, Link, Outlet, useLoaderData} from "@remix-run/react";
import { getWeatherByCityIdAndYear } from "~/api/frost-api";
import {bergen, getCityById, oslo, trondheim} from "~/constants";
import CityTemperatureTable from "./components/city-temperature-table";


export const loader = async ({params, request} : {params:any, request: any}) => {
    const url = new URL(request.url);
    
    let yearString = url.searchParams.get('year')
    const year = yearString != null ? Number(yearString) : new Date().getFullYear();

    const city = getCityById(params.cityId);

    const observations = await getWeatherByCityIdAndYear(params.cityId, year);

    const data = { year: year, city: city, observations: await observations.json() };
    return json(data);
  };
  

export default function City() {
    const data = useLoaderData();

    const thisYear = new Date().getFullYear();
    const navigateToNextYear = thisYear > data.year;

    console.log(data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>

      <div>
      <Form method="get">
        <input type="submit" name="year" value={data.year-1}/>

        <h1>{data.city.name} - {data.year}</h1>
        
        <input type="submit" name="year" value={data.year+1} disabled={!navigateToNextYear}/>
      </Form>

        <CityTemperatureTable data={data.observations.data}/>
        <div>
        <Outlet/>
        </div>
      </div>
      
      
      <h1>Sammenlign med</h1>
      <ul>
        <li>
          <Link to={`${bergen.id}?year=${data.year}`}>
            Bergen
          </Link>
        </li>
        <li>
        <Link to={`${oslo.id}?year=${data.year}`}>
            Oslo
          </Link>
        </li>
        <li>
        <Link to={`${trondheim.id}?year=${data.year}`}>
            Trondheim
          </Link>
        </li>
        
      </ul>
      
    </div>
  );
}
