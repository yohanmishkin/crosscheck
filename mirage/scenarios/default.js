export default function(server) {

	server.createList('disaster', 6);
  var disaster = server.create('disaster', { name: 'Hurricane Daniel'});
  server.createList('workSite', 3, { disaster });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
