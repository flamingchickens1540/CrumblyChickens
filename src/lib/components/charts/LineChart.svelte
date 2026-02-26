<script lang="ts">
    import * as echarts from "echarts"

    type LineChartProps = {
        data: { name: string; x: number[]; y: number[]; color?: string }[]
        title?: string
        xLabel?: string
        yLabel?: string
        width?: string
        height?: string
    }

    let {
        data,
        title,
        xLabel,
        yLabel,
        width = "600px",
        height = "400px",
    }: LineChartProps = $props()

    let chartDom: HTMLDivElement

    $effect(() => {
        if (chartDom) {
            const chart = echarts.init(chartDom)
            const option = {
                title: {
                    text: title,
                    left: "center",
                    textStyle: {
                        color: "rgba(255, 255, 255, 1)",
                    },
                },
                legend: {
                    data: data.map(d => d.name),
                    top: 20,
                    textStyle: {
                        color: "rgba(255, 255, 255, 1)",
                    },
                },
                xAxis: {
                    type: "value",
                    name: xLabel,
                    nameLocation: "middle",
                    nameGap: 30,
                },
                yAxis: {
                    type: "value",
                    name: yLabel,
                    nameLocation: "middle",
                    nameGap: 30,
                },
                series: [],
                tooltip: {
                    formatter: (params: any) => {
                        return `${params.seriesName}<br> ${yLabel}: <b>${params.value[1]}</b><br> ${xLabel}: <b>${params.value[0]}</b>`
                    },
                },
                animation: false,
            }

            data.forEach(series => {
                // @ts-expect-error
                option.series.push({
                    type: "line",
                    data: series.x.map((x, i) => [x, series.y[i]]),
                    name: series.name,
                    itemStyle: series.color ? { color: series.color } : {},
                })
            })

            chart.setOption(option)
        }
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height};"></div>