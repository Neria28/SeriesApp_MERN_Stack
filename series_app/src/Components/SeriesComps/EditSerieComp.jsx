import { useEffect, useState ,useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams  } from "react-router";
import { Link } from "react-router-dom";
import requests from "../../utils/requests";
export default function EditSerieComp() {
  const params = useParams();
  const [serie, setSerie] = useState({});
  const dispatch = useDispatch()
  const history = useHistory()

  const serieNameRef = useRef(null)

  const getSerie = async () => {
    let resp = await requests.getItem(
      "http://localhost:8080/api/series",
      params.serieid
    );
    setSerie(resp.data);
    serieNameRef.current = serie.name
  };

  const putGenres = (genres) => {
    const genresToPush = genres.split(",");
    setSerie({ ...serie, genres: genresToPush });
  };

  const saveSerie = async () => {
    let resp = await requests.putItem("http://localhost:8080/api/series",serie);
    alert(resp.data);
    history.push('/home');
  };

  useEffect(() => {
    getSerie();
  }, []);

  return (
    <div>
      <h3>Edit Serie : {serieNameRef.current}</h3>
      <form>
        <label>Name </label>
        <input
          type="text"
          value={serie.name}
          onChange={(e) => setSerie({ ...serie, name: e.target.value })}
        />
        <br />
        <label>premiered </label>
        <input
          type="text"
          value={serie.premiered}
          onChange={(e) => setSerie({ ...serie, premiered: e.target.value })}
        />
        <br />
        <label>Genres </label>
        <input
          type="text"
          value={serie.genres?.join(",")}
          onChange={(e) => putGenres(e.target.value)}
        />
        <br />
        <label>Image Url </label>
        <input
          type="text"
          value={serie.img}
          onChange={(e) => setSerie({ ...serie, img: e.target.value })}
        />
      </form>
      <input type="button" value="Save" onClick={() => saveSerie()} />
      <Link to="/home">
        <input type="button" value="Cancel" />
      </Link>
    </div>
  );
}
