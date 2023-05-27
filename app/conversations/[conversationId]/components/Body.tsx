'use client'

import axios from 'axios'
import { find } from 'lodash'
import { useState, useEffect, useRef } from 'react'

import MessageBox from './MessageBox'

import useConversation from '@/app/hooks/useConversation'
import { pusherClient } from '@/app/libs/pusher'
import { FullMessageType } from '@/app/types'

interface BodyProps {
  initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState(initialMessages)

  const { conversationId } = useConversation()

  useEffect(() => {
    try {
      axios.post(`/api/conversations/${conversationId}/seen`)
    } catch (error) {
      console.log('error', error)
    }
  }, [conversationId])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const newMessageHandler = (message: FullMessageType) => {
      try {
        axios.post(`/api/conversations/${conversationId}/seen`)
      } catch (error) {
        console.log('error', error)
      }

      setMessages((current) => {
        if (find(current, { id: message.id })) return current
        return [...current, message]
      })

      bottomRef?.current?.scrollIntoView()
    }

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage
          return currentMessage
        })
      )
    }

    pusherClient.bind('messages:new', newMessageHandler)
    pusherClient.bind('message:update', updateMessageHandler)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', newMessageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId])

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox isLast={i === messages.length - 1} key={message.id} data={message} />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}

export default Body
