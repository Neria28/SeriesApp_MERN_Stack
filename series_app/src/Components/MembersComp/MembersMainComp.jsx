import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import requests from "../../utils/requests";
import AddMemberComp from "./AddMemberComp";
import AllMembersComp from "./AllMembersComp";
import EditMemberComp from "./EditMemberComp";
export default function MemberMainComp() {
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const getMembers = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/members");
    dispatch({ type: "GET_MEMBERS", payload: resp.data });
  };
  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div>
      <h1 style={{ lineHeight: "1px" }}>Members</h1>
      <div>
        <Link to={`${url}`}>
          <button>ALL Members</button>
        </Link>
        <Link to={`addmember`}>
          <button>Add Member</button>
        </Link>
      </div>
      <Switch>
        <Route
          exact
          path={`${path}/subscribers/addmember`}
          component={AddMemberComp}
        />
        <Route
          path={`${path}/subscribers/:memberId`}
          component={EditMemberComp}
        />
        <Route path={`${path}`} component={AllMembersComp} />
      </Switch>
    </div>
  );
}
