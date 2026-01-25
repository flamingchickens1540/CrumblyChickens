import { writable } from 'svelte/store';
import type { GroupPage, Stage } from './types';

export const activePage = writable<GroupPage>('queue'); // default page
export const stage = writable<Stage>('PreMatch');
export const count = writable(0);
export const notes = writable('');