import { useEffect, useState } from "react";
import { useParams } from "react-router";
import requests from "../../utils/requests";

export default function SerieComp() {
  const [serie, setSerie] = useState({});
  const { serieid } = useParams();

  useEffect(async () => {
    let resp = await requests.getItem(
      "http://localhost:8080/api/series/",
      serieid
    );
    setSerie(resp.data);
  }, []);
  return (
    <div style={{ margin: "0 auto" }} className="contet">
      <h4>
        {serie.name} <br />
        {serie.premiered?.slice(0, 4)}
      </h4>
      <img src={serie.img} />
    </div>
  );
}
