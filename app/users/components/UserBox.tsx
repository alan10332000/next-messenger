import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'

import Avatar from '@/app/components/Avatar'
import LoadingModal from '@/app/components/Modal/LoadingModal'

interface UserBoxProps {
  data: User
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setIsLoading(true)

    try {
      const response = await axios.post('/api/conversations', { userId: data.id })
      router.push(`/conversations/${response.data.id}`)
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }, [data, router])

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="relative flex w-full cursor-pointer items-center space-x-3 rounded-lg bg-white p-3 transition hover:bg-neutral-100"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBox
