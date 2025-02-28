import React, { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

function useGetConversations() {
  const [loading , setLoading] = useState(false);
  const [conversations , setConverations] = useState([]);
  useEffect(()=>{
    const getConversation = async ()=>{
        setLoading(true);
        try{
      
            const res = await fetch("/api/users");
            const data = await res.json();

            if(data.error)
            {
                throw new Error(data.error);
            }
            setConverations(data);

        }catch(error){
            toast.error(error.message);
        }finally{
          setLoading(false);
        }    
    }
    getConversation();
  } , [])

  return {loading , conversations};

  
}

export default useGetConversations