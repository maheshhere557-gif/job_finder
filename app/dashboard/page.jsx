"use client";
import React, { useEffect, useState } from "react";
import Link  from "next/link";
import { Search, SearchCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router=useRouter()
  const [jobs, setJob] = useState([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const [inputdata, setInput] = useState("");


     const verification = async () => {
      try {
        let res = await fetch("/api/dashboardverify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "verify" }),
        });
        let data = await res.json();
        console.log(data)
        if (data && data.user && data.user.role) {
          setRole(data.user?.role);
          setName(data.user.name);
        }
         if(!data.user.role){
          router.push("/")
        }
        
      } catch (e) {
        console.log(e)
       
      }
      
    };


    const displayAll = async () => {
      let res = await fetch("/api/Jobs", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fetching: "true" }),
      });
      let data = await res.json();
      if (res.ok) {
        setJob(data);
      } else {
        console.log("error");
      }
    };

  useEffect(() => {
    verification();
    displayAll();

    
  }, []);
const afterSuggest=()=>{
  
}

  

let filtered=jobs.filter((job)=>
  job?.JobName?.toLowerCase().includes(inputdata.toLowerCase())||
job?.Company_name?.toLowerCase().includes(inputdata.toLowerCase())||
job?.Qualification?.toLowerCase().includes(inputdata.toLowerCase())

)

        

  return (
    <div className="lg:mt-1  flex flex-col w-full items-center ">
      <div className="border hidden lg:flex rounded-2xl lg:w-230 h-5  bg-yellow-500/20 2xl  items-center justify-center shadow-sm border-black/10">
        <h2 className="">
          🛡️ Genuine employers never ask for money for interviews or training.
          Stay safe! <span className="underline ">learn more</span>
        </h2>
      </div>
      <div className="flex flex-col items-center">
      
       <div className="">
        <Search className="absolute ml-1  shadow-gray-600 rounded mt-3   " size={30}/>
        <input
          type="text"
          value={inputdata}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search by role, company, location"
          className=" bg-white/90 shadow-2xl border-gray-500 border mt-2 rounded-lg  h-9 w-70  lg:h-10 lg:w-120 pl-10  outline-none hover:rounded-full transition-all hover:shadow-lg"
        />

        </div>
        <div className="    absolute mt-12 w-[30%]">
        {inputdata.trim()!=="" && filtered.length> 0 &&(
          
            filtered.map((job)=>(
              <div className="border rounded-md pl-5 h-7  hover:bg-gray-200" onClick={()=>
                setInput(job?.JobName)
                } key={job._id}>{job.JobName} </div>
              ))
          
      )}
      </div>
      </div>

      <div className="w-full items-center mt-2 scale-80 ">
        {role == "employee" && (
          <h2 className="text-lg ml-10">
            {" "}
            Hello {name}, lets find a job for You
          </h2>
        )}
        {role == "employer" && (
          <h2 className="text-lg ml-10"> Hello {name},</h2>
        )}
        {role == "admin" && <h2 className="text-lg ml-10"> Hello {name},</h2>}
      </div>
      <div className="gap-5 mt-5 flex flex-col items-center  lg:w-[80%]">
      {filtered.length > 0 ? (
        filtered.map((job) => (
          <div
            key={job._id}
            className=" h-60 lg:h-44 flex lg:justify-between  items-center rounded-lg  shadow-xl p-5   lg:w-[70%] border-lg border-gray-500"
          >
            <div className="lg:flex lg:gap-10 w-[70%] " >
              <span className="ml-3 lg:border-10 lg:bg-gray-300  lg:border-gray-300 rounded-xl">
              <img src="/job.webp" className="lg:h-full w-10 lg:w-30 shadow-sm rounded-xl" />
            </span>
            <div >
              <h3 className="text-gray-600 font-semibold opacity-80">
                Company Name:{" "}
                <span>
                  {job.Company_name}
                </span>
              </h3>
              <h3 className="text-gray-600 font-semibold opacity-80">
                Qualification:{" "}
                <span>
                  {job.Qualification}
                </span>
              </h3>{" "}
              <h3 className="text-yellow-600 font-semibold">
                Role:{" "}
                <span >{job.JobName}</span>
              </h3>
              <h3 className="text-gray-600 font-semibold opacity-80">
                Salary Offered:{" "}
                <span >₹ {job.Salary}</span>
              </h3>
              <h3 className="text-gray-600 font-semibold opacity-80">
                Address:{" "}
                <span >{job.Address}</span>
              </h3>
            </div>
            </div>
            {role === "employee" && (
              <div>
                <Link href="/sendApplication">
                  <div>
                    <button className="border font-semibold h-10 w-30 rounded-full bg-yellow-400 cursor-pointer border-yellow-500/50 hover:bg-yellow-500">
                      Apply Now
                    </button>
                  </div>
                </Link>
              </div>
            )}

            {role === "employer" && (
              <div>
                <button className="ml-50 mt-20  border h-10 w-30 rounded-full bg-yellow-400 cursor-pointer border-yellow-500/50 hover:bg-yellow-500">
                  Your Listing{" "}
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="mt-50"> No Jobs available right now</div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
