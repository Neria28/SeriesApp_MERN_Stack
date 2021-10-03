import { useRouteMatch } from "react-router";

export default function EditMemberComp(){
    const { path } = useRouteMatch();

    return<div>
        <h1>Edit member</h1>
    </div>
}