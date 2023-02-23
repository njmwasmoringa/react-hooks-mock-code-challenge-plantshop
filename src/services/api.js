
export class Api{

  host="http://localhost:3001/";

  constructor( datapoint ){
    this.host += `${datapoint}`
    console.log(this.host);
  }

  get all(){
      return fetch(this.host).then(resp=>resp.json());
  }

  create( data ){
      return fetch(this.host, {
          method:"POST",
          body: JSON.stringify( data ),
          headers: {
              "Content-Type":"application/json"
          }
      }).then(resp=>resp.json());
  }

  update( id, data ){
      return fetch(`${this.host}/${id}`, {
          method:"PATCH",
          body: JSON.stringify( data ),
          headers: {
              "Content-Type":"application/json"
          }
      }).then(resp=>resp.json());
  }

  delete( id ){
      return fetch(`${this.host}/${id}`, {
          method:"DELETE"
      }).then(resp=>resp.json());
  }

}