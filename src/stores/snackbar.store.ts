import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  text: string
  color?: string
  timeout?: number
}

export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    messages: [] as ToastMessage[],
  }),
  actions: {
    show(text: string, type: ToastType = 'info', timeout = 5000) {
      console.log('teste')
      const colorMap = {
        success: 'green',
        error: 'red',
        warning: 'orange',
        info: 'blue',
      }

      this.messages.push({
        text,
        color: colorMap[type],
        timeout,
      })
    },
    clear() {
      this.messages = []
    },
  },
})
