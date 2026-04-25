import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';
interface NoteListProps {
  notes: Note[];
}
const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  return (
    <>
      <ul className={css.list}>
        {notes.map(note => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                disabled={isPending}
                className={css.button}
                onClick={() => {
                  mutate(note.id);
                }}
              >
                Delete
              </button>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NoteList;
