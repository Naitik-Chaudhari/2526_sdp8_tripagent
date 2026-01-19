import { format, parseISO } from 'date-fns'

export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  if (!dateString) return ''
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
    return format(date, formatStr)
  } catch {
    return dateString
  }
}

export const formatTime = (dateString) => {
  return formatDate(dateString, 'HH:mm')
}

export const formatDateTime = (dateString) => {
  return formatDate(dateString, 'MMM dd, yyyy HH:mm')
}