import { SignupFormSchema } from '@/app/lib/definitions'

export async function signup(state, formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      voornaam: formData.get('voornaam'),
      familieNaam: formData.get('familieNaam'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
   
    // Call the provider or db to create a user...
  }
