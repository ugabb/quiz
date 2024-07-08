"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { useQuiz } from "@/lib/quizState";

import { TableItem, tableItems } from "./mock-table-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import QuizResult from "../quiz/result/page";
import ModalResult from "../components/ModalResult";

export function RegisterTableRow(props: TableItem) {
  const { questions, score } = useQuiz();

  return (
    <>
      <TableRow>
        <TableCell className="text-xs text-zinc-600 w-[400px] whitespace-nowrap p-4 ">
          {props.enviadoEm}
        </TableCell>
        <TableCell className="text-center text-xs text-zinc-600 whitespace-nowrap p-4">
          <Dialog >
            <Tooltip>
              <TooltipTrigger>
                {props.resultadoQuiz}
              </TooltipTrigger>
              <TooltipContent className="hover:bg-emerald-500">
                <DialogTrigger>Ver respostas</DialogTrigger>
              </TooltipContent>
            </Tooltip>
            <DialogContent className="w-full h-[800px] flex flex-col overflow-y-scroll ">
              <DialogHeader>
                <ModalResult userId={props.id}/>
              </DialogHeader>
            </DialogContent>
          </Dialog>

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
