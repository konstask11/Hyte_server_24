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


const getItemById = (req, res) => {
    const requstedId = parseInt(req.params.id);
    const itemFound = items.find((item) => item.id === requstedId);
        return itemFound == req.params.id;
};


const postItem = (req, res) => {
    res.json({message: 'item created'});
  }

const deleteItem = (req, res) => {
    res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
    res.json({message: 'put placeholder'});
};

export {getItems, getItemById, postItem, putItem, deleteItem};
