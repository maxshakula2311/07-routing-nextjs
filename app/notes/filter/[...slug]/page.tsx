import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesFilterClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type NoteFiltersProps = {
  params: Promise<{ slug: string[] }>;
};

const NoteFilters = async ({ params }: NoteFiltersProps) => {
  const { slug } = await params;

  const category = slug[0] === "all" ? undefined : slug[0];
  console.log("🚀 ~ NoteFilters ~ category:", category);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => fetchNotes({ search: "", page: 1, tag: category }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesFilterClient tag={category} />
      </HydrationBoundary>
    </>
  );
};

export default NoteFilters;