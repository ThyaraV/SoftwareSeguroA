import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendationScreen = () => {
    const [recommendations, setRecommendations] = useState({ products: [], suppliers: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const { data } = await axios.get('/api/recommendations');
                setRecommendations(data);
            } catch (err) {
                setError('Error fetching recommendations: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    
    return (
        <div className="recommendation-container">
            <h1>Your Personalized Recommendations</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <div className="recommendation-section">
                        <h2>Products You Might Like</h2>
                        <div className="recommendation-grid">
                            {recommendations.products.map(product => (
                                <div key={product._id} className="recommendation-card">
                                    <img src={product.image} alt={product.name} className="recommendation-image" />
                                    <div className="recommendation-info">
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <p>Average Rating: {product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="recommendation-section">
                        <h2>Suppliers You Might Like</h2>
                        <div className="recommendation-grid">
                            {recommendations.suppliers.map(supplier => (
                                <div key={supplier._id} className="recommendation-card">
                                    <img src={supplier.image} alt={supplier.name} className="recommendation-image" />
                                    <div className="recommendation-info">
                                        <h3>{supplier.name}</h3>
                                        <p>{supplier.description}</p>
                                        <p>Rating: {supplier.ratings}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RecommendationScreen;