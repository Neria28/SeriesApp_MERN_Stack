import React, { useState } from 'react'
import { useHistory } from 'react-router';
import requests from '../../utils/requests';
import { useDispatch } from "react-redux";

export default function AddSerieComp(){
    const history = useHistory()
    const dispatch = useDispatch()
    const [newSerie , setNewSerie] = useState({name : "" , genres:[] , premiered: new Date,img:""})
    
    const putGenres = (genres) => {
        const genresToPush = genres.split(" , ");
        setNewSerie({ ...newSerie, genres: genresToPush });
      };
    
    const sendToDB = async() => { 
        let resp = requests.post("http://localhost:8080/api/series" , newSerie)
        alert(resp.data.text)
        dispatch({type : 'ADD_SERIE' , payload : resp.data.serie })
        history.push('/home');

    } 
    return<div>
      <form onSubmit={() => sendToDB()}>
          <label>Name </label>
          <input type="text" onChange={(e)=> setNewSerie({...newSerie , name: e.target.value})}/><br/>
          <label>Genres </label>
          <input type="text" onChange={(e) => putGenres(e.target.value)}/><br/>
          <label>Image Url </label>
          <input type="text" onChange={(e)=> setNewSerie({...newSerie , img: e.target.value})} /><br/>
          <label>Premired </label>
          <input type="date" onChange={(e)=> setNewSerie({...newSerie , premiered: e.target.value})}/><br/>
          <input type="submit" value="Save" onClick={() =>sendToDB() }/>
          <input type="button" value="Cancel" onClick={() => history.push('/home')} />
      </form>
    </div>
    
}