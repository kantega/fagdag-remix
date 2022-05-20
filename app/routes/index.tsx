import {Link} from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Weather by Kantega</h1>
      <ul>
        <li>
          <Link to="/records">
            Værrekorder
          </Link>
        </li>
        <li>
          <Link to="/bykampen">
            Bykampen
          </Link>
        </li>
      </ul>
    </div>
  );
}
