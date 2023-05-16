'use client'

import axios from 'axios'
import { useState, useEffect } from 'react'

import MessageBox from './MessageBox'

import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages)

  const { conversationId } = useConversation()

  useEffect(() => {
    try {
      axios.post(`/api/conversations/${conversationId}/seen`)
    } catch (error) {
      console.log('error', error)
    }
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      ))}
    </div>
  )
}

export default Body
