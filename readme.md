# Create template to Frond-end:


Simple template:
using **GULP**

## Use Backend to learn Front-end (python)
A REST sparring to learn and test front-end technologies by making HTTP requests.
SparREST works as a SimpleHTTPServer serving your static files in the working directory, and it also works as an API Rest that stores any data you send to it just by using 
    
    /api/<resource> 

at the begining of your URL.

### Usage
When you upload a file, the file will be accessible from path 
    
    /uploads/
    
 ### Config gulp sparREST:
 Add to default process in:  [gulpfile.js](gulpfile.js)
 
 using : [gulp-run](https://www.npmjs.com/package/gulp-run)
 ```javascript
    let run = require('gulp-run');
    gulp.task('run-server-python', function () {
        return run('python server.py').exec();
    });
 ```


 ### `SparREST` 
 - [more info SparREST](https://github.com/kasappeal/sparrest)

