
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/list', controller.intro.intro.list);
  router.get('/api/mark',controller.intro.intro.mark);
  router.get('/api/markedList',controller.intro.intro.markedList);
  router.get('/rise', controller.intro.intro.index);
  router.get('/collection', controller.intro.intro.collection);
  router.get('/*', controller.intro.intro.index);
  router.get('/api/list', controller.intro.intro.list);
};


