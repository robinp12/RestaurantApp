import React from "react";

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {

    const pageCount = Math.ceil(length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    const copy = pages.filter(a => {
        return (currentPage - 3 <= a) && (a <= 3 + currentPage)
    });

    return (
        <div className="row justify-content-center">
            <ul className="pagination pagination-sm">
                <li className={"page-item" + (currentPage === 1 && " disabled")}>
                    <button className="page-link" onClick={() => onPageChanged(prev => prev - 1)}>&laquo;</button>
                </li>
                {copy.map((page, index) =>
                    < li key={page} className={"page-item" + (currentPage === page && " active")} >
                        < button className="page-link" onClick={() => onPageChanged(page)}>{page}</button>
                    </li>
                )}
                <li className={"page-item" + (currentPage === pageCount && " disabled")}>
                    <button className="page-link" onClick={() => onPageChanged(prev => prev + 1)}>&raquo;</button>
                </li>
            </ul >
        </div >
    );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}
export default Pagination;