import request from 'superagent';

function finish(resolve, reject) {
  return (err, res) => {
    var error = err || res.ErrorMessage;
    if(error) {
      reject(error);
      return;
    }
    resolve(res.body);
  };
}

const Api = {
  getLists() {
    return new Promise((resolve, reject) => {
      request.get('/api/lists')
        .set('Accept', 'application/json')
        .end(finish(resolve, reject));
    });
  },
  createList(title) {
    return new Promise((resolve, reject) => {
      request.post('/api/lists')
        .set('Accept', 'application/json')
        .send({title})
        .end(finish(resolve, reject));
    });
  },
  updateListEntry(listIndex, entryIndex, entry) {
    return new Promise((resolve, reject) => {
      request.post(`/api/lists/${listIndex}/${entryIndex}`)
        .set('Accept', 'application/json')
        .send(entry)
        .end(finish(resolve, reject));
    });
  }
};

export default Api;
