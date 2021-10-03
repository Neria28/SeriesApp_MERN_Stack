import { Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router";
import EditSerieComp from "./EditSerieComp";
import AllSeriesComp from "./AllSeriesComp";
import AddSerieComp from "./AddSerieComp";
import requests from "../../utils/requests";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function SeriesComp() {
  const dispatch = useDispatch()
  const [searchInp, setSearchInp] = useState("")
  const { path, url } = useRouteMatch();

  const search =()=> {
    dispatch({type : "SET_SEARCH_INP" , payload : searchInp})
  }
 

  return (
    <div style={{ border: "8px solid #000", height: "auto" }}>
      <h3>Series</h3>
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
          <input type="button" value="Search" onClick={() => search()}/>
        </div>
      </div>
      <Switch>
        <Route path={`${path}/editserie/:serieid`} component={EditSerieComp} />
        <Route path={`${path}/addserie`} component={AddSerieComp} />
        <Route path={path} component={AllSeriesComp} />
      </Switch>
    </div>
  );
}
