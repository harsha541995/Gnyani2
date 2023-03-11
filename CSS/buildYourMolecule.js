

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const canvasWindow = document.querySelector(".canvasWindow");
const width = canvasWindow.clientWidth;
const height = canvasWindow.clientHeight;

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);

let canvasClick = false;
const ElementArray = document.querySelectorAll(".element");
const bondArray = document.querySelectorAll(".bond");
const deleteAll = document.querySelector(".deleteAll");
const main = document.querySelector("main");
const deleteButton = document.querySelector(".delete");
const validateButton = document.querySelector(".validate");

let bonding = false;
let bondNumber;
let validationCount = 0;
let formulaString = "";
let names = "";
let nameCount = 0;

let carbonColor = "#33B3FF";
let hydrogenColor = "#C4C415";
let nitrogenColor = "#FF9AA2";
let oxygenColor = "#3EE85C";
let bromineColor = "#E8953E";
let chlorineColor = "#726FA3";
let themeColor = "#00579c";
let bondColor = "#ADD8E6";
bondColor = "#338BA8";

let pair = [];
let pairValencyCheck = false;
colorArray = [carbonColor, hydrogenColor, oxygenColor, nitrogenColor, chlorineColor, bromineColor]
let elementNameArray = ["C", "H", "N", "O", "F", "I"];
let ElementnameCountArray = [];

atomTypeArray = [{
    type: "C",
    radius: 20,
    color: carbonColor,
    valency: 4,
    currentValency: 0,
    active: false
},

{
    type: "H",
    radius: 15,
    color: hydrogenColor,
    valency: 1,
    currentValency: 0,
    active: false
},

{
    type: "O",
    radius: 19,
    color: oxygenColor,
    valency: 2,
    currentValency: 0,
    active: false
},

{
    type: "N",
    radius: 18,
    color: nitrogenColor,
    valency: 3,
    currentValency: 0,
    active: false
},

{
    type: "F",
    radius: 21,
    color: chlorineColor,
    valency: 1,
    currentValency: 0,
    active: false
},

{
    type: "I",
    radius: 25,
    color: bromineColor,
    valency: 1,
    currentValency: 0,
    active: false
}
];


let bondTypeArray = [1, 2, 3]

let atomArray = [];

class Atom {

    constructor(e) {

        for (atom of atomTypeArray) {

            if (e.type == atom.type) {
                this.type = atom.type;
                this.radius = atom.radius;
                this.color = atom.color;
                this.valency = atom.valency;
                this.currentValency = atom.currentValency;
                this.active = false;
                this.x = 0,
                    this.y = 0
                this.justcreated = true;
                this.border = false


            }
        }


    }

}

let distance = (a, b, c, d) => {

    return Math.sqrt(Math.pow(a - c, 2) + Math.pow(b - d, 2))

}


let elementHighlight = (e, i) => {

    ElementArray.forEach((e, i) => {
        e.style.color = "white";
        e.style.backgroundColor = colorArray[i];
        atomTypeArray[i].active = false;
    }
    )

    e.style.color = colorArray[i];
    e.style.backgroundColor = "white";
    e.style.border = `1px solid ${colorArray[i]}`
    atomTypeArray[i].active = true;


    bondArray.forEach((i) => {
        i.style.backgroundColor = themeColor;
    })

    for (bond of bondArray) {
        for (child of bond.children) {
            child.style.backgroundColor = "white";
        }
    }



}


let bondHighlight = (e) => {

    bondArray.forEach((i) => {
        i.style.backgroundColor = themeColor;
    })

    for (bond of bondArray) {
        for (child of bond.children) {
            child.style.backgroundColor = "white";
        }
    }

    ElementArray.forEach((e, i) => {
        e.style.color = "white";
        e.style.backgroundColor = colorArray[i];
        atomTypeArray[i].active = false;
    })

    e.style.backgroundColor = "white";
    e.style.border = `1px solid ${themeColor}`


    for (child of e.children) {
        child.style.backgroundColor = themeColor
    };
}

