import { useSelector } from "react-redux";
import MemberComp from "./MemberComp";

export default function AllMembersComp() {
  const members = useSelector((state) => [...state.members]);

  return (
    <div>
      <div className="mainConianer">
        {members.map((member) => {
          return <MemberComp key={member._id} member={member} />;
        })}
      </div>
    </div>
  );
}
