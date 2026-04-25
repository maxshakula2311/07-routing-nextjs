import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NotesFilterClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

const FilterPage = async ({ params }: FilterPageProps) => {
  const { slug } = await params;
  const tag = slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () =>
      fetchNotes({
        search: '',
        page: 1,
      }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesFilterClient tag={tag} />
      </HydrationBoundary>
    </>
  );
};

export default FilterPage;
