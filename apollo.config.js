module.exports = {
    client:{
        
    },service: {
            name: "graphql-test",
            url: "http://localhost:5000/graphql"
        },
    requestOptions: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
}