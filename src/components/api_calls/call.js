const user = [
    {plaats:1,naam:"Daniil Samsonov",score:300},
    {plaats:2,naam:"Dirk Hostens",score:250},
    {plaats:3,naam:"Joshua Madd",score:245},
    {plaats:4,naam:"Tom Dhoine",score:230},
    {plaats:5,naam:"Thijs Geeraert",score:200},
    {plaats:6,naam:"Cedric Depré",score:186},
    {plaats:7,naam:"Abdu Tchop",score:162},
    {plaats:8,naam:"Robin Vandenbroucke",score:143},
    {plaats:9,naam:"Noah Van Steenlandt",score:127},
    {plaats:10,naam:"Justas Valutis",score:109},
    {plaats:11,naam:"Mateo Gheeraert",score:96}
  ];
  
  const userJson = JSON.stringify(user, null, 2);
  
  //get all users
  const getUsers = async() => {
    // Return the userJson string as the response
    //console.log(userJson);
    return userJson;
    
  }
  
  export default getUsers;