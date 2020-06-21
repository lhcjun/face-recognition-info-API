## face-recognition-info-API

### For 413 Payload too large error
---
node_modules/body-parser/lib/types/json.js
```
function json(options) {
    var limit = typeof opts.limit !== 'number' ?
        bytes.parse(opts.limit || '10000kb') :
        opts.limit
}
```
adjust 100kb to 10000kb<p>

node_modules/body-parser/lib/types/text.js
```
function text(options) {
    var limit = typeof opts.limit !== 'number' ?
        bytes.parse(opts.limit || '10000kb') :
        opts.limit
}        
```
adjust 100kb to 10000kb<p>

### Docker 
---
```
docker-compose up --build
```