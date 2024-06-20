
import Image from "next/image";
import Form from "./components/Form";


export default function Home() {

  return (
    <>
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
