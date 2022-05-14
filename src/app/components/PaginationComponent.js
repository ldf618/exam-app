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

export default PaginationComponent;