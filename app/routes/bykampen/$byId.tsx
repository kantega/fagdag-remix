import React from "react";
import {useParams} from "react-router";
import {getCityById} from "~/constants";
import {getStationById, SourceInformation} from "~/api/frost-api";
import {useLoaderData} from "@remix-run/react";
import Kart from "~/components/Kart";

export const loader = async ({request}: {request: Request}) => {
    const url = new URL(request.url);
    const sourceId = url.pathname.substring(url.pathname.lastIndexOf('/')+1) || ''
    return getStationById(sourceId);
}

function ById() {
    const params = useParams()
    const response = useLoaderData() as SourceInformation
    //console.log(response)
    if(!response) return undefined;
  return (
    <div>
      <h1>
          {`Værstasjonen for ${getCityById(params.byId || '')?.name}`}
      </h1>
        {response && <p>{`På målestasjonen  ${response.data[0].shortName || ''} har det vært gjort værmålinger siden ${new Date(response.data[0].validFrom).toLocaleDateString() || ''}`}</p>}
        <Kart station={response.data[0]}/>
    </div>
  );
}

export default ById;