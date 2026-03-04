

import Job from '../api/models/Job'
import { mongoConnect } from '@/lib/mongodb'


const dashboard =  async() => {
  await mongoConnect()
  const jobs=await Job.find({})
  return (
    <div>
   
      <h2>Available Jobs</h2>

    {jobs.map((job)=>(<div key={job._id} className='flex lg:ml-10 sm:ml-10' >
        <div className='bg-yellow-100 w-30 mt-10 h-30'>
          Picture
        </div>
        <div className='mt-10 ml-5'>
          <h3>Company Name:{job.Company_name}</h3>
          <h3>Qualification: {job.Qualification}</h3>
          <h3>Salary Offered: ₹ {job.Salary}</h3>
          <h3>Address: {job.Address}</h3>

        </div>

      </div>))}
      
    </div>
  )
}

export default dashboard
