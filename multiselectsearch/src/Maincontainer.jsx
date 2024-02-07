import React,{useEffect,useRef,useState} from 'react'
import Pill from './components/Pill';
import { API_URL } from './utils/constant';

const Maincontainer = () => {

const [dummyUser,setDummyUser]=useState([]);
const [suggestions,setSuggestions]=useState([]);
const [searchParam,setSearchParam]=useState("");
const [dummyUserSet,setDummyUserSet]=useState(new Set());
const inputRef=useRef();

const fetchUser=async()=>{
   if(searchParam.trim()===""){
     setSuggestions([]);
     return;
   }
    const data=await fetch(`${API_URL}${searchParam}`);
    const json=await data.json();
    setSuggestions(json.users);
}

useEffect(()=>{
   fetchUser();
},[searchParam]);

const handleOnclick=(data)=>{
  setDummyUser([...dummyUser,data]);
  setDummyUserSet(new Set([...dummyUserSet,data.email]));
  setSearchParam("");
  setSuggestions([]);
  console.log(dummyUser);
  inputRef.current.focus();
}

const handleRemove=(email)=>{
   const updatedDummyUser=dummyUser.filter((data)=>{
        return data.email !== email;
   })
   setDummyUser(updatedDummyUser);

}

const handleKeyDowwn=(e)=>{
    if(e.key==="Backspace") {
       dummyUser.pop();
       dummyUserSet.pop();
    }
}



  return (
    <div className='flex bg-slate-900 relative h-[100vh] w-[100%]'>
        <div className='flex flex-col relative h-[60%] w-[80%] border bg-slate-400 rounded-md mx-auto my-auto'>
            
            <div className='relative'>
             <div className={`relative w-[80%] mx-auto my-2 rounded-full py-2 px-6 flex flex-wrap bg-gray-200 gap-x-2 gap-y-2`}>
                
                {
                   dummyUser.map((data,index)=>{
                    return(
                       <div key={index}>
                        <Pill 
                         name={data?.firstName}
                         image={data?.image}
                         onClick={()=>handleRemove(data?.email)}
                         key={data?.email}
                       />
                       </div>
                    )
                   })
                }

               <input 
                ref={inputRef}
                type="text"
                className='bg-gray-200 focus:outline-none placeholder:text-gray-950'
                onChange={(e)=>{setSearchParam(e.target.value)}}
                value={searchParam}
                placeholder='Search User'
                onKeyDown={(e)=>handleKeyDowwn(e)}
               />
             </div>
              <ul className={`scrollbar flex flex-col gap-y-2 w-[80%] mx-auto bg-gray-200 rounded-lg px-4 py-3 max-h-[250px] overflow-auto ${suggestions.length===0 ? "hidden":"flex"}`}>
                {
                  suggestions.map((data)=>{
                    return !dummyUserSet.has(data.email)?  (
                        <li key={data.email} onClick={()=>handleOnclick(data)} className='flex gap-x-4 py-1 cursor-pointer hover:bg-slate-400 rounded-md transition-all duration-500'>
                           <img className='w-[30px] h-[30px] rounded-full' src={data?.image} alt="user_image" />
                           <span>{data?.firstName} {data?.lastName}</span>
                        </li> 
                    ):<></>
                  })
                 }

               
                
              </ul>
            </div>

        </div>
    </div>
  )
}

export default Maincontainer
