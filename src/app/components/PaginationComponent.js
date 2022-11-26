import { Pagination} from 'react-bootstrap';
import PropTypes from 'prop-types';

PaginationComponent.propTypes = {
    
    //array of page numbers
    pages: PropTypes.array.isRequired,
    //selected page
    activePage: PropTypes.number.isRequired,
    //number of total pages
    totalPages: PropTypes.number.isRequired,
    //callback function for page click
    onPageClick: PropTypes.func,
    //callback function for pageFirst click
    onPageFirst: PropTypes.func,
    //callback function for pageLast click
    onPageLast: PropTypes.func,
    //callback function for pagePrev click
    onPagePrev: PropTypes.func,
    //callback function for pageNext click
    onPageNext: PropTypes.func        
}

function PaginationComponent({pages, activePage, totalPages, onPageClick, onPageFirst, onPageLast, onPagePrev, onPageNext}){
    return (
                <Pagination >
                    <Pagination.First disabled={activePage===1} onClick={()=>onPageFirst()} />
                    <Pagination.Prev disabled={activePage===1} onClick={()=>onPagePrev()} />
                    {
                    pages.map((page,index) =>{
                            return(
                                <Pagination.Item key={index} active={page === activePage}  onClick={()=>onPageClick(page)}>
                                {page}
                                </Pagination.Item>
                            )})
                    }
                    <Pagination.Next onClick={()=>onPageNext(totalPages)} disabled={activePage===totalPages}/>
                    <Pagination.Last onClick={()=>onPageLast()} disabled={activePage===totalPages}/>
                </Pagination>
    )
}

//Max visible pages in pagination component. Must be an odd number
const paginationPages = 3;

/**
 * Returns the number of pages in the pagination component 
 *
 * @param {number} totalPages number of page buttons in the pagination component .
 * @return {number} Returns the number of pages in the pagination component . 
 */
function totalInitialPages(totalPages) {
        return totalPages > paginationPages ? paginationPages : totalPages;
}

/**
 * Returns the initial array of pages for the pagination component
 *
 * @param {number} totalPages number of page buttons in the pagination component .
 * @return {number[]} Returns the initial array of pages for the pagination component.
 */    
function initArrayPages(totalPages) {
    let vTotalPages = totalInitialPages(totalPages);
    return Array.from({ length: vTotalPages }, (v, i) => i + 1);
}

/**
 * Returns an array containing page numbers.
 *
 * @param {number} page the page number clicked
 * @param {number} totalPages number of page buttons in the pagination component .
 * @return {number[]} newPages an array containing the the page buttons shown in the pagination component
 */
export function pageClickedArray(page, totalPages) {
    let vTotalPages = totalInitialPages(totalPages);
    let offset = (Math.trunc(vTotalPages / 2));
    let lastPage = page + offset;
    let firstPage = page - offset;
    if (lastPage > totalPages) {
        lastPage = totalPages;
        firstPage = totalPages - vTotalPages + 1;
    }
    if (firstPage < 1) {
        lastPage = vTotalPages;
        firstPage = 1;
    }
    let newPages = Array.from({ length: lastPage - firstPage + 1 }, (v, i) => i + firstPage);
    return newPages;
}

/**
 * Returns an array containing page numbers.
 *
 * @param {number[]} pages an Array with current page numbers in pagination component 
 * @param {number} totalPages number of page buttons in the pagination component .
 * @return {number[]} newPages an array containing the the page buttons shown in the pagination component
 */
export function nextPageArray(pages,totalPages) {
    if (pages.at(-1) !== totalPages) {
        //array shifts to the right
        let newPages = [...pages]
        newPages.push(newPages.at(-1) + 1); //add last+1
        newPages.shift(); //delete first
        return newPages;
    }
    else return pages;

}

/**
 * Returns an array containing page numbers.
 *
 * @param {number[]} pages an Array with current page numbers in pagination component 
 * @return {number[]} newPages an array containing the the page buttons shown in the pagination component
 */
export function prevPageArray(pages) {
    if (pages.at(0) !== 1) {
        let newPages = [...pages]
        newPages.pop(); //delete last        
        newPages.splice(0, 0, newPages[0] - 1); //add on first position first value-1
        return newPages;
    }
    else return pages;
}

/**
 * Returns the array of pages for the pagination component when the first page button is clicked
 *
 * @param {number} totalPages number of page buttons in the pagination component .
 * @return {number[]} Returns the initial array of pages for the pagination component.
 */  
export function firstPageArray(totalPages) {
    return initArrayPages(totalPages)
}

/**
 * Returns the array of pages for the pagination component when the last page button is clicked
 *
 * @param {number} totalPages number of page buttons in the pagination component .
 * @return {number[]} Returns an array of pages for the pagination component.
 */ 
export function lastPageArray(totalPages) {
    let vTotalPages = totalInitialPages(totalPages);
    let newPages = Array(vTotalPages).fill().map((_, i) => (totalPages - vTotalPages + 1) + i);
    return newPages;
}

export default PaginationComponent;