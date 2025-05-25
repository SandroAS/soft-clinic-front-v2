import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: number
  text: string
  color?: string
  active: boolean
}

let idCounter = 0
export const useSnackbarStore = defineStore('snackbar', {
  state: () => ({
    messages: [] as ToastMessage[],
  }),
  actions: {
    show(text: string, type: ToastType = 'info') {
      console.log('teste')
      const colorMap = {
        success: 'green',
        error: 'red',
        warning: 'orange',
        info: 'blue',
      }

      this.messages.push({
        id: ++idCounter,
        text,
        color: colorMap[type],
        active: true
      })
    },
    clear() {
      this.messages = []
    },
  },
})
