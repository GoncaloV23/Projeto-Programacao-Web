const jobs = [{
    company:"Google",
    area:"Programação",
    description:"Desenvolvimento de software",
    duration:4,
    value:9500,
    expirationDate:"11/1/2022"
}, {
    company:"Apple",
    area:"Base de dados",
    description:"Gestão de Dados",
    duration:5,
    value:8500,
    expirationDate:"11/2/2022"
}, {
    company:"Microsoft",
    area:"Gestão de Sistema",
    description:"Manter e assegurar a boa utilização do sistema",
    duration:2,
    value:6500,
    expirationDate:"11/3/2022"
}, {
    company:"Amazon",
    area:"Base de dados",
    description:"Gestão de Dados",
    duration:3,
    value:5500,
    expirationDate:"11/4/2022"
}, {
    company:"Google",
    area:"Programação",
    description:"Desenvolvimento de software",
    duration:5,
    value:8500,
    expirationDate:"11/5/2022"
},{
    company:"Google",
    area:"Base de dados",
    description:"Gestão de Dados",
    duration:3,
    value:5500,
    expirationDate:"11/6/2022"
}, {
    company:"Apple",
    area:"Programação",
    description:"Desenvolvimento de software",
    duration:5,
    value:8500,
    expirationDate:"11/7/2022"
}, {
    company:"Microsoft",
    area:"Gestão de Sistema",
    description:"Manter e assegurar a boa utilização do sistema",
    duration:2,
    value:6500,
    expirationDate:"11/8/2022"
}, {
    company:"Amazon",
    area:"Programação",
    description:"Desenvolvimento de software",
    duration:3,
    value:5500,
    expirationDate:"11/9/2022"
}, {
    company:"Google",
    area:"Programação",
    description:"Desenvolvimento de software",
    duration:3,
    value:5500,
    expirationDate:"11/10/2022"
}];

function init(){
    let selection = document.getElementById("typeSelect");
    console.dir(selection);
    if(selection)selection.addEventListener("change",userCreateonTypeEnventHandler);

    let localJobs = [...jobs];
    loadTableRowsInPage(jobs);
    
    
    //ordenar por data de validade ou valor base
    let b = document.getElementById("base");
    b.addEventListener("click", ev=>{
        console.log("Ordenar base");
        orderByBaseValue();
    });

    let d = document.getElementById("data");
    d.addEventListener("click", ev=>{
        console.log("Ordenar validade");
        orderByExpirationDate();
    });

    //ordenar por ordem crescente
    let desc = document.getElementById("desc");
    desc.addEventListener("click", ev=>{
        console.log("Inverter ordem");
        invertOrder();
    });

    let btn = document.getElementById("btFilter");
    btn.addEventListener("click", (ev)=>{
        //filtrar duracao pelos valores min e max de 0 a 10
        let min = document.getElementById("min").value /10;
        let max = document.getElementById("max").value /10;

        //filtrar area
        let areas = document.getElementById("areas").value;
    });
    let reset = document.getElementById("btReset");
    reset.addEventListener("reset", (ev)=>{
        loadTableRowsInPage(jobs);
        localJobs = [...jobs];
    });
}
function userCreateonTypeEnventHandler(){
    console.log("Evento");
    let selection = document.getElementById("typeSelect");
    let selectedOptionValue = selection.options.selectedIndex;
    console.dir(selection.options[selectedOptionValue]);

    switch(selection.options[selectedOptionValue].value){
        case "company":removeEmployeeFormType();
            break;
        case "professional":insertEmployeeFormType();
            break;
        default:console.log("Tipo de utilizador não reconhecido");
    }
}
function insertEmployeeFormType(){
    let form = document.getElementById("login-form");
    let btn = document.getElementById("btnCreate");
    let elementToAdd = document.getElementById("employeeTypeContainer");
    let newElem = elementToAdd.cloneNode(true);
    newElem.id = "visibleEmployeeTypeContainer";
    newElem.style.overflow = "visible";
    newElem.style.height = "100%";
    newElem.style.width = "100%";
    form.insertBefore(newElem, btn);
}
function removeEmployeeFormType(){
    let elementToRemove = document.getElementById("visibleEmployeeTypeContainer");
    elementToRemove.remove();
}



//toogles the value of display propertie between block and none
function displayMenuItems(){
    let items = document.getElementsByClassName("menuItem");
    for(let i=0;i<items.length;i++){
        if(items[i].style.display === "block"){
            items[i].style.display = "none";
        }else{
            items[i].style.display="block";
        }
    }
}

//put display propertie = none if window widht <=600 else = block
function resetMenuDisplay(){
    if(document.documentElement.clientWidth>600){
        let items = document.getElementsByClassName("menuItem");
        for(let i=0;i<items.length;i++){
            items[i].style.display="block";
        }
    }else{
        let items = document.getElementsByClassName("menuItem");
        for(let i=0;i<items.length;i++){
            items[i].style.display="none";
        }
    }
}

//EventListener so that the menu buttons dont stay in display=none when window resized
window.addEventListener('resize', resetMenuDisplay);




function generateJobOferTableRows(arrJobs){
    let trElementArr = [];

    
    for(let i=0;i<arrJobs.length;i++){
        let tr = document.createElement("tr");

        for(let j=0;j<6;j++){
            let td = document.createElement("td");
            
            let field = getField(j);
            let content = arrJobs[i][field];
            if(j==3)content += " anos";
            if(j==4)content += "€";

            td.textContent = content;

            td.class = "column" + (j+1);

            
            
            tr.appendChild(td);

        }
        trElementArr.push(tr);
    }

    return trElementArr;
}

function loadTableRowsInPage(arrJobs){
    
    console.log("Loading ...");

    let table = document.getElementById("tbody");
    console.dir(table);


    console.dir(table);

    let trArr = generateJobOferTableRows(arrJobs);

    for(let i=0;i<trArr.length;i++){
        table.appendChild(trArr[i]);
    }
}


function orderByBaseValue(arrJobs){

}
function orderByExpirationDate(arrJobs){
    let arrDates;
    arrJobs.sort((j1, j2)=>{
        let arrj1 = j1.expirationDate.split("/");
        let arrj2 = j2.expirationDate.split("/"); 
        if(arrj1[2] < arrj2[2]){
            return -1;
        } else if(arrj1[2] > arrj2[2]){
            return 1;
        } else {
            if(arrj1[1] < arrj2[1]){
                return -1;
            } else if(arrj1[1] > arrj2[1]){
                return 1;
            } else {
                if(arrj1[0] < arrj2[0]){
                    return -1;
                } else if(arrj1[0] > arrj2[0]){
                    return 1;
                } 
            }
        }
        return 0;
    });
}
function invertOrder(arrJobs){
    let newArr = arrJobs;
    for(let i = 0, j = arrJobs.length-1; i < arrJobs.length; i++, j--){
        newArr[j] = arrJobs[i];
    }
    arrJobs = newArr;
}
function filter(arrJobs, name){
    let arr = [];
    for(let i = 0; i < arrJobs.length; i++){
        if(arrJobs[i].area === name){
            arr.push(arrJobs[i]);
        }
    }

    return arr;
}
function getField(i){
    switch(i){
        case 0:return"company";
        case 1:return"area";
        case 2:return"description";
        case 3:return"duration";
        case 4:return"value";
        case 5:return"expirationDate";
    }
}

window.onload = init;