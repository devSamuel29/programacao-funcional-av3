import { useEffect, useRef } from 'react'

export interface ITransaction {
    id: string
    value: string
    type: string
}

interface TransactionCardProps {
    transactions: ITransaction[]
}

export default function TransactionCard({
    transactions,
}: TransactionCardProps) {
    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollLeft = listRef.current.scrollWidth
        }
    }, [transactions])

    return (
        <ul
            ref={listRef}
            className="flex space-x-10 absolute bottom-0 mb-6 overflow-x-auto justify-start w-[500px] py-6"
        >
            {transactions.map((transaction) => (
                <li
                    key={transaction.id}
                    className={`flex flex-col border ${
                        transaction.type === 'Despesa'
                            ? 'border-red-500'
                            : 'border-green-500'
                    } rounded-md p-4 shadow-md`}
                >
                    <span>{Number(transaction.value).toFixed(2)}</span>
                    <span>{transaction.type}</span>
                </li>
            ))}
        </ul>
    )
}
