import Welcome from "@/components/Welcome";
import Image from "next/image";
import User from "@/models/user_model";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import EditRole from "@/components/EditRole";
import Nav from "@/components/Nav";
import UserDashboard from "../components/UserDashboard";
export default async function Home() {
  await connectDB()
  const session=await auth();
  const user=await User.findById(session?.user?.id);

  const incomplete= !user.role || !user.mobile || (!user.mobile && user.role=="user")
  if(incomplete){
    return <EditRole/>
  }

  const parsedUser=JSON.parse(JSON.stringify(user))
  return (
   <div>
    <Nav user={parsedUser}/>
    <UserDashboard/>
   </div>
  );
}
