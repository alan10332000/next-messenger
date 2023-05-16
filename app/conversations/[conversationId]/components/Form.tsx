'use client'

import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'

import MessageInput from './MessageInput'

import useConversation from '@/app/hooks/useConversation'

const Form = () => {
  const { conversationId } = useConversation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      setValue('message', '', { shouldValidate: true })
      axios.post('/api/messages', {
        ...data,
        conversationId: conversationId,
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className="flex w-full items-center gap-2 border-t bg-white p-4 lg:gap-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 lg:gap-4">
        <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
        <button type="submit" className="cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600">
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Form
