module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'crosscheck',
      key: process.env.PAGEFRONT_KEY
    },
    
  };
};
