const { z } = require('zod');

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.number().int().nonnegative("Stock must be non-negative"),
  isLimitedEdition: z.boolean().optional(),
  editionSize: z.number().int().optional().nullable(),
  dropDate: z.string().datetime().optional().nullable(),
});

const commissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  budget: z.string().min(1, "Budget is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

module.exports = {
  productSchema,
  commissionSchema,
};
