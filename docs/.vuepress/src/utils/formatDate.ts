import { format } from 'date-fns'

/**
 * Get a Date object in 'MMM do yyyy' format
 */
export const formatDate = (d: Date): string => format(d, 'MMM do yyyy')