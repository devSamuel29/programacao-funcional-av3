import { readTransactions } from './transactions'

export async function readBlocks() {
    const response = await fetch('http://localhost:3000/read-blocks')
    if (!response.ok) {
        throw new Error('Failed to fetch transactions')
    }
    const data = await response.json()
    return data
}

export async function mineBlock() {
    const transactions = await readTransactions()
    const body = JSON.stringify({ data: transactions })
    const response = await fetch('http://localhost:3000/create-block', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body,
    })
    if (!response.ok) {
        throw new Error('Failed to create finance')
    }
    return await response.json()
}
