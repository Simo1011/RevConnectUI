
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import UpdatePost from './components/UpdatePost';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/update/:postId" element={<UpdatePost />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
