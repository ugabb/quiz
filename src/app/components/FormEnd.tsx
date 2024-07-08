"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
    phone: z.string().min(15, { message: 'Telefone incorreto' }).max(15, { message: 'Telefone incorreto' }),
    address: z.object({
        district: z.string(),
        city: z.string(),
        street: z.string(),
        state: z.string(),
        number: z.coerce.string().optional(),
        cep: z.string()
            .min(8, { message: "CEP deve ter no mínimo 8 caracteres" })
            .max(9, { message: "CEP deve ter no máximo 9 caracteres" })
    }),
    hasCarInsurance: z.string({ message: 'Seguro automotivo é obrigatório' }),
    lastMaintenance: z.string().min(1, { message: 'Última manutenção é obrigatória' })
})

type FormType = z.infer<typeof formSchema>

export interface AddressResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export interface Address {
    district: string;
    city: string;
    street: string;
    state: string;
    cep: string;
}


const FormEnd = () => {
    const [address, setAddress] = useState<Address | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: {
                cep: '',
                city: '',
                district: '',
                state: '',
                street: '',
                number: '',
            },
            email: '',
            name: '',
            phone: '',
            lastMaintenance: ''
        }
    })

    const router = useRouter()

    const SubmitForm = (data: FormType) => {
        console.log(data)
        toast.loading("Enviando dados. Aguarde!", {
            duration: 3000
        })
        setTimeout(() => {
            toast.success("Dados enviado com sucesso!")
            router.push("/quiz/result")
        }, 3000)
    }

    const handleGetCEP = async (cep: string) => {
        if (cep.length < 9) return;
        console.log(cep);

        if (cep) {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            console.log(response);

            if (response.data.erro) {
                toast.error("CEP inválido ou não existe!")
            }

            const addressResponse: AddressResponse = response.data
            setValue('address', {
                cep: addressResponse.cep,
                city: addressResponse.localidade,
                district: addressResponse.bairro,
                state: addressResponse.uf,
                street: addressResponse.logradouro,
                number: ""
            });
            setAddress({
                cep: addressResponse.cep,
                city: addressResponse.localidade,
                district: addressResponse.bairro,
                state: addressResponse.uf,
                street: addressResponse.logradouro,
            })
        } else {
            toast.error("CEP inválido")
        }
    }

    const handleCep = (event: any) => {
        let input = event.target
        input.value = formatCEP(input.value)
    }

    const formatCEP = (cep: string) => {
        if (!cep) return ""

        // Remove todos os caracteres que não são dígitos
        cep = cep.replace(/\D/g, '')

        // Insere um hífen após os primeiros cinco dígitos
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
        return cep
    };

    const handlePhone = (event: any) => {
        let input = event.target
        input.value = phoneMask(input.value)
    }

    const phoneMask = (value: any) => {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }

    const formatNumero = (numero: string) => {
        if (!numero) return ""

        // Remove todos os caracteres que não são dígitos
        numero = numero.replace(/\D/g, '')

        return numero
    };

    return (
        <div className="card bg-zinc-100 text-primary-content max-w-lg  flex flex-col gap-5 justify-center items-center">
            <div className="card-body">
                <h2 className="card-title text-zinc-900 text-center">Para saber seu desempenho e receber o seu certificado de “AMIGO DO TRÂNSITO” preencha o formulário</h2>
                <form className="flex flex-col gap-3 w-full py-10" onSubmit={handleSubmit(SubmitForm)}>
                    <div className="flex flex-col gap-3">
                        <label className="form-control w-full">
                            <span className="label-text">Nome</span>
                            <input {...register("name")} type="text" placeholder="John Doe" className="input input-bordered w-full text-zinc-900" />
                            {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                        </label>
                        <label className="form-control w-full">
                            <span className="label-text">Email</span>
                            <input {...register("email", { required: 'Email é obrigatório' })} type="text" placeholder="johndoe@mail.com" className="input input-bordered w-full text-zinc-900" />
                            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                        </label>
                        <label className="form-control w-full">
                            <span className="label-text">Telefone</span>
                            <input {...register("phone")} type="text" placeholder="(99) 99999-9999" className="input input-bordered w-full text-zinc-900" onChange={(e) => handlePhone(e)} />
                            {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
                        </label>
                        <label className="form-control w-full">
                            <span className="label-text">CEP</span>
                            <input {...register("address.cep")} type="text" placeholder="77777-77" className="input input-bordered w-full text-zinc-900" onChange={(e) => {
                                let input = e.target
                                input.value = formatCEP(input.value)
                                if (isValidCEP(e.target.value)) {
                                    handleGetCEP(e.target.value)
                                }
                            }} />
                            {errors?.address?.cep && <span className="text-sm text-red-500">{errors.address.cep.message}</span>}
                        </label>
                        {address && (
                            <div className="flex flex-col gap-3">
                                <label className="form-control w-full">
                                    <span className="label-text">Endereço</span>
                                    <input {...register("address.street")} type="text" className="input input-bordered w-full text-zinc-900" />
                                    {errors?.address?.street && <span className="text-sm text-red-500">{errors.address.street.message}</span>}
                                </label>
                                <label className="form-control w-full">
                                    <span className="label-text">Número</span>
                                    <input {...register("address.number")} type="text" className="input input-bordered w-full text-zinc-900" onChange={(e) => {
                                        let input = e.target
                                        input.value = formatNumero(input.value)
                                    }} />
                                    {errors?.address?.number && <span className="text-sm text-red-500">{errors.address.number.message}</span>}
                                </label>
                                <label className="form-control w-full">
                                    <span className="label-text">Cidade</span>
                                    <input {...register("address.city")} type="text" className="input input-bordered w-full text-zinc-900" />
                                    {errors?.address?.city && <span className="text-sm text-red-500">{errors.address.city.message}</span>}
                                </label>
                                <label className="form-control w-full">
                                    <span className="label-text">Bairro</span>
                                    <input {...register("address.district")} type="text" className="input input-bordered w-full text-zinc-900" />
                                    {errors?.address?.district && <span className="text-sm text-red-500">{errors.address.district.message}</span>}
                                </label>
                                <label className="form-control w-full">
                                    <span className="label-text">Estado</span>
                                    <input {...register("address.state")} type="text" className="input input-bordered w-full text-zinc-900" />
                                    {errors?.address?.state && <span className="text-sm text-red-500">{errors.address.state.message}</span>}
                                </label>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className="text-zinc-800 text-sm">Possui Seguro automotivo?</p>
                        <label className="label cursor-pointer gap-3 justify-start">
                            <input type="radio" className="radio radio-primary" {...register("hasCarInsurance")} />
                            <span className="label-text">Sim</span>
                        </label>
                        <label className="label cursor-pointer gap-3 justify-start">
                            <input type="radio" className="radio radio-primary" {...register("hasCarInsurance")} />
                            <span className="label-text">Não</span>
                        </label>
                        {errors.hasCarInsurance && <span className="text-sm text-red-500">{errors.hasCarInsurance.message}</span>}
                    </div>


                    <label className="form-control w-full text-zinc-900">
                        <div className="label">
                            <span className="label-text">Última Manutenção</span>
                        </div>
                        <select className="select select-neutral w-full" {...register("lastMaintenance")} defaultValue="#">
                            <option disabled value="#">Selecione</option>
                            <option value={1}>1 Meses</option>
                            <option value={2}>2 Meses</option>
                            <option value={3}>3 Meses</option>

                        </select>
                        {errors.lastMaintenance && <span className="text-sm text-red-500">{errors.lastMaintenance.message}</span>}
                    </label>

                    <button type="submit" className="btn btn-primary">Receber Resultado</button>
                </form>
            </div>
        </div>

    )
}

export default FormEnd
