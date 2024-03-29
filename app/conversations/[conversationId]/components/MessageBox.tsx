'use client'

import clsx from 'clsx'
import { format } from 'date-fns'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import ImageModal from './ImageModal'

import Avatar from '@/app/components/Avatar'
import { FullMessageType } from '@/app/types'

interface MessageBoxProps {
  data: FullMessageType
  isLast?: boolean
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession()
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const isOwn = session.data?.user?.email === data?.sender?.email
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ')

  return (
    <div className={clsx('flex gap-3 p-4', isOwn && 'justify-end')}>
      <div className={clsx(isOwn && 'order-2')}>
        <Avatar user={data.sender} />
      </div>
      <div className={clsx('flex flex-col gap-2', isOwn && 'items-end')}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">{format(new Date(data.createdAt), 'p')}</div>
        </div>
        <div
          className={clsx(
            'w-fit overflow-hidden text-sm',
            isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
            data.image ? 'rounded-md p-0' : 'rounded-full px-3 py-2'
          )}
        >
          <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
          {data.image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.image}
              className="cursor-pointer object-cover transition hover:scale-110"
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  )
}

export default MessageBox
