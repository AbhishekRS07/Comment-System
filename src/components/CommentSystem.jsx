import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Container, Button, Typography } from '@mui/material';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import Pagination from './Pagination';
import { googleAuthProvider } from '../firebase';

const CommentSystem = () => {
  const [user] = useAuthState(auth);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = collection(firestore, 'comments');
      const q = query(
        commentsRef,
        orderBy(sortBy === 'latest' ? 'createdAt' : 'reactionCount', 'desc'),
        limit(8)
      );
      const snapshot = await getDocs(q);
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const countSnapshot = await getDocs(collection(firestore, 'comments'));
      setTotalComments(countSnapshot.size);
    };

    fetchComments();
  }, [currentPage, sortBy,comments]);

  const handleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Comment System
      </Typography>
      {user ? (
        <>
          <Button onClick={handleSignOut} variant="outlined" color="secondary">
            Sign Out
          </Button>
          <CommentInput user={user} />
          <CommentList comments={comments} sortBy={sortBy} setSortBy={setSortBy} />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalComments={totalComments}
          />
        </>
      ) : (
        <Button onClick={handleSignIn} variant="contained" color="primary">
          Sign In with Google
        </Button>
      )}
    </Container>
  );
};

export default CommentSystem;