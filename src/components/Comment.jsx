import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { firestore } from '../firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { Card, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';
import DOMPurify from 'dompurify';

const Comment = ({ comment }) => {
  const [showFullComment, setShowFullComment] = useState(false);

  const handleReaction = async (reactionType) => {
    const commentRef = doc(firestore, 'comments', comment.id);
    await updateDoc(commentRef, {
      [`reactions.${reactionType}`]: increment(1),
      reactionCount: increment(1),
    });
  };

  const sanitizeAndTruncate = (text) => {
    const lines = text.split('\n');
    const truncated = lines.length > 5 && !showFullComment
      ? lines.slice(0, 5).join('\n') + '...'
      : text;
    return DOMPurify.sanitize(truncated);
  };

  return (
    <Card variant="outlined" sx={{ my: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar src={comment.userPhoto} alt={comment.userName} />
          <Typography variant="h6" ml={2}>
            {comment.userName}
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          dangerouslySetInnerHTML={{ __html: sanitizeAndTruncate(comment.text) }}
        />
        {comment.text.split('\n').length > 5 && (
          <Button onClick={() => setShowFullComment(!showFullComment)}>
            {showFullComment ? 'Show Less' : 'Show More'}
          </Button>
        )}
        {comment.fileUrl && (
          <Box mt={2}>
            <img src={comment.fileUrl} alt="Attached file" style={{ maxWidth: '100%' }} />
          </Box>
        )}
        <Typography variant="caption" display="block" mt={1}>
          {formatDistanceToNow(comment.createdAt.toDate())} ago
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleReaction('like')}>👍 {comment.reactions?.like || 0}</Button>
        <Button onClick={() => handleReaction('love')}>❤️ {comment.reactions?.love || 0}</Button>
      </CardActions>
    </Card>
  );
};

export default Comment;