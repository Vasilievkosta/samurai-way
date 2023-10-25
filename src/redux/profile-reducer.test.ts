import profileReducer, {addPostAC} from './profile-reducer'

const initialResponseGetProfile = {
    userId: 2,
    lookingForAJob: true,
    lookingForAJobDescription: '',
    fullName: '',
    contacts: {
        github: '',
        vk: '',
        facebook: '',
        instagram: '',
        twitter: '',
        website: '',
        youtube: '',
        mainLink: '',
    },
    photos: {
        small: null,
        large: null,
    },
}

const state = {
		posts: [
        { id: '1', message: 'Hi! How are you?', like: 15 },
        { id: '2', message: 'Welcome!', like: 10 },
        { id: '3', message: 'Blabla', like: 11 },
    ],
    profile: initialResponseGetProfile,
    status: 'my status!',
	}

test('lenght of posts should be incremented', () => {

    const action = addPostAC('it-incubator.com')
	
	let newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(4)
})

test('message of new posts should be correct', () => {

    const action = addPostAC('it-incubator.com')
	
	let newState = profileReducer(state, action)

    expect(newState.posts[3].message).toBe('it-incubator.com')
})