"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
    uf: z.string({message: "Estado é obrigatório"}),
    city: z.string({message: "Cidade é obrigatória"}),
    ecv: z.string({message: "ECV é obrigatório"}),
    name: z.string().min(1, { message: 'Nome é obrigatório' }),
    email: z.string().email({ message: 'Email inválido' }).min(1, { message: 'Email é obrigatório' }),
    phone: z.string().min(15, { message: 'Telefone incorreto' }).max(15, { message: 'Telefone incorreto' })
})

type FormType = z.infer<typeof formSchema>

const Form = () => {
    const [ufs, setUfs] = useState<{ id: number; sigla: string }[]>([]);
    const [cities, setCities] = useState<{ id: number; nome: string }[]>([]);
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uf: '',
            city: '',
            ecv: ''
        }
    })

    const handleFethcUfs = async () => {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();
        setUfs(data);
    }
    const handleFethcCity = async (uf: string) => {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const data = await response.json();
        setCities(data);
    }

    useEffect(() => {
        handleFethcUfs()
    }, [])


    const router = useRouter()

    const SubmitForm = (data: FormType) => {
        toast.loading("Enviando dados. Aguarde!",{duration: 3000})
        console.log(data)
        setTimeout(() => {
            router.push("/quiz")
            toast.success("Dados enviado com sucesso!")
         }, 3000)
    }


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

    return (
        <form className="flex flex-col gap-3 w-full py-10" onSubmit={handleSubmit(SubmitForm)}>
            <label className="form-control w-full text-zinc-900">
                <div className="label">
                    <span className="label-text">Estados</span>
                </div>
                <select className="select select-neutral w-full" {...register("uf", {required: true})} defaultValue="#" onChange={(e) => handleFethcCity(e.target.value)}>
                    <option disabled value="#">Selecione o estado</option>
                    {ufs.map(uf => (
                        <option key={uf.id} value={uf.sigla}>{uf.sigla}</option>
                    ))}
                </select>
                {errors.uf && <span className="text-sm text-red-500">{errors.uf.message}</span>}
            </label>
            <label className="form-control w-full  text-zinc-900">
                <div className="label">
                    <span className="label-text">Cidades</span>
                </div>
                <select className="select select-neutral w-full" {...register("city",{required: true})} defaultValue="#">
                    <option disabled value="#">Selecione a cidade</option>
                    {cities.map(city => (
                        <option key={city.id}>{city.nome}</option>
                    ))}
                </select>
                {errors.city && <span className="text-sm text-red-500">{errors.city.message}</span>}
            </label>
            <label className="form-control w-full  text-zinc-900">
                <div className="label">
                    <span className="label-text">ECV</span>
                </div>
                <select className="select select-neutral w-full" {...register("ecv",{required: true})} defaultValue="#">
                    <option disabled value="#">ECV</option>
                    <option>ECV Exemplo</option>
                </select>
                {errors.ecv && <span className="text-sm text-red-500">{errors.ecv.message}</span>}
            </label>

            <label className="label cursor-pointer gap-3">
                <span className="label-text">Confirmo que as informações acima estão corretas</span>
                <input type="checkbox" className="checkbox checkbox-primary" onChange={() => setDataIsCorrect((prev) => !prev)} />
            </label>

            {dataIsCorrect && (
                <div className="flex flex-col gap-3">
                    <label className="form-control w-full">
                        <span className="label-text">Nome</span>
                        <input {...register("name")} type="text" placeholder="John Doe" className="input input-bordered w-full text-zinc-900" />
                        {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
                    </label>
                    <label className="form-control w-full">
                        <span className="label-text">Telefone</span>
                        <input {...register("phone")} type="text" placeholder="(99) 99999-9999" className="input input-bordered w-full text-zinc-900" onChange={(e) => handlePhone(e)} maxLength={15} />
                        {errors.phone && <span className="text-sm text-red-500">{errors.phone.message}</span>}
                    </label>
                    <label className="form-control w-full">
                        <span className="label-text">Email</span>
                        <input {...register("email")} type="text" placeholder="johndoe@mail.com" className="input input-bordered w-full text-zinc-900" />
                        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
                    </label>
                </div>
            )}

            <button disabled={!dataIsCorrect || isSubmitting} type="submit" className="btn btn-primary">Enviar</button>
        </form>
    )
}

export default Form