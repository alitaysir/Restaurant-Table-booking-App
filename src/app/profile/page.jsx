// "use client";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";

// const Page = () => {
//     const [userinfo, setuserinfo] = useState(null);

//     useEffect(() => {
//         if (userinfo) {
//             console.log("User info updated:", userinfo);
//         }
//     }, [userinfo]);

//     async function getdata() {
//         try {
//             const res = await axios.get("/api/users/info");
//             if (res.data.success) {
//                 setuserinfo(res.data.info);
//                 toast.success("User data retrieved successfully");
//             } else {
//                 toast.error(res.data.msg || "Error displaying user info");
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error.message);
//             toast.error("An error occurred while fetching user info");
//         }
//     }

//     return (
//         <div className="h-screen flex items-center justify-center">
//             <button
//                 className="px-5 py-2 bg-blue-500 rounded text-white"
//                 onClick={getdata}
//             >
//                 Get User Info
//             </button>
//             { userinfo && 
//             <div>
//                 <h1>{userinfo.name}</h1>
//                 <h1>{userinfo.email}</h1>

//             </div> 

//             }
//         </div>
//     );
// };

// export default Page;
