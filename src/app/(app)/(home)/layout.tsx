import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";
import { SearchFilters } from "./search-filters";
import { getPayload } from "payload";
import config from "@payload-config";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const payload = await getPayload({
    config: config,
  });

  const categoriesData = await payload.find({
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

  const formattedCategories: CustomCategory[] = categoriesData.docs.map(
    (category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map(
        (subcategory) => ({
          ...(subcategory as Category),
          subcategories: undefined,
        })
      ),
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedCategories} />
      <main className="flex-1 bg-[#F4F4F0]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
