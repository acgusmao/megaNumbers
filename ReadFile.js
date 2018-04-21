var fs = require('fs');
//var wrFile = require('./writeToFile.js');

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('C:/Alexsandro/Projetos/megaNumbers/D_MEGA.HTM')
});


var linhas = [];
var abriu = false;

lineReader.on('line', function (line) {

    if (line.indexOf("<tr") > -1) {
        abriu = true;
    } else if (line.indexOf("</tr>") > -1) {
        abriu = false;
    }

    if (abriu) {
        if (line.indexOf("<td rowspan=") > -1) {
            var value = "";
            var start = line.indexOf(">") + 1;
            var end = line.indexOf("</td>");
            var len = end - start;

            value = line.substr((start), len);
            if (linhas.length > 0) {
                linhas = linhas + ";" + value;
            } else {
                linhas = value;
            }
        }
    } else if (line.indexOf("</tr>") > -1) {

        if (linhas.length > 0) {
            sorteios[h++] = linhas;
            linhas = "";
        }
    }
});


lineReader.on('close', function (line) {
    var dataToWrite = [];

    for (var i = 0; i < sorteios.length; i++) {
        dataToWrite[i] = sorteios[i].split(";").slice(0, 8).join();
        console.log(dataToWrite[i])
    }

    /************   CODIGO FUNCIONANDO   ***************************************** */
    //Create example table
    //sqlite3.run("CREATE TABLE SORTEIOS(CONCURSO INTEGER PRIMARY KEY, DATA DATE NOT NULL, D1 INTEGER NOT NULL, D2 INTEGER NOT NULL, D3 INTEGER NOT NULL, D4 INTEGER NOT NULL, D5 INTEGER NOT NULL, D6 INTEGER NOT NULL);");
    //dbEstatisticas.run("CREATE TABLE ESTATISTICAS(CONCURSO INTEGER PRIMARY KEY, DATA DATE NOT NULL, SOMA_DEZENAS INTEGER NOT NULL);");
    /************   FIM CODIGO FUNCIONANDO   ***************************************** */
    /*insertSorteiosDB(dataToWrite);
    sleep.sleep(25);*/
    readAll();

    //findConcurso(4,5,30,33,41,52);
});