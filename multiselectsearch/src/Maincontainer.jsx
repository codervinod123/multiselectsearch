import React,{useEffect,useRef,useState} from 'react'
import Pill from './components/Pill';
import { API_URL } from './utils/constant';
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './utils/themeslice';
import { FaSun } from "react-icons/fa";


const Maincontainer = () => {

const [dummyUser,setDummyUser]=useState([]);
const [suggestions,setSuggestions]=useState([]);
const [searchParam,setSearchParam]=useState("");
const [dummyUserSet,setDummyUserSet]=useState(new Set());
const [theme,setTheme]=useState(false);

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
   const cancelFunctionCall=setTimeout(()=>{
     fetchUser();
   },500)

   return ()=>{
     clearTimeout(cancelFunctionCall)
   }
   
},[searchParam]);

const handleOnclick=(data)=>{
  setDummyUser([...dummyUser,data]);
  setDummyUserSet(new Set([...dummyUserSet,data.email]));
  setSearchParam("");
  setSuggestions([]);
  console.log(dummyUser);
  inputRef.current.focus();
}

const handleRemove=(user)=>{
   const updatedDummyUser=dummyUser.filter((data)=>{
        return data.email !== user.email;
   })

   setDummyUser(updatedDummyUser);

}

const handleKeyDowwn=(e)=>{
    if(e.key==="Backspace" && e.target.value==="" && dummyUser.length>0) {
        const lastUser=dummyUser[dummyUser.length-1];
        handleRemove(lastUser);
    }
}

const Dispatch=useDispatch();


const currentTheme=useSelector((store)=>store.themeslice.isLightTheme);
useEffect(()=>{
  setTheme(currentTheme)
  console.log(theme);
},[currentTheme])



const handleClick=()=>{
  Dispatch(toggleTheme());
}


  return (
    <div className={`flex relative h-[100vh] w-[100%] transition-all dura ${theme?"bg-gray-300" : "bg-slate-800"} }`}>

        {
        theme?
        
           <FaMoon onClick={handleClick} className='text-slate-800 text-[25px] absolute right-4 top-4 cursor-pointer '/>
         :<FaSun onClick={handleClick} className='text-yellow-500 text-[25px] absolute right-4 top-4 cursor-pointer'/>
        }
        <div className={`flex flex-col relative h-[60%] w-[80%] border rounded-md mx-auto my-auto ${theme?"bg-gray-600":"bg-gray-600"}`}>
            
            <div className='relative'>
             <div className={`relative w-[80%] mx-auto my-2 rounded-full py-2 px-6 flex flex-wrap gap-x-2 gap-y-2 ${theme?"bg-gray-300":"bg-slate-800"} `}>
                
                {
                   dummyUser.map((data,index)=>{
                    return(
                       <div key={index}>
                        <Pill 
                         name={data?.firstName}
                         image={data?.image}
                         onClick={()=>handleRemove(data)}
                         key={data?.email}
                       />
                       </div>
                    )
                   })
                }

               <input 
                ref={inputRef}
                type="text"
                className={`bg-gray-200 focus:outline-none  w-[100%] ${theme?"bg-gray-300 text-black placeholder:text-black":"bg-slate-800 text-white placeholder:text-white"}`}
                onChange={(e)=>{setSearchParam(e.target.value)}}
                value={searchParam}
                placeholder='Search User'
                onKeyDown={handleKeyDowwn}
               />
             </div>
              <ul className={`scrollbar flex flex-col gap-y-2 w-[80%] mx-auto bg-gray-200 rounded-lg px-4 py-3 max-h-[250px] overflow-auto ${theme?"bg-gray-400":"bg-gray-800"} ${suggestions.length===0 ? "hidden":"flex"}`}>
                {
                  suggestions.map((data)=>{
                    return !dummyUserSet.has(data.email)?  (
                        <li key={data.email} onClick={()=>handleOnclick(data)} className={`flex gap-x-4 py-1 cursor-pointer rounded-md transition-all duration-500 ${theme?"hover:bg-gray-600 ":"hover:bg-slate-400 text-white"}`}>
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
