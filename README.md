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
