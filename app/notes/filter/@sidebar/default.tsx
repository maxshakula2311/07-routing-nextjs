import Link from 'next/link';
import css from './SidebarNotes.module.css';

const Sidebar = () => {
  const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

  return (
    <aside className={css.sidebar}>
      <h3 className={css.title}>Filter by Tag</h3>
      <nav>
        <ul className={css.list}>
          {tags.map(tag => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag.toLowerCase()}`} className={css.link}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
