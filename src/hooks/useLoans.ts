import { usePoolContext } from '../context/PoolContext'

/** Return private loan state and schedule actions. */
export function useLoans() { return usePoolContext() }
