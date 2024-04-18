import { z } from 'zod'

export const SignupFormSchema = z.object({
    voornaam: z
      .string()
      .min(2, { message: 'Naam must be at least 2 characters long.' })
      .trim(),
    familieNaam: z
      .string()
      .min(2, { message: 'Famielienaam must be at least 2 characters long.' })
      .trim()
  })