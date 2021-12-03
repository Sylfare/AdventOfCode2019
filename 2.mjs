import { openFileNumber } from "./lib.mjs";



let file = await openFileNumber('./input2.txt',',');

// part 1

let result = execute(file);

/*let values = "1,1,1,4,99,5,6,0,99".split(",").map(n=>parseInt(n,10));
console.log(values);
let result = execute(values);*/

console.log("Part 1 result: ",result[0]);

// part 2

const target = 19690720;
let found = false;

for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 99; j++) {
        let mem = [...file];
        mem[1]=i;
        mem[2]=j;
        let result = execute(mem)[0];
        found = result == target;

        if(found){
            console.table({i,j,result:100*i+j});
            break;
        }
    }
    if(found) break;
}



// ---

function execute(data){
    let p = 0;
    
    let running = true;
    let mem = [...data, ...Array(200-file.length).fill(0)];
    while(running){
        switch (mem[p]) {
            case 1:
                mem[mem[p+3]] = mem[mem[p+1]] + mem[mem[p+2]];
                //console.log(`${p} - Addition : ${mem[mem[p+1]]} + ${mem[mem[p+2]]} = ${mem[mem[p+1]] + mem[mem[p+2]]}, save into ${mem[p+3]}`);

                p+=4;
                break;
            case 2:
                mem[mem[p+3]] = mem[mem[p+1]] * mem[mem[p+2]];
                //console.log(`${p} - Multiplication : ${mem[mem[p+1]]} * ${mem[mem[p+2]]} = ${mem[p+1] * mem[mem[p+2]]}, save into ${mem[p+3]}`);
                p+=4;
                break;
            case 99:
                running = false;
                break;
            default:
                console.log('Opcode not valid');
                running = false;
                break;
        }
        //console.table(mem);
    }

    return mem;
}
