
# Contributing

1. Create your **branch**: ```git checkout -b my-new-feature```

2. **Commit** your changes: ```git commit -m 'Add some feature'```

3. **Push** to the branch: ```git push origin my-new-feature```

4. Send a **Pull Request**

5. **Enjoy!**

## Setup locally

* Clone or download the repo. into any fresh temporary folder.

    ``` git clone https://github.com/Ignitus/Ignitus-rest-api```

* Cd into that root folder you just cloned locally.

    ``` cd Ignitus-rest-api ```

* Open terminal in the current folder and to install all dependencies type.

    ``` npm install ```

* Now typing

    ``` npm start ```

* will start a server ! on http://localhost:3000

## Setup Via Docker

* Run ```docker-compose up```

Add the mongoURL in db.js and then recreate the docker image.
 
 * ```docker-compose up -d --force-recreate --build```

 ## Running locally via `start-dev` or `start` script and mLab

 * create `dev.js` in `/config`

```javascript
const username = '';

const password = '';

module.exports = {
  dbURI: `mongodb://${username}:${password}@dsxxxxxx.mlab.com:xxxx/name`,
};
 ```

 > You will need to create an mLab account, database for this project and a user within that database. After doing so, you will copy the database user creds and the database URI to `/config/dev.js`

 * In `/config/db.js`, uncomment lines 3 and 5 and comment line 7 so that it appears like this:

 ```javascript
 const dev = require('./dev');

mongoose.connect(dev.dbURI);

// mongoose.connect(process.env.DATABASE_URI);
 ```
 
 * Now you can run `start-dev` or `start` scripts and have it connect to your mLab instance

 > Note: `/config/dev.js` is gitignored so it will not bbe pushed. Regardless, please ensure you aren't exposing your personal credentials.
 
## Linting

 * ``` npm run lint ```	* ``` npm run lint ```
 
## Fix Lint Warnings

 * ``` npm run lint:fix ```
