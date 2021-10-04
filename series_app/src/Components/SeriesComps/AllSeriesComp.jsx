import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import requests from "../../utils/requests";
import { Link } from "react-router-dom";
export default function AllSerieComp() {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const series = useSelector((state) => [...state.series]);
  const members = useSelector((state) => [...state.members]);
  const subscription = useSelector((state) => [...state.subscription]);

  const formatDate = (date, type) => {
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

  const removeSeire = async (serie) => {
    let resp = await requests.deleteItem(
      "http://localhost:8080/api/series",
      serie._id
    );
    alert(resp.data);
    dispatch({ type: "DEL_SERIE", payload: serie });
  };

  return (
    <div>
      <div className="mainConianer">
        {series.map((serie) => {
          return (
            <div key={serie._id} className="contet">
              <h4> 
                {serie.name} <br />
                {serie.premiered.slice(0, 4)}
              </h4>
              <img alt={serie.name + "img"} src={serie.img} />
              <br />
              <span>
                <b>Genres:</b>
                <br />
                {serie.genres.join()}
              </span>
              <br />
              <div className="innerGrid">
                <span>Subscriptions Watched</span>
                <ul>
                  {subscription.map((sub) => {
                    if (sub.seriesId === serie._id) {
                      for (const member of members) {
                        if (member._id === sub.memberId) {
                          return (
                            <li key={sub._id}>
                              <Link
                                to={{
                                  pathname: `${url}/subscribers/${member._id}`, state:{ name : member.fullName}}}
                                state={{ from: member.fullName }}
                              >
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
                <input
                  type="button"
                  value="Remove"
                  onClick={() => removeSeire(serie)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
