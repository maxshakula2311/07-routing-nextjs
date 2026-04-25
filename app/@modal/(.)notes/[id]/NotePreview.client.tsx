'use client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import css from './NotePreview.module.css';
import { fetchOneNote } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note, isSuccess, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchOneNote(id),
    refetchOnMount: false,
  });
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <Modal onClose={handleBack}>
      {isLoading && <p>Loading, please wait...</p>}
      {error && !note && (
        <>
          <p>Something went wrong.</p>
          <p>{error.message}</p>
        </>
      )}
      {isSuccess && (
        <div className={css.container}>
          <button className={css.backBtn} onClick={handleBack}>back</button>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.tag}>{note.tag}</p>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default NotePreviewClient;
