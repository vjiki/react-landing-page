#### 1. Create React Frontent App

```
create-react-app client --template=typescript
npm install react-router-dom reactstrap
npm install --save-dev @types/react-router-dom
npm install firebase
npm install react-draft-wysiwyg draft-js-to-html html-to-draftjs
npm install --save-dev @types/react-draft-wysiwyg @types/draft-js-to-html @types/html-to-draftjs
npm install draft-js
```

#### 2. Create React Backend App

source point is: src/server.ts for the 'npm init'

```
npm init
tsc --init
npm install express mongoose
npm install --save-dev @types/express @types/mongoose
npm install firebase-admin
```

In package.json: build task is the following: "build": "rm -rf build && prettier --write src/ && tsc"

#### 3. Link for tilda

https://branding4u.tilda.ws/#rec466505815

#### 4. Link to bootstrap

https://startbootstrap.com/previews/clean-blog



_id 635c3e16a8a420e244f22b7e
fullName "Vasya Vasilich"
email "vasya@a.ru" 
passwordHash "$2b$10$W6PwgG5FgO08g65gJR7cLOztKm1vYthKiDpNuTzsraqhBVIWROfk6"
createdAt 2022-10-28T20:39:50.220+00:00
updatedAt 2022-10-28T20:39:50.220+00:00
__v
0

#### 5. Other links:

https://startbootstrap.com/theme/clean-blog

https://github.com/chatscope/chat-ui-kit-react

https://www.npmjs.com/package/@chatscope/chat-ui-kit-react

https://docs.linkpreview.net/#full-frontend-example

https://my.linkpreview.net/


https://www.npmjs.com/package/@dhaiwat10/react-link-preview




#### 6. TODO:
- move .map cycles to const variable: https://ru.reactjs.org/docs/lists-and-keys.html
- comments:  https://ru.reactjs.org/docs/components-and-props.html#extracting-components


#### 7. Curl:
curl -O <URL>
wget url


#### 8. Styling:
this worked fine for me. I included the hole Bulma framework using .use-bulma { @import "bulma"; } – 

