import React from 'react';
import ReactPaginate from 'react-paginate';
import "./PageNation.css"
const PageNation = ({setPage,page}) => {
    const onChagePages = ({selected}) => {
        setPage(selected+1)
    }

    return (
        <div className={"ContentsPage_PageArea"}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={onChagePages}
                pageRangeDisplayed={2}
                pageCount={20}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={page - 1}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                disabledClassName={"disabled"}
            />
        </div>

    );
}

export default PageNation;