
  function Demography_INfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    //  checking output
            console.log(metadata)

       var value = metadata.filter(name => name.id.toString() === id)[0];
      
       var demography= d3.select("#sample-metadata");
        
     //clear the demographic info panel before inserting new data
       demography.html("");

     // grab necessary  data 
     Object.entries(value).forEach((key) => {   
      demography.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  
        });
    });
}

function funcplot() {
  

d3.json("samples.json").then( data => {
  console.log(data);


var otu_id=data.samples[0].otu_ids.slice(0, 10).inverse();
var otu_value= data.samples[0].sample_values.slice(0, 10);
var label= data.samples[0].otu_labels.slice(0, 10);
// Trace1 for the Greek Data
var trace1 = {
  x: otu_id,
  y: otu_value,
  text: label,
  name: "Belly Button",
  type: "bar",
  orientation: "h"
};

// data
var chartData = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Belly Button Bacteria",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", chartData, layout);


// The bubble chart
var trace1 = {
    x: data.samples[0].otu_ids,
    y: data.samples[0].sample_values,
    mode: "markers",
    marker: {
        size: data.samples[0].sample_values,
        color: data.samples[0].otu_ids
    },
    text:  data.samples[0].otu_labels

};
//Bubble chart  layout 
var layout_2 = {
  xaxis:{title: "otu id"},
  height: 600,
  width: 900
};

// creating data variable 
var data1 = [trace1];

// create the bubble plot
Plotly.newPlot("bubble", data1, layout_2); 

  
  });
}


  function init() {
    // Grab a Reference to the Dropdown Select Element
    var output = d3.select("#selDataset");
  
    // Use the List of Sample Names to Populate the Select Options
    d3.json("samples.json").then(data=> {
      data.names.forEach((sample) => {
       output
          .append("option")
          .text(sample)
          .property("value");
      });
  
      // Use the First Sample from the List to Build Initial Plots
      funcplot(data.names[0]);
      Demography_INfo(data.names[0]);
    });
  }
  
  // Initialize the Dashboard
  init();