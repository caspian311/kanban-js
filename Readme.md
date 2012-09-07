## Kanban-JS

### install js pre-requisites
```$ sudo apt-get install -y nodejs npm mongodb```

### install npm dependencies
```$ npm install```


### make sure that the database has been started
```$ mongod```

### run tests
```$ make tests```

### start server
```$ node app.js```

### open browser to site
```$ google-chrome http://localhost:1337```

All UATs are run from cucumber which means that you'll need all appropriate ruby, cucumber, mongo drivers installed to run them.

### install cucumber pre-requisites
```$ bundle install```

### run UATs... server must be running
```$ make cukes```