let drawAtom = (e, i) => {

    ctx.font = `${atomTypeArray[i].radius}px Montserrat`
    ctx.fillStyle = atomTypeArray[i].color;
    ctx.beginPath();
    ctx.arc(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top, atomTypeArray[i].radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText(atomTypeArray[i].type, e.clientX - 0.38 * atomTypeArray[i].radius - canvas.getBoundingClientRect().left, e.clientY + 0.35 * atomTypeArray[i].radius - canvas.getBoundingClientRect().top);

}

let redrawAtom = (p) => {

    ctx.font = `${p.radius}px Montserrat`
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText(p.type, p.x - 0.38 * p.radius, p.y + 0.35 * p.radius);

}



drawBorder = (e) => {

    ctx.lineWidth = 2;
    ctx.strokeStyle = hydrogenColor;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius + 4, 0, 2 * Math.PI);
    ctx.stroke();
}

let pairpop = () => {

    while (pair.length) {
        pair.pop();
    }
}

let pairSlope = () => {

    if (pair.length > 1) {

        return (pair[0].y - pair[1].y) / (pair[0].x - pair[1].x)
    };
}


let pairSin = () => { return Math.sin(Math.atan(pairSlope())) };
let pairCos = () => { return Math.cos(Math.atan(pairSlope())) };



let pairSinAdd = () => { return Math.sin(Math.atan(pairSlope()) + Math.PI / 6) };
let pairCosAdd = () => { return Math.cos(Math.atan(pairSlope()) + Math.PI / 6) };

let pairSinSubtr = () => { return Math.sin(Math.atan(pairSlope()) - Math.PI / 6) };
let pairCosSubtr = () => { return Math.cos(Math.atan(pairSlope()) - Math.PI / 6) };




let drawSingleBond = () => {

    ctx.beginPath();
    if (pair[0].x > pair[1].x) {
        ctx.moveTo(pair[0].x - pair[0].radius * pairCos(), pair[0].y - pair[0].radius * pairSin());
        ctx.lineTo(pair[1].x + pair[1].radius * pairCos(), pair[1].y + pair[1].radius * pairSin());
    } else {
        ctx.moveTo(pair[0].x + pair[0].radius * pairCos(), pair[0].y + pair[0].radius * pairSin());
        ctx.lineTo(pair[1].x - pair[1].radius * pairCos(), pair[1].y - pair[1].radius * pairSin());
    }
    ctx.stroke();

}

let drawDoubleBond = () => {

    if (pair[0].x > pair[1].x) {
        ctx.beginPath();
        ctx.moveTo(pair[0].x + pair[0].radius * pairCosSubtr(), pair[0].y + pair[0].radius * pairSinSubtr());
        ctx.lineTo(pair[1].x + pair[0].radius * pairCosSubtr(), pair[1].y + pair[0].radius * pairSinSubtr());
        ctx.stroke();

        redrawAtom(pair[0]);
    } else {
        ctx.beginPath();
        ctx.moveTo(pair[0].x + pair[0].radius * pairCosSubtr(), pair[0].y + pair[0].radius * pairSinSubtr());
        ctx.lineTo(pair[1].x + pair[0].radius * pairCosSubtr(), pair[1].y + pair[0].radius * pairSinSubtr());
        ctx.stroke();

        redrawAtom(pair[1]);
    }



    if (pair[0].x > pair[1].x) {
        ctx.beginPath();
        ctx.moveTo(pair[0].x + pair[0].radius * pairCosAdd(), pair[0].y + pair[0].radius * pairSinAdd());
        ctx.lineTo(pair[1].x + pair[0].radius * pairCosAdd(), pair[1].y + pair[0].radius * pairSinAdd());
        ctx.stroke();

        redrawAtom(pair[0]);
    } else {
        ctx.beginPath();
        ctx.moveTo(pair[0].x + pair[0].radius * pairCosAdd(), pair[0].y + pair[0].radius * pairSinAdd());
        ctx.lineTo(pair[1].x + pair[0].radius * pairCosAdd(), pair[1].y + pair[0].radius * pairSinAdd());
        ctx.stroke();

        redrawAtom(pair[1]);
    }
}

let drawbonds = (i) => {

    ctx.strokeStyle = bondColor;
    ctx.lineWidth = "3";

    if (i == 1) {

        drawSingleBond();
        pairpop();
    }

    if (i == 2) {

        drawDoubleBond();

        pairpop();
    }

    if (i == 3) {

        drawSingleBond();
        drawDoubleBond();

        pairpop();


    }
}






