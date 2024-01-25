// mock data for simple API
const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
  ];

  const getItems = (req, res) => {
    res.json(items);
  };

  // palauta vain se objekti, jonka id vastaa pyydettyä, muuten 404
  const getItemById =  (req, res) => {
    // console.log('requested item id', req.params.id);
    const itemFound = items.find(item => item.id == req.params.id);
    // console.log('found item', itemFound);
    if (itemFound) {
      res.json(itemFound);
    } else {
      res.status(404).json({error: 'not found'});
    }
  };


  const postItem = (req, res) => {
    // lisää postattu item items-taulukkoon
    console.log('postItem request body',req.body);
    // error if, jos nimi puuttuu
    if (!req.body.name) {
       return res.status(400).json({error: "item name missing"});
    };
    // uusi id, lisätään yksi viimeiseen id:seen
    const newID = items[items.length-1].id +1;
    const newItem = {id: newID, name: req.body.name};
    items.push(newItem);
    res.json(201)({message: 'item created'});
  };

  const deleteItem = (req, res) => {
    // implement delete item
    // tip: array.findIndex() ?
    const index = items.findIndex(item => item.id == req.params.id);
    if (index === -1) {
        return res.sendStatus(404);
    };
    const deletedItems = items.splice[index,1];
    console.log('deletedItems', deletedItems);
    res.json()({deleted_item: deletedItems[0]});
    //res.sendStatus(204);
  };

  const putItem = (req, res) => {
    // implement modify item
    const index = items.findIndex(item => item.id == req.params.id);
    //not found
    if (index === -1) {
        return res.sendStatus(404);
    };
    //bad request
    if (!req.body.name) {
        return res.status(400).json({error: "item name missing"});
     };

     items[index].name = req.body.name;
    res.json({updated_item: items[index]});
  };


  export {getItems, getItemById, postItem, deleteItem, putItem};
