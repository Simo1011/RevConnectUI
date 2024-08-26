// src/components/PostList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';

interface Post {
    id: number;
    title: string;
    content: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('There was an error fetching the posts!', error));
    }, []);

    return (
        <Container className="my-4">
            <h2 className="mb-4 text-center">Posts</h2>
            <ListGroup>
                {posts.map(post => (
                    <ListGroup.Item key={post.id} className="mb-2">
                        <Row className="align-items-center">
                            <Col md={8}>
                                <h5>{post.title}</h5>
                                <p>{post.content}</p>
                            </Col>
                            <Col md={4} className="text-end">
                                <PostItem post={post} />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default PostList;
