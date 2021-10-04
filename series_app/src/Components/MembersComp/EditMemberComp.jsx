import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from "react-router";
import requests from "../../utils/requests";

export default function EditMemberComp(props) {
  const params = useParams();
  const dispatch = useDispatch()
  const history = useHistory()
  const members = useSelector((state) => [...state.members]);
  const [memberEdit, setMemberEdit] = useState({});

  const updateMember = async () => {
    let resp = await requests.putItem(
      "http://localhost:8080/api/members",
      memberEdit
    );
    alert(resp.data.text);
    dispatch({
      type: "UPDATE_MEMBER",
      payload: { id: params.memberId, member: resp.data.member },
    });
    history.goBack()
  };


  useEffect(() => {
    let member = members.filter((x) => x._id === params.memberId);
    setMemberEdit(member[0]);
  }, []);

  return (
    <div>
      <h1>Edit {props.location.state.name} </h1>
      <form>
        {memberEdit ? (
          <>
            <label>Name {params.name}</label>
            <input
              type="text"
              value={memberEdit?.fullName}
              onChange={(e) =>
                setMemberEdit({ ...memberEdit, fullName: e.target.value })
              }
            />
            <br />
            <label>Email</label>
            <input
              type="text"
              value={memberEdit?.email}
              onChange={(e) =>
                setMemberEdit({ ...memberEdit, email: e.target.value })
              }
            />
            <br />
            <label>City </label>
            <input
              type="text"
              value={memberEdit?.city}
              onChange={(e) =>
                setMemberEdit({ ...memberEdit, city: e.target.value })
              }
            />
            <br />
            <input type="button" value="Update" onClick={() => updateMember()} />
            <input type="button" value="Cancel" onClick={() => history.goBack()} />

          </>
        ) : null}
      </form>
    </div>
  );
}
