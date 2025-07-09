import { ITransaction } from "@/types/transaction";
import { formatCurrency, formatDate } from "@/utils";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export interface ITableProps {
  data: ITransaction[];
  deleteModal: (id: string) => void;
  editModal: (id: string) => void;
}

export function Table({ data, deleteModal, editModal }: ITableProps) {
  return (
    <>
      <table className="w-full mt-16 border-0 border-separate border-spacing-y-2 ">
        <thead>
          <tr>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Título
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Preço
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Categoria
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Data
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, index) => (
            <tr key={index} className="bg-white h-16 rounded-lg">
              <td className="px-4 py-4 whitespace-nowrap text-title">
                {transaction.title}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap text-right ${
                  transaction.type === "INCOME" ? "text-income" : "text-outcome"
                }`}
              >
                {formatCurrency(transaction.price)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                {transaction.category}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-table">
                {transaction.data ? formatDate(new Date(transaction.data)) : ""}
              </td>
              <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                <button
                  className="text-blue-600 hover:bg-blue-50 rounded p-1"
                  title="Editar"
                  onClick={() => editModal(transaction.id || "")}
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-red-600 hover:bg-red-50 rounded p-1"
                  title="Excluir"
                  onClick={() => deleteModal(transaction.id || "")}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
