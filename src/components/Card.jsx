import React, { useState } from 'react';
import ReactStars from 'react-stars';

const Card = ({ movie }) => {
    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [reviews, setReviews] = useState(movie.reviews);
    const [userName, setUserName] = useState('');

    const handleReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleRatingChange = (e) => {
        setNewRating(Number(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReviewObj = {
            user: userName || 'anonymous',
            review: newReview,
            rating: newRating,
        };

        setReviews((prevReviews) => [...prevReviews, newReviewObj]);
        setNewReview('');
        setNewRating(5);
        setUserName('');
    };

    const avgRating =
        reviews.length > 0
            ? (
                reviews.reduce((sum, review) => sum + review.rating, 0) /
                reviews.length
            ).toFixed(1)
            : 'No ratings yet';

    return (
        <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'center' }}>
            {/* Movie Image */}
            <img src={movie.imgSrc} alt={movie.title} width="150" height="250" style={{ marginRight: '20px' }} />

            {/* Movie Details and Review Section */}
            <div style={{ maxWidth: '600px' }}>
                <h2>{movie.title} ({movie.year})</h2>
                <p>{movie.synopsis}</p>
                <p>Genres: {movie.categories.join(', ')}</p>
                <p>Rating:
                    <ReactStars
                        count={5}
                        value={parseFloat(avgRating)}
                        size={24}
                        edit={false}
                    />
                </p>

                {/* Review Form */}
                <div style={{ marginTop: '50px' }}>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Rating:
                            <ReactStars
                                count={5}
                                value={newRating}
                                onChange={setNewRating}
                                size={24} 
                            />
                        </label>
                        <br />
                        <label>
                            Review:
                            <textarea
                                value={newReview}
                                onChange={handleReviewChange}
                                placeholder="Write a review"
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Your Name:
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>
                        <br />
                        <button type="submit">Submit Review</button>
                    </form>

                    {/* Display Submitted Reviews in a Scrollable Box */}
                    <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
                        <h3>Reviews:</h3>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} style={{ marginBottom: '15px' }}>
                                    <div>
                                        <strong>{review.user}</strong> rated it:
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={18}
                                            edit={false} 
                                        />
                                    </div>
                                    <p>{review.review}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
