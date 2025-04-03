import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/UserContext'

const UserForm = () => {

  const [techincalDesc, setTechincalDesc] = useState("")
  const [nonTechincalDesc, setNonTechincalDesc] = useState("")
  const [review, setReview] = useState("")
  const [extraCurricular, setExtraCarricural] = useState("")
  const [events, setEvents] = useState("")
  const [posted_linkedin, setPosted_linkedin] = useState("true")
  const [reason, setReason] = useState("")
  const [innovativeIdea, setInnovativeIdea] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [isEdit , setIsEdit] = useState(false)

  const [isEditable , setIsEditable] = useState(false)
  const [employeeId , setEmployeeId] = useState(null)

  const {user} = useContext(UserContext)

  

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  //getting user data 
  const getUserData = async ()=>{
    console.log(user)
    const formatedDate = new Date().toISOString().split("T")[0]
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/emplyee/${user.userId}/${formatedDate}`)
    if(response.ok){
      setIsEditable(true)
      const data = await response.json()
      console.log(data)
      setTechincalDesc(data.technicalDesc)
      setNonTechincalDesc(data.nonTechnicalDesc)
      setReview(data.review)
      setExtraCarricural(data.extraCarricular)
      setEvents(data.events)
      setPosted_linkedin(data.posted_linkedin)
      setIsEdit(data.isEdit)
      setInnovativeIdea(data.innovativeIdea)
      setEmployeeId(data._id)
    }
  }

  useEffect(()=>{
    if(user)getUserData()
  } , [user, isEdit] )


  // posting user data 
  const postUserData = async () => {
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/employeeDetails/${user.userId}`;
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ technicalDesc: techincalDesc, nonTechnicalDesc: nonTechincalDesc,innovativeIdea:innovativeIdea, review, events, extraCarricular: extraCurricular, posted_linkedin })
    }

    const response = await fetch(apiUrl, options);
    console.log(response)
    if(response.ok){
      setIsEditable(true)
      const data = await response.json()
      setTechincalDesc(data.technicalDesc)
      setNonTechincalDesc(data.nonTechnicalDesc)
      setReview(data.review)
      setExtraCarricural(data.extraCarricular)
      setEvents(data.events)
      setPosted_linkedin(data.posted_linkedin)
      setIsEdit(data.isEdit)
      setInnovativeIdea(data.innovativeIdea)
      setEmployeeId(data._id)

    }
  }

  const updateData = async ()=>{
    console.log("this is " ,employeeId)
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/employee/${employeeId}`;
    const options = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ technicalDesc: techincalDesc, nonTechnicalDesc: nonTechincalDesc,innovativeIdea:innovativeIdea, review, events, extraCarricular: extraCurricular, posted_linkedin })
    }

    const response = await fetch(apiUrl, options);
    console.log(response)
    if(response.ok){
      setIsEditable(true)
      
      const data = await response.json()
      setTechincalDesc(data.technicalDesc)
      setNonTechincalDesc(data.nonTechnicalDesc)
      setReview(data.review)
      setExtraCarricural(data.extraCarricular)
      setEvents(data.events)
      setPosted_linkedin(data.posted_linkedin)
      setIsEdit(data.isEdit)
      setInnovativeIdea(data.innovativeIdea)
    }
    
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (countWords(techincalDesc)<30 || countWords(nonTechincalDesc)<30 || !review || !events || !innovativeIdea|| !extraCurricular || !posted_linkedin) {
      alert("Please write at least 30 words in the fields.");
    } else {
      postUserData()
    }
  }
 

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    setReason(true);


  }


  return (
    <>
      <Navbar />
      <div className='w-full'>
        <div className="flex  lg:flex-nowrap flex-wrap gap-10 max-w-6xl mx-auto my-16 p-6">
          <div className="w-1/2 md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
            <div className='p-3'>
      <h1 className='font-semibold mb-1'>Technical Learning</h1>
      <p className='text-sm'>{techincalDesc}</p>
    </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Non Technical Learning</h1>
        <p className='text-sm'>{nonTechincalDesc}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Remark</h1>
        <p className='text-sm'>{review}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Extra Curricular</h1>
        <p className='text-sm'>{extraCurricular}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Events</h1>
        <p className='text-sm'>{events}</p>
      </div>
      <div className='p-3'>
        <h1 className='font-semibold mb-1'>Post in Linkedin</h1>
        <p className='text-sm'>{posted_linkedin}</p>
      </div>
            </h2>

          </div>

          <div className="md:w-1/2 w-full  bg-gray-50 p-6 rounded-lg shadow-lg">
           

              <div>
              
                <label className='flex cursor-pointer select-none items-center'>
                  <div className='relative'>
                    
                    <input
                      type='checkbox'
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className='sr-only'
                    />
                    <div
                      className={`box block h-8 w-14 rounded-full ${isChecked ? 'bg-black' : 'bg-black'
                        }`}
                    ></div>
                    <div
                      className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${isChecked ? 'translate-x-full' : ''
                        }`}
                    ></div>
                  </div>
                </label>
              </div>

             {!isChecked&&(<form className="flex flex-col gap-6" onSubmit={onFormSubmit}>
              {/* Technical Description */}
              <div>
                <label
                  htmlFor="techDescription"
                  className="block font-semibold text-lg text-gray-800"
                >
                  Technical Description{" "}


                </label>
                <textarea
                  id="techDescription"
                  className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={techincalDesc}
                  onChange={e => setTechincalDesc(e.target.value)}
                />
              </div>

              {/* Non-Technical Description */}
              <div>
                <label
                  htmlFor="nonTechDescription"
                  className="block font-semibold text-lg text-gray-800"
                >
                  Non-Technical Description{" "}
                  <span className="text-sm text-gray-500">(minimum 30 words)</span>
                </label>
                <textarea
                  id="nonTechDescription"
                  className="w-full p-3 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={nonTechincalDesc}
                  onChange={e => setNonTechincalDesc(e.target.value)}
                />

              </div>

              {/* Review or Suggestion */}
              <div>
                <label
                  htmlFor="reviewOrSuggestion"
                  className="block font-semibold text-lg text-gray-800"
                >
                  Review / Complaint / Suggestion
                </label>
                <textarea
                  id="reviewOrSuggestion"
                  className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={review}
                  onChange={e => setReview(e.target.value)}
                />
              </div>

                {/* {/Innovative Idea/} */}
                <div>
                <label
                  className="block font-semibold text-lg text-gray-800"
                  htmlFor="ExtraCurricular"
                >
                  Innovative Idea
                </label>
                <textarea
                  id="ExtraCurricular"
                  className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={innovativeIdea}
                  onChange={e => setInnovativeIdea(e.target.value)}

                />
              </div>

              {/* {/Extra Carricular Activities/} */}
              <div>
                <label
                  className="block font-semibold text-lg text-gray-800"
                  htmlFor="ExtraCurricular"
                >
                  Yoga / Exercise / Book Reading
                </label>
                <textarea
                  id="ExtraCurricular"
                  className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={extraCurricular}
                  onChange={e => setExtraCarricural(e.target.value)}

                />
              </div>

              {/* {/Events Section/} */}
              <div>
                <label
                  className="block font-semibold text-lg text-gray-800"
                  htmlFor="Events"
                >
                  Did you found any interesting events ?<br />
                  <p className="text-sm font-light text-gray-700">If any kindly drop link here</p>
                </label>
                <textarea
                  id="Events"
                  className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={events}
                  onChange={e => setEvents(e.target.value)}
                />
              </div>

              {/* LinkedIn Post Section */}
              <div>
                <label className="block font-semibold text-lg text-gray-800">
                  Posted on LinkedIn?
                </label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="linkedinPost"
                      value="true"
                      checked={posted_linkedin === "true"}
                      onChange={e => setPosted_linkedin(e.target.value)}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="linkedinPost"
                      value="false"
                      checked={posted_linkedin === "false"}
                      onChange={e => { setPosted_linkedin(e.target.value) }}
                    />
                    No
                  </label>
                </div>
              </div>

               {/* Update Button */}
               {isEditable && <button
                className={`${isEdit?"bg-gray-300":"bg-red-400"} px-4 py-1 rounded-md`}
                disabled = {isEdit}
                onClick={()=>updateData()}
              >
                Update
              </button>}

              {/* Submit Button */}
              {!isEditable && <button
                type="submit"
                className='bg-green-400 px-4 py-1 rounded-md'
                onClick={()=>postUserData()}
              >
                Submit
              </button>}
            </form>
            )} 
            <form>
              {/* {/Reasons/} */}
             {isChecked&&( <div>
                <label
                  className="block font-semibold text-lg text-gray-800"
                  htmlFor="Events"
                >
                  Reasons for not applicable?<br />
                  
                </label>
                <textarea
                  id="Events"
                  className="w-full p-3 h-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100 hover:bg-white transition"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>

             )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserForm