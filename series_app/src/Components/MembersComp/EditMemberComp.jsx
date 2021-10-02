import { useRouteMatch } from "react-router";

export default function EditMemberComp(){
    const { path } = useRouteMatch();
    console.log(path)

    return<div>
        <h1>Edit member</h1>
    </div>
}