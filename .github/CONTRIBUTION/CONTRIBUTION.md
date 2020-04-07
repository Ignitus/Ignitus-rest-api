
### Contributing.

1. Create your **branch**: ```git checkout -b my-new-feature```

2. **Commit** your changes: ```git commit -m 'Add some feature'```

3. **Push** to the branch: ```git push origin my-new-feature```

4. Send a **Pull Request**

5. **Enjoy!**

### Setup locally.

1. Fork the repository.
    ```https://github.com/Ignitus/Ignitus-rest-api```

2. Clone the repository.

    ``` git clone https://github.com/Ignitus/Ignitus-rest-api```

3. Navigate into cloned repository.

    ``` cd Ignitus-rest-api ```

4. Open terminal execute following commands.

    ``` npm install && npm run start-dev ```

5. Navigate to http://localhost:3000


### Setup Via Docker.

* Run ```docker-compose up```

Add the mongoURL in db.js and then recreate the docker image.
 
 * ```docker-compose up -d --force-recreate --build```


 ### Database Setup.

This is our .env config file.

```js
module.exports = {
  secretKey: '', /* In dev. replace with any secret key that you have in find. */
  mongoUrl: '', /* You can either run the mongoDB cluster locally or create an mlab account. */
  hashingType: 'md5', /* In dev. you can use md5 hashing. */
  hashingDigest: 'hex', /* In dev. you can use hex as a digest. */
  
  /* If you will comment out his line you won't need below-mentioned keys https://github.com/Ignitus/Ignitus-rest-api/blob/master/index.js#L21 */
  
  privateVapidEmail: '',  
  publicVapidKey: '',
  privateVapidKey: ',
};

```

As mentioned to setup mongoDB you can either run the mongoDB cluster locally or use mlab, I found this blog post helpful to set it up. https://medium.com/@umarmagaji/connecting-mongodb-using-mlab-with-node-js-application-fd3de5b94a7a 

Since, mLab is now a part of MongoDB, follow the below given steps to configure cloud-hosted MongoDB server:
1. Navigate to https://www.mongodb.com/atlas-signup-from-mlab?utm_source=mlab.com&utm_medium=referral&utm_campaign=mlab%20signup&utm_content=blue%20sign%20up%20button and sign up.
2. Select Shared Clusters and create a Cluster.
3. Click on Connect and add your IP address, username and password for the Cluster.
4. Select Connect your Application.
5. Add the URL mongodb+srv://username:<password>@cluster.mongodb.net/test?retryWrites=true&w=majority to 
```api/Configuration/config.js```

Moreover, We are also using redis as a caching database to enhance performance.
Fortunately, No configuration is needed other than to start Redis locally.
 
### Tools.

A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

 ``` npm run lint ```
 
 ``` npm run lint:fix ```


