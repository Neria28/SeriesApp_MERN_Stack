import { useState, useEffect } from "react";
import { useRouteMatch, Switch, Route, Link } from "react-router-dom";
import SeriesComp from "./SeriesComp.jsx";
import MembersMainComp from "../MembersComp/MembersMainComp";
import EditMemberComp from "../MembersComp/EditMemberComp.jsx";
import AddMemberComp from "../MembersComp/AddMemberComp.jsx";

export default function SeriesMainComp(props) {
  const { path, url } = useRouteMatch();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(sessionStorage.getItem("userName"));
  }, []);

  return (
    <div>
      <h2>Hello {userName}!</h2>
      <h3>Wellcome to</h3>
      <h1
        style={{
          backgroundColor: "white",
          width: "120px",
          margin: "0 auto",
          borderRadius: "4px",
          border: "4px solid red",
          color: "red",
        }}
      >
        NerFlix
      </h1>
      <div>
        <Link to={`${url}`}>
          <button>Series</button>
        </Link>
        <Link to={`${url}/subscribers`}>
          <button>Subscriptions</button>
        </Link>
        <Link to={'/'}>
        <button>Log Out</button>
        </Link>
        <br />
        <br />
      </div>
      <Switch>
        <Route path={`${path}/subscribers/:memberId`} component={EditMemberComp}/>
        <Route path={`${path}/subscribers`} component={MembersMainComp} />
        <Route path={`${path}`} component={SeriesComp} />
        <Route path={`${path}/subscribers/addmember`} component={AddMemberComp}/>
      </Switch>
    </div>
  );
}
