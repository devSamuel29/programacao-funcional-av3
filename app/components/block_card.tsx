import { useEffect, useRef } from 'react'
import { ITransaction } from './transaction_card'

interface IBlock {
    id: string
    nonce: string
    hash: string
    previous_hash?: string
    transactions: ITransaction[]
}

interface IBlockCardProps {
    blocks: IBlock[]
}

export default function BlockCard({ blocks }: IBlockCardProps) {
    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollLeft = listRef.current.scrollWidth
        }
    }, [blocks])

    return (
        <ul
            ref={listRef}
            className="flex m-auto w-[100vh] justify-start overflow-x-auto space-x-9 py-4"
        >
            {blocks.map((block) => (
                <li
                    key={block.id}
                    className="flex flex-col border-2 rounded-md p-5 shadow-md min-w-[600px] min-h-[00px] space-y-3 text-xl justify-center overflow-hidden"
                >
                    <section className="flex space-x-3">
                        <span className="font-semibold">Id:</span>
                        <span>{block.id}</span>
                    </section>
                    <section className="flex space-x-3">
                        <span className="font-semibold">Nonce:</span>
                        <span>{block.nonce}</span>
                    </section>
                    <section className="flex space-x-3">
                        <span className="flex font-semibold">
                            Hash anterior:
                        </span>
                        <span className="break-all">
                            {block.previous_hash ?? 'Bloco gênesis'}
                        </span>
                    </section>
                    <section className="flex space-x-3">
                        <span className="font-semibold">Hash:</span>
                        <span className="break-all">{block.hash}</span>
                    </section>
                    <section className="flex space-x-3">
                        <span className="font-semibold">Transações:</span>
                        <ul className="flex space-x-3 text-xl overflow-x-auto max-w-[600px]">
                            {block.transactions.length > 0 ? (
                                block.transactions.map((transaction) => (
                                    <li
                                        key={transaction.id}
                                        className="pb-3 text-lg min-w-[150px]"
                                    >
                                        <section className="space-x-3">
                                            <span className="font-semibold">
                                                Valor:
                                            </span>
                                            <span>
                                                {Number(
                                                    transaction.value
                                                ).toFixed(2)}
                                            </span>
                                        </section>
                                        <section className="space-x-3">
                                            <span className="font-semibold">
                                                Tipo:
                                            </span>
                                            <span>{transaction.type}</span>
                                        </section>
                                    </li>
                                ))
                            ) : Number(block.id) === 0 ? (
                                <li className="text-center text-gray-500">
                                    Bloco gênesis
                                </li>
                            ) : (
                                <li className="text-center text-gray-500">
                                    Nenhuma transação para mostrar
                                </li>
                            )}
                        </ul>
                    </section>
                </li>
            ))}
        </ul>
    )
}
