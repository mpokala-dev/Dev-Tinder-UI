# DevTinder

- Create Vite + React project with the name DevTinder-UI
  <code> npm create vite@latest DevTinder-UI -- --template react </code>
- Remove redundant code and commit the basic scaffold of the DevTinder UI project
- Initialise git repo
  <code> git init </code>
- Create a git repo with the name Dev-Tinder-UI
- Commit the file changes as an initial commit.
  <pre><code>
    git add .
    git commit -m "initial commit | remove redundant code and files"
    git branch -M main
    git remote add origin https://github.com/mpokala-dev/Dev-Tinder-UI.git  
    git push -u origin main
  </code></pre>
- install Tailwind CSS
    <pre><code>
        npm install tailwindcss @tailwindcss/vite <!-- follow the steps from tailwindcss.com docs -->
    </code></pre>
- Install daisyUI - component library
    <pre><code>
        npm i -D daisyui@latest <!-- follow the steps from daisyui.com docs -->
    </code></pre>
- In VS Code install:

Tailwind CSS IntelliSense by Tailwind Labs

This removes many false warnings and gives autocomplete for DaisyUI classes.

- Add Navbar to App.jsx

---

- Seperate Navbar as a component and import Navbar to App.jsx
- Install react router dom
- create BrowserRouter > Routes > Route=/ Body {<Outlet/>}> children Route
- Add Navbar into Body Component to give a fixed Navbar on any path
- Add Outlet to Body Component for children
- Create Footer component

---

- Create Login Page
- Install axios for making API calls
    <pre><code>npm i axios</code></pre>
- CORS - install cors in backend ==> add middleware to App.js with configurations: origin, credentials: true
- Whenever making API call to pass cookies with axios => {withCredentials: true}
- Install Redux Tollkit + react-redux <!-- go though the documentation https://redux-toolkit.js.org/tutorials/quick-start>
    <pre><code>npm install @reduxjs/toolkit react-redux</code></pre>
- Create store
    <pre> => configureStore({
                reducer: {
                    <i>user</i>: <b>userReducer</b> <!-- import userReducer from ".path/<b>userSlice</b>" <i>user</i> is the state slice which is used in useSelector ==> useSelector((state) => state.user) -->
                }
    })
            Provider
            const <b>userSlice</b> = createSlice({
                name:"userstore",<!-- userstore is the name that will be used to extract or subscribe to this particular slice in the store >
                initialState: null,
                reducers: {
                    action1: (state, action)=> {
                        return action.payload;
                    };
                    action2: ...;
                    .
                    .
                    .
                }
            })
            export const {action1, action2, . . . } = <b>userSlice</b>.actions
            export default <b>userSlice</b>.reducer
     </pre>

- Add redux devtools
- Login and see if the logged in data is stored to the redux store
- Navbar should dynamically populated the details as soon as user logs in
- Refactor the folders structure
- use contants.js for URL in APIs
- Use useNavigate() to navigate to feed page once user logs in successfully

---

- If the token is not present redirect the user to /login page
    <pre>Unless the user is logged in do not allow redirect to any page(if not authenticated redirect to login page only)</pre>
- On page refresh or on reload of the application, if the user is logged in once restore the user data in redux store so that user need not login again and again unless the token is expired or user logs out
- <Link to="/profile"/> for profile
- <Link to="/" /> on click of DevTinder
- Logout functionality on Navbar Profile option

---

- build user card on feed page
- clear the feed slice on logout and login
- add { replace: true } option to navigate to replace the current entry in the history stack of navigation instead of adding a new one
<!-- need to handle corner case - if user A logs in and hits /login in the url, and logs in user B => User B feed is shown but on click of navigation arrows of the browser, user A feed is displayed and Navbar profile is also pulling the data of user A -->
- Handled the corner case - root cause if user is already logged in do not allow the user to login page -> redirect to Feed page
- Corrected user data fetching from useSelector for user - updated from useSelector((state)=> {state.user}) to useSelector((state)=> state.user)

---

- Create Profile page where user can update and view his card details.
- Intigrate Toaster to populate success or failure message

---

- Create Connections Page <!-- list out all friends -->
- Create Connection Requests Page <!-- view all friend requests received -->
- Implement request review API calls on Accept and Reject
