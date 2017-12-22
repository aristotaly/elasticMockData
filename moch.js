const LOCAL_HOST = "192.168.1.24";
const PORT = "9200";
const BASE_START = 1513948538000;
const VARI = 3600000;
let BASE_END = BASE_START +3600000*2;
const TF = [true,false];
const NUMBER_OF_RECORDS = 10000;
const CREATE_AN_INDEX = true;
const INDEX_NAME = "testing3";
const INDEX_TYPE = "test";
const FLOWS = ["provide","chq",'portIn','replaceDevice']; 
const CREATE_MOCKDATA = true;
const ACCOUNT_NAME_ARR  = ['uscc','singtel','vfie','vivo']
const ON = true;


function startTimeRandomizer(){

    return Math.floor((Math.random() * BASE_START) )+ Math.floor((Math.random() * VARI) );
}

function endTimeRandomizer(){

    return Math.floor((Math.random() * BASE_END) )+ Math.floor((Math.random() * VARI) );
}
function flowRandomizer(){

    return Math.floor((Math.random() * FLOWS.length-1) ) ;
}
function accountRandomizer(){

    return Math.floor((Math.random() * ACCOUNT_NAME_ARR.length-1) ) ;
}
function sucsessRandomizer(){

    return TF[Math.floor((Math.random() * 1) )] ;
}

function createDatafordb(ID){
let dataObject = {}
dataObject.index = INDEX_NAME;
dataObject.type = INDEX_TYPE;
dataObject.id = ID;
dataObject.body = {};
let body = dataObject.body;
body.startdate = startTimeRandomizer();
body.accountname = accountRandomizer();
body.endDate = endTimeRandomizer();
body.duration = body.endDate - body.startdate;
body.flowname= flowRandomizer();
body.sucsess = sucsessRandomizer();
return dataObject;
}


function storeDBmockData(dataObject)
{
    for (var index = 0; index < NUMBER_OF_RECORDS; index++) {
        client.create(dataObject, function (error, response) {
       // ...
          });
        
    }

}


function createAnIndex(indexName, type, id, bodyObject) {
    client.indices.create(
        {
          index: INDEX_NAME,
          body: {
            mappings: {
                test : {
                properties: {
                    startdate: {
                        "type": "date" 
                      },
                    endDate: {
                        "type": "date" 
                      },
                    duration: {
                        "type": "number" 
                      },
                      
                    flowname: {
                        "type": "string" 
                      },
                    accountname: {
                        "type": "string" 
                      },
                    sucsess: {
                     "type": "boolean" 
                      }
                }
              }
            }
          }
        },
        function(err, resp, respcode) {
          console.log(err, resp, respcode);
        }
      );
}
getElasticAddress = function() {
  return LOCAL_HOST + ":" + PORT;
};

let elasticsearch = require("elasticsearch");
let client = new elasticsearch.Client({
  host: getElasticAddress(),
  log: "trace"
});



if(ON){
    
    if (CREATE_AN_INDEX) {
        createAnIndex(INDEX_NAME, INDEX_TYPE, 4, body); 
    }
    
    if(CREATE_MOCKDATA){


    }


}