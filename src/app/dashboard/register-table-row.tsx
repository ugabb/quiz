"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useQuiz } from "@/lib/quizState";

import { TableItem, tableItems } from "./mock-table-data";

export function RegisterTableRow(props: TableItem) {
  const { questions, score } = useQuiz();

  return (
    <>
      <TableRow>
        <TableCell className="text-xs text-zinc-600 w-[400px] whitespace-nowrap p-4 ">
          {props.enviadoEm}
        </TableCell>
        <TableCell className="text-center text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.resultadoQuiz}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.cliente}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.evc}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.telefone}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.email}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.cep}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.endereco}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.complemento}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 text-center whitespace-nowrap p-4">
          {props.numero}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.bairro}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.ultimoMovimento}
        </TableCell>
        <TableCell className="text-xs text-zinc-600 whitespace-nowrap p-4">
          {props.seguro}
        </TableCell>
      </TableRow>
    </>
  );
}
