import getCurrentUser from './getCurrentUser'

import prisma from '@/app/libs/prisma'

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser?.email) {
      return null
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    return conversation
  } catch (error: any) {
    console.log('error', error)
    return null
  }
}

export default getConversationById
