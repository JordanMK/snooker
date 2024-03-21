const user = [
    {plaats:1,naam:"Daniil Samsonov",score:300},
    {plaats:2,naam:"Dirk Hostens",score:250},
    {plaats:3,naam:"Mylan Vandecaveye",score:249},
    {plaats:4,naam:"Joshua Madd",score:245},
    {plaats:5,naam:"Tom Dhoine",score:230},
    {plaats:6,naam:"Thijs Geeraert",score:200},
    {plaats:7,naam:"Cedric Depré",score:186},
    {plaats:8,naam:"Abdu Tchop",score:162},
    {plaats:9,naam:"Robin Vandenbroucke",score:143},
    {plaats:10,naam:"Noah Van Steenlandt",score:127},
    {plaats:11,naam:"Justas Valutis",score:109},
    {plaats:12,naam:"Mateo Gheeraert",score:96},
    {plaats:13,naam:"Tim Mortier",score:82},
    {plaats:14,naam:"Niels Destadsbader",score:75},
    {plaats:15,naam:"Hilde Crevits",score:64},
    {plaats:16,naam:"Yana Depré",score:53},
    {plaats:17,naam:"Jos Pannecoeck",score:51},
    {plaats:18,naam:"Anouk Vantoogh",score:46},
    {plaats:19,naam:"Kelly verbier",score:35},
    {plaats:20,naam:"Timothy Decoster",score:21}
  ];
  
  const userJson = JSON.stringify(user, null, 2);
  
  //get all users
  const getUsers = async() => {
    // Return the userJson string as the response
    //console.log(userJson);
    return userJson;
    
  }
  
  export default getUsers;