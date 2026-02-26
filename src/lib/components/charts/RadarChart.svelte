<script lang="ts">
    import * as echarts from "echarts"

    type RadarChartProps = {
        data: { name: string; values: number[]; color?: string }[]
        categories: { name: string; max?: number }[]
        title?: string
        tooltip?: boolean
        width?: string
        height?: string
    }

    let {
        data,
        title,
        categories,
        tooltip = true,
        width = "600px",
        height = "400px",
    }: RadarChartProps = $props()

    let chartDom: HTMLDivElement

    $effect(() => {
        if (chartDom) {
            const chart = echarts.init(chartDom)
            chart.setOption({
                title: {
                    text: title,
                    left: "center",
                },
                legend: {
                    data: data.map(item => item.name),
                    top: 20,
                },
                radar: {
                    indicator: categories,
                },
                series: [
                    {
                        type: "radar",
                        data: data.map(item => ({
                            value: item.values,
                            name: item.name,
                            itemStyle: {
                                color: item.color || undefined,
                            },
                            areaStyle: {
                                color: item.color || undefined,
                                opacity: 0.6,
                            },
                        })),
                    },
                ],
                tooltip: {
                    show: tooltip,
                },
                animation: false,
            })
        }
    })
</script>

<div bind:this={chartDom} style="width: {width}; height: {height}"></div>