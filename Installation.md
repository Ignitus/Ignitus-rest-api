## Setup locally

* Fork the repo ```https://github.com/Ignitus/Ignitus-rest-api```

* Clone or download the repo. into any fresh temporary folder.

    ``` git clone https://github.com/<github-Username>/Ignitus-rest-api```

* Cd into that root folder you just cloned locally.

    ``` cd Ignitus-rest-api ```

* Open terminal in the current folder and to install all dependencies type.

    ``` npm install ```

* Generate **PRIVATE_VAPID_KEY** and **PUBLIC_VAPID_KEY** using terminal
	
	```./node_modules/.bin/web-push generate-vapid-keys```

* Copy the keys and save into .env file in root of project

	PUBLIC_VAPID_KEY=<Public Key>
	PRIVATE_VAPID_KEY=<Private Key>

Before Starting Server, we should connect our MongoDB and save in .env file

	DATABASE_URI=mongodb://[username:password@]host[:port][/[database]

* Now typing

    ``` npm start ```

* will start a server ! on http://localhost:3000

## Setup Via Docker

* Run ```docker-compose up```

Add the mongoURL in db.js and then recreate the docker image.
 
 * ```docker-compose up -d --force-recreate --build```

## Linting

 * ``` npm run lint ```	* ``` npm run lint ```
 
## Fix Lint Warnings

 * ``` npm run lint:fix ```

 ## Redis

 * Redis is implemented a caching database to enhance performance.  No configuration is needed other than to start Redis locally.