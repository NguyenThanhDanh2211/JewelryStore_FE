import { useState, useEffect, useContext } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { getComments, postComment } from '~/services/cmtService';
import StarRating from './StarRating';
import { AuthContext } from '~/contexts/AuthContext';

function Comment({ productId, name }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const { isAuthenticated } = useContext(AuthContext);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(productId);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };
    fetchComments();
  }, [productId]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handlePostComment = async () => {
    if (!isAuthenticated) {
      alert('Please log in to post a review.');
      return;
    }

    if (!newComment.trim() || rating === 0) {
      setErrorMessage('Please add a comment and a rating.');
      setAlertOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const commentData = { content: newComment, rating };
      const res = await postComment(productId, commentData, token);

      setComments([...comments, res.cmt]);
      setNewComment('');
      setRating(0);
      setTabIndex(0);
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Grid container spacing={2} ml="-50px">
      {errorMessage && (
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseAlert} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <Grid item xs={2}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          orientation="vertical"
          sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#db9662',
            },
          }}
        >
          <Tab
            disableRipple
            label={
              <Typography
                variant="text"
                sx={{
                  color: tabIndex === 0 ? '#db9662' : 'rgb(154, 154, 154)',
                }}
              >
                Reviews
              </Typography>
            }
          />
          <Tab
            disableRipple
            label={
              <Typography
                variant="text"
                sx={{
                  color: tabIndex === 1 ? '#db9662' : 'rgb(154, 154, 154)',
                }}
              >
                Post review
              </Typography>
            }
          />
        </Tabs>
      </Grid>

      <Grid item xs={9}>
        {tabIndex === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {comments.length > 0 ? (
              <Grid container spacing={2}>
                {comments.map((comment) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={comment._id}
                    className="review-item"
                  >
                    <Typography variant="text" sx={{ fontWeight: 'bold' }}>
                      {comment.userId.name} -{' '}
                      {new Date(comment.createAt).toLocaleDateString()}
                    </Typography>
                    <StarRating rating={comment.rating} />
                    <Typography variant="text">{comment.content}</Typography>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="text">No reviews yet.</Typography>
            )}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            {isAuthenticated ? (
              <>
                <Typography variant="text2">
                  Share your experience with "{name}" by leaving a review below.
                </Typography>
                <Box display="flex" flexDirection="row" mt={1}>
                  <Typography
                    variant="text2"
                    sx={{ marginRight: '8px', fontWeight: 'bold' }}
                  >
                    Your rating*
                  </Typography>
                  <Box sx={{ display: 'flex', marginBottom: '10px' }}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span
                        key={index}
                        onClick={() => handleStarClick(index + 1)}
                        className="rating-star"
                        data-value={index + 1}
                      >
                        {index < rating ? (
                          <StarIcon
                            style={{ color: '#FFD700', cursor: 'pointer' }}
                          />
                        ) : (
                          <StarBorderIcon
                            style={{ color: '#FFD700', cursor: 'pointer' }}
                          />
                        )}
                      </span>
                    ))}
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="text2"
                      sx={{ marginRight: '8px', fontWeight: 'bold' }}
                    >
                      Your Review*
                    </Typography>
                    <TextField
                      id="review-input"
                      multiline
                      rows={4}
                      fullWidth
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      sx={{ marginBottom: '16px' }}
                    />
                  </Grid>
                </Grid>

                <Button
                  id="submit-review-button"
                  variant="single"
                  onClick={handlePostComment}
                >
                  Post Review
                </Button>
              </>
            ) : (
              <Typography variant="text">
                Please log in to post a review.
              </Typography>
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default Comment;
