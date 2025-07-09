import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const categoriesData = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: {
        parentCategory: {
          equals: null,
        },
      },
      sort: "name",
    });

    const formattedCategories = categoriesData.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map(
        (subcategory) => ({
          ...(subcategory as Category),
          subcategories: undefined,
        })
      ),
    }));

    return formattedCategories;
  }),
});
