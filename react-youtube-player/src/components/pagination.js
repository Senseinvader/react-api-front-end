import React, { Component } from 'react';


const PAGE_RIGHT = 'RIGHT';
const PAGE_LEFT = 'LEFT';

const range = (from, to, step = 1) => {
  let i = from;
  const array = [];

  while(i <= to) {
    array.push(i);
    i += step;
  }
  return array;
};

class Pagination extends Component {

  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 10, pageNeighbours = 0 } = this.props;

    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;
    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 10;

    this.pageNeighbours = typeof pageNeighbours === 'number' 
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.goToPage(1);
  }

  gotToPage = (page) => {
    const {onPageChanged = f => f} = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    }

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (data, event) => {
    event.preventDefault();
    this.gotToPage(data);
  };

  handleMoveLeft = (event) => {
    event.preventDefault();
    this.goToPage(this.state.currentPage - (this.pageNeighbours)-1);
  };

  handleMoveRight = (event) => {
    event.preventDefault();
    this.goToPage(this.state.currentPage + (this.pageNeighbours) + 1);
  };

  fetchPages = () => {
    const totalPages = this.totalPages;
    const pageNeighbours = this.pageNeighbours;
    const currentPage = this.state.currentPage;

    const totalNumbers = (this.pageNeighbours*2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {

      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = (startPage) > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch(true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [PAGE_LEFT, ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, PAGE_RIGHT];
          break;
        }
        case (hasLeftSpill && hasRightSpill) :
        default: {
          pages = [PAGE_LEFT, ...pages, PAGE_RIGHT];
        }
      }
      return [1, ...pages, totalPages];
    }
    return [1, totalPages];
  };

  render() {
    if (!this.totalRecords || this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPages();

    return (
      <React.Fragment>
        <nav aria-label="Videos pagination">
          <ul className="pagination">
            { pages.map((page, index) => {
              if (page === PAGE_LEFT) return (
                <li key={index} className='page-item'>
                  <a href="#" className='page-link' aria-label='Previous' onClick={this.handleMoveLeft}>
                    <span aria-hidden='true'>&laquo;</span>
                    <span className='sr-only'>Previous</span>
                  </a>
                </li>
              );

              if (page === PAGE_RIGHT) return (
                <li key={index} className='page-item'>
                  <a href="#" className='page-link' aria-label='Next' onClick={this.handleMoveRight}>
                    <span aria-hidden='true'>&raquo;</span>
                    <span className='sr-only'>Next</span>
                  </a>
                </li>
              );

              return(
                <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                  <a href="#" className='page-link' onClick={this.handleClick(page)}>{ page }</a>
                </li>
              );
            }) }
          </ul>
        </nav>
      </React.Fragment>
    )
  };
}

export default Pagination;
