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
    return (
        <ul className="flex w-[1280px] overflow-x-auto space-x-9 py-4">
            {blocks.map((block) => (
                <li
                    key={block.id}
                    className="flex flex-col border-2 rounded-md p-5 shadow-md min-w-[600px] space-y-3 break-all text-xl"
                >
                    <section className="space-x-3">
                        <span className="font-semibold">Id:</span>
                        <span>{block.id}</span>
                    </section>
                    <section className="space-x-1">
                        <span className="font-semibold">Nonce:</span>{' '}
                        <span>{block.nonce}</span>
                    </section>
                    <section className="space-x-3">
                        <span className="font-semibold">Hash anterior:</span>
                        <span>{block.previous_hash ?? 'Bloco gênesis'}</span>
                    </section>
                    <section className="space-x-3">
                        <span className="font-semibold">Hash:</span>
                        <span>{block.hash}</span>
                    </section>
                    <section className="flex space-x-3">
                        <span className="font-semibold">Transações:</span>
                        <ul className="space-y-3 text-xl overflow-y-auto max-h-[200px]">
                            {block.transactions.length > 0 ? (
                                block.transactions.map((transaction) => (
                                    <li
                                        key={transaction.id}
                                        className="border-t p-2 text-lg w-[300px]"
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
