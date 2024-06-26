import Image from "next/image"

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="grid grid-cols-2 h-screen place-items-center bg-gradient-to-t from-blue-50 to-transparent">
      <section className="w-full h-full object-cover">
        <Image className="w-full h-full object-cover" src="/vistoria.jpg" alt="Logo" width={2000} height={1333} />
      </section>
      <section className="flex flex-col justify-center items-center w-full">
        <Image src="/cnvv-logo.png" alt="Logo" width={200} height={200} />
        {children}
      </section>
    </section>
  )
}