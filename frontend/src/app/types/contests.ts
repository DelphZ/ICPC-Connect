import { z } from "zod";

// This file is temporary, want to find a nicer way to share BE and FE schemas and types
export const CreateContestSchema = z
  .strictObject({
    name: z.string().min(5),
    earlyBirdDate: z
      .string()
      .transform((dateStr) => new Date(dateStr))
      .refine((date) => date > new Date(), {
        message: "Early Bird Date must be in the future",
      }),
    cutoffDate: z
      .string()
      .transform((dateStr) => new Date(dateStr))
      .refine((date) => date > new Date(), {
        message: "Cutoff Date must be in the future",
      }),
    contestDate: z
      .string()
      .transform((dateStr) => new Date(dateStr))
      .refine((date) => date > new Date(), {
        message: "Contest Date must be in the future",
      }),
    site: z.number(),
  })
  .refine((data) => data.earlyBirdDate <= data.cutoffDate, {
    message: "Early Bird Date should be before Cutoff Date",
    path: ["earlyBirdDate"],
  })
  .refine((data) => data.cutoffDate <= data.contestDate, {
    message: "Cutoff Date should be before Contest Date",
    path: ["cutoffDate"],
  });

export type CreateContest = z.infer<typeof CreateContestSchema>;
