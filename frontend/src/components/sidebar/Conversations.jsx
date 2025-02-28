import React from 'react'
import Conversation from "./Conversation"
import { getRandomEmoji } from '../../utils/emojis'
import useGetConversations from '../../hooks/useGetConversations';

function Conversations() {
  const {loading , conversations }= useGetConversations();
  

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((converation,idx) => (
        <Conversation key={converation._id}
        conversation={converation}  // typo: conversation -> converation
        emoji={getRandomEmoji()}
        lastIDX = {idx === conversations.length - 1}
        />
      ))}
        {loading ? <span className='loading loading-lg'></span> : null}
    </div>
  )
}

export default Conversations