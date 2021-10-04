import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import requests from "../../utils/requests";

export default function MemberComp({ member }) {
  const { url } = useRouteMatch();
  const series = useSelector((state) => [...state.series]);
  const subscription = useSelector((state) => [...state.subscription]);
  const [isSub, setIsSub] = useState(false);
  const [newSub, setNewSub] = useState({
    seriesId: "",
    memberId: "",
    date: "",
  });
  const dispatch = useDispatch();
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
  const getSeries = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/series");
    dispatch({ type: "SET_SERIES", payload: resp.data });
  };

  const getSubscription = async () => {
    let resp = await requests.getAll("http://localhost:8080/api/subs");
    dispatch({ type: "GET_SUBSCRIPTIONS", payload: resp.data });
  };
  const subscribe = async () => {
    let resp = await requests.post("http://localhost:8080/api/subs", newSub);
    dispatch({ type: "ADD_SUB", payload: resp.data.sub });
    alert(resp.data.text);
  };

  const delMember = async (id) => {
    let resp = await requests.deleteItem(
      "http://localhost:8080/api/members",
      id
    );
    dispatch({ type: "DEL_MEMBER", payload: id });
    alert(resp.data);
  };

  useEffect(() => {
    getSubscription();
    getSeries();
  }, []);
  return (
    <div key={member._id} className="contet">
      <h4 style={{ lineHeight: "1px" }}>{member.fullName}</h4>
      <br />
      <b>Email:</b> <span>{member.email}</span>
      <br />
      <b>City:</b> <span>{member.city}</span>
      <br />
      <div>
        <Link
          to={{
            pathname: `${url}/${member._id}`,
            state: { name: member.fullName },
          }}
        >
          <button>Edit</button>
        </Link>
        <button onClick={() => delMember(member._id)}>Delete</button>
      </div>
      <div className="innerGrid">
        <span>Series Watched</span>
        <button onClick={() => setIsSub(!isSub)}>Subscribe new movie</button>
        <br />
        {isSub ? (
          <div style={{ border: "2px solid green" }}>
            <span>Add a new serie</span>
            <br />
            <select
              style={{ width: "100px" }}
              onChange={(e) =>
                setNewSub({
                  ...newSub,
                  seriesId: e.target.value,
                  memberId: member._id,
                })
              }
            >
              {series.map((serie) => {
                return <option value={serie._id}>{serie.name}</option>;
              })}
            </select>
            <br />
            <span>Chose Date</span>
            <input
              type="text"
              onChange={(e) => setNewSub({ ...newSub, date: e.target.value })}
            />
            <button onClick={() => subscribe()}>Subscribe</button>
          </div>
        ) : null}
        <ul>
          {subscription.map((sub) => {
            if (member._id === sub.memberId) {
              for (const serie of series) {
                if (serie._id === sub.seriesId) {
                  return (
                    <li key={sub._id}>
                      <Link to={`editserie/${serie._id}`}>{serie.name}</Link> ,{" "}
                      {formatDate(sub.date)}
                    </li>
                  );
                }
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
}
