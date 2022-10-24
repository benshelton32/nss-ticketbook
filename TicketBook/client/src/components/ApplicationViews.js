import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    {/* <Route path="post" element={<PostList />} />
            <Route path='post/:postId' element={<PostDetail />} />
            <Route path='post/:postId/comments' element={<CommentList />} />
            <Route path="tag" element={<TagList />} />
            <Route path="tag/create" element={<TagCreate />} />
            <Route path="tag/edit/:tagId" element={<TagEdit />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="category/edit/:categoryId" element={<CategoryEdit />} />
            <Route path="userProfile" element={<UserProfileList />} />
            <Route
              path="userProfile/:firebaseUserId"
              element={<UserProfileDetailsList />}
            /> */}
                    {/* <Route path="UserProfile" element={<UserProfileDetailsList />} /> */}

                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
}