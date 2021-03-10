var tbody = document.querySelector('#Table tbody');
let dataset = [];
let numberOfWhiteBox = 0;

document.querySelector('#exec').addEventListener('click',(e)=>{
    tbody.innerHTML = ''; // initialize tbdoy
    numberOfWhiteBox = 0;
    dataset = [];

    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);

    let shuffle = [];
    let temp = Array(hor*ver)
    .fill()
    .map((element,index)=>index+1);
    // draw random numbers
    for(let i = 0; i<mine;i++){
        let draw = temp.splice(Math.floor(Math.random()*(temp.length-1)),1)[0];
        shuffle.push(draw);
    }
    // set td
    for(let i =0;i<ver;i++){
        let tr = document.createElement('tr');
        let arr = [];
        dataset.push(arr);
        for(let j = 0;j<hor;j++){
            let td = document.createElement('td');
            tr.appendChild(td);
            // mouse right button
            td.addEventListener('contextmenu',(e2)=>{
                e2.preventDefault();
                //let parent_tr = e2.currentTarget.parentNode;
                //let parent_tb = e2.currentTarget.parentNode.parentNode;
                //let row = Array.prototype.indexOf.call(parent_tb.children, tr);
                //let col = Array.prototype.indexOf.call(parent_tr.children, td);
                if(e2.currentTarget.textContent === ''){
                    e2.currentTarget.style.background = '#D0F5A9';
                    e2.currentTarget.textContent = '!';
                }else if(e2.currentTarget.textContent ==='!'){
                    e2.currentTarget.style.background = '#F3F781';
                    e2.currentTarget.textContent = '?';
                }else if(e2.currentTarget.textContent ==='?'){
                    e2.currentTarget.style.background = '#444'
                    e2.currentTarget.textContent = '';
                }
            });
            // click td
            td.addEventListener('click',(e2)=>{
                let parent_tr = e2.currentTarget.parentNode;
                let parent_tb = e2.currentTarget.parentNode.parentNode;
                let row = Array.prototype.indexOf.call(parent_tb.children, tr);
                let col = Array.prototype.indexOf.call(parent_tr.children, td);
                if(e2.currentTarget.textContent==='!'||e2.currentTarget.textContent==='?'){
                    return;
                }
                if(dataset[row][col] === 'X'){
                    alert('BOOM');
                    console.log('failed');
                    location.reload();
                    return;
                }else if(dataset[row][col] === 2){
                        return;
                }else{
                    let near = [dataset[row][col-1],dataset[row][col+1]];
                    dataset[row][col] = 2;
                    if(dataset[row+1]){
                        near = near.concat([dataset[row+1][col-1],dataset[row+1][col],dataset[row+1][col+1]]);
                    }
                    if(dataset[row-1]){
                        near = near.concat([dataset[row-1][col-1],dataset[row-1][col],dataset[row-1][col+1]]);
                    }
                    let mines = near.filter((v)=> v==='X').length;
                    
                    // if mines being are none,
                    if(mines === 0){
                        let blocks = [];
                        blocks = blocks.concat([tbody.children[row].children[col-1],tbody.children[row].children[col+1]]);
                        if(tbody.children[row-1]){
                            blocks = blocks.concat([tbody.children[row-1].children[col-1],
                                tbody.children[row-1].children[col],
                                tbody.children[row-1].children[col+1]]);
                        }
                        if(tbody.children[row+1]){
                            blocks = blocks.concat([tbody.children[row+1][col-1],
                                tbody.children[row+1].children[col],
                                tbody.children[row+1].children[col+1]]);
                        }

                        blocks.filter((v)=>!!v).forEach((n)=>{
                            let this_parent_tb = n.parentNode.parentNode;
                            let this_parent_tr = n.parentNode;
                            let this_col = Array.prototype.indexOf.call(this_parent_tr.children,n);
                            let this_row = Array.prototype.indexOf.call(this_parent_tb.children,this_parent_tr);
                            if(dataset[this_row][this_col] === 1){
                                n.click();
                            }
                        });
                    }
                    e2.currentTarget.textContent = mines || '';
                    e2.currentTarget.style.background = 'white';

                    // if there is no blocks to be opened
                    numberOfWhiteBox+=1;
                    if(numberOfWhiteBox === ver*hor-mine){
                        alert('You found all mines');
                        location.reload();
                        return;
                    }
                }
            });
            arr.push(1);
        }
        tbody.appendChild(tr);
    }
    // laying mines
    for(let i =0;i<shuffle.length;i++){
        let sec = parseInt(shuffle[i]/hor);
        let fir = parseInt(shuffle[i]%hor);

        //tbody.children[sec].children[fir].textContent = 'X';
        dataset[sec][fir] = 'X';
    }
});

// difference between target and currentTarget
tbody.addEventListener('contextmenu', (e)=>{
    // console.log(e.target); // actual target(clicked) td
    // console.log(e.currentTarget); // event target tbody
});