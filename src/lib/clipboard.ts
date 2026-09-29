import { toast } from './toast'

export async function copyToClipboard(text: string, successMessage = 'Copied to clipboard') {
  try {
    await navigator.clipboard.writeText(text)
    toast(successMessage, 'success')
    return true
  } catch {
    toast('Could not access the clipboard', 'error')
    return false
  }
}
