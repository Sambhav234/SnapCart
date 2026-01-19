import Welcome from "@/components/Welcome";
import Image from "next/image";
import User from "@/models/user_model";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import EditRole from "@/components/EditRole";
export default async function Home() {
  await connectDB()
  const session=await auth();
  const user=await User.findById(session?.user?.id);

  const incomplete= !user.role || !user.mobile || (!user.mobile && user.role=="user")
  if(incomplete){
    return <EditRole/>
  }

  return (
   <div>
    
   </div>
  );
}
