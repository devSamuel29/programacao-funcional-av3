'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TransactionCard from './components/transaction_card'
import {
    createTransaction,
    readTransactions,
} from './data-sources/transactions'
import Link from 'next/link'

const schema = z.object({
    value: z.string().refine((val) => parseFloat(val)),
    type: z.string().min(1),
})

export default function Index() {
    const [buttonText, setButtonText] = useState('Criar')
    const [buttonColor, setButtonColor] = useState('bg-blue-500')
    const [isDisabled, setIsDisabled] = useState(false)
    const [attemptedSubmit, setAttemptedSubmit] = useState(false)
    const [borderColor, setBorderColor] = useState('border-gray-50')
    const [showTransactions, setShowTransactions] = useState(false)
    const [transactionCreated, setTransactionCreated] = useState(false)
    const [transactions, setTransactions] = useState([])

    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const handleShowTransactions = async () => {
        const response = await readTransactions()
        setTransactions(response)
    }

    const toggleShowTransactions = async () => {
        setShowTransactions((prevShowTransactions) => !prevShowTransactions)
        await handleShowTransactions()
    }

    const onInvalid = () => {
        setAttemptedSubmit(true)
    }

    const onSubmit = async (data: Object) => {
        try {
            await createTransaction(data)
            setButtonText('Criado!')
            setButtonColor('bg-green-500')
            setBorderColor('border-green-500')
            setIsDisabled(true)
            setTransactionCreated(true)
            setTimeout(() => {
                setButtonText('Criar')
                setButtonColor('bg-blue-500')
                setBorderColor('border-gray-50')
                setIsDisabled(false)
                setAttemptedSubmit(false)
            }, 2000)
        } catch (error) {
            setButtonText('Erro no servidor!')
            setButtonColor('bg-red-500')
            setBorderColor('border-red-500')
            setTimeout(() => {
                setButtonText('Criar')
                setButtonColor('bg-blue-500')
                setBorderColor('border-gray-50')
                setIsDisabled(false)
                setAttemptedSubmit(false)
            }, 2000)
        }
    }

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | undefined

        if (attemptedSubmit && !isValid) {
            setButtonColor('bg-red-500')
            setIsDisabled(false)
            setButtonText('Valores inválidos')
            setBorderColor('border-red-500')

            timeoutId = setTimeout(() => {
                setButtonColor('bg-blue-500')
                setIsDisabled(false)
                setButtonText('Criar')
                setBorderColor('border-gray-50')
                setAttemptedSubmit(false)
            }, 2000)
        } else if (isValid) {
            setButtonColor('bg-blue-500')
            setIsDisabled(false)
            setButtonText('Criar')
            setBorderColor('border-gray-50')
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [isValid, attemptedSubmit])

    useEffect(() => {
        if (showTransactions && transactionCreated) {
            handleShowTransactions()
            setTransactionCreated(false)
        }
    }, [showTransactions, transactionCreated])

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <Link
                href="/blockchain"
                className="mb-4 underline text-blue-500 hover:brightness-75"
            >
                Clique aqui para ir a Blockchain
            </Link>
            <form
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                className={`flex flex-col space-y-4 border-2 ${borderColor} items-center rounded-md p-20 shadow-md transition duration-500`}
            >
                <input
                    {...register('value')}
                    placeholder="Valor"
                    className="p-3 bg-slate-100 rounded-md outline-none"
                />
                <select
                    {...register('type')}
                    defaultValue=""
                    className="p-3 bg-slate-100 rounded-md w-full"
                >
                    <option value="" disabled>
                        Selecione
                    </option>
                    <option value="Receita">Receita</option>
                    <option value="Despesa">Despesa</option>
                </select>

                <button
                    type="submit"
                    className={`w-full p-3 font-bold rounded-md text-white ${buttonColor} ${
                        isDisabled || (attemptedSubmit && !isValid)
                            ? 'cursor-not-allowed'
                            : 'hover:brightness-75'
                    } transition duration-500`}
                    disabled={isDisabled || (attemptedSubmit && !isValid)}
                >
                    {buttonText}
                </button>

                <button
                    type="button"
                    onClick={toggleShowTransactions}
                    className="underline text-blue-500 hover:brightness-75"
                >
                    {showTransactions
                        ? 'Fechar transações'
                        : 'Ver todas as transações'}
                </button>
            </form>
            {showTransactions &&
                (transactions.length > 0 ? (
                    <TransactionCard transactions={transactions} />
                ) : (
                    <span className="absolute bottom-0 mb-32 text-gray-300">
                        Nenhuma transação para mostrar
                    </span>
                ))}
        </main>
    )
}
