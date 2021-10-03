import { useState, useEffect } from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import SeriesComp from "./SeriesComp.jsx";
import MemberMainComp from "../MembersComp/MembersMain";

export default function SeriesMainComp(props) {
  const { path, url } = useRouteMatch();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(sessionStorage.getItem("userName"));
  }, []);
  
  return (
    <div>
      <h2>Wellcome to</h2>
      <h1 style={{ backgroundColor: 'white', width: "120px", 
      margin: "0 auto" ,
      borderRadius :'4px',
      border : '4px solid red' ,
      color : 'red'}}>NerFlix</h1>
      <div>Hello {userName}</div>
      <div>
        <Link to={`${url}`}>
          <button>Series</button>
        </Link>
        <Link to={`${url}/subscribers`}>
          <button>Subscriptions</button>
        </Link>
        <button>Log Out</button>
        <br />
        <br />
      </div>
      <Switch>
        <Route path={`${path}/subscribers`} component={MemberMainComp} />
        <Route path={`${path}`} component={SeriesComp} />
      </Switch>
    </div>
  );
}
