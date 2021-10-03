import "./allSeries.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import requests from "../../utils/requests";
import { Link } from "react-router-dom";
export default function AllSerieComp() {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const searchInp = useSelector((state) => state.searchInp);
  let series = useSelector((state) => [...state.series]);
  const members = useSelector((state) => [...state.members]);
  const [subscribers, setSubscribers] = useState([]);

  const formatDate = (date, type) => {
    date = new Date();
    let options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    if (type === "year") {
      return date.toLocaleString("he-il", { year: "numeric" });
    } else {
      return date.toLocaleString("he-il", options);
    }
  };
  const getSeries = async (searchInp) => {
    let resp = await requests.getAll("http://localhost:8080/api/series");
    console.log("the searchInp", searchInp);
    if (searchInp === "") {
      dispatch({ type: "SET_SERIES", payload: resp.data });
    } else if (searchInp !== "") {
      let searchedSeries = resp.data.filter((serie) =>
      serie.name.toLowerCase().includes(searchInp)
      );
      console.log(searchedSeries);
      dispatch({ type: "SET_SERIES", payload: searchedSeries });
    }
  };
  const getSubscribers = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/subs");
    setSubscribers(resp.data);
  };
  const getMembers = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/members");
    
    dispatch({ type: "GET_MEMBERS", payload: resp.data });
  };
  
  const removeSeire = async (serieId) => {
    let resp = await requests.deleteItem(
      "http://localhost:8080/api/series" + serieId
      );
      alert(resp.data)
    dispatch({ type: "DEL_SERIE", payload: series});
  };
  
  useEffect(() => {
    getSeries(searchInp);
  }, [searchInp]);

  useEffect(() => {
    getSeries("");
    getMembers();
    getSubscribers();
  }, []);

  return (
    <div style={{ border: "3px solid green" }}>
      <div className="seriesContainer">
        {series.map((serie) => {
          return (
            <div key={serie._id} className="serie">
              <h4>
                {serie.name} , {formatDate(serie.premiered, "year")}
              </h4>
              <br />
              <img alt={serie.name + "img"} src={serie.img} />
              <br />
              <span>
                <b>Genres:</b>
                <br />
                {serie.genres.join()}
              </span>
              <br />
              <div className="subscriptions">
                <span>Subscriptions Watched</span>
                <ul>
                  {subscribers.map((sub) => {
                    if (sub.seriesId === serie._id) {
                      for (const member of members) {
                        if (member._id === sub.memberId) {
                          return (
                            <li key={sub._id}>
                              <Link to={`${url}/subscribers/${member._id}`}>
                                {member.fullName}
                              </Link>
                              <br />
                              subscribed at: {formatDate(sub.date, "")}
                            </li>
                          );
                        }
                      }
                    }
                  })}
                </ul>
              </div>
              <div>
                <Link to={`${url}/editserie/${serie._id}`}>
                  <button>Edit</button>
                </Link>
                <button type="button" onCLick={() => removeSeire(serie._id)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
