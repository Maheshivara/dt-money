import { date, InferType, number, object, string } from "yup";
import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";
import { ITransaction } from "@/types/transaction";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export interface IEditTransactionModalProps {
  closeModal: () => void;
  transaction?: ITransaction;
  editTransaction: (transaction: ITransaction) => void;
}

const transactionSchema = object({
  title: string()
    .required("O Título é obrigatório")
    .min(5, "O Título deve ter pelo menos 5 caracteres"),
  type: string()
    .required("O Tipo é obrigatório")
    .oneOf(["INCOME", "OUTCOME"], 'O Tipo deve ser "income" ou "outcome"'),
  category: string().required("A Categoria é obrigatória"),
  price: number()
    .required("O Preço é obrigatório")
    .positive("O preço deve ser um número positivo")
    .min(0.01, "O preço deve ser maior que zero"),
  data: date()
    .required("A Data é obrigatória")
    .default(() => new Date()),
});

type ITransactionForm = InferType<typeof transactionSchema>;

export function EditTransactionModal({
  closeModal,
  transaction,
  editTransaction,
}: IEditTransactionModalProps) {
  if (transaction === undefined || !transaction || !transaction.id) {
    closeModal();
    return null;
  }
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<ITransactionForm>({
    defaultValues: {
      title: transaction.title,
      type: transaction.type,
      category: transaction.category,
      price: transaction.price,
      data: transaction.data ? new Date(transaction.data) : new Date(),
    },
    resolver: yupResolver(transactionSchema),
  });

  const handleSetType = (type: "INCOME" | "OUTCOME") => {
    setValue("type", type);
  };

  const type = watch("type", transaction.type);

  const onSubmit = (data: ITransactionForm) => {
    editTransaction({
      ...transaction,
      ...data,
      type: data.type as "INCOME" | "OUTCOME",
    });
    closeModal();
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <button
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
              onClick={closeModal}
              aria-label="Fechar"
            >
              <span className="text-2xl">&times;</span>
            </button>
            <div className="bg-modal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h1
                    className="font-semibold leading-9 text-title text-2xl"
                    id="modal-title"
                  >
                    Editar Transação
                  </h1>
                </div>
              </div>
            </div>
            <form
              className="flex flex-col gap-4 px-12 mt-4 mb-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input type="text" placeholder="Título" {...register("title")} />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
              <Input type="number" placeholder="Preço" {...register("price")} />
              {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
              <TransactionSwitcher
                setType={handleSetType}
                type={type as "INCOME" | "OUTCOME"}
              />
              {errors.type && (
                <span className="text-red-500">{errors.type.message}</span>
              )}
              <Input
                type="text"
                placeholder="Categoria"
                {...register("category")}
              />
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
              <div className="bg-modal px-12 py-3 flex sm:flex-row-reverse w-full mb-11">
                <button
                  type="submit"
                  className="mt-3 w-full justify-center rounded-md bg-blue-600 text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80 sm:mt-0"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
