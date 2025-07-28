import { z } from 'zod';

export const updateUserSchema = z.object({
  companyName: z.string({ required_error: 'form.errors.companyNameRequired' }),
  image: z.union([z.instanceof(File), z.null()]).refine(
    (file) => {
      if (!file) return false;
      return file.type.startsWith('image/');
    },
    {
      message: 'form.errors.imageType',
    },
  ),
});

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
