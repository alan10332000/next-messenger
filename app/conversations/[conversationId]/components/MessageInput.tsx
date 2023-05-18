'use client'

import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
  placeholder?: string
  id: string
  type?: string
  pattern?: RegExp
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({ placeholder, id, type, pattern, required, register }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required, pattern })}
        placeholder={placeholder}
        className="w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none"
      />
    </div>
  )
}

export default MessageInput
