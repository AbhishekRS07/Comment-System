import React from 'react';
import { Button, Box } from '@mui/material';

const Pagination = ({ currentPage, setCurrentPage, totalComments }) => {
  const totalPages = Math.ceil(totalComments / 8);

  return (
    <Box className="pagination">
      <Button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        variant="outlined"
      >
        Previous
      </Button>
      <Box mx={2}>
        Page {currentPage} of {totalPages}
      </Box>
      <Button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        variant="outlined"
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;