<script lang="ts">
    import BarChart from "@/components/charts/BarChart.svelte";
    import BoxPlot from "@/components/charts/BoxPlot.svelte";
    import LineChart from "@/components/charts/LineChart.svelte";
    import RadarChart from "@/components/charts/RadarChart.svelte";
    import ScatterPlot from "@/components/charts/ScatterPlot.svelte";
    import VerticalToggleGroup from "@/components/VerticalToggleGroup.svelte";

    let currentChart:string = $state("");

    let data:any = $state();
    let categories:any = $state();
    let tableTitle:string = $state("");
    let tableXLabel:string = $state("");
    let tableYLabel:string = $state("");
    let tableWidth:string = "600px";
    let tabelHeight:string = "400px";

    switch (currentChart) {
        case "Barchart": {
            break;
        }
        case "BoxPlot": {
            break;
        }
        case "LineChart": {
            break;
        }
        case "RadarChart": {
            break;
        }
        case "ScatterPlot": {
            break;
        }
    }

</script>

<div class="flex-row">
    <VerticalToggleGroup items={["BarChart", "BoxPlot", "LineChart", "RadarChart", "ScatterPlot"]} selectedValue={currentChart} />

    {#if currentChart === "Barchart"}
    <BarChart data={data} categories={categories} title={tableTitle} xLabel={tableXLabel} yLabel={tableYLabel} width={tableWidth} height={tabelHeight} />

    {:else if currentChart === "Boxplot"}
    <BoxPlot data={data} title={tableTitle} xLabel={tableXLabel} yLabel={tableYLabel} width={tableWidth} height={tabelHeight} />

    {:else if currentChart === "LineChart"}
    <LineChart data={data} title={tableTitle} xLabel={tableXLabel} yLabel={tableYLabel} width={tableWidth} height={tabelHeight} />

    {:else if currentChart === "RadarChart"}
    <RadarChart data={data} categories={categories} title={tableTitle} width={tableWidth} height={tabelHeight} />

    {:else if currentChart === "ScatterPlot"}
    <ScatterPlot data={data} title={tableTitle} xLabel={tableXLabel} yLabel={tableYLabel} width={tableWidth} height={tabelHeight} />
    {/if}
</div>
