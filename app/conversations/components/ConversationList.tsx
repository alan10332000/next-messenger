'use client'

import { User } from '@prisma/client'
import clsx from 'clsx'
import { find } from 'lodash'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect, useMemo } from 'react'
import { MdOutlineGroupAdd } from 'react-icons/md'

import ConversationBox from './ConversationBox'

import GroupChatModal from '@/app/components/Modal/GroupChatModal'
import useConversation from '@/app/hooks/useConversation'
import { pusherClient } from '@/app/libs/pusher'
import { FullConversationType } from '@/app/types'

interface ConversationListProps {
  initialItems: FullConversationType[]
  users: User[]
  title?: string
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
  const router = useRouter()
  const session = useSession()
  const { conversationId, isOpen } = useConversation()
  const [items, setItems] = useState(initialItems)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const pusherKey = useMemo(() => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  useEffect(() => {
    if (!pusherKey) return

    pusherClient.subscribe(pusherKey)

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) return current
        return [conversation, ...current]
      })
    }

    const updateConversationHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            }
          }
          return currentConversation
        })
      )
    }

    const removeConversationHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((list) => list.id !== conversation.id)]
      })

      if (conversationId === conversation.id) router.push('/conversations')
    }

    pusherClient.bind('conversation:new', newConversationHandler)
    pusherClient.bind('conversation:update', updateConversationHandler)
    pusherClient.bind('conversation:remove', removeConversationHandler)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', newConversationHandler)
      pusherClient.unbind('conversation:update', updateConversationHandler)
      pusherClient.unbind('conversation:remove', removeConversationHandler)
    }
  }, [pusherKey, conversationId, router])

  return (
    <>
      <GroupChatModal users={users} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <aside
        className={clsx(
          `fixed inset-y-0 overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0`,
          isOpen ? 'hidden' : 'left-0 block w-full'
        )}
      >
        <div className="px-5">
          <div className="mb-4 flex justify-between pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-600 transition hover:opacity-75"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
          ))}
        </div>
      </aside>
    </>
  )
}

export default ConversationList
