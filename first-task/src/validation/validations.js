import { z } from 'zod';

export const validEmail = z.string().email();
