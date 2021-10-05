import { Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import EditSerieComp from "./EditSerieComp";
import AllSeriesComp from "./AllSeriesComp";
import AddSerieComp from "./AddSerieComp";
import requests from "../../utils/requests";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import AddMemberComp from "../MembersComp/AddMemberComp";
import SerieComp from "./SerieComp";

export default function SeriesComp() {
  const dispatch = useDispatch();
  const [searchInp, setSearchInp] = useState("");
  const { path, url } = useRouteMatch();
  console.log("path" , path)

  const getSeries = async (searchInp) => {
    let resp = await requests.getAll("http://localhost:8080/api/series");
    console.log("the searchInp", searchInp);
    if (searchInp === "") {
      dispatch({ type: "SET_SERIES", payload: resp.data });
    } else if (searchInp !== "") {
      let searchedSeries = resp.data.filter((serie) =>
        serie.name.toLowerCase().includes(searchInp)
      );
      dispatch({ type: "SET_SERIES", payload: searchedSeries });
    }
  };

  const getSubscription = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/subs");
    dispatch({ type: "GET_SUBSCRIPTIONS", payload: resp.data });
  };
  const getMembers = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/members");
    dispatch({ type: "GET_MEMBERS", payload: resp.data });
  };

  useEffect(() => {
    getMembers();
    getSubscription();
  }, []);

  useEffect(() => {
    getSeries(searchInp);
  }, [searchInp]);

  // const search =()=> {
  //   dispatch({type : "SET_SEARCH_INP" , payload : searchInp})
  // }

  return (
    <div >
      <h1 style={{ lineHeight: "1px" }}>Series</h1>
      <div>
        <div>
          <Link to={`${url}`}>
            <button>ALL Series</button>
          </Link>
          <Link to={`${url}/addserie`}>
            <button>Add Series</button>
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search Movie"
            onChange={(e) => setSearchInp(e.target.value)}
          />
          {/* <input type="button" value="Search" onClick={() => search()}/> */}
        </div>
      </div>
      <Switch>
        <Route path={`${path}/addmember`} component={AddMemberComp} />
        <Route path={`${path}/serie/:serieid`} component={SerieComp} />
        <Route path={`${path}/editserie/:serieid`} component={EditSerieComp} />
        <Route path={`${path}/addserie`} component={AddSerieComp} />
        <Route path={path} component={AllSeriesComp} />
      </Switch>
    </div>
  );
}
