interface ITransaction {
    id: string
    value: string
    transactionType: string
}

interface TransactionCardProps {
    transactions: ITransaction[]
}

export default function TransactionCard({
    transactions,
}: TransactionCardProps) {
    return (
        <ul className="flex space-x-10 overflow-x-auto w-[30%] absolute bottom-0 mb-32 py-6">
            {transactions.map((transaction) => (
                <li
                    key={transaction.id}
                    className={`flex flex-col border min-w-[100px] ${
                        transaction.transactionType === 'Despesa'
                            ? 'border-red-500'
                            : 'border-green-500'
                    } rounded-md p-4 m-2 shadow-md`}
                >
                    <span>{Number(transaction.value).toFixed(2)}</span>
                    <span>{transaction.transactionType}</span>
                </li>
            ))}
        </ul>
    )
}
