# wowDB-API
Web API for wowDB. Only consists of GET requests as all inserts are handled via python script.

Route | Description
------|------------
/item_list | Gets a list of items containing an item ID and item name.
/item_list/name/:id | Gets the item name described by item ID
/item_list/image/:id | Gets the item picture described by item ID
/wowdb/:realm/:id | Gets a list of historical stats of item described by ID within the specified realm.

## Dependencies
```
cors
dotenv
express
pg
```

## Development Dependencies for testing
```
chai
chai-http
mocha
```

## Scripts
Script | Description
-------|------------
npm start | Start server (default port: 3000)
npm test | Run testing suite
npm run doc | Creates documentation using JSDoc in docs folder