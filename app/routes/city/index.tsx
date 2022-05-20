import {Link} from "@remix-run/react";
import {bergen, oslo, trondheim} from "~/constants";

export default function CityIndex() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Velg by</h1>
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
    </div>
  );
}
