import { createHash } from 'crypto';

export const bool2num = (val: boolean) => (val ? 1 : 0);
export const md5 = (str: string) => createHash('md5').update(str).digest('hex');
