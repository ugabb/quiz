
import Image from "next/image";
import Form from "./components/Form";


export default function Home() {

  return (
    <>
      <header className="flex justify-around items-center">
        <Image src="/cnvv-logo.png" alt="Logo" width={200} height={200} />
        <Image src="/penatrans.png" alt="Logo" width={200} height={200} />
      </header>
      <main className="mt-10 flex flex-col justify-center items-center">

        <div className="card bg-zinc-100 text-primary-content">
          <div className="card-body">
            <h2 className="card-title text-zinc-900">Quiz</h2>
            <Form />
          </div>
        </div>

      </main>
    </>
  );
}