ElementArray.forEach(
    (e, i) => {

        e.addEventListener("click", () => {
            elementHighlight(e, i);
            bonding = false;

        })
    })


bondArray.forEach(
    (e) => {

        e.addEventListener("click", () => {
            bondHighlight(e)

        })
    })



canvas.addEventListener("click", (e) => {


    for (atom of atomTypeArray) {

        if (atom.active == true) {
            drawAtom(e, atomTypeArray.indexOf(atom));
            atomArray.push(new Atom(atom));
            atomArray[atomArray.length - 1].x = e.clientX - canvas.getBoundingClientRect().left,
                atomArray[atomArray.length - 1].y = e.clientY - canvas.getBoundingClientRect().top

            setTimeout(() => { atomArray[atomArray.length - 1].justcreated = false }, 20)

        }
    }
})

//delete all button



deleteAll.addEventListener("click", () => {

    names = "";
    ElementnameCountArray = [];
    nameCount = 0;
    formulaString = "";
    atomArray = [];
    pair = [];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // for(i=0; i<atomArray.length; i++){
    //     atomArray.pop();
    // }
    // location.reload();

})


//clicking outside the main window

bonding = false;

document.addEventListener("click", function (event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest("main")) return

    bonding = false;
    for (let i = 0; i < pair.length; i++) {
        pair.pop();
    }
    // console.log(pair);


    ElementArray.forEach((e, i) => {
        e.style.color = "white";
        e.style.backgroundColor = colorArray[i];
        atomTypeArray[i].active = false;


    })

    bondArray.forEach((i) => {
        i.style.backgroundColor = themeColor;
    })

    for (bond of bondArray) {
        for (child of bond.children) {
            child.style.backgroundColor = "white";
        }
    }


})




// drawing the bonds

bondArray.forEach(
    (e, i) => {

        e.addEventListener("click", () => {

            bonding = true;
            bondNumber = i + 1;

        })
    }
)


canvas.addEventListener("click", () => {
    console.log(bonding);
})

canvas.addEventListener("click", (e) => {

    let x = e.clientX - canvas.getBoundingClientRect().left;
    let y = e.clientY - canvas.getBoundingClientRect().top;



    for (atom of atomArray) {


        if (bonding) {

            if (pair.length <= 1 && distance(x, y, atom.x, atom.y) <= atom.radius) {

                if (!pair.includes(atom)) {
                    pair.push(atom);
                }

                if (pair.length == 2) {

                    for (p of pair) {
                        p.currentValency += bondNumber
                    }

                    for (p of pair) {

                        if (p.currentValency > p.valency) {

                            for (p of pair) {

                                p.currentValency -= bondNumber;
                            }
                            pairpop();

                        }
                    }

                    if (pair.length == 2) {

                        drawbonds(bondNumber);
                    }


                }



            };




        }











    }
})


validateButton.addEventListener("click", () => {

    for (atom of atomArray) {
        if (atom.currentValency < atom.valency) {
            //  console.log(atom);   
            validationCount++;
        }
    }

    if (validationCount > 0) {
        alert("valency not satisfied");
        validationCount = 0;
    } else {

        for (atom of atomArray) {

            formulaString += atom.type;
        }
        console.log(formulaString);




        for (i = 0; i < elementNameArray.length; i++) {

            for (j = 0; j < formulaString.length; j++) {

                if (elementNameArray[i] == formulaString[j]) {

                    nameCount++;
                }
            }

            ElementnameCountArray.push(nameCount);
            nameCount = 0;

        }



        for (i = 0; i < elementNameArray.length; i++) {

            if (ElementnameCountArray[i] > 0) {
                if (ElementnameCountArray[i] == 1) {
                    names += elementNameArray[i];
                } else {
                    names += elementNameArray[i] + ElementnameCountArray[i].toString();
                }
            }
        }
        console.log(names);
        console.log(ElementnameCountArray);

        validateButton.href = `https://pubchem.ncbi.nlm.nih.gov/#query=${names}`;
        names = "";
        ElementnameCountArray = [];
        nameCount = 0;
        formulaString = "";




    }
})

validateButton.href = `#`;



















