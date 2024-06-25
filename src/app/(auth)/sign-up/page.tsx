"use client"

import { useAuthState } from '@/lib/authState'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signUp } = useAuthState()
  const router = useRouter()

  const onSubmit = (data: any) => {

    try {
      signUp(data.email, data.password, data.name)
      toast.success('Usuário cadastrado com sucesso')
      router.push('/login')
    } catch (error) {
      console.error(error)
      // @ts-ignore
      toast.error(error.message || 'Erro ao efetuar login')
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center items-center p-10 gap-5 max-w-sm mx-auto'>
      <div className="flex gap-3 flex-col items-center">
        <h1 className='text-3xl font-bold'>Cadastrar</h1>
        <p className='text-sm'>Digite seus dados para se cadastrar</p>
      </div>
      <input {...register("name", { required: true })} type="text" placeholder="Name" className="input input-bordered w-full" />
      {errors.name && <span className='text-red-500'>Name is required</span>}
      <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered w-full" />
      {errors.email && <span className='text-red-500'>Email is required</span>}
      <input {...register("password", { required: true })} type="password" placeholder="Senha" className="input input-bordered w-full" />
      {errors.password && <span className='text-red-500'>Password is required</span>}
      <input {...register("confirmPassword", { required: true })} type="password" placeholder="Repetir Senha" className="input input-bordered w-full" />
      {errors.confirmPassword && <span className='text-red-500'>Confirm Password is required</span>}
      <button type="submit" className='btn btn-primary w-full'>Cadastrar</button>
      <p className='text-xs'>Já tem conta? <Link className='link link-primary' href={"/login"}>Entre Aqui</Link></p>
    </form>
  )
}

export default SignUp
