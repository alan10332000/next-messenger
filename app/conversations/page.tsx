'use client'

import clsx from 'clsx'

import EmptyState from '../components/EmptyState'
import useConversation from '../hooks/useConversation'

const Conversations = () => {
  const { isOpen } = useConversation()

  return (
    <div className={clsx('h-full lg:block lg:pl-80', isOpen ? 'block' : 'hidden')}>
      <EmptyState />
    </div>
  )
}

export default Conversations
