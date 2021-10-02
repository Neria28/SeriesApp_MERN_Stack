import { Route, Switch } from "react-router";
import EditMemberComp from './EditMemberComp'
export default function MemberMainComp(){
    return(<div>
        <h1>Members</h1>
        <Switch>
            <Route path="/home/subscribers/:memberId"  component={EditMemberComp}/>
        </Switch>
    </div>)
}