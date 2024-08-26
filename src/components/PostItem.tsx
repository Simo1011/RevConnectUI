// src/components/PostItem.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, ButtonGroup } from 'react-bootstrap';

interface PostItemProps {
    post: {
        id: number;
        title: string;
        content: string;
    };
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        const userId = 1; // Replace with actual user ID
        axios
            .delete(`http://localhost:8080/api/posts/user/${userId}/post/${post.id}`)
            .then(() => {
                alert('Post deleted successfully');
                window.location.reload(); // Reload to reflect changes
            })
            .catch(error => console.error('There was an error deleting the post!', error));
    };

    const handleUpdate = () => {
        navigate(`/update/${post.id}`);
    };

    return (
        <ButtonGroup>
            <Button variant="primary" onClick={handleUpdate}>
                <i className="bi bi-pencil-square me-2"></i> {/* Icon for Update */}
                Update
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                <i className="bi bi-trash-fill me-2"></i> {/* Icon for Delete */}
                Delete
            </Button>
        </ButtonGroup>
    );
};

export default PostItem;
