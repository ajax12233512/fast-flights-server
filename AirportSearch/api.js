import axios from "axios";



export const search = async (input) => {
    let data = [];
    const options = {
        method: 'GET',
        url: `https://greatcirclemapper.p.rapidapi.com/airports/search/${input}`,
        headers: {
          'X-RapidAPI-Host': 'greatcirclemapper.p.rapidapi.com',
          'X-RapidAPI-Key': '2bcab9ead3msh0012ca30e3965cdp19bdc2jsn9ec5386c7f85'
        }
      };

    
    await axios.request(options).then(function (response) {
        for(let i = 0; i < 15; i++){
            data.push(response.data[i]);
            if(i === 14){
                return data;
            }

        }
    // console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    return data;
}