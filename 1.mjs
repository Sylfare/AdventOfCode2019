import { openFileNumber } from "./lib.mjs";

openFileNumber('./input1.txt')
.then((list)=>list.reduce(reducer, {mass:0,totalMass:0}))
.then(console.table)
.catch(console.error);

const reducer = (prev, cur) => {
    const m = parseInt(cur);
    return {
        mass: prev.mass + fuel(m),
        totalMass: prev.totalMass + recursFuel(m),
    }
};

const fuel = n => Math.floor(n / 3) - 2;

const recursFuel = n => { 
    let fuelNeeded = fuel(n);
    if(fuelNeeded>0){
        const need = recursFuel(fuelNeeded);
        if(need > 0){
            fuelNeeded += need;
        }
    }
    return fuelNeeded;
}