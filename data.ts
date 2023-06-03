import axios from "axios"

export async function getSceneData(scene_name:String) {
    return new Promise(async (resolve,reject) => {
        const res = await axios.get("http://localhost:8080/uitest/sceneDataService/getAllData")
        if (!res) {
            console.log("fetch ui scene data error")
            reject(new Error("fetch data error"))
        }
        const data = res.data.data
        const business_list = Object.keys(data)
        for (let business of business_list) {
            const module_list = Object.keys(data[business])
            for (let module of module_list) {
                const scene_list = Object.keys(data[business][module])
                for (let scene of scene_list) {
                    if (scene == scene_name) {
                        resolve(data[business][module][scene])
                    }
                }
            }
        }
        resolve([])
    })
}