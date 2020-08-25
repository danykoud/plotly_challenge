

d3.json("samples.json").then( data => {
console.log(data);

const name  = data.otu_ids;
const values = unpack(data.sample_values);




});
// const dataPromise = d3.json("samples.json");
// console.log("Data Promise: ", dataPromise);