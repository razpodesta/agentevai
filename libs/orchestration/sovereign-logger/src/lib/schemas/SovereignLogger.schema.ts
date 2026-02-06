import { z } from 'zod';

export const SovereignLogSchema = z.object({
  severity: z.enum(['INFO', 'WARN', 'ERROR', 'CRITICAL']),
  apparatus: z.string().min(3),
  operation: z.string().min(2),
  message: z.string().min(1),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).readonly();

export type ISovereignLog = z.infer<typeof SovereignLogSchema>;