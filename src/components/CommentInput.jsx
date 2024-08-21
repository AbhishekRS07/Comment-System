import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { firestore, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button, Box, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

const CommentInput = ({ user }) => {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const quillRef = useRef(null);

  const applyFormat = (format) => {
    const quill = quillRef.current.getEditor();
    quill.focus();
    const range = quill.getSelection() || { index: 0, length: quill.getLength() };
    const currentFormat = quill.getFormat(range);
    quill.formatText(range.index, range.length, { [format]: !currentFormat[format] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim().length === 0) return;

    let fileUrl = null;
    if (file) {
      const fileRef = ref(storage, `comments/${user.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(fileRef);
    }

    try {
      await addDoc(collection(firestore, 'comments'), {
        text: comment,
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        createdAt: new Date(),
        reactions: {},
        fileUrl,
      });

      setComment('');
      setFile(null);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const modules = {
    toolbar: false // Disable the default toolbar
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="comment-input">
    <Box mb={1}>
      <IconButton onClick={() => applyFormat('bold')}><FormatBoldIcon /></IconButton>
      <IconButton onClick={() => applyFormat('italic')}><FormatItalicIcon /></IconButton>
      <IconButton onClick={() => applyFormat('underline')}><FormatUnderlinedIcon /></IconButton>
    </Box>
    <ReactQuill
      ref={quillRef}
      value={comment}
      onChange={setComment}
      modules={modules}
    />
    <Box mt={2}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: '10px' }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Post Comment
      </Button>
    </Box>
  </Box>
);
};

export default CommentInput;