import Image from 'next/image'

import AuthForm from './components/AuthForm'

const Auth = () => {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative mx-auto h-12 w-12">
          <Image src="/logo.svg" fill alt="Logo" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <AuthForm />
    </div>
  )
}

export default Auth
