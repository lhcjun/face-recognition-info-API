# face-recognition-info-API

### Docker 
---
1. Make sure that docker is installed and running on the computer
2. ```git clone```
3. ```npm install```
4. For the first setup phase
    ```
    docker-compose up --build
    
    docker-compose up            // if not first time setting up
    ```
5. Add Clarifai API key in the controllers/image.js file
    
### For 413 Payload too large error
---
Adjust 100kb to 10000kb in both files<p>
* node_modules/body-parser/lib/types/json.js
```
function json(options) {
    var limit = typeof opts.limit !== 'number' ?
        bytes.parse(opts.limit || '10000kb') :
        opts.limit
}
```
* node_modules/body-parser/lib/types/text.js
```
function text(options) {
    var limit = typeof opts.limit !== 'number' ?
        bytes.parse(opts.limit || '10000kb') :
        opts.limit
}        
```
