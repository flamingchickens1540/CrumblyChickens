import { writable } from 'svelte/store';
import type { GroupPage, Stage } from './types';

export const activePage = writable<GroupPage>('login'); // default page
export const stage = writable<Stage>('Pre-Match');
export const count = writable(0);
export const notes = writable('');
export const name = writable('');

