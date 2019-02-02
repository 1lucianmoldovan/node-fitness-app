# Configure Node and runn

## Steps to configure

```
npm install express-generator -g
express --view=hbs node-fitness-app
cd node-agenda-app
npm install --save-dev nodemon
npm install cors --save
npm install
```
### Enable nodemon
Edit **package.json** and add next lines:
```
"scripts": {
    "start": "node ./bin/www",
    "devstart": "nodemon ./bin/www"
}
```

## Running the app

simple run (no auto refresh when server files are changed)
```
npm start
```
or dev mode (useful when working on server side)
```
SET DEBUG=node-fitness-app:* & npm run devstart
```
or simple (also on dev mode)
```
nodemon
```
