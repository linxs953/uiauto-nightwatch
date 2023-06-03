// 进行批量执行

export async function multDataRunner(scene:any,dp:Promise<any>,allScene:any={}) {
    const data = await dp
    for (let idx=0; idx < data.length;idx++) {
        const keys = Object.keys(scene)
        for (let k of keys) {
            const caseName = `${k}[iter ${idx+1}]`
            allScene[caseName] = () => {
                scene[k](data[idx])
            }
        }
    }
    return allScene
}