<script lang="ts">
    import BarChart from '@/components/charts/BarChart.svelte';
    import BoxPlot from '@/components/charts/BoxPlot.svelte';
    import LineChart from '@/components/charts/LineChart.svelte';
    import RadarChart from '@/components/charts/RadarChart.svelte';
    import ScatterPlot from '@/components/charts/ScatterPlot.svelte';
    import VerticalToggleGroup from '@/components/VerticalToggleGroup.svelte';

    let selectedChart: string = $state('');
    let displayedChart: string = $state('');

    let data: any = $state();
    let categories: any = $state();
    let tableXLabel: string = $state('');
    let tableYLabel: string = $state('');
    let scatterPlotTrendline: any = $state();

    $effect(() => {
        if (selectedChart === 'BarChart') {
            console.log('BarChart');
            data = [
                {
                    name: '1540',
                    values: [12, 18, 9]
                },
                {
                    name: '1844',
                    values: [22, 10, 15]
                }
            ];
            categories = ['Auto', 'Tele', 'End'];
            tableXLabel = 'Team Number';
            tableYLabel = 'Points';
        } else if (selectedChart === 'BoxPlot') {
            console.log('BoxPlot');
            data = [
                {
                    name: '1844',
                    values: [
                        10, 12, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 20, 24, 25, 27, 30,
                        32
                    ],
                    color: '#9440cf'
                },
                {
                    name: '1540',
                    values: [
                        8, 10, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 18, 19, 20, 22, 23,
                        25
                    ],
                    color: '#fbd50b'
                }
            ];
            tableXLabel = 'Team Number';
            tableYLabel = 'Points';
        } else if (selectedChart === 'LineChart') {
            console.log('LineChart');
            data = [
                {
                    name: '1540',
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: [12, 14, 11, 13, 15, 17, 14, 16, 18, 21],
                    color: '#fbd50b'
                },
                {
                    name: '1844',
                    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: [15, 20, 14, 19, 18, 23, 21, 22, 24, 25],
                    color: '#9440cf'
                }
            ];
            tableXLabel = 'Match Number';
            tableYLabel = 'Tele Points';
        } else if (selectedChart === 'RadarChart') {
            console.log('RadarChart');
            data = [
                {
                    name: '1540',
                    value: [13, 28, 6, 50],
                    color: '#fbd50b'
                },
                {
                    name: '1844',
                    value: [37, 83, 6, 15],
                    color: '#9440cf'
                }
            ];
            categories = [{ name: 'amp' }, { name: 'speaker' }, { name: 'trap' }, { name: 'pass' }];
        } else if (selectedChart === 'ScatterPlot') {
            console.log('ScatterPlot');
            data = [
                { x: 10.0, y: 8.04, color: '#fbd50b' },
                { x: 8.07, y: 6.95, color: '#9440cf' },
                { x: 13.0, y: 7.58, color: '#ff5733' },
                { x: 11.0, y: 8.33, color: '#3357ff' },
                { x: 14.0, y: 7.66, color: '#ff33a1' },
                { x: 9.15, y: 7.26, color: '#33ffa1' },
                { x: 3.03, y: 4.23, color: '#ff5733' },
                { x: 12.2, y: 7.83, color: '#33ff57' },
                { x: 2.02, y: 4.47, color: '#3357ff' },
                { x: 1.05, y: 3.33, color: '#ff33a1' },
                { x: 6.03, y: 7.24, color: '#33a1ff' },
                { x: 7.08, y: 5.82, color: '#33ffa1' },
                { x: 5.02, y: 5.68, color: '#a1ff33' }
            ];
            tableXLabel = 'Tele Points';
            tableYLabel = 'Auto Points';
            scatterPlotTrendline = { model: 'polynomial' };
        }
        displayedChart = selectedChart;
    });
</script>

<div class="flex flex-col items-center">
    <div>
        <VerticalToggleGroup
            items={['BarChart', 'BoxPlot', 'LineChart', 'RadarChart', 'ScatterPlot']}
            bind:value={selectedChart}
        />
    </div>

    {#if displayedChart === 'BarChart'}
        <BarChart {data} {categories} xLabel={tableXLabel} yLabel={tableYLabel} />
    {:else if displayedChart === 'BoxPlot'}
        <BoxPlot {data} xLabel={tableXLabel} yLabel={tableYLabel} />
    {:else if displayedChart === 'LineChart'}
        <LineChart {data} xLabel={tableXLabel} yLabel={tableYLabel} />
    {:else if displayedChart === 'RadarChart'}
        <RadarChart {data} {categories} />
    {:else if displayedChart === 'ScatterPlot'}
        <ScatterPlot
            {data}
            xLabel={tableXLabel}
            yLabel={tableYLabel}
            trendline={scatterPlotTrendline}
        />
    {/if}
</div>
