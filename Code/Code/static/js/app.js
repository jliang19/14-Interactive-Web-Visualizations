d3.json("samples.json")
.then(data=> {
    console.log(data);
    for(let i=0; i<data.names.length;i++){
        d3.select("#selDataset")
        .append("option")
        .text(data.names[i])
        .property("value",
        data.names[i])
    }
    optionChanged(data.metadata[0].id)
})
function optionChanged(sampleName){
    console.log(sampleName)
    d3.json("samples.json")
    .then(data=> {
        var sampletofind;
        for(let i=0; i<data.metadata.length;i++){
            console.log(data.metadata[i])
            if(sampleName==data.metadata[i].id){
                sampletofind=data.metadata[i]
            }
        }
        console.log(sampletofind)
        var panel = d3.select("#sample-metadata")
        panel.html("")
        panel.append("h6").text("ethnicity:"+ sampletofind.ethnicity)

        panel.append("h6").text("gender:"+ sampletofind.gender)
        panel.append("h6").text("age:"+ sampletofind.age)
        panel.append("h6").text("location:"+ sampletofind.location)
        panel.append("h6").text("bbtyoe:"+ sampletofind.bbtype)
        panel.append("h6").text("wfreq:"+ sampletofind.wfreq)
        for(let i=0; i<data.samples.length;i++){
            console.log(data.samples[i])
            if(sampleName==data.samples[i].id){
                sampletofind=data.samples[i]
            }
        }
        var bubblelayout = {
            title:"Bacteria Culture",hovermode:"closest",xaxis:{title:"OTU ID"}
        }
        var bubbleData = [{
            x:sampletofind.otu_ids,
            y:sampletofind.sample_values, text:sampleName.otu_labels,mode:"markers",marker:{
                size:sampletofind.sample_values, color:sampletofind.otu_ids, colorscale:"Earth"
            }
        }]
        Plotly.newPlot("bubble",bubbleData,bubblelayout)
        var y_axis_data = sampletofind.otu_ids.slice(0,10).map(otuid=>"otuid"+otuid)
        var barData= [{
            y:y_axis_data,
            x:sampletofind.otu_ids.slice(0,10).reverse(),
            text:sampletofind.otu_ids.slice(0,10).reverse(),
            type:"bar",
            orientation:"h"
        }]
        console.log (barData)
        Plotly.newPlot("bar",barData, {
            title:"Top 10 bacteria cultures"
        })
    })
}
