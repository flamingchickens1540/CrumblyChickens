<script lang="ts">
    import * as echarts from "echarts"
    import ecStat from "echarts-stat"

    // @ts-ignore
    echarts.registerTransform(ecStat.transform.regression)

    type RegressionModel =
        | "linear"
        | "exponential"
        | "logarithmic"
        | "polynomial"

    type ScatterLineProps = {
        data: { name?: string; x: number; y: number; color?: string }[] //TODO: add name
        title?: string
        xLabel?: string
        yLabel?: string
        trendline?: { model: RegressionModel; color?: string }
        tooltip?: boolean
        width?: string
        height?: string
    }

    let {
        data,
        title = "",
        xLabel = "",
        yLabel = "",
        trendline = undefined,
        tooltip = true,
        width = "600px",
        height = "400px",
    }: ScatterLineProps = $props()

    let chartDom: HTMLDivElement

    $effect(() => {
        if (chartDom) {
            const chart = echarts.init(chartDom)

            const option = {
                title: {
                    text: title,
                    left: "center",
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
                series: [
                    {
                        data: data.map(item => [item.x, item.y]),
                        type: "scatter",
                        symbolSize: 7,
                        itemStyle: {
                            color: (params: any) =>
                                data[params.dataIndex].color ?? {},
                        },
                    },
                ],
                tooltip: {
                    show: tooltip,
                    formatter: (params: any) => {
                        const name = data[params.dataIndex].name
                            ? `${data[params.dataIndex].name}<br>`
                            : ""
                        return `${name} ${yLabel}: <b>${params.value[1]}</b><br>${xLabel}: <b>${params.value[0]}</b>`
                    },
                },
                animation: false,
            }

            if (trendline) {
                // @ts-expect-error
                option.dataset = [
                    {
                        source: data.map(d => [d.x, d.y]),
                    },
                    {
                        transform: {
                            type: "ecStat:regression",
                            config: {
                                method: trendline.model,
                            },
                        },
                    },
                ]
                option.series.push({
                    // @ts-ignore
                    name: "line",
                    type: "line",
                    smooth: true,
                    datasetIndex: 1,
                    symbolSize: 0.1,
                    silent: true,
                    symbol: "circle",
                    lineStyle: {
                        type: "dashed",
                        color: trendline.color ?? "#CCCCCC",
                    },
                    z: 1,
                })
            }

            chart.setOption(option)
        }
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height}"></div>