import { json } from "@remix-run/node";
import {Link, Outlet, useLoaderData} from "@remix-run/react";
import { getWeatherByCityId } from "~/api/frost-api";
import {bergen, getCityById, City, oslo, trondheim} from "~/constants";


export const loader = async ({params} : {params:any}) => {
    const city = getCityById(params.cityId);

    const observations = await getWeatherByCityId(params.cityId);

    const data = { city: city, observations: await observations.json() };
    return json(data);
  };
  

export default function City() {
    const data = useLoaderData();
    console.log(data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{data.city.name}</h1>
      <table>
          <thead>
              <tr>
                  <td>Måned</td>
                  <td>Temperatur</td>
              </tr>
          </thead>
          <tbody>
              {
                  data.observations.data.map(month => (
                      <tr>
                          <td>{month.referenceTime.substring(0,7)}</td>
                          <td>{month.observations[0].value}</td>
                      </tr>
                  ))
              }
          </tbody>
      </table>

      <h1>Sammenlign med</h1>
      <ul>
        <li>
          <Link to={bergen.id}>
            Bergen
          </Link>
        </li>
        <li>
          <Link to={oslo.id}>
            Oslo
          </Link>
        </li>
        <li>
          <Link to={trondheim.id}>
            Trondheim
          </Link>
        </li>
        
      </ul>
      <Outlet/>
    </div>
  );
}
