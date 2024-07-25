
import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) =>{
  let newPostList = currPostList;
  if(action.type === 'DELETE_POST'){
    newPostList = currPostList.filter(post => post.id !== action.payload.postId)
  }
    return newPostList;
}

const PostListProvider = ({children}) => {
    const [postList, dispatchPostList] = useReducer(
      postListReducer,
      DEFAULT_POST_LIST
    );

    const addPost = (userId, postTitle, postBody, reactions, tags) => {};

    const deletePost = (postId) => {
      dispatchPostList({
        type:'DELETE_POST',
        payload:{
          postId,
        },
      });
    };

    return (<PostList.Provider value={{postList, addPost, deletePost}}> {children} </PostList.Provider>)
}

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi friends i am going to mumbai for vacations. Hope to enjoy a lot. Peace out.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "Mumbai", "Enjoying"],
  },
  {
    id: "2",
    title: "Pass Ho gye Bhai",
    body: "4 saal ki masti k bad v ho gye h pass. Hard to beleive",
    reactions: 15,
    userId: "user-12",
    tags: ["Graduating", "Unbelievable"],
  },
];

export default PostListProvider;