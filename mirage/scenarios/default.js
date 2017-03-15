export default function(server) {

  let volunteers = server.createList('volunteer', 2);
	server.createList('disaster', 1);
  let  disaster = server.create('disaster', { name: 'Hurricane Daniel', slug: 'hurricane-daniel' });
  server.createList('site', 3, { disaster, volunteers });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
