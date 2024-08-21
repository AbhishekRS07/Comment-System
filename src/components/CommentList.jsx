import React from 'react';
import Comment from './Comment';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CommentList = ({ comments, sortBy, setSortBy }) => {
  return (
    <Box my={2}>
    <FormControl fullWidth className="sort-select">
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        value={sortBy}
        label="Sort By"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
      </Select>
    </FormControl>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </Box>
);
};

export default CommentList;