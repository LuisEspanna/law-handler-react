export const templateTitle = () => (
    {
        "id": new Date().getTime(),
        "tipo":"Titulo",
        "titulo": "## TÍTULO",
        "descripcion": "### Descripción",
        "capitulos" : [],
        "multimedia" : []
      }
);

export const templateChapter = () => (
    {
        "id": new Date().getTime(),
        "tipo":"Capitulo",
        "titulo":"### CAPÍTULO XX",
        "descripcion": "### DESCRIPCIÓN CAPÍTULO XX.",
        "articulos" : [],
        "multimedia" : [],    
        "keywords":[]
    }
);

export const templateArticle = () => (
    {
        "id": new Date().getTime()+"",
        "tipo":"Articulo",
        "titulo": "### NUEVO ARTÍCULO",
        "descripcion": "### Descripcion articulo ejemplo \n Puedes usar Markdown \n **Ejemplo:** ~~texto inexequible~~",
        "literales" : [],
        "paragrafos" : [],
        "multimedia" : [],
        "keywords":[]
    }
);

export const templateItem = (value) => (
    {
        "id":new Date().getTime(),
        "titulo" : value,
        "descripcion": "Ejemplo de descripción...",
        "notas":[],
        "keywords":[]
    }
);

export const templateMultimedia = () => (
    {
        "tipo": "imagen",
        "url" : "https://wallpapercave.com/wp/wp6476165.jpg"
    }
);

export async function postData(url = '', data = {}, ac) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      signal:ac?ac.signal:null,  
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export const searchByKeyword = (titles, search) => {
    var results = [];

    titles.map(title => {
        var foundTitle = false;

        //Titulos
        if(title.keywords)
        title.keywords.map(keyword => {            
            if(keyword.toLowerCase() === search.toLowerCase()){
                foundTitle = true;
            }
            return keyword;
        });

        //Titulos
        if(foundTitle)results.push({title, data: title});
        else if(customSearch(title.descripcion, search)){
            results.push({title, data: title});
        }

        //Capitulos
        if(title.capitulos)
        title.capitulos.map(capitulo => { 
            var foundChapter = false;
            if(capitulo.keywords)
            capitulo.keywords.map(keyword => {            
                if(keyword.toLowerCase() === search.toLowerCase()){
                    foundChapter = true;
                }
                return keyword;
            });
            
            //Capitulos
            if(foundChapter)results.push({title, data: capitulo});
            else if(customSearch(capitulo.descripcion, search)){
                results.push({title, data: capitulo});
            }

            //Articulos
            if(capitulo.articulos)
            capitulo.articulos.map(articulo => { 
                var foundArticle = false;
                if(articulo.keywords)
                articulo.keywords.map(keyword => {            
                    if(keyword.toLowerCase() === search.toLowerCase()){
                        foundArticle = true;
                    }
                    return keyword;
                });
                
                //Articulos
                if(foundArticle)results.push({title, data: articulo});
                else if(customSearch(articulo.descripcion, search)){
                    results.push({title, data: articulo});
                }

                return articulo;
            });

            return capitulo;
        });
        return title;
    });
    return results;
}



function customSearch(origin, searchText){
    let coincidence = 0;    

    if(origin.indexOf(searchText)>0){
        //console.log("Simple search: " + origin.indexOf(searchText));
        return true;
    }
    else{
        origin.split(" ").map(wordOrigin =>{
            searchText.split(" ").map(wordSearch =>{
                if(wordOrigin.toLowerCase() === wordSearch.toLowerCase() && wordSearch.length>4)
                    coincidence += 1;
                return wordSearch;
            }); 
            return wordOrigin;
        });
        
        if(coincidence >0){
            //console.log("Custom search: " + (coincidence));
            return true;
        }else{
            //console.log("No results");
            return false;
        }
    }
}


