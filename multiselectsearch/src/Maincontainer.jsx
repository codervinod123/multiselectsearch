import React,{useEffect,useState} from 'react'

const Maincontainer = () => {

const [dummyUser,setDummyUser]=useState([]);
const [suggestions,setSuggestions]=useState([]);
const [searchParam,setSearchParam]=useState("");

const fetchUser=async()=>{
    const data=await fetch(`https://dummyjson.com/users/search?q=${searchParam}`);
    const json=await data.json();
    setSuggestions(json.users);
}

useEffect(()=>{
   fetchUser();
},[searchParam]);

const handleOnclick=(data)=>{
  setDummyUser([...dummyUser,data]);
  setSearchParam("");
  setSuggestions([]);
  console.log(dummyUser);
}



  return (
    <div className='flex bg-slate-900 relative h-[100vh] w-[100%]'>
        <div className='flex flex-col relative h-[60%] w-[40%] border bg-slate-400 rounded-md mx-auto my-auto'>
            
            <div className='relative'>
             <input 
               type="text"
               className='bg-gray-200 w-[80%] mx-auto my-2 rounded-full py-2 px-6 focus:outline-none flex flex-wrap'
               onChange={(e)=>{setSearchParam(e.target.value)}}
               value={searchParam}
              />
              <ul className='scrollbar flex flex-col gap-y-2 w-[80%] mx-auto bg-gray-200 rounded-lg px-4 py-3 max-h-[250px] overflow-auto'>
                

                 {
                  suggestions.map((data,index)=>{
                    return(
                        <li onClick={()=>handleOnclick(data.firstName)} key={index} className='flex gap-x-4 py-1 cursor-pointer hover:bg-slate-400 rounded-md transition-all duration-500'>
                           <img className='w-[30px] h-[30px] rounded-full' src={data.image} alt="user_image" />
                           <span>{data.firstName} {data.lastName}</span>
                        </li>
                    )
                  })
                 }

               
                
              </ul>
            </div>

        </div>
    </div>
  )
}

export default Maincontainer
