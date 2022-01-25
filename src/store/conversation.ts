import { writable } from 'svelte/store';

export const dynamicConversation = writable({});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function dynamicConversation_set(val: any) : void {
  return dynamicConversation.update(() => {
    return val
  });
}
