import { z } from 'zod';

export const updateUserSchema = z.object({
  companyName: z
    .string({ required_error: 'errors.companyNameRequired' })
    .min(1, 'errors.companyNameRequired')
    .refine((val) => val.trim().length > 0, {
      message: 'errors.companyNameRequired',
    }),
  image: z.union([z.instanceof(File), z.null()]).refine(
    (file) => {
      if (!file) return true; // null은 허용
      return file.type.startsWith('image/');
    },
    {
      message: 'errors.imageType',
    },
  ),
});

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
