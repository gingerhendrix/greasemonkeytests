// A javascript library
//

function codeError(){
    //Throw an error
   error;
}

function thrownError(){
    throw new Error("message")
}

function customThrownError(){
  throw new TestError("message");
}

function TestError(msg){
  this.name = "TestError"
  this.message = msg;
}

TestError.prototype = new Error();