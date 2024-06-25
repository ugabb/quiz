"use client"

import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuthState } from '@/lib/authState'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login } = useAuthState()
  const router = useRouter()

  const onSubmit = (data: any) => {
    try {
      login(data.email, data.password)
      toast.success('Login efetuado com sucesso')
      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      // @ts-ignore
      toast.error(error.message || 'Erro ao efetuar login')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center p-10 gap-5 max-w-sm mx-auto'>
      <div className="flex gap-3 flex-col items-center">
        <h1 className='text-3xl font-bold'>Entrar</h1>
        <p className='text-sm'>Digite seus dados para se autenticar </p>
      </div>
      <input {...register("email", { required: true })} type="text" placeholder="Email" className="input input-bordered w-full" />
      {errors.email && <span className='text-red-500'>Email é obrigatório</span>}
      <input {...register("password", { required: true })} type="password" placeholder="Senha" className="input input-bordered w-full" />
      {errors.password && <span className='text-red-500'>Senha é obrigatória</span>}
      <button type="submit" className='btn btn-primary w-full'>Entrar</button>
      <p className='text-xs'>Não tem conta? <Link className='link link-primary' href={"/sign-up"}>Cadastre-se Aqui</Link></p>
    </form>
  )
}

export default Login
