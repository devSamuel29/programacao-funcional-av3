interface IBlock {
    id: string
    nonce: string
    hash: string
    previous_hash: string
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
                    className="flex flex-col border-2 rounded-md p-5 shadow-md min-w-[600px] space-y-3 text-xl"
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
                        <span className="font-semibold">Previous hash:</span>
                        <span className="break-all">
                            {block.previous_hash ?? 'Bloco gênesis'}
                        </span>
                    </section>
                    <section className="space-x-3">
                        <span className="font-semibold">Hash:</span>
                        <span className="break-all">{block.hash}</span>
                    </section>
                </li>
            ))}
        </ul>
    )
}
