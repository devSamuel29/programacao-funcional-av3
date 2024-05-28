'use client'
import { FormEvent, useState, useEffect } from 'react'
import BlockCard from '../components/block_card'
import { mineBlock, readBlocks } from '../data-sources/blockchain'

export default function Blockchain() {
    const [blocks, setBlocks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isMined, setIsMined] = useState(false)
    const [buttonText, setButtonText] = useState('Minerar bloco')
    const [buttonColor, setButtonColor] = useState('bg-blue-500')

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setButtonColor('bg-red-500')
        try {
            const response = await mineBlock()
            setBlocks(response)
            setIsMined(true)
            setButtonText('Minerado')
            setButtonColor('bg-green-500')
        } catch (error) {
            console.error('Error mining block:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const response = await readBlocks()
                setBlocks(response)
            } catch (error) {
                setBlocks([])
            }
        }

        fetchBlocks()
    }, [])

    useEffect(() => {
        if (isMined) {
            setTimeout(() => {
                setIsMined(false)
                setButtonText('Minerar bloco')
                setButtonColor('bg-blue-500')
            }, 2000)
        }
    }, [isMined])

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center space-y-10"
            >
                {blocks.length > 0 ? (
                    <BlockCard blocks={blocks} />
                ) : (
                    <span className="text-gray-300">
                        Não há blocos para exibir
                    </span>
                )}
                <button
                    className={`p-3 w-[300px] font-bold rounded-md text-white ${buttonColor} transition duration-500 ${
                        isLoading || isMined
                            ? 'cursor-not-allowed'
                            : 'hover:brightness-75'
                    }`}
                    type="submit"
                    disabled={isLoading || isMined}
                >
                    {isLoading ? 'Minerando' : buttonText}
                </button>
            </form>
        </main>
    )
}
