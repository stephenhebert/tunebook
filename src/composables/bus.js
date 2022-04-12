import { getCurrentInstance } from 'vue'

export function useBus() {
  const internalInstance = getCurrentInstance()
  const bus = internalInstance.appContext.config.globalProperties.$bus
  return bus
}
