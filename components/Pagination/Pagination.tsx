import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  setPage: (val: number) => void;
  page: number;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => setPage(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;
