import { writable } from 'svelte/store';

interface globalConfigType {
  isGameFont: boolean
}

export const globalConfig = writable({isGameFont: false});

export function globalConfig_set(val: globalConfigType) : void {
  return globalConfig.update(() => {
    return { isGameFont: val.isGameFont }
  });
}

export function globalConfig_reset() : void {
  return globalConfig.set({isGameFont: false});
}