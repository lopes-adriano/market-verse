import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { Navbar } from "@/components/home/navbar";
import { Footer } from "@/components/home/footer";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
        <main className="flex-1 bg-[#F4F4F0]">{children}</main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
