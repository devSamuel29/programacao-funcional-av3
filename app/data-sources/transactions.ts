export async function readTransactions() {
    const response = await fetch('http://localhost:3000/read-transactions')
    if (!response.ok) {
        throw new Error('Failed to fetch transactions')
    }
    const data = await response.json()
    return data
}

export async function createTransaction(data: Object) {
    const response = await fetch('http://localhost:3000/create-transaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        throw new Error('Failed to create finance')
    }
}
