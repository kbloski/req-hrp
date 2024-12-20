import { z } from 'zod';

const validEmail = z.string().email();
const validDate = z.date()
