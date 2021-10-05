import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import requests from '../../utils/requests'
export default function AddMemberComp(){
    const [member , setMember] = useState({fullName: "" , email:"" ,city:""})
    const history = useHistory()
    const dispatch = useDispatch()
    const AddMember = async() => {
        let resp = await requests.post("http://localhost:8080/api/members" , member)
        alert(resp.data.text)
        dispatch({type: "ADD_MEMBER" , payload: resp.data.member})
        history.push('/home/subscribers')
    }
    return<div>
        <h3>Add Member</h3>
        <form>
            <input
              type="text"
              placeholder="full name"
              onChange={(e) =>
                setMember({ ...member, fullName: e.target.value })
              }
            />
            <br />
            <input
              type="text"
              placeholder="email"
              onChange={(e) =>
                setMember({ ...member, email: e.target.value })
              }
            />
            <br />
            <input
              type="text"
              placeholder="city"
              onChange={(e) =>
                setMember({ ...member, city: e.target.value })
              }
            />
            <br />
            <input type="button" value="Update" onClick={() => AddMember()} />
            <input type="button" value="Cancel" onClick={() => history.push('/home/subscribers')} />

          </form>
    </div>
}