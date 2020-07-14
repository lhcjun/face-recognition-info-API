# face-recognition-info-API
### See Frontend Code
&emsp;&emsp;[face-recognition-info](https://github.com/lhcjun/face-recognition-info)

### How to use - with Docker 
---
1. Make sure that docker is installed and running on the computer
2. ```git clone```
3. ```npm install```
4. Add Clarifai API key to the *controllers/image.js* file
5. For the first setup phase
    ```
    docker-compose up --build
    
    docker-compose up               // if already finished build phase
    ```


### Overview
---
<p>This is the backend of the Face Recognition Info App.<br>
The app lets you detect multiple faces at once, and gets the info such as age, gender, cultural of all the faces.</p>

Created with:
- Docker
- JWT authentication
- Redis
- PostgreSQL
<p>... and more 😃!</p>

<p>ps. Since creditcard is required for adding heroku-redis add-ons in production, <br>
    &emsp; the production link here only shows the part without jwt😱. </p>


### For 413 Payload too large error
---
Adjust 100kb to 10000kb in both files<p>
* *node_modules/body-parser/lib/types/json.js*
```js
function json(options) {
    var limit = typeof opts.limit !== 'number' ?
        bytes.parse(opts.limit || '10000kb') :
        opts.limit
}
```
* *node_modules/body-parser/lib/types/text.js*
```js
function text(options) {
    var limit = typeof opts.limit !== 'number' ?
        bytes.parse(opts.limit || '10000kb') :
        opts.limit
}        
```
