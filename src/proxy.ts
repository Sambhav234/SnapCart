import {NextRequest,NextResponse} from "next/server"
import {getToken} from "next-auth/jwt"
export async function  proxy(req:NextRequest){

    const {pathname}=req.nextUrl
    const publicRoutes=["/login","/register","/api/auth"]

    if(publicRoutes.some((path)=>pathname.startsWith(path))){
        return NextResponse.next()
    }   

    const token=await getToken({
        req,secret:process.env.NEXTAUTH_SECRET
    })

    console.log(token)

    if(!token){
        const loginurl=new URL("/login",req.url)
        loginurl.searchParams.set("callbackUrl",req.url)
       return NextResponse.redirect(loginurl)
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|map|woff|woff2|ttf|eot)).*)",
  ],
};
