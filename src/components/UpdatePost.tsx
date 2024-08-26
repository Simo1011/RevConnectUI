// src/components/UpdatePost.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';

interface Post {
    title: string;
    content: string;
}

const UpdatePost: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<Post>({ title: '', content: '' });
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/posts/${postId}`)
            .then(response => {
                setPost(response.data);
                setNewTitle(response.data.title);
                setNewContent(response.data.content);
            })
            .catch(error => console.error('There was an error fetching the post!', error));
    }, [postId]);

    const handleUpdate = () => {
        const userId = 1; // Replace with actual user ID
        const url = `http://localhost:8080/api/posts/user/${userId}/post/${postId}/update?newTitle=${encodeURIComponent(
            newTitle
        )}&newContent=${encodeURIComponent(newContent)}`;

        axios
            .put(url)
            .then(() => {
                alert('Post updated successfully');
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error updating the post!', error);
                setError('Failed to update post. Please try again.');
            });
    };

    return (
        <Container className="my-4">
            <Card>
                <Card.Header>Update Post</Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={e => { e.preventDefault(); handleUpdate(); }}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new title"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter new content"
                                value={newContent}
                                onChange={e => setNewContent(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            <i className="bi bi-save me-2"></i> {/* Icon for Save */}
                            Update Post
                        </Button>
                        <Button variant="secondary" className="ms-2" onClick={() => navigate('/')}>
                            <i className="bi bi-x-circle me-2"></i> {/* Icon for Cancel */}
                            Cancel
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UpdatePost;
