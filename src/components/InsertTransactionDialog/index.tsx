"use client";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Image from "next/image";

interface InsertTransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (transaction: {
    title: string;
    value: number;
    type: "income" | "outcome";
    category: string;
  }) => void;
}

export function InsertTransactionDialog({
  open,
  onClose,
  onSubmit,
}: InsertTransactionDialogProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState<number | "">("");
  const [type, setType] = useState<"income" | "outcome">("outcome");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || value === "" || isNaN(Number(value))) return;
    let transactionValue = Number(value);
    if (type === "outcome" && transactionValue > 0) {
      transactionValue = -transactionValue;
    }
    onSubmit({ title, value: transactionValue, type, category });
    setTitle("");
    setValue("");
    setType("income");
    setCategory("");
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="relative w-full max-w-md rounded bg-white p-6 shadow-xl">
              <div className="absolute top-4 right-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Fechar"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                >
                  x
                </button>
              </div>
              <div className="flex flex-col items-start px-10 mt-4 pb-10">
                <DialogTitle className="text-lg font-medium mb-4">
                  Cadastrar transação
                </DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preço
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded px-3 py-2"
                      value={value}
                      onChange={(e) =>
                        setValue(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <a
                      onClick={() => setType("income")}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="flex flex-row gap-8 items-center justify-center"
                        style={{
                          borderRadius: "5px",
                          minWidth: "150px",
                          padding: "0 16px",
                          backgroundColor:
                            type === "income"
                              ? "rgba(18, 164, 84, 0.1)"
                              : "#FFFFFF",
                          height: "56px",
                        }}
                      >
                        <Image
                          src="/income.png"
                          alt="Income"
                          width={24}
                          height={24}
                        ></Image>
                        <p>Entrada</p>
                      </div>
                    </a>
                    <a
                      onClick={() => {
                        setType("outcome");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className="flex flex-row gap-8 items-center justify-center"
                        style={{
                          borderRadius: "5px",
                          minWidth: "150px",
                          padding: "0 16px",
                          backgroundColor:
                            type === "outcome"
                              ? "rgba(229, 46, 77, 0.1)"
                              : "#FFFFFF",
                          height: "56px",
                        }}
                      >
                        <Image
                          src="/outcome.png"
                          alt="Outcome"
                          width={24}
                          height={24}
                        ></Image>
                        <p>Saída</p>
                      </div>
                    </a>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Categoria
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center mt-6">
                    <button
                      type="submit"
                      className="w-full bg-income text-white"
                      style={{
                        borderRadius: "5px",
                        height: "64px",
                      }}
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
