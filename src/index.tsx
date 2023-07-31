import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { state } from 'redux/state';
import { addPost, updateNewPostText, subscribe } from 'redux/state';

export let rerenderEntireTree = () => {
	console.log('render')
	ReactDOM.render(
		<App data={state.posts}
			newPostText={state.newPostText}
			dialogs={state.dialogs}
			messages={state.messages}
			addPost={addPost}
			updateNewPostText={updateNewPostText}
		/>,
		document.getElementById('root')
	);
}

rerenderEntireTree();

subscribe(rerenderEntireTree)