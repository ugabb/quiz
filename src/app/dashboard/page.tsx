import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { RegisterTableRow } from "./register-table-row";
import { RegisterTableFilters } from "./register-table-filters";

import { tableItems } from "./mock-table-data";
import { RegisterTablePagination } from "./register-table-pagination";

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8 min-h-screen flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight text-blue-900">
          Cadastros
        </h1>
        <Separator className="mt-4" />
      </div>

      <RegisterTableFilters />

      <div className="flex-1 overflow-x-auto">
        <div className="min-w-full rounded-lg border">
          <Table>
            <TableHeader className="">
              <TableRow>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[400px] text-xs">
                  Enviado
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 text-center w-[600px] text-xs">
                  Resultado Quiz
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  Cliente
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  EVC
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  Telefone
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  E-mail
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  CEP
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[700px] text-xs">
                  Endereço
                </TableHead>
                <TableHead className=" text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  Complemento
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  Número
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  Bairro
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[300px] text-xs">
                  Último Movimento
                </TableHead>
                <TableHead className="text-zinc-800 whitespace-nowrap px-4 w-[64px] text-xs">
                  Seguro
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* TODO: Refatorar as props desse TableBody  */}
            <TableBody>
              {tableItems.map((item, index) => (
                <RegisterTableRow
                  key={index}
                  bairro={item.bairro}
                  cep={item.cep}
                  cliente={item.cliente}
                  complemento={item.complemento}
                  email={item.email}
                  endereco={item.endereco}
                  enviadoEm={item.enviadoEm}
                  evc={item.evc}
                  numero={item.numero}
                  resultadoQuiz={item.resultadoQuiz}
                  seguro={item.seguro}
                  telefone={item.seguro}
                  ultimoMovimento={item.ultimoMovimento}
                />
              ))}
            </TableBody>
          </Table>
          <RegisterTablePagination />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
