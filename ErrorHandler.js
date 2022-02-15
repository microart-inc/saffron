export default class ErrorHandler {

    static handleThrownError(error, source){
        console.error(`%cMicroart Saffron Runtime %c[${source}]%c\nError: ${error.message}`,
        "color: lightgreen;",
        "color: cyan;",
        "color: unset;");
    }
}