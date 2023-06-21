'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useState, useEffect, useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import AuthSocialButton from './AuthSocialButton'

import Button from '@/app/components/Button'
import Input from '@/app/components/Input/Input'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') router.push('/conversations')
  }, [session?.status, router])

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') setVariant('REGISTER')
    else setVariant('LOGIN')
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    try {
      if (variant === 'REGISTER') await axios.post('/api/register', data)

      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (callback?.error) return toast.error('Invalid credentials!')

      if (callback?.ok) {
        toast.success('Logged in!')
        router.push('/conversations')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  const socialAction = async (action: string) => {
    setIsLoading(true)

    try {
      const callback = await signIn(action, { redirect: false })

      if (callback?.error) return toast.error('Invalid credentials!')

      if (callback?.ok) {
        toast.success('Logged in!')
        router.push('/conversations')
      }
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name"
                autoComplete="name"
                label="Name"
              />
              {errors?.name && <div className="!mt-2 text-rose-500">Please enter a name.</div>}
            </>
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            pattern={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g}
            id="email"
            autoComplete="email"
            label="Email address"
            type="email"
          />
          {errors?.email && <div className="!mt-2 text-rose-500">Please enter a valid email format.</div>}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            pattern={/^.{6,}$/}
            id="password"
            autoComplete={variant === 'REGISTER' ? 'new-password' : 'current-password'}
            label="Password"
            type="password"
          />
          {errors?.password && (
            <div className="!mt-2 text-rose-500">Please enter a password with at least 6 characters.</div>
          )}
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          <div>{variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
          <div onClick={toggleVariant} className="cursor-pointer underline">
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
