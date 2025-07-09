import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "name",
      label: "Nome",
      type: "text",
      required: true,
    },
    {
      name: "color",
      type: "text",
      label: "Cor (HEX)",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "parentCategory",
      label: "Categoria Pai",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subcategories",
      label: "Subcategorias",
      type: "join",
      collection: "categories",
      on: "parentCategory",
      hasMany: true,
    },
  ],
};
