import Header from './components/Header'

import getConversationById from '@/app/actions/getConversationById'
import EmptyState from '@/app/components/EmptyState'

interface IParams {
  conversationId: string
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId)

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex h-full flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full lg:pl-80">
      <div className="flex h-full flex-col">
        <Header conversation={conversation} />
      </div>
    </div>
  )
}

export default ChatId
