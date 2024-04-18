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
   
      // 2. Prepare data for insertion into database
  const { voornaam, familieNaam, email, password } = validatedFields.data
 
  // Check if the user's email already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
 
  // If the user already exists, return early
  if (existingUser) {
    return {
      message: 'Email already exists, please login or use a different email.',
    }
  }
 
  // Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Library API
  const data = await db
    .insert(users)
    .values({
      voornaam,
      familieNaamm,
      email,
      password: hashedPassword,
    })
    // Only return the user information you need to store in the session
    .returning({ id: users.id })
 
  const user = data[0]
 
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
 
  }
