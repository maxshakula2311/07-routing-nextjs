import { fetchOneNote } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import css from './NoteDetails.module.css';
type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  console.log('note id:', id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchOneNote(id),
  });

  return (
    <>
      <main className={css.main}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
        </HydrationBoundary>
      </main>
    </>
  );
};

export default NoteDetails;
