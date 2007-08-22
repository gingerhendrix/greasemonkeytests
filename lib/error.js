// A javascript library
//

function codeError(){
    //Throw an error
   error;
}

function normalError(){
    throw new Error("Standard Error")
}

function customError(){
  throw new TestError("Custom Error");
}

function TestError(msg){
  this.name = "TestError"
  this.message = msg;
  
}