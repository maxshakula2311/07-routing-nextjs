import axios from 'axios';
import type { Note } from '@/types/note';

const PER_PAGE = 12;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const fetchAxios = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'content-type': 'application/json',
  },
});

interface FetchNotesProps {
  search: string;
  page: number;
  tag?: string;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: Note['tag'];
}
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({ search, page, tag }: FetchNotesProps): Promise<FetchNotesResponse> {
  const response = await fetchAxios.get<FetchNotesResponse>('notes', {
    params: {
      tag,
      search,
      page,
      perPage: PER_PAGE,
    },
  });
  return response.data;
}
export async function fetchOneNote(id: string): Promise<Note> {
  const response = await fetchAxios.get<Note>(`notes/${id}`);
  return response.data;
}

export async function createNote(note: CreateNoteProps) {
  const { data } = await fetchAxios.post<Note>('/notes', note);
  return data;
}

export async function deleteNote(id: string) {
  const { data } = await fetchAxios.delete<Note>(`/notes/${id}`);
  return data;
}
