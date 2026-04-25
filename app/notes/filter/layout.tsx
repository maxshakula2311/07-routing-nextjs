import css from './LayoutNotes.module.css';

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <div className={css.layout}>
      {sidebar}
      {children}
    </div>
  );
};

export default Layout;
